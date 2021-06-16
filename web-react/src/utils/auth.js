import { firebase } from './firebase';


async function signupUser(email, password) {
  return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        return userCredential.user;
      })
      .catch(error => {
        throw(error);
      });
}

async function loginUser(email, password) {
  return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        return userCredential.user;
      })
      .catch(error => {
        throw(error);
      });
}

export {
  signupUser,
  loginUser
}