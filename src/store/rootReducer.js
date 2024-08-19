import { combineReducers } from "redux";

import authReducer from "./reducers/authReducer";
import customerReducer from "./reducers/customerReducer";




const rootReducer = combineReducers({
    
    auth: authReducer,  
    customer:customerReducer
})

export default rootReducer;