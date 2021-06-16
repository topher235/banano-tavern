import { firebase } from './firebase';
import { generateSeeds } from './game';


async function addUserToDatabase(uid, username, bananoSeed, bananoAddress) {
  const seeds = generateSeeds();

  try {
    firebase
    .database()
    .ref('users')
    .child(uid)
    .set({
      username: username,
      // balance: 0,
      faucetClaimed: false,
      serverSeed: seeds.server,
      serverSeedHash: seeds.serverHash,
      clientSeed: seeds.client,
      nonce: 0,
      bananoSeed: bananoSeed,
      bananoAddress: bananoAddress
    });
  } catch(exception) {
    // console.error(exception);
    console.error('Something went wrong instantiating this user...');
  }
  
}

async function getUserBananoAccount(uid) {
  const snapshot = await firebase
      .database()
      .ref('users')
      .child(uid)
      .get()
  if(snapshot.exists()) {
    const user = snapshot.val();
    return {
      bananoAddress: user.bananoAddress,
      bananoSeed: user.bananoSeed
    }
  } else {
    return null;
  }
}

async function getUserSeeds(uid) {
  const snapshot = await firebase
      .database()
      .ref('users')
      .child(uid)
      .get()
  if(snapshot.exists()) {
    const user = snapshot.val();
    return {
      serverSeed: user.serverSeed,
      serverSeedHash: user.serverSeedHash,
      clientSeed: user.clientSeed,
      nonce: user.nonce
    }
  } else {
    return null;
  }
}

function updateUserData(uid, userData) {
  firebase
    .database()
    .ref('users')
    .child(uid)
    .update(userData)
}

function recordGame(uid, gameData) {
  const gameKey = firebase.database().ref('users').child(uid).child('games').push().key;

  firebase
    .database()
    .ref('users')
    .child(uid)
    .child('games')
    .child(gameKey)
    .update(gameData);
}

async function getClaimedFaucet(uid) {
  const snapshot = await firebase
      .database()
      .ref("users")
      .child(uid)
      .get()
  if(snapshot.exists()) {
    const user = snapshot.val();
    return user.faucetClaimed;
  } else {
    return null;
  }
}

async function doesUserExist(uid) {
  var snapshot = null;
  try {
    snapshot = await firebase
    .database()
    .ref('users')
    .child(uid)
    .get()
  } catch(error) {
    throw(error);
  }
  
  if(snapshot != null && snapshot.exists()) {
    const user = snapshot.val();
    return {
      bananoAddress: user.bananoAddress,
      username: user.username
    }
  } else {
    return null;
  }
}

async function getUserGames(uid) {
  const snapshot = await firebase
      .database()
      .ref('users')
      .child(uid)
      .get()
  if(snapshot.exists()) {
    const user = snapshot.val();
    const games = [];
    for(let game in user.games) {
      games.push({
        id: game,
        date: user.games[game].date,
        bet: user.games[game].bet,
        clientSeed: user.games[game].clientSeed,
        gameName: user.games[game].gameName,
        nonce: user.games[game].nonce,
        result: user.games[game].result,
        serverSeedHash: user.games[game].serverSeedHash,
        target: user.games[game].target
      })
    }
    return games;
  } else {
    return [];
  }
}


export {
  addUserToDatabase,
  doesUserExist,
  getClaimedFaucet,
  getUserGames,
  getUserSeeds,
  getUserBananoAccount,
  recordGame,
  updateUserData,
}
