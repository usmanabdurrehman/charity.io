import React from "react";
import {
	ProfilePage,
	Home,
	Signin,
	Signup,
	LandingPage,
	AddEventPage,
} from "Pages";

import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";

import { PrivateRoute, PublicRoute } from "Routes";

import { ToastProvider } from "react-toast-notifications";

import { Provider } from "react-redux";
import store from "./store";

export default function App() {
	return (
		<ToastProvider autoDismiss autoDismissTimeout={3500}>
			<Provider store={store}>
				<Router>
					<Route path="/signup" component={Signup} />
					<Route path="/signin" component={Signin} />

					<Route path="/" exact component={LandingPage} />
					<Route path="/home" component={Home} />

					<Route path="/addEvent" component={AddEventPage} />
					<Route path="/profile" component={ProfilePage} />
				</Router>
			</Provider>
		</ToastProvider>
	);
}
