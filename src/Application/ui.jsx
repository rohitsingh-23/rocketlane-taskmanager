import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Task } from "./task";
import "./ui.css";
import { useChannel, useEvent } from "@harelpls/use-pusher";
import {v4 as uuid} from "uuid"
import { Login } from "./login";
import { UserContext } from "../context/userContext";

function Ui() {
  const { user, loginUser } = useContext(UserContext)
  const [activity, setActivity] = useState({
    id: uuid(),
    taskName: "",
    projectName: "",
    isBillable: false,
    userId: user.userid,
  });
  useEffect(() => {
     getData();
    const temp = JSON.parse(sessionStorage.getItem("username"))
    if (temp) {
      loginUser(temp);
    }
    
  }, []);
  
  let [data, setData] = useState([]);
  

  const channel = useChannel("check-channel");
  useEvent(channel, "check-event", (data) => {
    setData((prev) => [...prev, { ...data }])
    scroll()
  }
  );

  function getData() {
    axios
      .get("https://my-json-server.typicode.com/karthick03/json-db-data/tasks")
      .then((res) => {
        setData(res.data);
      });
  }

  const changeHandler = (e) => {
    let name = e.target.name;
    if (name == "isBillable") {
      setActivity({ ...activity, [name]: e.target.checked });
    } else {
      setActivity({ ...activity, [name]: e.target.value });
    }
  };
  
  const deleteHandler = (id) => {
    /* Since data is not posting to the api items cannot be delete with that id */
    
    // axios.delete(
    //   `https://my-json-server.typicode.com/karthick03/json-db-data/tasks/${id}`
    // ).then((res) => {
    //   data = data.filter((e) => {
    //     if (e.id !== id) {
    //       return e;
    //     }
    //   });
    //   // console.log(data)
    //   setData(data);
    // })
    //   .catch(err => {
    //   alert("You are not auhthorized to delete this.")
    //   })
     data = data.filter((e) => {
       if (e.id !== id) {
         return e;
       }
     });
     // console.log(data)
     setData(data);
  }

  const addHandler = () => {
    /* Post method is not working as expected */
    // axios.post(
    //   "https://my-json-server.typicode.com/karthick03/json-db-data/tasks" , activity
    // ).then((res) => {
    //   setData([...data, res.data]);
    // })
    if (sessionStorage.getItem("username")) {
      setData([...data, {...activity, userId: user.userid}])
      scroll()
    } else {
      alert("Login First")
    }
    
    setActivity({
      id: uuid(),
      taskName: "",
      projectName: "",
      isBillable: false,
      userId: user.userid,
    });
    
  }

  function scroll() {
    setTimeout(() => {
      let divHeight = document.querySelector(".task_container").clientHeight;
     document.querySelector(".task_container").scrollTo({
       top: divHeight,
       behavior: "smooth",
     })
    }, 0)
  }

  return (
    <div className="main_container">
      <div className="container">
        <div className="container_title">
          <p>Activities</p>
        </div>

        <form>
          <div className="project_div">
            <label className="project_label" htmlFor="project_name">
              <span>*</span>Project name
            </label>
            <input
              className="project_input"
              type="text"
              value={activity.projectName}
              placeholder="Eg. Nike Implementation"
              onChange={changeHandler}
              name="projectName"
            />
          </div>

          <div className="flex_box">
            <div className="task_div">
              <label className="task_label" htmlFor="task_name">
                <span>*</span>Task name
              </label>
              <input
                className="task_input"
                type="text"
                value={activity.taskName}
                placeholder="Eg. kick-off call"
                name="taskName"
                onChange={(e) => {
                  changeHandler(e);
                }}
              />
            </div>
            <div className="billable_div">
              <label className="billable_label" htmlFor="billable">
                Billable
              </label>
              <input
                className="billable_input"
                type="checkbox"
                name="isBillable"
                onChange={(e) => {
                  changeHandler(e);
                }}
                checked={activity.isBillable}
              />
            </div>
          </div>
        </form>
        <h3 className="heading2">Team Tasks</h3>
        <div className="task_container">
          {data.map((e, i) => {
            return <Task deleteHandler={deleteHandler} key={i} {...e} />;
          })}
        </div>
        <div className="buttons_div">
          <button className="cancel_button">Cancel</button>
          <input
            disabled={!activity.projectName.length || !activity.taskName.length}
            className="add_button"
            type="submit"
            onClick={() => {
              addHandler();
            }}
            value="Add activity"
          />
        </div>
      </div>
      <div className="login_container">
        <Login />
      </div>
    </div>
  );
}

export { Ui };
