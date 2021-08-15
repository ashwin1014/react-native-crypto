import React from "react";
import {
    TouchableOpacity,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import { Home, Portfolio, Market, Profile } from "../screens"
import { TabIcon } from '../components';
import { COLORS, icons } from "../constants"

const Tab = createBottomTabNavigator()

const Tabs = () => {

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: COLORS.primary,
                    borderTopColor: "transparent",
                    height: 140
                },
                tabBarShowLabel: false
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (<TabIcon focused={focused} icon={icons.home} label='Home' />)
                }}
            />
            <Tab.Screen
                name="Portfolio"
                component={Portfolio}
                options={{
                    tabBarIcon: ({ focused }) => (<TabIcon label="Portfolio" focused={focused} icon={icons.briefcase} />)
                }}
            />
            <Tab.Screen
                name="Trade"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (<TabIcon label="Trade" focused={focused} icon={icons.trade} isTrade />)
                }}
            />
            <Tab.Screen
                name="Market"
                component={Market}
                options={{
                    tabBarIcon: ({ focused }) => (<TabIcon label="Market" focused={focused} icon={icons.market} />)
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => (<TabIcon label="Profile" focused={focused} icon={icons.profile} />)
                }}
            />
        </Tab.Navigator>
    )
}

export default Tabs;