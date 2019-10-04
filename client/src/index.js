import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect
} from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import "./index.css";
import App from "./App";
import SignForm from "./components/SignForm";
import Ratings from "./components/Ratings";
import RateForm from "./components/RateForm";
import Search from "./components/Search";
import * as serviceWorker from "./serviceWorker";
import withSession from "./components/withSession";
import Navbar from "./components/Navbar";

const client = new ApolloClient({
	uri: "http://localhost:4002/graphql",
	fetchOptions: {
		credentials: "include"
	},
	request: operation => {
		const token = localStorage.getItem("token");
		operation.setContext({
			headers: {
				authorization: token
			}
		});
	},
	onError: ({ networkError }) => {
		if (networkError) {
			console.log("network error", networkError);
			if (networkError.statusCode === 401) {
				localStorage.removeItem("token");
			}
		}
	}
});

const Root = () => (
	<Router>
		<Fragment>
			<Navbar />
			<Switch>
				<Route path="/" exact component={App} />
				<Route path="/sign" component={SignForm} />
				<Route path="/ratings" component={Ratings} />
				<Route path="/rate" component={RateForm} />
				<Route path="/search" component={Search} />
				<Redirect to="/" />
			</Switch>
		</Fragment>
	</Router>
);

const RootWithSession = withSession(Root);

ReactDOM.render(
	<ApolloProvider client={client}>
		<RootWithSession />
	</ApolloProvider>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
