import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Tetris from "react-tetris";
import StreamDOM from "./streamDOM";
import { Socket } from "socket.io-client";

// randomly generate a user ID every time you join the room
const SESSION_ID = uuidv4();

function TetrisApp({ socket }: { socket: Socket }) {
  // initializes streamDOM on component load
  useEffect(() => {
    StreamDOM.init({ sessionId: SESSION_ID, socket: socket });
  }, [socket, SESSION_ID]);
  return (
    <div className="main-app">
      <Tetris>
        {({ Gameboard, points, linesCleared, state, controller }) => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div>
              <p>Points: {points}</p>
              <p>Lines Cleared: {linesCleared}</p>
            </div>
            <Gameboard />
            {state === "LOST" && (
              <div>
                <h2>Game Over</h2>
                <button onClick={controller.restart}>New game</button>
              </div>
            )}
          </div>
        )}
      </Tetris>
    </div>
  );
}

export default TetrisApp;
