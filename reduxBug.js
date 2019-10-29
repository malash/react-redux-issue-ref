import React from 'react';
import {createStore} from 'redux';
import {Provider, useSelector, useDispatch, batch} from 'react-redux';
import {
	Text,
	Button,
	unstable_batchedUpdates as batchedUpdates,
} from 'react-native';

// store

const INIT_STATE = {bool: false};

const reducer = (state = INIT_STATE, action) => {
	switch (action.type) {
		case 'TOGGLE':
			return {bool: !state.bool};
		default:
			return state;
	}
};

const store = createStore(reducer, INIT_STATE);

const selector = state => ({
	bool: state.bool,
});

// components

const ReduxBugParent = () => {
	const dispatch = useDispatch();
	const {bool} = useSelector(selector);
	const boolFromStore = store.getState().bool;

	return (
		<>
			<Button
				title="Click Me"
				onPress={() => {
					dispatch({type: 'NOOP'});
					dispatch({type: 'TOGGLE'});
				}}
			/>
			<Button
				title="[BUG] Click Me (setTimeout)"
				onPress={() => {
					setTimeout(() => {
						dispatch({type: 'NOOP'});
						dispatch({type: 'TOGGLE'});
					}, 0);
				}}
			/>
			<Button
				title="Click Me (setTimeout & batched from react-native)"
				onPress={() => {
					setTimeout(() => {
						batchedUpdates(() => {
							dispatch({type: 'NOOP'});
							dispatch({type: 'TOGGLE'});
						});
					}, 0);
				}}
			/>
			<Button
				title="Click Me (setTimeout & batched from react-redux)"
				onPress={() => {
					setTimeout(() => {
						batch(() => {
							dispatch({type: 'NOOP'});
							dispatch({type: 'TOGGLE'});
						});
					}, 0);
				}}
			/>
			<Text>bool from useSelector is {JSON.stringify(bool)}</Text>
			<Text>bool from store.getState is {JSON.stringify(boolFromStore)}</Text>

			{bool !== boolFromStore && <Text>They are not same!</Text>}
		</>
	);
};

export const ReduxBugDemo = () => {
	return (
		<Provider store={store}>
			<ReduxBugParent />
		</Provider>
	);
};
