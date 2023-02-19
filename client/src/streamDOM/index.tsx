import { record } from "rrweb";
import { io, Socket } from "socket.io-client";
// create the StreamDOM class
class StreamDOMClass {
  init = ({ sessionId, socket }: { sessionId: string, socket: Socket }) => {
    // console.log("StreamDOM init");
    // console.log("SESSION_ID", sessionId);

    // Sets the current socket connection to send the messages
    // to the session domain
    socket.emit("new-user", sessionId);
    record({
      emit(event) {
        socket.emit("send-event", { event: event, session: sessionId });
      },
      // This is required for users to join in the middle of a "live" recording
      // every 10 events it will send a full snapshot, can be tweaked
      checkoutEveryNth: 10,
    });
  };
}
export default new StreamDOMClass();
