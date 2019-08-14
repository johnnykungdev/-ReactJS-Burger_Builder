import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout.js';
import BurgerBuilder from './containers/BurgeBuilder/BurgerBuilder.js';
import Checkout from './containers/Checkout/Checkout.js';
import { Route, Switch } from 'react-router-dom';
import Orders from './containers/Orders/Orders.js';

class App extends Component {

    render(){
        return(
            <div>
                <Switch>
                    <Layout>
                        <Route path='/orders' component={Orders} />
                        <Route path='/checkout' component={Checkout} />
                        <Route path='/' exact component={BurgerBuilder} />
                    </Layout>
                </Switch>
            </div>
        )
    }
}

export default App;
