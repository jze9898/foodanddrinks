import React, { useState, useEffect } from 'react'
import { ScrollView, Alert, Dimensions, StyleSheet, Text, View } from 'react-native'
import CarouselImages from '../../components/CarouselImages'

import Loading from '../../components/Loading'
import { getDocumentById } from '../../utils/actions'

const widthScreen = Dimensions.get("window").width

export default function Product({ navigation, route }) {
    const { id, nameProduct } = route.params
    const [product, setProduct] = useState(null)
    const [activeSlide, setActiveSlide] = useState(0)
    
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
        <ScrollView style={styles.viewBody}>
            <CarouselImages
                images={product.images}
                height={250}
                width={widthScreen}
                activeSlide={activeSlide}
                setActiveSlide={setActiveSlide}
            />
            <Text>{product.description}</Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1
    }
})
