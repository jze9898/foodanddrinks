import React, { useState, useCallback, useRef, useEffect } from 'react'
import { ScrollView, Alert, Dimensions, StyleSheet, Text, View } from 'react-native'
import { Icon, ListItem, Rating } from 'react-native-elements'
import { map } from 'lodash'
import { useFocusEffect } from '@react-navigation/native'
import firebase from 'firebase/app'
import Toast from 'react-native-easy-toast'

import CarouselImages from '../../components/CarouselImages'
import Loading from '../../components/Loading'
import MapRestaurant from '../../components/products/MapRestaurant'
import { addDocumentWithoutId, getCurrentUser, getDocumentById, getIsFavorite, deleteFavorite } from '../../utils/actions'
import { callNumber, formatPhone, sendWhatsApp } from '../../utils/helpers'
import ListReviews from '../../components/products/ListReviews'

const widthScreen = Dimensions.get("window").width

export default function Product({ navigation, route }) {
    const { id, nameProduct } = route.params
    const toastRef = useRef()

    const [product, setProduct] = useState(null)
    const [activeSlide, setActiveSlide] = useState(0)
    const [isFavorite, setIsFavorite] = useState(false)
    const [userLogged, setUserLogged] = useState(false)
    const [loading, setLoading] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)

    firebase.auth().onAuthStateChanged(user => {
        user ? setUserLogged(true) : setUserLogged(false)
        setCurrentUser(user)
    })

    navigation.setOptions({ title: nameProduct })

    useFocusEffect(
        useCallback(() => {
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
    )
    useEffect(() => {
        (async() => {
            if(userLogged && product) {
                const response = await getIsFavorite(product.id)
                response.statusResponse && setIsFavorite(response.isFavorite)
            }
        })()
    }, [userLogged, product])

    const addFavorite = async() => {
        if(!userLogged) {
            toastRef.current.show("Para agregar el producto a Favoritos, debes estar logueado.", 3000)
            return
        }
        setLoading(true)
        const response = await addDocumentWithoutId("favorites", {
            idUser: getCurrentUser().uid,
            idProduct: product.id
        })
        setLoading(false)
        if(response.statusResponse){
            setIsFavorite(true)
            toastRef.current.show("Producto añadido a Favoritos.", 3000)
        } else {
            toastRef.current.show("No se pudo adicionar el producto a Favoritos.", 3000)
        }
    }

    const removeFavorite = async() => {
        setLoading(true)
        const response = await deleteFavorite(product.id)
        setLoading(false)

        if(response.statusResponse) {
            setIsFavorite(false)
            toastRef.current.show("Producto eliminado de Favoritos.", 3000)
        } else {
            toastRef.current.show("No se pudo eliminar el producto de Favoritos.", 3000)
        }
    }

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
            <View style={styles.viewFavorites}>
                <Icon
                    type="material-community"
                    name={ isFavorite ? "heart" : "heart-outline" }
                    onPress={ isFavorite ? removeFavorite : addFavorite }
                    color="#721c1c"
                    size={35}
                    underlayColor="transparent"
                />
            </View>
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
                currentUser={currentUser}
                callingCode ={product.callingCode}
                phoneNoFormat={product.phone}
            />
            <ListReviews
                navigation={navigation}
                idProduct={product.id}
            />
            <Toast ref={toastRef} position="center" opacity={0.9}/>
            <Loading isVisible={loading} text="Por favor, espere..."/>
        </ScrollView>
    )
}

function RestaurantInfo({ nameProduct, typeProduct, 
    font, location, address, typeAttention, price, phone, currentUser, callingCode, phoneNoFormat }) {
    const listInfo = [
        {type:"address", text: address, iconLeft: "map-marker"},
        {type:"phone", text: phone, iconLeft: "phone", iconRight: "whatsapp"},
        {type:"typeProduct", text: typeProduct, iconLeft: "store"},
        {type:"font", text: font, iconLeft: "food-variant"},
        {type:"typeAttention", text: typeAttention, iconLeft: "table-chair"},
        {type:"price", text: "S/."+price+".00", iconLeft: "cash-multiple"}
    ]

    const actionLeft = (type) => {
        if(type == "phone") {
            callNumber(phone)
        } 
    }

    const actionRight = (type) => {
        if(type == "phone") {
            if (currentUser) {
                sendWhatsApp(`${callingCode}${phoneNoFormat}`, `Hola! Soy ${currentUser.displayName}, estoy interesado en sus servicios y/o productos.`)
            } else {
                sendWhatsApp(phone, `Hola! Estoy interesado en sus servicios.`)
            }
        } 
    }

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
                            name={item.iconLeft}
                            color="#721c1c"
                            onPress={() => actionLeft(item.type)}
                        />
                        <ListItem.Content>
                            <ListItem.Title>{item.text}</ListItem.Title>
                        </ListItem.Content>
                        {
                            item.iconRight && (
                                <Icon
                                    type="material-community"
                                    name={item.iconRight}
                                    color="#721c1c"
                                    onPress={() => actionRight(item.type)}
                                />
                            )
                        }
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
    },
    viewFavorites: {
        position: "absolute",
        top: 0,
        right: 0,
        backgroundColor: "#fff",
        borderBottomLeftRadius: 25,
        padding: 5,
        paddingLeft: 10
    }
})
