import io from "socket.io-client";

export const socketService = {
  connect,
};

function connect() {
  return new Promise((resolve, reject) => {
    const socket = io("127.0.0.1:8000", {
      query: { token: JSON.parse(localStorage.getItem("user")).token },
    });
    socket.on("connect", () => {
      resolve(socket);
    });
  });
}
