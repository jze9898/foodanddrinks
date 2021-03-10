import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs' 

import ProductsStack from './ProductsStack'
import FavoritesStacks from './FavoritesStacks'
import TopProductsStack from './TopProductsStack'
import SearchStack from './SearchStack'
import AccountStack from './AccountStack'

const Tab = createBottomTabNavigator()

export default function Navigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name="products"
                    component={ProductsStack}
                    options={{ title: "Productos" }}
                />
                <Tab.Screen
                    name="favorites"
                    component={FavoritesStacks}
                    options={{ title: "Favoritos" }}
                />
                <Tab.Screen
                    name="top-products"
                    component={TopProductsStack}
                    options={{ title: "Top 5" }}
                />
                <Tab.Screen
                    name="search"
                    component={SearchStack}
                    options={{ title: "Buscar" }}
                />
                <Tab.Screen
                    name="account"
                    component={AccountStack}
                    options={{ title: "Cuenta" }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
