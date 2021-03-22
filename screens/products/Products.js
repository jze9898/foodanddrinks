import React, { useEffect, useState, useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'
import { useFocusEffect } from '@react-navigation/native'
import firebase from 'firebase/app'

import Loading from '../../components/Loading'
import { getProducts } from '../../utils/actions'

export default function Products({ navigation }) {
    const [user, setUser] = useState(null)
    const [startProduct, setStartProduct] = useState(null)
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    //const correo = "1234@yopmail.com"

    const limitProducts = 7
    console.log("products", products)

    useEffect(() => {
        firebase.auth().onAuthStateChanged((userInfo) => {
            //Habilitar boton xd
            userInfo ? setUser(true) : setUser(false)
        })  
    }, [])

    useFocusEffect(
        useCallback(async() => {
                setLoading(true)
                const response = await getProducts(limitProducts)
                if (response.statusResponse) {
                    setStartProduct(response.startProduct)
                    setProducts(response.products)
                }
                setLoading(false)
            },[],
        )
    )

    if(user === null){
        return <Loading isVisible={true} text="Cargando..."/>
    }

    return (
        <View style={styles.view}>
            <Text>Products</Text>
            {
                user && (
                <Icon
                type="material-community"
                name="plus"
                color="#721c1c"
                reverse
                containerStyle={styles.btnContainer}
                onPress={() => navigation.navigate("add-products")}
                />  
                )
            }
            <Loading isVisible={loading} text="Cargando productos..."/> 
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
    },
    btnContainer: {
        position: "absolute",
        bottom: 10,
        right: 10,
        shadowColor: "black",
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.5
    }
})
