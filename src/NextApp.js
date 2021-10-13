import React from "react";
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import {Route, Switch} from "react-router-dom";
// import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import "./styles/wieldy.less";
import configureStore, { history } from './appRedux/store/index';
import App from "./containers/App/index";

const store = configureStore(/* provide initial state if any */);

const NextApp = () =>
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" component={App}/>
      </Switch>
    </ConnectedRouter>
  </Provider>;


export default NextApp;
