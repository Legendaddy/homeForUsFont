
/* Style */
import 'bootstrap/dist/css/bootstrap.css';

/* React */
import React from 'react';

/* external lib*/
import { Provider } from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import store from './redux/store';

/* components */
import PrivateRoute from './common/PrivateRoute';
import MessageContainer from './components/message/MessageContainer';
import MainSelector from './components/MainSelector';
import AuthLogin from './components/user/AuthLogin';
import AuthRegister from './components/user/AuthRegister';
import ProfilContainer from './components/profil/ProfilContainer';
import BankAppContainer from './components/bank/BankAppContainer';
import FamillyAppContainer from './components/familly/FamillyAppContainer';

function App() {
  
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MessageContainer/>
        <Switch>
          <PrivateRoute exact path="/" component={MainSelector} />
          <PrivateRoute exact path="/profil" component={ProfilContainer} />
          <PrivateRoute exact path="/familly" component={FamillyAppContainer } />
          
          <PrivateRoute exact path="/bank" component={() => BankAppContainer("main")} />
          <PrivateRoute exact path="/bank/account" component={() => BankAppContainer("account")} />
          <PrivateRoute exact path="/bank/budget" component={() => BankAppContainer("budget")} />
          <PrivateRoute exact path="/bank/input" component={() => BankAppContainer("input")} />
          <PrivateRoute exact path="/bank/import" component={() => BankAppContainer("import")} />

          <PrivateRoute exact path="/diner" component={MainSelector} />
          <Route exact path="/login" component={AuthLogin} />
          <Route exact path="/register" component={AuthRegister} />

        </Switch>
      
      </BrowserRouter>
    </Provider>
  );
}

export default App;
