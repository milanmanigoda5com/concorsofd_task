import { Box, InputAdornment, List, TextField } from "@mui/material";
import { useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useDispatch, useSelector } from "react-redux";
import {
  addGroups,
  selectGroups,
  selectedGroup,
  setSelectedGroup,
} from "../../features/taskSlice";
import TaskList from "./TaskList";

const ListItem = (item) => {
  const [isClicked, setIsClicked] = useState(false);
  const dispatch = useDispatch();
  const clickedGroup = useSelector(selectedGroup);

  return (
    <p
      onClick={(row) => {
        console.log(row, "ROW");
        // if (row.target.innerText === clickedGroup) {
        //   setIsClicked(true);
        // } else {
        //   setIsClicked(false);
        // }
        setIsClicked(true);

        dispatch(setSelectedGroup(row.target.innerText));
      }}
      style={{ color: isClicked ? "yellow" : "white" }}
      key={item.id}
    >
      {item.item.name}
    </p>
  );
};

const Groups = () => {
  const [groupInputText, setGroupInputText] = useState("");
  const dispatch = useDispatch();
  const selectGroupsState = useSelector(selectGroups);
  const clickedGroup = useSelector(selectedGroup);

  //   const DUMMY_DATA = [
  //     { id: 1, name: "my list" },
  //     { id: 2, name: "newProject" },
  //     { id: 3, name: "ShoppingList" },
  //     { id: 4, name: "mepaslist" },
  //   ];

  return (
    <div>
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "gray" }}
        aria-label="contacts"
      >
        <span style={{ color: "white" }}>GROUPS</span>
        <hr />
        {selectGroupsState?.map((item) => (
          <ListItem item={item} key={item.id} />
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
            placeholder="Add group name.."
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
                        addGroups({ id: Math.random(), name: groupInputText })
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
      <div className="d-flex justify-content-center align-items-center">
        <TaskList selectedGroup={clickedGroup} />
      </div>
    </div>
  );
};

export default Groups;
