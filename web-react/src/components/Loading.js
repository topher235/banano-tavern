import { CircularProgress, makeStyles } from '@material-ui/core';
import { Container } from 'react-bootstrap';
import 'wired-elements';


const useStyles = makeStyles(() => ({
  spinner: {
    color: '#00e676'
  }
}));


const Loading = () => {
  const classes = useStyles();

  return (
    <>
      <wired-card elevation="5" fill="#795548" class="card board">
        <Container>
          <CircularProgress className={classes.spinner} />
        </Container>
      </wired-card>
    </>
  )
}

export default Loading;
