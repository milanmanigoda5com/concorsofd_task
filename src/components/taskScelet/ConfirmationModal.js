import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteCertainTask } from "../../features/taskSlice";
const ConfirmationModal = ({ isOpen, handleClose, taskInfo }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 200,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const dispatch = useDispatch();
  const handleDeleteChanges = () => {
    dispatch(deleteCertainTask(taskInfo));
    handleClose();
  };

  return (
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
          <hr />
          DA LI ZELIS STVARNO DA IZBRISES TASK POD NAZIVOM{" "}
          <b>{taskInfo?.name}</b> ON PRIPADA GRUPI{" "}
          <b>{taskInfo?.parentGroup?.selectedGroup}</b> IZBRISACES GA TRAJNO AKO
          KLIKNES NA <b>DELETE TASK!</b>
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 5 }}></Typography>
        <div className="mt-4">
          <Button variant="contained" onClick={handleDeleteChanges}>
            DELETE TASK
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

ConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  taskInfo: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

export default ConfirmationModal;
