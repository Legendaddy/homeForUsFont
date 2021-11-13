import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './Auth/reducerAuth';
import messageReducer from './Message/reducerMessage';
import famillyReducer from './Familly/reducerFamilly';
import  {composeWithDevTools} from 'redux-devtools-extension';
import bankReducer from './Bank/reducerBank';


const rootReducer = combineReducers({
    auth: authReducer,
    message: messageReducer,
    familly: famillyReducer,
    bank: bankReducer
});

const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)));

export default store;