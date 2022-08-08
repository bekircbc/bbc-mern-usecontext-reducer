import { createContext, useReducer } from 'react';
import axios from 'axios';

export const AppContext = createContext();

const api_base_url = 'http://localhost:4555';

const initialState = {
	count: 0,
	germanNouns: [],
};
function reducer(state, action) {
	const _state = { ...state };
	switch (action) {
		case 'increaseCount':
			_state.count++;
			break;
		case 'decreaseCount':
			_state.count--;
			break;
	}
	return _state;
}

useEffect(() => {
	(async () => {
		const _germanNouns = (await axios.get(`${api_base_url}/germanNouns`))
			.data;
		dispatch({ type: 'loadGermanNouns', payload: _germanNouns });
	})();
}, []);

export const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<AppContext.Provider
			value={{
				state,
				dispatch,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
