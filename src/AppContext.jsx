import { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';

export const AppContext = createContext();

const api_base_url = 'http://localhost:4555';

const initialState = {
	count: 0,
	germanNouns: [],
};

function reducer(state, action) {
	let obj = { ...state };
	switch (action.type) {
		case 'increaseCount':
			obj.count++;
			break;
		case 'decreaseCount':
			obj.count--;
			break;
		case 'loadGermanNouns':
			obj.germanNouns = action.payload;
			break;
	}
	return obj;
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
