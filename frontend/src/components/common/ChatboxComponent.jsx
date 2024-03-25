import { Chatbox, Session } from "@talkjs/react";

function ChatboxComponent({ userId }) {
  return (
    <Session appId="tpApudnM" userId={userId}>
      <Chatbox
        conversationId="sample_conversation"
        style={{ width: "100%", height: "90%" }}
      ></Chatbox>
    </Session>
  );
}
// sample_user_alice - resident
//sample_user_sebastian - caretaker

export default ChatboxComponent;
