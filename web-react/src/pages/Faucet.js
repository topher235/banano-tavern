import { makeStyles, CircularProgress } from '@material-ui/core';
import { useState, useEffect } from 'react';
import 'wired-elements';

import { hasUserClaimedFaucet, claimFaucet } from '../utils/user';


const useStyles = makeStyles({
  titleRow: {
    background: "#5d4037",
    color: "#FFF388",
    padding: 20,
    borderRadius: 10
  },
  btnRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 25
  },
})

const Faucet = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [claimed, setClaimed] = useState(false);

  useEffect(async () => {
    setClaimed(await hasUserClaimedFaucet(sessionStorage.getItem('uid')));
    setLoading(false);
  }, [claimed]);
  

  const handleClaimFaucet = () => {
    try {
      claimFaucet(sessionStorage.getItem('uid'));
      setClaimed(true);
    } catch(err) {
      // console.error(err);
    }
  }

  return (
    <>
    <wired-card elevation="5" fill="#795548" class="card board">
      {loading &&
        <CircularProgress />
      }
      {!loading && 
        <>
          <div className={classes.titleRow}>
            <h2 className="sketch-text" style={{ fontSize: 22 }}>Welcome to the faucet =D</h2>
            {claimed && (
              <h4 className="sketch-text" style={{ fontSize: 18 }}>Looks like you've already claimed bananos from the faucet!</h4>
            )}
            {!claimed && (
              <div className={classes.btnRow}>
                <wired-button type="button" onClick={handleClaimFaucet} class='green-btn' elevation="3">Claim bananos</wired-button>
              </div>
            )}
          </div>
        </>
      }
    </wired-card>
    </>
  )
}


export default Faucet;
