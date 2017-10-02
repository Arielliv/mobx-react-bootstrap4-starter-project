import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { useStrict } from 'mobx';
import { Body } from './components/Body';
import { Provider } from 'mobx-react';
import { Router, Route, Switch } from 'react-router';
// import { Root } from './containers/Root';
// import { TodoApp } from './containers/TodoApp';
import { ILogModel } from './models/LogModel';
import {LogsStore} from "./stores/LogArrayStore";



// enable MobX strict mode
useStrict(true);

// default fixtures for TodoStore
const defaultLogs = [

];

// prepare MobX stores
const history = createBrowserHistory();
const logsStore = new LogsStore(defaultLogs);



// render react DOM
ReactDOM.render(
  <Body/>,
  document.getElementById('root')
);