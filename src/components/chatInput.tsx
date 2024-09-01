import React from "react";
import { useState } from "react";
import { SendOutlined, SmileOutlined } from "@ant-design/icons";
import Picker from "emoji-picker-react";

interface ChatInputProps {
    handleSendMsg: (msg: string) => void;
  }
const ChatInput: React.FC<ChatInputProps> = ({handleSendMsg}) => {
  const [showEmojis, setShowEmojis] = useState(false);
  const [msg, setMsg] = useState("");
  const handleEmojisvisibility = () => {
    setShowEmojis(!showEmojis);
  };
  const handleEmojiClick = (emoji: { emoji: string }) => {
    let message = msg;
    message += emoji.emoji;
    setMsg(message);
  };
  const sendMsg = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };
  return (
    <div className="input-container">
      <form onSubmit={(e) => sendMsg(e)} style={{ display: "flex" }}>
        <div
          className="emoji"
          style={{ display: "flex", flex: "0.5", justifyContent: "center" }}
          onClick={handleEmojisvisibility}
        >
          <SmileOutlined style={{fontSize:'18px'}}/>
          {showEmojis && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
        <div style={{ flex: "10" }}>
          <input
            type="text"
            placeholder="Type a message"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
        </div>
        <button type="submit" style={{ flex: "0.5" }}>
          <SendOutlined style={{fontSize:'18px', padding:'2px 0 0 5px'}}/>
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
