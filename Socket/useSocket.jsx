import { useEffect, useState } from "react";
import io from "socket.io-client";
import Api from "../Api";
import { useData } from "../Context/Contexter";

const useSocket = () => {
  const [socket, setSocket] = useState(null);
  const { user } = useData();
  useEffect(() => {
    const newSocket = io(Api, { query: { userId: user._id } });
    setSocket(newSocket);

    newSocket.on("connect", () => {
      // console.log("socket connected");
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return socket;
};

export default useSocket;
