import {applyMiddleware, combineReducers, createStore} from "redux";
import login_reducer from "./reducers/login_reducer";
import thunk from "redux-thunk";
import {reducer as form_reducer} from "redux-form";

const reducers = combineReducers({
    login: login_reducer,
    form : form_reducer
    }
)


let store = createStore(reducers,applyMiddleware(thunk));

export default store;