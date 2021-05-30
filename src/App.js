import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import Chat from "./components/chat/Chat";
import Home from "./components/home/Home";
import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import "./assets/Message.css";
import "./assets/Input.css";
import "./assets/Chat.css";
import "./assets/Messages.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    verifyuser();
  }, []);

  const verifyuser = async () => {
    try {
      const res = await fetch("https://back-socketio.herokuapp.com/verifyuser", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/chat/:room_id/:room_name" component={Chat} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={Login} />
        </Switch>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
