import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { Row, Col } from 'react-bootstrap'
import { DialogActions, DialogContentText, makeStyles } from '@material-ui/core';

import 'wired-elements';


function ErrorDialog(props) {
  const { title, onClose, open, error } = props;

  const handleClose = () => {
    onClose();
  }

  return (
    <Dialog aria-labelledby="error-dialog-title" open={open} disableBackdropClick={true}
            maxWidth="xs" fullWidth={true}>
      <DialogTitle id="error-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <Row>
          <DialogContentText>
            {error}
          </DialogContentText>
        </Row>
      </DialogContent>
      <DialogActions>
        <wired-button id="id-close-dialog" onClick={handleClose}>Close</wired-button>
      </DialogActions>
    </Dialog>
  )
}

export default ErrorDialog;
