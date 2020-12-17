/** @format */

import { socketConstants } from "../constants/socketCOnstants";

import io from "socket.io-client";

export function connectToSocket() {
  return (dispatch) => {
    new Promise((resolve, reject) => {
      const socket = io("127.0.0.1:7000", {
        query: {
          token: JSON.parse(localStorage.getItem("user")).token,
          profile: JSON.parse(localStorage.getItem("profiles"))[1].profile.id,
        },
        transports: ["websocket"],
        jsonp: false,
        forceNew: true,
      });
      socket.on("connect", () => {
        resolve(socket);
      });
    })
      .then((socket) => {
        dispatch({ type: socketConstants.CONNECT, payload: socket });
        socket.on("newMessage", (data) => {
          alert(data);
        });
      })
      .catch((err) => console.log(alert(err)));
  };
}
