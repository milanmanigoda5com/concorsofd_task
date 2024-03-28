import {
  Box,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  List,
  TextField,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { addTask, selectTasks } from "../../features/taskSlice";
import PropTypes from "prop-types";
import { CheckBox } from "@mui/icons-material";
import DescriptionModal from "./DescriptionModal";

const TaskList = (clickedGroup) => {
  const dispatch = useDispatch();
  const selectTasksState = useSelector(selectTasks);
  const [groupInputText, setGroupInputText] = useState("");
  const [filteredTasksPerGroup, setFilteredTasksPerGroup] = useState();
  const [isClickedTask, setIsClickedTask] = useState(false);
  const [taskValue, setTaskValue] = useState();
  const handleCloseModal = () => {
    setIsClickedTask(false);
  };

  const filterTaskByParentGroup = useCallback(() => {
    const copyOfTasksState = [...selectTasksState].filter(
      (task) => task.parentGroup.selectedGroup === clickedGroup.selectedGroup
    );
    setFilteredTasksPerGroup(copyOfTasksState);
  }, [clickedGroup, selectTasksState]);

  useEffect(() => {
    filterTaskByParentGroup();
  }, [filterTaskByParentGroup]);

  return (
    <div>
      <List
        sx={{ width: "200%", maxWidth: 360, bgcolor: "gray" }}
        aria-label="contacts"
      >
        <span style={{ color: "white" }}>
          Tasks - {clickedGroup.selectedGroup}
        </span>
        <hr />
        {filteredTasksPerGroup?.map((item) => (
          <div key={item.id}>
            <FormControlLabel
              onClick={(taskClick) => {
                console.log(item, "otvori modal");
                setIsClickedTask(true);
                setTaskValue(item);
              }}
              control={<CheckBox defaultChecked />}
              label={item.name}
            />

            <br />
          </div>
        ))}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            "& > :not(style)": { m: 1 },
          }}
        >
          <TextField
            id="demo-helper-text-misaligned-no-helper"
            onChange={(name) => {
              setGroupInputText(name.target.value);
            }}
            placeholder="Add task name.."
            value={groupInputText}
            style={{ backgroundColor: "white" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AddBoxIcon
                    onClick={(clickOnIcon) => {
                      // dispecuj akciju
                      // ocisti input box
                      dispatch(
                        addTask({
                          id: Math.random(),
                          name: groupInputText,
                          parentGroup: clickedGroup,
                        })
                      );
                      setGroupInputText("");
                    }}
                  />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </List>
      {isClickedTask ? (
        <DescriptionModal
          isOpen={isClickedTask}
          handleClose={handleCloseModal}
          taskInfo={taskValue}
        />
      ) : null}
    </div>
  );
};

TaskList.propTypes = {
  selectedGroup: PropTypes.string,
};

export default TaskList;
