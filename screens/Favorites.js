import React, { useState, useCallback, useRef } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import { Button, Icon, Image } from 'react-native-elements'
import { useFocusEffect } from '@react-navigation/native'
import Toast from 'react-native-easy-toast'
import firebase from 'firebase/app'

import { getFavorites } from '../utils/actions'
import Loading from '../components/Loading'

export default function Favorites({ navigation }) {
    const toastRef = useRef()
    const [products, setProducts] = useState(null)
    const [userLogged, setUserLogged] = useState(false)
    const [loading, setLoading] = useState(false)
    const [reloadData, setReloadData] = useState(false)

    firebase.auth().onAuthStateChanged((user) => {
        user ? setUserLogged(true) : setUserLogged(false)
    })

    useFocusEffect(
        useCallback(() => {
            if(userLogged){
                async function getData() {
                    setLoading(true)
                    const response = await getFavorites()
                    setProducts(response.favorites)
                    setLoading(false)
                }
                getData()
            }
            setReloadData(false)
        }, [userLogged, reloadData])
    )

    if(!userLogged) {
        return <UserNoLogged navigation={navigation}/>
    }

    if(!products){
        return <Loading isVisible={true} text="Cargando productos..."/>
    } else if(products?.length === 0){
        return <NotFoundProducts/>
    }

    return (
        <View styles={styles.viewBody}>
            {
                products ? (
                    <FlatList
                        data={products}
                        keyExtractor={(item, index) => index.toString() }
                        renderItem={(product) => (
                            <Product
                                product={product}
                                setLoading={setLoading}
                                toastRef={toastRef}
                                navigation={navigation}
                                //setReloadData={setReloadData}
                            />
                        )}
                    />
                ) : (
                    <View style={styles.loaderProduct}>
                        <ActivityIndicator size="large"/>
                        <Text style={{ textAlign: "center" }}>
                            Cargando Productos...
                        </Text>
                    </View>
                )
            }
            <Toast ref={toastRef} position="center" opacity={0.9}/>
            <Loading isVisible={loading} text="Por favor, espere..."/>
        </View>
    )
}

function Product({ product, setLoading, toastRef, navigation }) {
    const { id, nameProduct, images } = product.item
    return (
        <View>
            <Text>{nameProduct}</Text>
        </View>
    )
}

function NotFoundProducts() {
    return (
        <View style={{ flex:1, alignItems: "center", justifyContent: "center" }}>
            <Icon
                type="material-community"
                name="alert-outline"
                size={50}
            />
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Aun no tienes productos favoritos.
            </Text>
        </View>
    )
}

function UserNoLogged({ navigation }){
    return (
        <View style={{ flex:1, alignItems: "center", justifyContent: "center" }}>
            <Icon
                type="material-community"
                name="alert-outline"
                size={50}
            />
            <Text style={{ fontSize: 20, fontWeight: "bold"}}>
                Necesitas estar logueado para
            </Text>
            <Text style={{ fontSize: 20, fontWeight: "bold"}}>
                ver los favoritos.
            </Text>
            <Button
                title="Ir al Login"
                containerStyle={{ marginTop: 20, width: "80%" }}
                buttonStyle={{ backgroundColor: "#721c1c" }}
                onPress={() => navigation.navigate("account", { screen: "login" })}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        backgroundColor: "#f2f2f2"
    },
    loaderProduct: {
        marginVertical: 10
    }

})
