import { Container, makeStyles, Typography } from '@material-ui/core';
import 'wired-elements';


const useStyles = makeStyles(() => ({
  title: {
    fontFamily: 'handlee, cursive',
    color: '#FFF388'
  },
  content: {
    background: "#5d4037",
    padding: 10,
    borderRadius: 10,
    height: 800,
    overflowY: 'scroll',
  },
  section: {
    marginTop: 25,
  },
  sectionHeader: {
    fontFamily: 'handlee, cursive',
    color: "#FFF388"
  },
  body: {
    fontFamily: 'handlee, cursive',
    color: "white",
    marginTop: 50,
    marginBottom: 50
  }
}));


const About = () => {
  const classes = useStyles();

  return (
    <div>
      <wired-card elevation="5" fill="#795548" class="board card">
        {/* <Typography variant="h1" className={classes.title}>About</Typography> */}
        <Container className={classes.content}>
          <Container className={classes.section}>
            <Typography variant="h4" className={classes.sectionHeader}>What is BananoTavern?</Typography>          
            <Typography variant="body" className={classes.body}>
              BananoTavern is a place to relax, play some dice-based tavern games,
              and possibly win some bananos! Each game has its own rules so visit each
              game to learn how to play.
            </Typography>
          </Container>
          <Container className={classes.section}>
            <Typography variant="h4" className={classes.sectionHeader}>What is Banano?</Typography>
            <Typography variant="body" className={classes.body}>
              Banano is a cryptocurrency that offers feeless, instant, and potassium-filled
              transactions. It utilizes a DAG (Directed Acyclic Graph) based block
              lettuce&trade; architecture, where each user possesses their own blockchain.
              Learn more at &nbsp;
                <wired-link href="https://www.banano.cc" target="_blank" class="yellow-link">banano.cc.</wired-link>
            </Typography>
          </Container>
          <Container className={classes.section}>
            <Typography variant="h4" className={classes.sectionHeader}>How can I get/use Banano?</Typography>
            <Typography variant="body" className={classes.body}>
              There are numerous ways to get your dose of potassium! The Banano community 
              has developed several faucets (places to get free bananos) and there 
              are a handful of cryptocurrency exchanges to purchase bananos.
              You can read more details here: &nbsp;
                <wired-link href="https://www.banano.how" target="_blank" class="yellow-link">banano.how.</wired-link>
            </Typography>
          </Container>
          <Container className={classes.section}>
            <Typography variant="h4" className={classes.sectionHeader}>How can I trust the results of the dice?</Typography>          
            <Typography variant="body" className={classes.body}>
              BananoTavern utilizes a provably fair algorithm to determine the outcome of 
              the dice. Let's go over some terminology:
              <ul>
                <li>Server seed: A randomized string of characters.</li>
                <li>Server seed hash: A hashed version of the server seed. This will be displayed to the user.</li>
                <li>Client seed: A randomized string of characters that the user can change any time.</li>
                <li>Nonce: The number of games played with a server and client seed combination.</li>
              </ul>
              On your profile page, you can view your current server seed hash, client seed, 
              and nonce combination. If you don't trust the client seed produced for you,
              you can edit it at any time. These items are combined, hashed, and then parsed into the
              results. For a more technical explanation of provable fairness, check out &nbsp;
                <wired-link href="https://courses.csail.mit.edu/6.857/2019/project/2-Cen-Fang-Jaba.pdf" target="_blank" class="yellow-link">
                  this MIT paper.
                </wired-link>
            </Typography>
          </Container>
          <Container className={classes.section}>
            <Typography variant="h4" className={classes.sectionHeader}>Why did you make BananoTavern?</Typography>          
            <Typography variant="body" className={classes.body}>
              BananoTavern started as a project purely to prove to myself I could
              implement a provably fair algorithm combined with a cryptocurrency. Banano
              was an obvious choice for myself considering the instant and feeless transactions and
              lightheartedness of the currency. Then slowly, I thought of more and more
              features I could add and the Tavern snowballed into what it is now.
            </Typography>
          </Container>
          <Container className={classes.section}>
            <Typography variant="h4" className={classes.sectionHeader}>Why can't I wager more than 100 bananos?</Typography>          
            <Typography variant="body" className={classes.body}>
              BananoTavern is meant to be a lighthearted, personal project with a few unique
              games. If you're looking for a more serious potassium-fueled gambling platform,
              I would recommend &nbsp;
                <wired-link href="https://bananobet.com" target="_blank" class="yellow-link">banano.bet.</wired-link>
            </Typography>
          </Container>
          <Container className={classes.section}></Container>

        </Container>
      </wired-card>
    </div>
    
  )
}


export default About;
