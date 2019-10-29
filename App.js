/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {SafeAreaView, StyleSheet, ScrollView, StatusBar} from 'react-native';
import {ReduxBugDemo} from './reduxBug';

const App = () => {
	return (
		<>
			<StatusBar barStyle="dark-content" />
			<SafeAreaView>
				<ScrollView
					contentInsetAdjustmentBehavior="automatic"
					style={styles.scrollView}>
					<ReduxBugDemo />
				</ScrollView>
			</SafeAreaView>
		</>
	);
};

const styles = StyleSheet.create({});

export default App;
