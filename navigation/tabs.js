import React from "react";
import {
    TouchableOpacity,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { useDispatch, useSelector } from 'react-redux';

import { Home, Portfolio, Market, Profile } from "../screens"
import { TabIcon } from '../components';
import { COLORS, icons } from "../constants"
import { setTradeModalVisibility } from '../stores/tab/tabActions';

// import TableDemo from '../screens/FixedTable';

const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({children, isTradeModalVisible}) => {
    const dispatch = useDispatch();
    const handleModalVisibilityChange = () => {
        console.log('clicked')
        dispatch(setTradeModalVisibility(!isTradeModalVisible));
    };

    return (
        <TouchableOpacity
        onPress={handleModalVisibilityChange}
        style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            {children}
        </TouchableOpacity>
    );
}

const Tabs = () => {

    const isTradeModalVisible = useSelector(state => state.tabReducer.isTradeModalVisible);

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: COLORS.primary,
                    borderTopColor: "transparent",
                    height: 140
                },
                tabBarShowLabel: false,
                headerShown: false
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => !isTradeModalVisible && (
                        <TabIcon focused={focused} icon={icons.home} label='Home' />
                    )
                }}
                listeners={{
                    tabPress: e => {
                       if (isTradeModalVisible) e.preventDefault()
                    }
                }}
            />
            <Tab.Screen
                name="Portfolio"
                component={Portfolio}
                options={{
                    tabBarIcon: ({ focused }) => !isTradeModalVisible && (
                        <TabIcon focused={focused} icon={icons.briefcase} label='Portfolio' />
                    )
                }}
                listeners={{
                    tabPress: e => {
                       if (isTradeModalVisible) e.preventDefault()
                    }
                }}
            />
            <Tab.Screen
                name="Trade"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (<TabIcon label="Trade" focused={focused} iconStyle={isTradeModalVisible ? { height: 15, width: 15 } : {}} icon={isTradeModalVisible ? icons.close : icons.trade} isTrade />),
                    tabBarButton: props => <TabBarCustomButton isTradeModalVisible={isTradeModalVisible} {...props} />
                }}
            />
            <Tab.Screen
                name="Market"
                component={Market}
                options={{
                    tabBarIcon: ({ focused }) => !isTradeModalVisible && (
                        <TabIcon focused={focused} icon={icons.market} label='Market' />
                    )
                }}
                listeners={{
                    tabPress: e => {
                       if (isTradeModalVisible) e.preventDefault()
                    }
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => !isTradeModalVisible && (
                        <TabIcon focused={focused} icon={icons.profile} label='Profile' />
                    )
                }}
                listeners={{
                    tabPress: e => {
                       if (isTradeModalVisible) e.preventDefault()
                    }
                }}
            />
        </Tab.Navigator>
    )
}

export default Tabs;