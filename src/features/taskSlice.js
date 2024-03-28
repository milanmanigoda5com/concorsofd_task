import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  groups: [],
  taskList: [],
  selectedGroup: "",
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addGroups: (state, action) => {
      state.groups.push(action.payload);
    },
    addTask: (state, action) => {
      state.taskList.push(action.payload);
    },
    setSelectedGroup: (state, action) => {
      state.selectedGroup = action.payload;
    },

    addNewChanges: (state, action) => {
      state.taskList = action.payload;
    },
    deleteCertainTask: (state, action) => {
      state.taskList = state.taskList.filter(
        (task) => task.id !== action.payload.id
      );
    },
  },
});

export const {
  addGroups,
  addTask,
  setSelectedGroup,
  addNewChanges,
  deleteCertainTask,
} = taskSlice.actions;

export const selectGroups = (state) => state.tasks.groups;
export const selectTasks = (state) => state.tasks.taskList;
export const selectedGroup = (state) => state.tasks.selectedGroup;

export default taskSlice.reducer;
