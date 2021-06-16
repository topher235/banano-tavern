import { signupUser } from './auth';
import { addUserToDatabase, doesUserExist, getClaimedFaucet, getUserBananoAccount, updateUserData } from './db';
import { openNewBananoAccount, sendTavernFaucet, getAccountBalance } from './banano';


async function createUser(email, username, password) {
  try {
    const userData = await signupUser(email, password);
    if(userData != null) {
      const uid = userData.uid;
      const bananoAccount = await openNewBananoAccount();
      addUserToDatabase(uid, username, bananoAccount.seed, bananoAccount.address);
      return { uid: uid, refreshToken: userData.refreshToken };
    } else {
      console.error('There was an error creating the user in auth');
    }
  } catch(error) {
    console.error('There was an error creating the user in auth');
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
  const userBanano = await getUserBananoAccount(uid);
  await sendTavernFaucet(userBanano.bananoAddress, 10);
  updateUserData(uid, {
    faucetClaimed: true
  });
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