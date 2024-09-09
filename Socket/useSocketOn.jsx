import { useEffect } from "react";
import useSocket from "./useSocket";
const useSocketOn = (socket, eventName, callback) => {
  useSocket();
  useEffect(() => {
    if (socket) {
      socket.on(eventName, callback);

      // Clean up the listener
      return () => {
        socket.off(eventName, callback);
      };
    }
  }, [socket, eventName, callback]);
};

export default useSocketOn;
