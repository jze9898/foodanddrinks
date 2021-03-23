import React, { useState, useEffect } from 'react'
import { ScrollView, Alert, Dimensions, StyleSheet, Text, View } from 'react-native'
import { Rating } from 'react-native-elements'
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
            <TitleProduct
                nameProduct={product.nameProduct}
                nameRestaurant={product.nameRestaurant}
                description={product.description}
                rating={product.rating}
            />
        </ScrollView>
    )
}

function TitleProduct({ nameProduct, nameRestaurant, description, rating }){
    return(
        <View style={styles.viewProductTtitle}>
            <View style={styles.viewProductContainer}>
                <Text style={styles.nameProduct}>{nameProduct}</Text>
                <Rating
                    style={styles.rating}
                    imageSize={20}
                    readonly
                    startingValue={parseFloat(rating)}
                /> 
            </View>
            <Text style={styles.descriptionRest}>{nameRestaurant}</Text>
            <Text style={styles.descriptionProduct}>{description}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        backgroundColor: "#fff"
    },
    viewProductTtitle: {
        padding: 15
    },
    viewProductContainer: {
        flexDirection: "row"
    },
    descriptionRest: {
        marginTop: 4,
        color: "black",
        textAlign: "justify"
    },
    descriptionProduct: {
        marginTop: 4,
        color: "gray",
        textAlign: "justify"
    },
    rating: {
        position: "absolute",
        right: 0
    },
    nameProduct: {
        fontWeight: "bold",
        marginRight: 85
    }
})
