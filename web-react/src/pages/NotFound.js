import Typography from '@material-ui/core/Typography';
import { Container, makeStyles } from '@material-ui/core';

import 'wired-elements';

import tree_left from '../img/tree_left.png';
import tree_right from '../img/tree_right.png';


const useStyles = makeStyles(() => ({
  header: {
    color: "#FFF388",
    fontFamily: 'handlee, cursive',
  },
  content: {
    background: "#5d4037",
    padding: 10,
    borderRadius: 10,
    width: "100%"
  },
  body: {
    color: "white",
    fontFamily: 'handlee, cursive',
    marginTop: 20,
  },
  images: {
    marginTop: 50
  }
}));

const NotFound = () => {
  const classes = useStyles();

  return (
    <wired-card elevation="5" fill="#795548" class="card board">
      <Container className={classes.content}>
        <Typography variant="h2" className={classes.header}>Not found!</Typography>
        <Typography variant="body" className={classes.body}>
          We couldn't find the page you requested. While you're here, maybe relax
          with these trees :)
        </Typography>
        <Container className={classes.images}>
          <img src={tree_left} />
          <img src={tree_right} />
        </Container>
      </Container>
    </wired-card>
  )
}

export default NotFound;
