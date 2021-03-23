import React, { useState, useEffect } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'

import Loading from '../../components/Loading'
import { getDocumentById } from '../../utils/actions'

export default function Product({ navigation, route }) {
    const { id, nameProduct } = route.params
    const [product, setProduct] = useState(null)
    
    navigation.setOptions({ title: nameProduct })

    useEffect(() => {
        (async() => {
            const response = await getDocumentById("products", id)
            if (response.statusResponse) {
                setProduct(response.document)
            } else {
                setProduct({})
                Alert.alert("Ocurrio un problema cargando la opcion escogida.")
            }
        })()
    }, [])

    if (!product){
        return <Loading isVisible={true} text="Cargando..."/>
    }
    return (
        <View>
            <Text>{product.description}</Text>
        </View>
    )
}

const styles = StyleSheet.create({})
