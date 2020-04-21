import React from 'react';

import './App.css';
import './fonts.css';
import './animations.css';
import 'remixicon/fonts/remixicon.css';

import Navbar from './components/home/navbar/Navbar';
import LeftPanel from './components/home/left-panel/LeftPanel';
import CenterPanel from './components/home/center-panel/CenterPanel';
import RightPanel from './components/home/right-panel/RightPanel';

function App() {
	return (
		<div className="App">
			<Navbar></Navbar>
			<div className="row">
				<LeftPanel />
				<div className="fillParent">
					<CenterPanel />
				</div>
				<RightPanel />
			</div>
		</div>
	);
}

export default App;
