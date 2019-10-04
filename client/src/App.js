import React, { Component } from "react";
import "./App.css";

import { Query } from "react-apollo";
import { GET_ALL_RATINGS } from "./queries";

const App = () => (
	<div className="App">
		<h1>Test</h1>
		<Query query={GET_ALL_RATINGS}>
			{({ data, loading, error }) => {
				if (loading) return <div>loading</div>;
				if (error) return <div>error</div>;
				console.log("data-", data);
				return <p>Ratings</p>;
			}}
		</Query>
	</div>
);

export default App;
