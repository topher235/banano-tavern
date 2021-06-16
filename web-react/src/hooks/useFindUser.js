import { useState, useEffect } from 'react';
import { getUserContext } from '../utils/user';


export default function useFindUser() {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(async () => {
    if(user == null) {
      setUser(await getUserContext());
      setLoading(false);
    }
  }, [user])

  return { user, setUser, isLoading }
}