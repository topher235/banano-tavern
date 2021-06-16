import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { UserContext } from '../hooks/UserContext';


const Logout = () => {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);
  setUser(null);
  sessionStorage.setItem('uid', null);

  return (
    <>
    </>
  )
}


export default Logout
