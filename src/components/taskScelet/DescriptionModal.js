import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewChanges,
  deleteCertainTask,
  selectTasks,
} from "../../features/taskSlice";
import ConfirmationModal from "./ConfirmationModal";

const DescriptionModal = ({ isOpen, handleClose, taskInfo }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [title, setTitle] = useState(`${taskInfo?.name}` ?? taskInfo.name);
  const [description, setDescription] = useState(taskInfo?.description ?? "");
  const selectTasksState = useSelector(selectTasks);
  const dispatch = useDispatch();

  const handleSaveChanges = () => {
    const newChanges = { ...taskInfo, name: title, description: description };
    const pasteNewChanges = selectTasksState.map((task) => {
      if (task.id === newChanges.id) {
        task = newChanges;
      }
      return task;
    });

    dispatch(addNewChanges(pasteNewChanges));
    // npr da imamo neki network poziv za brisanje handleClose bi pozvali nakon uspjesnog brisanja iz baze podataka
    // jer da se modal zatvori samo ako je uspjesna akcija
    handleClose();
    // dispecuj akciju i zatvori modal
  };

  const handleDeleteChanges = () => {
    setOpenConfirmationModal(true);
  };

  const handleCloseConfirmationModal = () => {
    handleClose();
    setOpenConfirmationModal(false);
  };
  return (
    <>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        slots={{ backdrop: Backdrop }}
        keepMounted
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {taskInfo?.parentGroup?.selectedGroup}
            <Button onClick={handleDeleteChanges}>
              <DeleteIcon />
            </Button>
            <hr />

            <TextField
              id="outlined-basic"
              value={title}
              onChange={(title) => {
                setTitle(title.target.value);
              }}
              variant="standard"
            />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 5 }}>
            <TextField
              id="outlined-basic"
              value={description}
              onChange={(title) => {
                setDescription(title.target.value);
              }}
              placeholder="Unesi description"
              variant="standard"
            />
          </Typography>
          <div className="mt-4">
            <Button variant="contained" onClick={handleSaveChanges}>
              Save changes
            </Button>
          </div>
        </Box>
      </Modal>
      {openConfirmationModal ? (
        <ConfirmationModal
          isOpen={openConfirmationModal}
          taskInfo={taskInfo}
          handleClose={handleCloseConfirmationModal}
        />
      ) : null}
    </>
  );
};
DescriptionModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  taskInfo: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

export default DescriptionModal;
