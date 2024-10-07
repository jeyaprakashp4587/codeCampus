const useSocketEmit = (socket, eventName, data) => {
  if (socket) {
    socket.emit(eventName, data);
  }
};

export default useSocketEmit;
