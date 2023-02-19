import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Socket } from "socket.io-client";
import { Replayer } from "rrweb";

function LiveTetris({ socket }: { socket: Socket }) {
    let { sessionId } = useParams();
    const [latency, setLatency] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const replayer = new Replayer([], {
            liveMode: true,
            // For some reason, enabling the mouseTail kills the replay
            mouseTail: false,
        });
        replayer.startLive();
        socket.emit("join", sessionId);
        // received from user side
        socket.on("user-event", (event) => {
            replayer.addEvent(event);
            if (event.type === 2) {
                setLatency(Date.now() - event.timestamp)
            }
            const height = document.getElementsByClassName('replayer-wrapper');
            if (height) {
                height[0].clientHeight !== 0 && setIsLoading(false);
            }
        });
    }, [sessionId])
    return (
        <div id="root">
            <a href="/management">Back to management</a>
            <h1 style={{ textAlign: "center" }}>Live replay </h1>
            {!isLoading && <h3 style={{ textAlign: "center" }}>Latency {latency}ms</h3>}
            {isLoading && <h3 style={{ textAlign: "center" }}>Loading...</h3>}
        </div >
    );
}
export default LiveTetris;