/** @format */

import { socketConstants } from "../constants/socketCOnstants";

import io from "socket.io-client";

export function connectToSocket() {
  return (dispatch, getState) => {
    new Promise((resolve, reject) => {
      if (localStorage.getItem("user")) {
        const socket = io("18.193.120.101:9000", {
          query: {
            token: JSON.parse(localStorage.getItem("user")).token,
            profile: getState().auth.currentProfile
              ? getState().auth.currentProfile
              : 138,
          },
          transports: ["websocket"],
          jsonp: false,
          forceNew: true,
        });

        socket.on("connect", () => {
          resolve(socket);
        });

        socket.on("newMessage", (data) => {
          console.log(data);
        });
      }
    }).then((socket) => {
      dispatch({ type: socketConstants.CONNECT, payload: socket });
    });
  };
}
