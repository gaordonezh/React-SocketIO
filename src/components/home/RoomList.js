import React from "react";
import Room from "./Room";
import { Link } from "react-router-dom";

const RoomList = ({ rooms }) => {
  return (
    <div>
      {rooms &&
        rooms.map((ev) => (
          <Link key={ev._id} to={`/chat/${ev._id}/${ev.name}`}>
            <Room name={ev.name} />
          </Link>
        ))}
    </div>
  );
};

export default RoomList;
