import * as crypto from 'crypto';

import { sendBananoBet } from './banano';
import { updateUserData, recordGame, getUserSeeds, getUserBananoAccount } from './db';


function generateServerSeed() {
  // Return a server-side seed and its hash
  const seed = crypto.randomBytes(256).toString('hex');
  return seed;
}

function hashSeed(seed) {
  const hash = crypto.createHash('sha512')
                     .update(seed)
                     .digest('hex');
  return hash;
}

function generateSeeds() {
  const serverSeed = generateServerSeed().substring(0, 32);
  const serverSeedHash = hashSeed(serverSeed);
  const clientSeed = generateServerSeed().substring(0, 10);
  return {
    server: serverSeed,
    serverHash: serverSeedHash,
    client: clientSeed
  }
}

function combine(serverSeed, clientSeed, nonce) {
  return serverSeed + clientSeed + nonce;
}

function computeOutcome(hashedValue, modulus) {
  // Compute the outcome of the game with the serverSeed, clientSeed, and nonce
  // Save the outcome to the realtime database
  let index = 0;
  let result = 1e6;
  while(result >= 1e6) {
    // get the decimal value from an interval of 5 hex letters
    result = parseInt(hashedValue.substring(index * 5, index * 5 + 5), 16);
    // increment index in case we need to repeat this operation
    index += 1
    if(index * 5 + 5 > 129) {
      result = 9999;
      break;
    }
  }
  // the result is now a number between 0 and 999999 and we need to convert it into a 4 digit number
  result = result % modulus + 1;
  return result;
}

function computeD6Outcome(hashedValue) {
  const result = computeOutcome(hashedValue, 6);
  return result;
}


async function getD6ValueFromSeeds(uid, dieNumber) {
  /**
   * Given a set of seeds and a nonce, combine them and hash
   * to compute an outcome on a 6 sided die.
   */
  const seeds = await getUserSeeds(uid);
  const combined = combine(seeds.serverSeed, seeds.clientSeed, seeds.nonce+dieNumber);
  const hashedCombined = hashSeed(combined);
  const outcome = computeD6Outcome(hashedCombined);
  return outcome;
}

async function handleGameOver(uid, result, target, bet, numDice, gameName, prize) {
  /**
   * When a game is over,
   *   - Award the prize
   *   - Record the game's results in the database
   *   - Update the nonce in the database
   */
  if(prize > 0) {
    const userBanano = await getUserBananoAccount(uid);
    console.log(`Awarded ${prize} bananos to ${userBanano.bananoAddress}`)
    sendBananoBet('tavern', userBanano.bananoAddress, prize);
  }
  const seeds = await getUserSeeds(uid);
  const datetime = Date.now().toString();
  // Game record needs datetime, result, target, bet, serverSeedHash, clientSeed, nonce, gameName
  const gameData = {
    date: datetime,
    result: result,
    target: target,
    bet: bet,
    serverSeed: seeds.serverSeed,
    serverSeedHash: seeds.serverSeedHash,
    clientSeed: seeds.clientSeed,
    nonce: seeds.nonce,
    gameName: gameName
  }
  recordGame(uid, gameData);
  updateUserData(uid, {
    nonce: seeds.nonce+numDice
  });
}

function validateResult(serverSeed, clientSeed, nonce, numDice) {
  let results = [];
  for(let i = 0; i < numDice; i++) {
    const combined = combine(serverSeed, clientSeed, parseInt((nonce+i).toString(), 10));
    const hashed = hashSeed(combined);
    const outcome = computeD6Outcome(hashed);
    results.push(outcome);
  }
  return results;
}


export {
  generateSeeds,
  getD6ValueFromSeeds,
  handleGameOver,
  validateResult
}