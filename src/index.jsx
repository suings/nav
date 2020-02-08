import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import Search from "./component/Search/Search";
import Cards from './component/Cards/Cards'
import Add from './component/Add/Add'
import { HashRouter as Router, Route } from 'react-router-dom'
class App extends React.Component {
    constructor() {
        super()
        var storage = window.localStorage;
        if (storage['sites'] === undefined) { storage['sites'] = "[]" } 
    }
    render() {
        return (
            <Router>
                <Route exact path="/" >
                    <Search />
                    <Cards />
                </Route>
                <Route path="/add">
                    <Add />
                </Route>
            </Router>
        )
    }
}
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
