import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { employeeAuth } from "../GlobalData/AuthContext";
import { LoginProps } from "../InterFaces/LoginProps";

export const Login: React.FC<LoginProps> = ({ setCurrentEmployeeid }) => {
  //!NEW! Context API
  const { loggedInEmployee, setLoggedInEmployee } = employeeAuth();

  const navigate = useNavigate();

  const userNameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (userNameRef.current) {
      userNameRef.current.focus();
    }
  }, []);

  const [loginCreds, setLoginCreds] = useState({
    username: "",
    password: "",
  });

  const [loggedIn, setLoggedIn] = useState(false);

  const storeValues = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    setLoginCreds((loginCreds) => ({ ...loginCreds, [name]: value }));
  };

  const login = async () => {
    try {
      const response = await axios.post(
        "http://3.135.216.7:8080/auth/login",
        loginCreds,
        { withCredentials: true }
      );

      //!NEW! Context API
      setLoggedInEmployee(response.data);
      setLoggedIn(true);
      console.log()
    } catch {
      alert("login unsuccessful");
    }
  };

  useEffect(() => {
    if (loggedIn && loggedInEmployee) {
      alert(
        `${loggedInEmployee.username} has logged in, welcome. You are a ${loggedInEmployee.title} employee`
      );
      setCurrentEmployeeid(loggedInEmployee.employeeid);

      if (loggedInEmployee?.title === "manager") {
        navigate("/reimb");
      } else {
        navigate("/basic");
      }
    }
  }, [loggedIn, loggedInEmployee, navigate]);

  return (
    <div className="centered">
      <h1>Log In</h1>

      <TextField
        ref={userNameRef}
        name="username"
        id="outlined-basic"
        label="User Name"
        variant="outlined"
        onChange={storeValues}
      />
      <TextField
        type="password"
        name="password"
        id="outlined-basic"
        label="Password"
        variant="outlined"
        onChange={storeValues}
      />

      <div>
        <Button onClick={login} variant="contained">
          Log In
        </Button>
        <Button onClick={() => navigate("/register")} variant="contained">
          Register
        </Button>
      </div>
    </div>
  );
};