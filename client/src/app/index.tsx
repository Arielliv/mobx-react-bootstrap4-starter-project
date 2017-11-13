import './bootstrap.scss'
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import { Router, Route, Switch } from 'react-router';
import {LogArrayStore} from "./stores/LogArrayStore";
import {RouterStore} from "./stores/RouterStore";
import {STORE_LOG_ARRAY, STORE_ROUTER, STORE_LOG, STORE_ALERT} from "./constants/stores";
import {Root} from "./containers/Root/index";
import {default as MainRoutes} from "./containers/GeneralContainer/MainRoutes/index";
import LogStore from "./stores/LogStore";
import AlertStore from "./stores/AlertStore";
import axios from 'axios';
import {ILogModel} from "./models/ILogModel";

// enable MobX strict mode
useStrict(true);

// default fixtures for TodoStore
// let defaultLogs = JSON.parse(localStorage.getItem('defaultLogs')) ? JSON.parse(localStorage.getItem('defaultLogs')) : [];
let defaultLogs : ILogModel[];
axios.get('api/logs')
    .then((response)=> {

        defaultLogs = response.data.logs;
        // prepare MobX stores
// prepare MobX stores
        const history = createBrowserHistory();
        const logArrayStore = new LogArrayStore(defaultLogs);
        const routerStore = new RouterStore(history);
        const logStore = new LogStore();
        const alertStore = new AlertStore();
        const rootStores = {
            [STORE_LOG_ARRAY]: logArrayStore,
            [STORE_ROUTER]: routerStore,
            [STORE_LOG]: logStore,
            [STORE_ALERT]: alertStore
        };

// render react DOM
        ReactDOM.render(
            <Provider {...rootStores}>
                <Root>
                    <Router history={history} >
                        <Switch>
                            <Route  path="/" component={MainRoutes} />
                        </Switch>
                    </Router>
                </Root>
            </Provider>,
            document.getElementById('root')
        );
    })
    .catch((error) => {
        console.log(error);
    });

