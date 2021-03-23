import React, { useState, useEffect } from 'react'
import { ScrollView, Alert, Dimensions, StyleSheet, Text, View } from 'react-native'
import { Icon, ListItem, Rating } from 'react-native-elements'
import { map } from 'lodash'

import CarouselImages from '../../components/CarouselImages'
import Loading from '../../components/Loading'
import MapRestaurant from '../../components/products/MapRestaurant'
import { getDocumentById } from '../../utils/actions'
import { formatPhone } from '../../utils/helpers'

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
            <RestaurantInfo
                nameProduct={product.nameProduct}
                typeProduct={product.typeProduct}
                font={product.font}
                location={product.location}
                address={product.address}
                typeAttention={product.typeAttention}
                price={product.price}
                phone={formatPhone(product.callingCode, product.phone)}
            />
        </ScrollView>
    )
}

function RestaurantInfo({ nameProduct, typeProduct, 
    font, location, address, typeAttention, price, phone }) {
    const listInfo = [
        {text: address, iconName: "map-marker"},
        {text: phone, iconName: "phone"},
        {text: typeProduct, iconName: "store"},
        {text: font, iconName: "food-variant"},
        {text: typeAttention, iconName: "table-chair"},
        {text: "S/."+price+".00", iconName: "cash-multiple"}
    ]
    return (
        <View style={styles.viewRestaurantInfo}>
            <Text style={styles.RestaurantInfoTitle}>
                Informacion sobre el restaurante
            </Text>
            <MapRestaurant
                location={location}
                name={nameProduct}
                height={150}
            />
            {
                map(listInfo, (item, index) => (
                    <ListItem
                        key={index}
                        style={styles.containerListItem}
                    >
                        <Icon
                            type="material-community"
                            name={item.iconName}
                            color="#721c1c"
                        />
                        <ListItem.Content>
                            <ListItem.Title>{item.text}</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                ))
            }
        </View>
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
        marginRight: 95,
        fontSize: 15
    },
    viewRestaurantInfo: {
        margin: 15,
        marginTop: 12
    },
    RestaurantInfoTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15
    },
    containerListItem: {
        borderBottomColor: "#721c1c",
        borderBottomWidth: 1
    }
})
