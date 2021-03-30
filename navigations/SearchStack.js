import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Search from '../screens/Search'
import SearchRestaurant from '../screens/SearchRestaurant'
import SearchGeneral from '../screens/SearchGeneral'

const Stack = createStackNavigator()

export default function SearchStack() {
    return (
        <Stack.Navigator>
            
            {/* <Stack.Screen
                name="search-restaurant"
                component={SearchRestaurant}
                options={{ title: "Encuentra tu restaurante" }}
            /> */}
            <Stack.Screen
                name="search-general"
                component={SearchGeneral}
                options={{ title: "¿Que se te antoja hoy?" }}
            />
            <Stack.Screen
                name="search"
                component={Search}
                options={{ title: "Encuentra tu comida/bebida ideal" }}
            />
        </Stack.Navigator>
    )
}
