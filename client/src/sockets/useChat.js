import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";

function useChat(roomId, user_id) {
  const client_socket = useRef(null);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState(null);

  useEffect(() => {
    client_socket.current = io("http://localhost:5000", {
      query: {
        roomId,
      },
    });

    client_socket.current.on("USER_JOIN", (data) => {
      setNewMember(data);
      setMembers([...members, data]);
    });

    client_socket.current.on("NEW_MESSAGE", (message) =>
      setMessages((messages) => [...messages, message])
    );
  }, [roomId]);

  const send = (username) => {
    if (message) {
      client_socket.current.emit("NEW_MESSAGE", {
        value: message,
        user_id: user_id,
        room: roomId,
        username: username,
      });
      setMessage("");
    }
  };

  const user_join = (data) => {
    client_socket.current.emit("USER_JOIN", data);
  };

  return {
    messages,
    setMessages,
    newMember,
    setNewMember,
    members,
    setMembers,
    user_join,
    message,
    setMessage,
    send,
  };
}

export default useChat;
