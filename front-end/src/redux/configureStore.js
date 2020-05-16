import userReducer from "./reducers/userReducer";
import { createStore, combineReducers } from "redux";

const rootReducer = combineReducers({
    users: userReducer,
})

const store = createStore(rootReducer);
export default store;
