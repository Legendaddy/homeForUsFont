import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { userCheck } from '../redux/Auth/actionAuth'

const PrivateRoute = ({ component: Component, auth, userCheck, ...rest }) => (  
  <Route
    {...rest}
    render={(props) => {

      if (auth.token !== '' & auth.isAuthenticated === false){
        userCheck(auth.token)
      }

      if (auth.isLoading) {
        return <h2>Loading...</h2>;
      }else if (!auth.isAuthenticated) {
        return <Redirect to="/login" />;
      } else {
        return <Component {...props} />;
      }
    }}
  />
);

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { userCheck })(PrivateRoute);