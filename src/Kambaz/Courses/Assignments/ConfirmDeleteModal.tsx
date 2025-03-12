import { Modal, Button } from "react-bootstrap";

export default function ConfirmDeleteModal({
  show,
  handleClose,
  dialogTitle,
  onConfirm,
}: {
  show: boolean;
  handleClose: () => void;
  dialogTitle: string;
  onConfirm: () => void;
}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{dialogTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            onConfirm();
            handleClose();
          }}
        >
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
