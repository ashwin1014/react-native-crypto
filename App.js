import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './stores/rootReducer';
import Tabs from "./navigation/tabs";

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

const Stack = createStackNavigator();

const App = () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                      }}
                    initialRouteName={'MainLayout'}
                >
                    <Stack.Screen
                        name="MainLayout"
                        component={Tabs}
                    />
            </Stack.Navigator>
         </NavigationContainer>
        </Provider>
    )
}

export default App;