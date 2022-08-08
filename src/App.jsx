import { useContext } from 'react';
import { AppContext } from './AppContext';
import './App.scss';

function App() {
	const { state, dispatch } = useContext(AppContext);

	return (
		<div className="App">
			<h1>Site with useContext/useReducer</h1>
			<p>test: {state.count}</p>
			<div className="buttonArea">
				<button onClick={() => dispatch('decreaseCount')}>-</button>
				<button onClick={() => dispatch('increaseCount')}>+</button>
			</div>
			<h2>Items from API</h2>

			<div className="germanNounArea">
				{state.germanNouns.map((item, i) => {
					return (
						<div className="germanNoun" key={i}>
							{item.singular}
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default App;
