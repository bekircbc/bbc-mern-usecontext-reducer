import { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';

export const AppContext = createContext();

const initialState = {
	count: 0,
	germanNouns: ['nnn'],
};

function reducer(state, action) {
	const _state = { ...state };
	switch (action.type) {
		case 'increaseCount':
			_state.count++;
			break;
		case 'decreaseCount':
			_state.count--;
			break;
		case 'loadGermanNouns':
			_state.germanNouns = action.payload;
			break;
		case 'toggleEditStatus':
			const item = action.payload;
			item.isEditing = !item.isEditing;
		// setGermanNouns([...germanNouns]);
	}
	return _state;
}

export const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		(async () => {
			const _germanNouns = (
				await axios.get('http://localhost:4555/germanNouns')
			).data;
			_germanNouns.forEach((noun) => {
				noun.isEditing = false;
			});
			dispatch({ type: 'loadGermanNouns', payload: _germanNouns });
		})();
	}, []);

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
