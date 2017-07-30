import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './components/header';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import RequireAuth from './components/auth/require_auth';
import WelcomePage from './components/welcome';
import EventPage from './components/event/event_page';
import EventBrowse from './components/event/event_browse';
import CategorySelection from './components/registration/category_selection';
import ConfirmationPage from './components/registration/confirmation';
import MealSelection from './components/registration/meal_selection';
import Checkout from './components/registration/checkout';
import Payment from './components/registration/payment';
import UserProfile from './components/profile';


export default class App extends Component {
	render() {
		return(
			<div>
				<Header />
				<div>
					<Switch>
						<Route path="/registration/confirmation/:registration_id" component={RequireAuth(ConfirmationPage)} />
						<Route path="/registration/payment/:registration_id" component={RequireAuth(Payment)} />
						<Route path="/registration/checkout/:event_id" component={RequireAuth(Checkout)} />
						<Route path="/registration/category/:event_id" component={RequireAuth(CategorySelection)} />
						<Route path="/registration/meal/:event_id" component={RequireAuth(MealSelection)} />
						<Route path="/event/browse" component={EventBrowse} />
						<Route path="/event/:_id" component={EventPage} />
						<Route path="/signin" component={Signin} />
						<Route path="/signout" component={Signout} />
						<Route path="/signup" component={Signup} />
				    <Route path="/profile" component={RequireAuth(UserProfile)} />
				    <Route path="/" component={WelcomePage} />					
					</Switch>				
				</div>
			</div>
		);
	}
}