import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  table: {
    minWidth: 700,
    height: 400,
    minHeight: 200,
    maxHeight: 500,
    overflowY: "scroll",
  },
  tableHeader: {
    color: "#FFF388",
    fontFamily: 'handlee',
  },
  tableData: {
    color: "white"
  },
}))

const GamesListTab = (props) => {
  const { tabValue, tabIndex, rows, seeds } = props;
  const classes = useStyles();

  return (
    <div
      role="tabpanel"
      hidden={tabValue !== tabIndex}
      id={`profile-tabpanel-${tabIndex}`}
      aria-labelledby={`profile-tab=${tabIndex}`}>
      <TableContainer className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {/* <TableCell className={classes.tableHeader}>ID</TableCell> */}
              <TableCell className={classes.tableHeader}>Date</TableCell>
              <TableCell className={classes.tableHeader}>Game Name</TableCell>
              <TableCell className={classes.tableHeader}>Wager</TableCell>
              <TableCell className={classes.tableHeader}>Target</TableCell>
              <TableCell className={classes.tableHeader}>Result</TableCell>
              <TableCell className={classes.tableHeader}>Server Seed</TableCell>
              <TableCell className={classes.tableHeader}>Client Seed</TableCell>
              <TableCell className={classes.tableHeader}>Nonce</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                {/* <TableCell className={classes.tableData}>{row.id}</TableCell> */}
                <TableCell className={classes.tableData}>{new Date(parseInt(row.date)).toLocaleString()}</TableCell>
                <TableCell className={classes.tableData}>{row.gameName}</TableCell>
                <TableCell className={classes.tableData}>{row.bet}</TableCell>
                <TableCell className={classes.tableData}>{row.target}</TableCell>
                <TableCell className={classes.tableData}>{row.result}</TableCell>
                {(row.serverSeed == seeds.serverSeed) && (
                  <Tooltip title="Generate a new seed pair to reveal the server seed." aria-label="server-seed-hash">
                    <TableCell className={classes.tableData}>SHA 512: {row.serverSeedHash}</TableCell>
                  </Tooltip>
                )}
                {(row.serverSeed != seeds.serverSeed) && (
                  <Tooltip title={`SHA 512: ${row.serverSeedHash}`} label="server-seed">
                    <TableCell className={classes.tableData}>{row.serverSeed}</TableCell>
                  </Tooltip>
                )}
                <TableCell className={classes.tableData}>{row.clientSeed}</TableCell>
                <TableCell className={classes.tableData}>{row.nonce}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default GamesListTab;
