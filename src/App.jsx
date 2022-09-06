import React from "react";
import Clock from "./components/Clock";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
	return (
		<div className="App border-solid h-screen flex flex-col justify-between items-center">
			<Header />
			<Clock />
			<Footer />
		</div>
	);
}

export default App;
