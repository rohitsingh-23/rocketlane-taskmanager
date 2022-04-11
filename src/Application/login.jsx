import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../context/userContext";
import "./login.css"

function Login() {
  const [text, setText] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const { loginUser } = useContext(UserContext);
    
    useEffect(() => {
        if (sessionStorage.getItem("username")) {
            loginUser(JSON.parse(sessionStorage.getItem("username")))
        }
    }, [])

  const data = [
    { username: "user1",name: "User 1", userid: 1 },
    { username: "user2",name:"User 2", userid: 2 },
    { username: "user3",name:"User 3", userid: 3 },
  ];

  function handelLogin() {
    let newData = data.filter((e) => {
      return e.username == text;
    });
      newData = newData[0];
      
      if (newData) {
        loginUser(newData)
      sessionStorage.setItem("username", JSON.stringify(newData));
      setLoggedIn(!loggedIn);
    } else {
      alert("No user Found");
    }
  }
    function handelLogout() {
        setLoggedIn(!loggedIn);
        sessionStorage.removeItem("username");
        setText("")
        loginUser({})
    }

  return (
    <div>
      {sessionStorage.getItem("username") ? (
        <div className="login_div">
          <p>{JSON.parse(sessionStorage.getItem("username")).name}</p>
          <button
            onClick={() => {
              handelLogout()
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="login_div">
          <input
            type="text"
            placeholder="Enter Username"
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <button
            onClick={() => {
              handelLogin();
            }}
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
}

export { Login };
