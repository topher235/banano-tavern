import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from './../hooks/UserContext';
import Loading from './../components/Loading';


export default function PrivateRoute(props) {
  const { user, setUser, isLoading } = useContext(UserContext);
  const { component: Component, path, ...rest } = props;

  if(isLoading) {
    return <Loading/>
  }

  if(user) {
    // console.log(`private route: ${JSON.stringify(user)}`);
    // console.log(JSON.stringify(Component))
    // console.log(JSON.stringify(props));
    return (
      <Route path={path}
             {...rest}
             render={(props) => ( <Component {...props} /> )} />
    )
  }

  // redirect if there is no user
  return <Redirect to={{pathname: '/login', state: {prevLocation: path, error: "You need to login first!" } }}/>
}