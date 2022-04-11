import { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import "./task.css"


function Task({ taskName, projectName, isBillable, deleteHandler, id, userId }) {
  
  const { user, loginUser } = useContext(UserContext);
  useEffect(() => {
    const temp = JSON.parse(sessionStorage.getItem("username"));
    if (temp) {
      loginUser(user);
    }
  }, []);
    return (
      <div className="task">
        <div className="task_details">
          <p className="task_title">{taskName}</p>
          <div className="project_map">
            {isBillable ? (
              <img
                className="dollar_symbol"
                src="https://img.icons8.com/external-outline-juicy-fish/60/000000/external-dollar-banking-outline-outline-juicy-fish.png"
              />
            ) : (
              false
            )}
            <p className="project_title">{projectName}</p>
          </div>
        </div>

        {user != undefined && userId == user.userid ? (
          <div className="delete_task">
            <img
              onClick={() => {
                deleteHandler(id);
              }}
              className="delete_button"
              src="https://img.icons8.com/external-bartama-outline-32-bartama-graphic/320/000000/external-bin-e-mail-bartama-outline-32-bartama-graphic.png"
            />
          </div>
        ) : null}
      </div>
    );
}

export {Task}