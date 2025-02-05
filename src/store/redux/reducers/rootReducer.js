import {combineReducers} from 'redux'
import { eventReducers } from './eventReducers';
import { contactFormReducer } from './contactFormReducer';
import { registerReducers } from './registerReducers';
import { loginReducers } from './loginReducers';
import { transactionReducers } from './transactionReducers';



export default combineReducers({
    eventReducers:eventReducers,
    contactFormReducer:contactFormReducer,
    registerReducers:registerReducers,
    loginReducers:loginReducers,
    transactionReducers:transactionReducers
})