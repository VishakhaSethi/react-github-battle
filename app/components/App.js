import React, {Component} from 'react';
import Popular from './Popular';
import Home from './Home';
import Battle from './Battle';
import Results from './Results';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './Nav';

class App extends Component {
    render() {
        return (
            <Router>
                <div className='container'>
                    <Nav />
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/battle' component={Battle} />
                        <Route path='/battle/results' component={Results} />
                        <Route path='/popular' component={Popular} />
                        <Route render={() => <p>Not found</p>} />
                    </Switch>
                </div>   
            </Router> 
        );
    }

}

module.exports = App;