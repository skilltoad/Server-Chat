"use client";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Row, Col, message } from "antd";
import Image from "next/image";
import Logo from "../../../public/Logo.jpg";
import ChatSection from "@/components/chatSection";
import Logout from "@/components/Logout";
import ChatInput from "@/components/chatInput";
import axios from "axios";
import { SEND_MSG, GET_ALL_MSG, HOST } from "@/utils/urlHelper";
import { io,Socket } from "socket.io-client";

type Message = {
  fromSelf: boolean;
  message: string;
};
const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [arrivalMessage,setArrivalMessage]=useState(null);
  const SERVER_ID = "66d1b09431a24fcdfad58911";
  const router = useRouter();
  const socket = useRef<Socket | null>(null);
  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) router.push("/");
  }, [router]);
  useEffect(() => {
    const userData = localStorage.getItem("chat-app-user");
    if (userData) {
      const user = JSON.parse(userData);
      const userId = user._id;
      socket.current=io(HOST);
      socket.current.emit("add-user", userId);
    }
  });
  useEffect(() => {
    fetchData();
    
  }, []);
  const fetchData = async () => {
    try {
      const userData = localStorage.getItem("chat-app-user");
      if (userData) {
        const user = JSON.parse(userData);
        const userId = user._id;
        const response = await axios.post(GET_ALL_MSG, {
          from: SERVER_ID,
          to: userId,
        });
        setMessages(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSendMSg = async (msg: any) => {
    const userData = localStorage.getItem("chat-app-user");
    if (userData) {
      const user = JSON.parse(userData);
      const userId = user._id;
      const response = await axios.post(SEND_MSG, {
        from: SERVER_ID,
        to: userId,
        message: msg,
      });
      // const response2 = await axios.post(SEND_MSG, {
      //   from: userId,
      //   to: SERVER_ID,
      //   message: msg,
      // });
      socket.current?.emit("send-msg",{
        to: SERVER_ID,
        from: userId,
        message:msg,
      });
      const msgs=[...messages];
      msgs.push({fromSelf:true,message:msg})
      setMessages(msgs);
      console.log(response);

      fetchData();
    }
  };
  return (
    <div className="chat-container flex flex-col">
      <Row
        style={{
          padding: "15px 0",
          backgroundColor: "#111b21",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
          flex: "0.5",
        }}
      >
        <Col className="header">
          <div
            className="flex items-center gap-4"
            style={{ padding: "0 30px" }}
          >
            <Image
              src={Logo}
              alt=""
              width={35}
              style={{ borderRadius: "30px" }}
            />
            <h2>Server Chat</h2>
          </div>
          <div style={{ padding: "0 30px" }}>
            <Logout />
          </div>
        </Col>
      </Row>
      <div
        style={{
          flex: 10,
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div
          className="flex flex-col"
          style={{ width: "50%", padding: "1px 0 10px 0" }}
        >
          <Row style={{ width: "100%", flex: 6, maxHeight: "77vh" }}>
            <Col className="chat-messages flex flex-col" span={24}>
              {messages.map((message) => {
                return (
                  <div>
                    <div
                      className={`message-tile ${
                        message.fromSelf ? "sended" : "received"
                      }`}
                    >
                      <div className="content">
                        <p>{message.message}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Col>
          </Row>
          <Row style={{ width: "100%", flex: 0.5 }}>
            <Col className="input" style={{ width: "100%" }}>
              <ChatInput handleSendMsg={handleSendMSg} />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Chat;
