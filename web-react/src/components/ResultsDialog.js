import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { Row, Col } from 'react-bootstrap'
import Die from '../components/Die.js';
import { DialogActions, DialogContentText } from '@material-ui/core';

import 'wired-elements';


function ResultsDialog(props) {
  const { onClose, result, open, guess, values } = props;
  const dice = []

  var key = 0;
  for(var [_, i] of values.entries()) {
    dice.push(<Col><Die value={i} key={key} /></Col>);
    key = key + 1;
  }

  const handleClose = () => {
    onClose();
  }

  return (
    <Dialog aria-labelledby="results-dialog-title" open={open} disableBackdropClick={true}
            maxWidth="xs" fullWidth={true}>
      <DialogTitle id="results-dialog-title">{result}</DialogTitle>
      <DialogContent>
        <Row>
          <DialogContentText>
            You wagered the roll would be {guess} 7.
          </DialogContentText>
        </Row>
        <Row>
          {dice}
        </Row>
      </DialogContent>
      <DialogActions>
        <wired-button id="id-play-again" onClick={handleClose}>Play again?</wired-button>
      </DialogActions>
    </Dialog>
  )
}

export default ResultsDialog;
