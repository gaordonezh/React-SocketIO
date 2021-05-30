import React, { useState, useContext } from "react";
import { UserContext } from "../../UserContext";
import { Redirect } from "react-router-dom";

const Login = () => {
  const { user, setUser } = useContext(UserContext);
  const [email, setemail] = useState(null);
  const [password, setpassword] = useState(null);
  const [emailError, setemailError] = useState(null);
  const [passwordError, setpasswordError] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    setemailError(null);
    setpasswordError(null);
    try {
      const res = await fetch("https://back-socketio.herokuapp.com/login", {
        method: "POST", 
        credentials: "include",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.errors) {
        setemailError(data.errors.email);
        setpasswordError(data.errors.password);
      }
      if (data.user) {
        setUser(data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container">
      <h1>LOGIN</h1>
      <div className="row">
        <form className="col s12" onSubmit={submitHandler}>
          <div className="row">
            <div className="input-field col s6">
              <input
                id="email"
                type="email"
                className="validate"
                value={email}
                onChange={(ev) => setemail(ev.target.value)}
              />
              <div className="email error red-text">{emailError}</div>
              <label for="email">Email</label>
            </div>
            <div className="input-field col s6">
              <input
                id="password"
                type="password"
                className="validate"
                value={password}
                onChange={(ev) => setpassword(ev.target.value)}
              />
              <div className="password error red-text">{passwordError}</div>
              <label for="password">Password</label>
            </div>
            <div className="col s12">
              <button className="btn">INICIAR SESIÓN</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
