import { Typography, Input, makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { useEffect, useState } from 'react';
import ErrorDialog from './ErrorDialog';

import { getUserBananoAccount, getUserSeeds } from '../utils/db';
import { getAccountBalance, withdrawBanano } from '../utils/banano';


const useStyles = makeStyles(() => ({
  gridContainer: {
    marginTop: 50
  },
  rowContainer: {
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnRow: {
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  gridItem: {
    width: '100%',
  },
  inputLabel: {
    color: "#FFF388",
    fontFamily: 'handlee',
    justifyContent: 'right',
    marginRight: 25
  },
  input: {
    fontFamily: 'Handlee',
    width: 42,
    color: 'white'
  },
  address: {
    width: '100%',
  },
  whiteText: {
    color: 'white',
  }
}));

const WithdrawTab = (props) => {
  const { tabValue, tabIndex } = props;
  const classes = useStyles(); 
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState(null);
  const [amount, setAmount] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    if(loading) {
      const account = await getUserBananoAccount(sessionStorage.getItem('uid'));
      setBalance(await getAccountBalance(account.bananoAddress));
      setLoading(false);
    }
  }, [])

  const handleAddressChange = (event) => {
    if(event.target.value.length < 0) {
      setAddressError("The withdraw address cannot be blank.");
    } else if(!event.target.value.startsWith('ban_')) {
      setAddressError("The withdraw address does not look like a Banano address.");
    } else {
      setAddressError(null);
      setAddress(event.target.value);
    }
  }

  const handleAmountChange = (event) => {
    setAmount(event.target.value === '' ? 1 : Number(event.target.value))
  }

  const handleWithdraw = async () => {
    if(amount > balance) {
      setError({title: 'Amount too great', msg: "You can't withdraw more than your account balance."});
      return;
    }
    try {
      const seeds = await getUserBananoAccount(sessionStorage.getItem('uid'));
      await withdrawBanano(seeds.bananoSeed, address, amount);
    } catch(err) {
      setError({title: "Problem withdrawing Banano.", msg: err });
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
            <Grid item>
              <Typography 
                variant="body"
                className={classes.inputLabel}>
                  Enter a Banano address to withdraw to
              </Typography>
            </Grid>
          </Grid>
          <Grid container direction="row" className={classes.rowContainer}>
            <Grid item className={classes.gridItem}>
              <TextField
                className={classes.address}
                variant="filled"
                onChange={handleAddressChange} 
                error={addressError != null && addressError.length > 0}
                helperText={addressError}
                InputProps={{ className: classes.whiteText }} />
            </Grid>
          </Grid>
          <Grid container direction="row" className={classes.rowContainer}>
            <Grid item>
              <Input
                className={classes.input}
                value={amount}
                margin="dense"
                onChange={handleAmountChange}
                inputProps={{
                  step: 1,
                  min: 1,
                  max: balance,
                  type: 'number'
                }} />
            </Grid>
          </Grid>
          <Grid container direction="row" className={classes.btnRow}>
            <Grid item>
              <wired-button id="id-btn-withdraw" onClick={handleWithdraw} class="withdraw-btn">Withdraw</wired-button>
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

export default WithdrawTab;
