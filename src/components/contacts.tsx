import React from "react";
import { Row, Col } from "antd";
import Image from "next/image";
import Logo from "../../public/Logo.jpg";
import "@/app/style.css";
const Contacts = () => {
  return (
    <div className="contacts-container">
      <Row className="p-5">
        <div className="flex items-center gap-2.5">
          <Image
            src={Logo}
            alt=""
            width={40}
            style={{ borderRadius: "30px" }}
          />
          <h1 className="text-2xl font-bold">Chats</h1>
        </div>
      </Row>
      <hr style={{ borderColor: "#666" }} />
      <Row
        className="px-4"
        style={{ height: "68vh", overflow: "auto", backgroundColor: "#111b21" }}
      >
        <Col style={{  width:'100%' }}>
          <div
            className="contact-card flex items-center gap-4 px-4 py-10"
            style={{ maxHeight: "80px", width:'100%', borderBottom:'1px solid #666'}}
          >
            <Image
              src={Logo}
              alt=""
              width={40}
              style={{ borderRadius: "30px" }}
            />
            <h1 style={{fontSize:'20px'}}>Server 1</h1>
          </div>
          <div
            className="contact-card flex items-center gap-4 px-4 py-10"
            style={{ maxHeight: "80px", width:'100%', borderBottom:'1px solid #666'}}
          >
            <Image
              src={Logo}
              alt=""
              width={40}
              style={{ borderRadius: "30px" }}
            />
            <h1 style={{fontSize:'20px'}}>Server 2</h1>
          </div>
        </Col>
      </Row>
      <hr style={{ borderColor: "#666" }} />
      <Row
        className="p-5"
        style={{
          height: "15vh",
          backgroundColor: "#202c33",
          borderBottomLeftRadius: "10px",
        }}
      >
        sdc
      </Row>
    </div>
  );
};

export default Contacts;
