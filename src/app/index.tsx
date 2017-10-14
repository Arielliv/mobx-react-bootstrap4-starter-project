import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import { Router, Route, Switch } from 'react-router';
// import { Root } from './containers/Root';
// import { TodoApp } from './containers/TodoApp';
import { ILogModel } from './models/ILogModel';
import {LogArrayStore} from "./stores/LogArrayStore";
import {RouterStore} from "./stores/RouterStore";
import Form from "./containers/Form/index";
import {STORE_LOG_ARRAY, STORE_ROUTER} from "./constants/stores";
import {Root} from "./containers/Root/index";



// enable MobX strict mode
useStrict(true);

// default fixtures for TodoStore
const defaultLogs = [

];

// prepare MobX stores
// prepare MobX stores
const history = createBrowserHistory();
const logArrayStore = new LogArrayStore(defaultLogs);
const routerStore = new RouterStore(history);
const rootStores = {
    [STORE_LOG_ARRAY]: logArrayStore,
    [STORE_ROUTER]: routerStore
};




// render react DOM
ReactDOM.render(
<Provider {...rootStores} >
        <Root>
            <Router history={history} >
                <Switch>
                    <Route path="/" component={Form} />
                </Switch>
            </Router>
        </Root>
    </Provider >,
  document.getElementById('root')
);