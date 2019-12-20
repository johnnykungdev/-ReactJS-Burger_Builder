import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout.js';
import BurgerBuilder from './containers/BurgeBuilder/BurgerBuilder.js';
import Checkout from './containers/Checkout/Checkout.js';
import { Route, Switch, withRouter, Redirect} from 'react-router-dom';
import Orders from './containers/Orders/Orders.js';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/action/index';

class App extends Component {
    componentDidMount(){
        this.props.onTryAutoSignup();
    }
    render(){
        let routes = (
            <Switch>
                <Route path='/auth' component={Auth} />
                <Route path='/' exact component={BurgerBuilder} />
                <Redirect to='/' />
            </Switch>
        );
        
        if ( this.props.isAuthenticated ){
            routes = (
                <Switch>
                    <Route path='/checkout' component={Checkout} />
                    <Route path='/orders' component={Orders} />
                    <Route path='/logout' component={Logout} />
                    <Route path='/auth' component={Auth} />
                    <Route path='/' exact component={BurgerBuilder} />
                    <Redirect to='/' />
                </Switch>
            )
        }

        return(
            <div>
                <Switch>
                    <Layout>
                        {routes}
                    </Layout>
                </Switch>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
