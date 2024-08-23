import React from "react";
import { Row, Col } from "antd";
import Contacts from "@/components/contacts";
const Chat = () => {
  return (
    <div>
      <Row style={{ maxHeight: "100vh", padding:'20px'}}>
        <Col span={6} style={{ backgroundColor: "#111b21", border:'1px solid #666', borderTopLeftRadius:'10px', borderBottomLeftRadius:'10px'}}>
          <Contacts />
        </Col>
        <Col span={18} style={{ backgroundColor: "#202c33", border:'1px solid #666', borderTopRightRadius:'10px',borderBottomRightRadius:'10px' }}>
          Hello
        </Col>
      </Row>
    </div>
  );
};

export default Chat;
