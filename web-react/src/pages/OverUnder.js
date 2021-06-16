import React, { useState } from 'react';
import ResultsDialog from '../components/ResultsDialog.js';

import { makeStyles } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';

import { Container, Col, Row } from 'react-bootstrap';

import { sendBananoBet } from '../utils/banano.js';
import { getUserBananoAccount } from '../utils/db';
import { getD6ValueFromSeeds, handleGameOver } from '../utils/game';
import rollADie from 'roll-a-die';

import 'wired-elements';
import '../stylesheets/Die.css';


const useStyles = makeStyles(() => ({
  inputRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 25
  },
  radioLabelCol: {
    marginRight: 10,
    fontSize: 18,
    fontFamily: 'Handlee, cursive',
    color: '#FFF388',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  wagerLabelCol: {
    fontSize: 18,
    fontFamily: 'Handlee, cursive',
    color: '#FFF388',
  },
  wagerRow: {
    marginTop: 20
  },
  wagerLabel: {
    color: "#FFF388"
  },
  input: {
    fontFamily: 'Handlee, cursive',
    width: 42
  },
  content: {
    background: "#5d4037",
    padding: 20,
    borderRadius: 10
  }
}));

const OverUnder = () => {

  const [diceValues, setDiceValues] = useState({first: 3, second: 2});
  const [guess, setGuess] = useState('equals');
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(null);
  const [betValue, setBetValue] = useState(10);

  const classes = useStyles();

  function rollDiceLibrary(first, second) {
    // Send input from user (over, under, equal)
      // return {win: true/false, values: [value1, value2]}
    // Call animation
    // Draw pop-up window showing the result with a play again? button
    const gameBoard = document.getElementById('id-game-board');
    const options = {
      element: gameBoard,
      numberOfDice: 2,
      values: [first, second],
      delay: 2000,
      callback: async () => {
        const total = first + second;
        var prize = 0;
        var didWinGame = false;
        if(guess == 'over') {
          didWinGame = total > 7;
          prize = didWinGame ? 2*betValue : 0;
        } else if(guess == 'under') {
          didWinGame = total < 7;
          prize = didWinGame ? 2*betValue : 0;
        } else {
          didWinGame = total == 7;
          prize = didWinGame ? 3*betValue : 0;
        }
        setGameWon(didWinGame);
        await sleep(1500);
        setGameOver(true);
        handleGameOver(sessionStorage.getItem('uid'), total, guess, betValue, 2, 'Over/Under', prize);
      }
    }
    rollADie(options);
  }

  const handlePlayGame = async () => {
    // Get dice values
    // Send bet value to tavern wallet
    // Roll the dice
    const uid = sessionStorage.getItem('uid');
    const firstDie = await getD6ValueFromSeeds(uid, 0);
    const secondDie = await getD6ValueFromSeeds(uid, 1);
    setDiceValues({ ...diceValues, first: firstDie, second: secondDie });
    const userBanano = await getUserBananoAccount(uid);
    sendBananoBet(userBanano.bananoSeed, 'tavern', betValue);
    rollDiceLibrary(firstDie, secondDie);
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function playAgain() {
    setGameOver(false);
    setGameWon(null);
  }

  const handleBetValueChange = (event) => {
    setBetValue(event.target.value === '' ? 10 : Number(event.target.value));
  }

  const handleBlur = () => {
    if(betValue < 0) {
      setBetValue(0);
    } else if(betValue > 100) {
      setBetValue(100);
    }
  }
  
  return (
    <>
      <wired-card elevation="5" fill="#795548" class="card board">
        <div id="id-disable">
          <div className="title-row">
            <h3 class="sketch-text" style={{ fontSize: 20 }}>Here we will roll two 6 sided dice. Please choose whether you think the combination of the two rolls will be over, under, or equal to 7. If you win, you will receive 2x your wager!</h3>
          </div>
          <Row>
            <Container id="id-game-board" className="dice"></Container>
          </Row>
          <Container className={classes.content}>
            <div className={classes.inputRow} onClick={() => setGuess('over')}>
                <label for="over" className={classes.radioLabelCol}>Over</label>
                <input type="radio" checked={guess=='over'} onChange={()  => {}} name="over" />
            </div>
            <div className={classes.inputRow} onClick={() => setGuess('equals')}>
              <label for="equals" className={classes.radioLabelCol}>Equals</label>
              <input type="radio" checked={guess=='equals'} onChange={()  => {}} name="equals" />
            </div>
            <div className={classes.inputRow} onClick={() => setGuess('under')}>
              <label for="under" className={classes.radioLabelCol}>Under</label>
              <input type="radio" checked={guess=='under'} onChange={()  => {}} name="under" />
            </div>
            <div>
              <Row alignItems="center" className={classes.wagerRow}>
                <Col xs={6} sm={5} md={7} className={classes.wagerLabelCol}>
                  <Typography class="sketch-text">Set wager amount:</Typography>
                </Col>
                <Col xs={4} sm={5} md={3}>
                  <Input
                    className={classes.input}
                    value={betValue}
                    margin="dense"
                    onChange={handleBetValueChange}
                    onBlur={handleBlur}
                    inputProps={{
                      step: 1,
                      min: 1,
                      max: 100,
                      type: 'number'
                    }} />
                </Col>
              </Row>
            </div>
            <div className={classes.btnRow}>
              <wired-button type="button" id="roll-button" onClick={handlePlayGame} class='green-btn' elevation="3">Roll Dice</wired-button>
            </div>
          </Container>
        </div>
        {gameOver && (
          <ResultsDialog
            result={gameWon ? "Congratulations! You won!" : "Sorry, better luck next time!"}
            open={gameOver}
            onClose={playAgain}
            guess={guess}
            values={[diceValues.first, diceValues.second]}
          />
        )}
      </wired-card>
    </>
  )
}

export default OverUnder;
