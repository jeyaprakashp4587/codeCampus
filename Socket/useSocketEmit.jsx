const useSocketEmit = (socket) => {
  const emitEvent = (eventName, data) => {
    if (socket) {
      socket.emit(eventName, data);
    }
  };

  return emitEvent;
};

export default useSocketEmit;
