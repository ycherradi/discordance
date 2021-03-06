import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import serverReducer from "./server";
import userInfoReducer from "./userInfo";
import sessionReducer from "./session";
import channelReducer from "./channel";
import publicServerReducer from "./publicServer";
import messageReducer from "./message";

const rootReducer = combineReducers({
  server: serverReducer,
  userServers: userInfoReducer,
  publicServer: publicServerReducer,
  session: sessionReducer,
  channel: channelReducer,
  message: messageReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
