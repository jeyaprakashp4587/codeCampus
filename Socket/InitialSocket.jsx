import { useEffect, useState } from "react";
import io from "socket.io-client";
import Api from "../Api";

const useSocket = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(Api);
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("socket connected");
    });

    // Cleanup on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return socket;
};

export default useSocket;
