import { Typography, makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FileCopyOutlineIcon from '@material-ui/icons/FileCopy';
import { useEffect, useState } from 'react';

import { getUserBananoAccount } from '../utils/db';


const useStyles = makeStyles(() => ({
  gridContainer: {
    marginTop: 50
  },
  rowContainer: {
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  gridItem: {
    width: '100%',
  },
  inputLabel: {
    color: "#FFF388",
    fontFamily: 'handlee, cursive',
    justifyContent: 'right',
    marginRight: 25
  },
  address: {
    width: '100%',
  },
  whiteText: {
    color: 'white',
  }
}));


const DepositTab = (props) => {
  const { tabValue, tabIndex } = props;
  const classes = useStyles();
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    if(loading) {
      const account = await getUserBananoAccount(sessionStorage.getItem('uid'));
      console.log(`deposit: ${account.bananoAddress}`);
      setAddress(account.bananoAddress);
      setLoading(false);
    }
  }, [])

  const handleCopy = () => {
    var copyText = document.getElementById('id-address-input');
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand('copy');
  }

  return (
    <div
      role="tabpanel"
      hidden={tabValue !== tabIndex}
      id={`profile-tabpanel-${tabIndex}`}
      aria-labelledby={`profile-tab=${tabIndex}`}>
        <Grid container direction="column" className={classes.gridContainer}>
          <Grid container direction="row" className={classes.rowContainer}>
            <Grid item className={classes.inputLabel}>
              <Typography variant="body">Copy the deposit address</Typography>
            </Grid>
          </Grid>
          <Grid container direction="row" className={classes.rowContainer}>
            <Grid item className={classes.gridItem}>
              <TextField
                id="id-address-input"
                variant="filled"
                value={address}
                InputProps={{ readOnly: true, className: classes.whiteText }} 
                className={classes.address} />
            </Grid>
            <Grid item>
              <FileCopyOutlineIcon onClick={handleCopy}/>
            </Grid>
          </Grid>
        </Grid>
    </div>
  )
}

export default DepositTab;
