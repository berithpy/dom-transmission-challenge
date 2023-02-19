import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import { io } from "socket.io-client";

import Tetris from "./tetris";
import Management from "./management";
import LiveTetris from "./liveTetris"

const socket = io("ws://localhost:8888");

export default function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Tetris socket={socket} />} />
                <Route path="/management" element={<Management socket={socket} />} />
                <Route path="/management/live/:sessionId" element={<LiveTetris socket={socket} />} />
            </Routes>
        </div>
    );
}


