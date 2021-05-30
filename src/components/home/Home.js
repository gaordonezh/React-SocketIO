import React, { useContext, useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { UserContext } from "../../UserContext";
import RoomList from "./RoomList";
import io from "socket.io-client";
let socket;

const Home = () => {
  const ENDPT = "localhost:5000";
  const { user, setUser } = useContext(UserContext);
  const [room, setRoom] = useState("");
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    socket = io(ENDPT);
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPT]);

  useEffect(() => {
    socket.on("room-created", (room) => {
      setRooms([...rooms, room]);
    });
  }, [rooms]);

  useEffect(() => {
    socket.on("output-rooms", (rooms) => {
      setRooms(rooms);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("create-room", room);
    console.log(room);
    setRoom("");
  };

  if (!user) {
    return <Redirect to="login" />;
  }

  return (
    <div style={{ textAlign: "center" }}>
      <div className="row">
        <div className="col s12 m6">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">Welcome {user && user.name}</span>
              <div className="row">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        id="room"
                        placeholder="Enter a room name"
                        type="text"
                        className="validate"
                        value={room}
                        onChange={(e) => setRoom(e.target.value)}
                      />
                      <label htmlFor="room">ROOM</label>
                    </div>
                  </div>
                  <button className="btn" type="submit">
                    Create room
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="col s12 m6">
          <RoomList rooms={rooms} />
        </div>
      </div>
    </div>
  );
};

export default Home;
