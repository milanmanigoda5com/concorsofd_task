import Groups from "./taskScelet/Groups";
import TaskList from "./taskScelet/TaskList";
import "bootstrap/dist/css/bootstrap.min.css";

const MainPage = () => {
  return (
    <div className="">
      {/* <div style={{ backgroundColor: "red" }}> TASKS</div> */}

      {/* <div className="d-flex justify-content-center align-items-center">
        <TaskList />
      </div> */}
      <div className="py-5">
        <Groups />
      </div>
    </div>
  );
};

export default MainPage;
