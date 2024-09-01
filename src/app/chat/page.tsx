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
import { io, Socket } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

type Message = {
  fromSelf: boolean;
  message: string;
};
type ArrivalMessage = {
  fromSelf: boolean;
  message: string;
} | null;
const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [arrivalMessage, setArrivalMessage] = useState<ArrivalMessage>(null);
  const SERVER_ID = "66d1b09431a24fcdfad58911";
  const router = useRouter();
  const socket = useRef<Socket | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) router.push("/");
  }, [router]);
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, [socket]);
  useEffect(() => {
    const userData = localStorage.getItem("chat-app-user");
    if (userData) {
      const user = JSON.parse(userData);
      const userId = user._id;
      socket.current = io(HOST);
      socket.current.emit("add-user", userId);
    }
  });
  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
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
      const response2 = await axios.post(SEND_MSG, {
        from: userId,
        to: SERVER_ID,
        message: msg,
      });
      socket.current?.emit("send-msg", {
        from: userId,
        to: SERVER_ID,
        message: msg,
      });
      socket.current?.emit("send-msg", {
        from: SERVER_ID,
        to: userId,
        message: msg,
      });
      const msgs = [...messages];
      msgs.push({ fromSelf: true, message: msg });
      setMessages(msgs);

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
          <Row style={{ width: "100%", flex: 6, maxHeight: "75vh" }}>
            <Col className="chat-messages flex flex-col" span={24}>
              {messages.map((message) => {
                return (
                  <div ref={scrollRef} key={uuidv4()}>
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
