import React from "react";

const Input = ({ message, setMessage, sendMessage }) => {
  return (
    <form onSubmit={sendMessage} className="form">
      <input
        type="text"
        className="input"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(event) =>
          event.key === "Enter" ? sendMessage(event) : null
        }
      />
      <button className="sendButton">Send Message</button>
    </form>
  );
};

export default Input;
