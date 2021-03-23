import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Product({ navigation, route }) {
    const { id, nameProduct } = route.params
    
    navigation.setOptions({ title: nameProduct })
    return (
        <View>
            <Text>Product...</Text>
        </View>
    )
}

const styles = StyleSheet.create({})
