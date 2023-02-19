import React, { useState, useEffect } from 'react';
import { Socket } from "socket.io-client";

function Management({ socket }: { socket: Socket }) {
    const [activeUsers, setActiveUsers] = useState({});

    const updateUserList = () => {
        socket.emit("list-users");
    }

    useEffect(() => {
        socket.on("active-users", (data) => {
            setActiveUsers(data)
        });
        socket.emit("list-users");
        console.log("useeffect called")
    }, [socket]);

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
        }}><div>

                <h2>Management <button onClick={updateUserList}>Update users </button> </h2>
                <ul>
                    {Object.keys(activeUsers).map((key: any) => {
                        var id = activeUsers[key as keyof typeof activeUsers]
                        let link = `/management/live/${id}`
                        return <li key={key}><a href={link} target="_blank" rel="noreferrer">user {id}</a></li>
                    })}
                </ul>
            </div>
        </div >
    );
}
export default Management;