import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';

import 'wired-elements';
import { validateResult } from '../utils/game';


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

const Validator = (props) => {
  const classes = useStyles();
  var { tabValue, tabIndex } = props;
  const [resultComponents, setResultComponents] = useState(null);
  const [result, setResult] = useState(null);

  const handleServerSeedChange = (event) => {
    setResultComponents({ ...resultComponents, serverSeed: event.target.value });
  }

  const handleClientSeedChange = (event) => {
    setResultComponents({ ...resultComponents, clientSeed: event.target.value });
  }

  const handleNonceChange = (event) => {
    setResultComponents({ ...resultComponents, nonce: event.target.value });
  }

  const handleGameNameChange = (event) => {
    setResultComponents({ ...resultComponents, gameName: event.target.value });
  }

  const handleCalculateResult = () => {
    if(resultComponents.gameName == 'over-under') {
      const results = validateResult(resultComponents.serverSeed,
                                     resultComponents.clientSeed,
                                     resultComponents.nonce,
                                     2);
      console.log(results);
      setResult(`${results.join(' + ')} = ${results.reduce((total, curr) => total + curr )}`);
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
            <Grid item className={classes.inputLabel}>Server Seed</Grid>
            <Grid item>
              <TextField
                variant="filled" 
                onChange={handleServerSeedChange}
                InputProps={{ className: classes.whiteText }} />
            </Grid>
          </Grid>
          <Grid container direction="row" className={classes.rowContainer}>
            <Grid item className={classes.inputLabel}>Client Seed</Grid>
            <Grid item>
              <TextField
                variant="filled" 
                onChange={handleClientSeedChange}
                InputProps={{ className: classes.whiteText }} />
            </Grid>
          </Grid>
          <Grid container direction="row" className={classes.rowContainer}>
            <Grid item className={classes.inputLabel}>Nonce</Grid>
            <Grid item>
              <TextField
                variant="filled" 
                onChange={handleNonceChange}
                InputProps={{ className: classes.whiteText }} />
            </Grid>
          </Grid>
          <Grid container direction="row" className={classes.rowContainer}>
            <Grid item className={classes.inputLabel}>Game name</Grid>
            <Grid item>
              <Select onChange={handleGameNameChange}>
                <MenuItem value='over-under'>Over/Under</MenuItem>
              </Select>
            </Grid>
          </Grid>
          <Grid container direction="row" className={classes.rowContainer}>
            <Grid item className={classes.inputLabel}>Result</Grid>
            <Grid item>
              <TextField
                variant="filled"
                value={result}
                InputProps={{ readOnly: true, className: classes.whiteText }} />
            </Grid>
          </Grid>
          <Grid container direction="row" className={classes.rowContainer}>
            <Grid item>
              <wired-button onClick={handleCalculateResult} class="yellow-btn">Calculate dice result using seeds</wired-button>
            </Grid>
          </Grid>
        </Grid>
    </div>
  )
}

export default Validator;
