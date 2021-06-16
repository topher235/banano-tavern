import * as bananojs from '@bananocoin/bananojs';
import * as crypto from 'crypto';


const TAVERN_ADDRESS = process.env.TAVERN_ADDRESS;
const TAVERN_SEED = process.env.TAVERN_SEED;
const BANANODE_API_URL = process.env.BANANODE_API_URL;
const NODE_REPRESENTATIVE = process.env.NODE_REPRESENTATIVE;
const SEED_IX = process.env.SEED_IX;


async function getAccount(seed) {
  bananojs.setBananodeApiUrl(BANANODE_API_URL);

  const privateKey = bananojs.getPrivateKey(seed, SEED_IX);
  const publicKey = await bananojs.getPublicKey(privateKey);
  const account = bananojs.getBananoAccount(publicKey);
  
  return account;
}

async function getRandomAccount() {
  const seed = crypto.randomBytes(32).toString('hex');
  const accountInfo = await getAccount(seed);
  return {seed: seed, address: accountInfo};
}

async function openNewBananoAccount() {
  /*
   * To open a new banano account:
   *  - Generate a random banano account address
   *  - Send 0 (?) banano to that address as the first transaction
   *  - Get the seed for that banano address
   *  - Open a banano account from that seed
   */
  // Initialize bananode api and kalium rep
  bananojs.setBananodeApiUrl(BANANODE_API_URL);
  const kaliumRep = NODE_REPRESENTATIVE;
  // Note the initializing banano account
  const initializingAccount = TAVERN_SEED;
  // Get the raw string from a small amount of banano
  const rawBananoString = await bananojs.getRawStrFromBananoStr("0.001");
  // Generate a random banano account address and seed
  const newBanAccount = await getRandomAccount();
  // We need to send a small amount of banano before we can open that account
  // On success, we will open a banano account from the above generated seed
  const result = await bananojs.sendAmountToBananoAccount(initializingAccount, SEED_IX, newBanAccount.address, rawBananoString,
    async (hash)=>{ const res = await bananojs.openBananoAccountFromSeed(newBanAccount.seed, SEED_IX, kaliumRep, hash, rawBananoString)},
    async (error)=>{console.log('There was an error sending bananos!')}
  );
  return {seed: newBanAccount.seed, address: newBanAccount.address};
}

async function sendBananoBet(sourceSeed, destinationAcct, amount) {
  /*
   * Need source seed, destination account, and amount
   */
  bananojs.setBananodeApiUrl(BANANODE_API_URL);
  if(sourceSeed === 'tavern') {
    sourceSeed = TAVERN_SEED;
  }
  if(destinationAcct === 'tavern') {
    destinationAcct = TAVERN_ADDRESS;
  }
  const rawBanano = await bananojs.getRawStrFromBananoStr(amount.toString());
  const result = await bananojs.sendAmountToBananoAccount(sourceSeed, SEED_IX, destinationAcct, rawBanano,
    (data) => { console.log('successfully sent bananos'); },
    (error) => { console.error('There was an error sending bananos!'); }
  );
}

async function sendTavernFaucet(destinationAcct, amount) {
  bananojs.setBananodeApiUrl(BANANODE_API_URL);
  const rawBanano = await bananojs.getRawStrFromBananoStr(amount.toString());
  const result = await bananojs.sendAmountToBananoAccount(TAVERN_SEED, SEED_IX, destinationAcct, rawBanano, 
    (data) => { console.log('successfully sent bananos'); },
    (error) => { console.error('There was an error tapping into the faucet!'); }
  );
}

async function getAccountBalance(acct) {
  bananojs.setBananodeApiUrl(BANANODE_API_URL);
  const raw = await bananojs.getAccountBalanceRaw(acct);
  const result = bananojs.getBananoPartsFromRaw(raw);
  return result.banano;
}

async function withdrawBanano(seed, acct, amount) {
  bananojs.setBananodeApiUrl(BANANODE_API_URL);
  const raw = await bananojs.getRawStrFromBananoStr(amount.toString());
  const result = await bananojs.sendAmountToBananoAccount(seed, SEED_IX, acct, raw,
    (data) => { console.log('successfully withdrew bananos'); },
    (error) => { throw(error); }
  );
}

export {
  getAccountBalance,
  openNewBananoAccount,
  sendBananoBet,
  sendTavernFaucet,
  withdrawBanano
}
