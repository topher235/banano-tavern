import { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core';
import ErrorDialog from './ErrorDialog';

import { updateUserData } from '../utils/db';
import { generateSeeds } from '../utils/game';

import 'wired-elements';


const useStyles = makeStyles(() => ({
  gridContainer: {
    marginTop: 50
  },
  rowContainer: {
    marginBottom: 10,
    alignItems: 'center',
    width: '66%',
    justifyContent: 'flex-end'
  },
  inputLabel: {
    color: "#FFF388",
    fontFamily: 'handlee',
    justifyContent: 'right',
    marginRight: 25
  },
  whiteText: {
    color: 'white'
  }
}));


const SeedGrid = (props) => {
  var { tabValue, tabIndex } = props;
  const classes = useStyles();
  const [newClientSeed, setNewClientSeed] = useState(null);
  const [canSave, setCanSave] = useState(false);
  const [seedDisplay, setSeedDisplay] = useState({...props.seeds});
  const [seedError, setSeedError] = useState(null);
  const [error, setError] = useState(null);

  const handleClientSeedChange = (event) => {
    if(event.target.value.length < 6) {
      setSeedError("Client seed cannot be less than 6 characters.");
      // setCanSave(false);
    } else if(event.target.value.length > 16) {
      setSeedError("Client seed cannot have more than 16 characters.");
      // setCanSave(false);
    } else {
      setSeedError(null);
      setNewClientSeed(event.target.value);
      setCanSave(true);
    }
  }

  const handleSaveClientSeed = () => {
    const uid = sessionStorage.getItem('uid');
    updateUserData(uid, { clientSeed: newClientSeed })
    setCanSave(false);
  }

  const handleGenerateSeeds = async () => {
    const uid = sessionStorage.getItem('uid');
    const s = generateSeeds(uid);
    try {
      const userData = {
        serverSeed: s.server,
        serverSeedHash: s.serverHash,
        clientSeed: s.client,
        nonce: 0
      }
      await updateUserData(uid, userData);
      setSeedDisplay(userData);
    } catch(err) {
      console.error(err);
      setError({ title: 'Error', msg: 'There was a problem generating a new seed combination.' })
    }
    
  }

  return (
    <div
      role="tabpanel"
      hidden={tabValue !== tabIndex}
      id={`profile-tabpanel-${tabIndex}`}
      aria-labelledby={`profile-tab=${tabIndex}`}>
      <Grid container direction="column" className={classes.gridContainer}>
        <Grid container direction="row" className={classes.rowContainer}>
          <Grid item className={classes.inputLabel}>Server Seed hash</Grid>
          <Grid item>
            <TextField
              variant="filled" 
              value={seedDisplay != null ? seedDisplay.serverSeedHash : ""} 
              InputProps={{ readOnly: true, className: classes.whiteText }} />
          </Grid>
        </Grid>
        <Grid container direction="row" className={classes.rowContainer}>
          <Grid item className={classes.inputLabel}>Client Seed</Grid>
          <Grid item>
            <TextField
              variant="filled"
              value={newClientSeed != null ? newClientSeed : seedDisplay.clientSeed}
              onChange={handleClientSeedChange}
              error={seedError != null && seedError.length > 0}
              helperText={seedError}
              InputProps={{ className: classes.whiteText }} />
          </Grid>
        </Grid>
        <Grid container direction="row" className={classes.rowContainer}>
          <Grid item className={classes.inputLabel}>Nonce</Grid>
          <Grid item>
            <TextField 
              variant="filled" 
              value={seedDisplay != null ? seedDisplay.nonce : ""} 
              InputProps={{ readOnly: true, className: classes.whiteText }} />
          </Grid>
        </Grid>
        <Grid container direction="row" className={classes.rowContainer}>
        {canSave && (
            <Grid item>
              <wired-button onClick={handleSaveClientSeed} class="green-btn">Save</wired-button>
            </Grid>
          )}
        </Grid>
        <Grid container direction="row" className={classes.rowContainer}>
          <Grid item>
            <wired-button onClick={handleGenerateSeeds} class="yellow-btn">Generate new seeds</wired-button>
          </Grid>
        </Grid>
      </Grid>
      {error && (
        <ErrorDialog
          title={error.title}
          open={true}
          onClose={() => setError(null)}
          error={error.msg}
        />
      )}
    </div>
  )
}

export default SeedGrid;
