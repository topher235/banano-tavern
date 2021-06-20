import { signupUser, deleteUser } from './auth';
import { addUserToDatabase, doesUserExist, getClaimedFaucet, getUserBananoAccount, updateUserData } from './db';
import { openNewBananoAccount, sendTavernFaucet, getAccountBalance, receiveBanano } from './banano';


async function createUser(email, username, password) {
  try {
    const userData = await signupUser(email, password);
    if(userData != null) {
      const uid = userData.uid;
      const bananoAccount = await openNewBananoAccount();
      addUserToDatabase(uid, username, bananoAccount.seed, bananoAccount.address);
      return { uid: uid, refreshToken: userData.refreshToken };
    } else {
      console.error('There was an error creating the user in auth ');
    }
  } catch(error) {
    deleteUser(email, password);
    console.error('Caught an error creating the user in auth', error);
    throw(error);
  }
}

async function hasUserClaimedFaucet(uid) {
  const claimed = await getClaimedFaucet(uid);
  return claimed;
}

async function claimFaucet(uid) {
  /*
   * Claiming a faucet means a set amount of bananos have been sent to that users banano account
   * We need to get the user's banano account
   * then send 10 bananos to that account
   * then update the database to show they have claimed the faucet
   */
  const faucetValue = 3;
  const userBanano = await getUserBananoAccount(uid);
  const pendingHash = await sendTavernFaucet(userBanano.bananoAddress, faucetValue);
  await receiveBanano(userBanano.bananoSeed, pendingHash);
  updateUserData(uid, {
    faucetClaimed: true
  });
  return faucetValue;
}

async function getUserContext() {
  var user = null;
  try {
    const uid = sessionStorage.getItem('uid');
    if(uid != null) {
      user = await doesUserExist(uid);
      if(user != null) {
        user.balance = await getAccountBalance(user.bananoAddress);
      }
    }
  } catch(error) {
    
  }
  
  return user;
}


export {
  createUser,
  getUserContext,
  hasUserClaimedFaucet,
  claimFaucet
}