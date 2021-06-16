import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Container, makeStyles, Typography, CircularProgress } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { getUserGames, getUserSeeds } from '../utils/db';
import SeedGrid from '../components/SeedGrid';
import GamesListTab from '../components/GamesListTab';
import DepositTab from '../components/DepositTab';
import WithdrawTab from '../components/WithdrawTab';

import 'wired-elements';


const useStyles = makeStyles((theme) => ({
  root: {
    background: "#5d4037",
    [theme.breakpoints.up('xs')]: {
      width: 400
    },
    [theme.breakpoints.up('sm')]: {
      width: 400
    },
    [theme.breakpoints.up('md')]: {
      width: 625
    },
    [theme.breakpoints.up('lg')]: {
      width: 1000
    },
    overflowX: "auto",
    padding: 20,
  },
  titleRow: {
    borderRadius: 10,
    background: "#5d4037",
    marginBottom: 10,
    padding: 20,
  },
  title: {
    color: "#FFF388",
    fontFamily: 'handlee, cursive',
    textAlign: 'center'
  },
  tabContainer: {
    alignItems: 'center',
    width: "50%",
  },
  tab: {
    color: "#FFF388",
    fontFamily: 'handlee, cursive',
  }
}));

function a11yProps(index) {
  return {
    id: `profile-tab-${index}`,
    'aria-controls': `profile-tabpanel-${index}`,
  };
}


const Profile = () => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [seeds, setSeeds] = useState(null);
  const [rows, setRows] = useState([]);
  const [tabValue, setTabValue] = useState(0);

  useEffect(async () => {
    if(isLoading) {
      const uid = sessionStorage.getItem('uid');
      const games = await getUserGames(uid);
      setRows(games);
      const dbSeeds = await getUserSeeds(uid);
      // console.log(`seeds: ${dbSeeds}`);
      setSeeds(dbSeeds);
      setIsLoading(false);
    } else {
      // console.log('done loading');
    }
  }, [])

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <wired-card elevation="5" fill="#795548" class="card board">
      {isLoading &&
        <Container>
          <CircularProgress />
        </Container>
      }
      {!isLoading && 
      (<>
        <Container className={classes.titleRow}>
          <Typography variant="h2" className={classes.title}>Profile</Typography>
        </Container>
        <Container className={classes.root}>
            <Tabs
              variant="scrollable" 
              value={tabValue}
              onChange={handleTabChange}
              aria-label="profile tabs"
              TabIndicatorProps={{ style: { backgroundColor: "#00e676" }}}>
              <Tab label="Games" className={classes.tab} {...a11yProps(0)} />
              <Tab label="Seeds" className={classes.tab} {...a11yProps(1)} />
              <Tab label="Deposit" className={classes.tab} {...a11yProps(2)} />
              <Tab label="Withdraw" className={classes.tab} {...a11yProps(3)} />
            </Tabs>
          <GamesListTab tabValue={tabValue} tabIndex={0} rows={rows} />
          <SeedGrid tabValue={tabValue} tabIndex={1} seeds={seeds} />
          <DepositTab tabValue={tabValue} tabIndex={2} />
          <WithdrawTab tabValue={tabValue} tabIndex={3} />
        </Container>
        </>)
      }
      
    </wired-card>
  )
}

export default Profile;