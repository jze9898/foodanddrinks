import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native'
import { SearchBar, ListItem, Icon, Image } from 'react-native-elements'
import { isEmpty, size } from 'lodash'

import { searchTypeAttention } from '../../utils/actions'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function SearchTypeAttention({ navigation }) {
    const [search, setSearch] = useState("")
    const [products, setProducts] = useState([])

    useEffect(() => {
        if (isEmpty(search)) {
            return
        }

        async function getData() {
            const response = await searchTypeAttention(search)
            if (response.statusResponse) {
                setProducts(response.products)
            }
        }
        getData();
    }, [search])

    return (
        <ScrollView>
            <SearchBar
                placeholder="Ingrese el tipo de comida que busques..."
                onChangeText={(e) => setSearch(e)}
                containerStyle={styles.searchBar}
                value={search}
                leftIconContainerStyle={{backgroundColor: 'white'}}
                inputContainerStyle={{backgroundColor: 'white'}}
            />
            {
                size(products) > 0 ? (
                    <FlatList
                        data={products}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={(product) => 
                            <Product
                                product={product}
                                navigation={navigation}
                            />
                        }
                    />
                ) : (
                    isEmpty(search) ? (
                        <ScrollView style={styles.body}>
                            <View style={styles.categoryContainer1}>
                                <Text style={{ fontWeight: 'normal', textAlign: 'justify' }}>Debido a la situación que todos estamos viviendo, tenemos que cuidarnos, y podrás buscar como deseas
                                    consumir tu comida/bebida. Cuando te decidas, ingrésalo en la barra de búsqueda.
                                </Text>
                            </View>
                            <View style={styles.categoryContainer}>
                                <View style={styles.categoryBtn}>
                                    <View style={styles.categoryIcon}>
                                        <FontAwesome5 name="car-side" size={25} color="#ff2020" />
                                    </View>
                                    <Text style={styles.categoryBtnTxt}>Delivery</Text>
                                </View>
                                <View style={styles.categoryBtn}>
                                    <View style={styles.categoryIcon}>
                                        <FontAwesome5 name="store-alt" size={25} color="#ff2020" />
                                    </View>
                                    <Text style={styles.categoryBtnTxt}>Consumo en local</Text>
                                </View>
                                <View style={styles.categoryBtn}>
                                    <View style={styles.categoryIcon}>
                                        <FontAwesome5 name="people-arrows" size={25} color="#ff2020" />
                                    </View>
                                    <Text style={styles.categoryBtnTxt}>Recojo en local</Text>
                                </View>                          
                            </View>
                        </ScrollView>
                    ) : (
                        <Text style={styles.notFound}>
                            No hay productos que coincidan con el criterio de búsqueda.
                        </Text>
                    )
                )
            }
        </ScrollView>
    )
}

function Product({ product, navigation }) {
    const { id, nameProduct, images, typeAttention } = product.item

    return (
        <ListItem
            style={styles.menuItem}
            onPress={() => navigation.navigate("products", {
                screen: "product",
                params: { id, nameProduct }
            })}
        >
            <Image
                resizeMode="cover"
                PlaceholderContent={<ActivityIndicator color="#fff"/>}
                source={{ uri: images[0] }}
                style={styles.imageRestaurant}
            />
            <ListItem.Content>
                <ListItem.Title style={{fontWeight: "bold"}}>
                    {typeAttention}
                </ListItem.Title>
                <ListItem.Title>
                    {nameProduct}
                </ListItem.Title>
            </ListItem.Content>
            <Icon
                type="material-community"
                name="chevron-right"
            />
        </ListItem>
    )
}

const styles = StyleSheet.create({
    searchBar: {
        marginBottom: 2,
        backgroundColor: "#fff",
        width: '100%',
        alignSelf:'center',
        borderRadius: 5,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 15,
    },
    imageRestaurant: {
        width: 90,
        height: 90
    },
    notFound: {
        alignSelf: "center",
        width: "90%",
        textAlign: "justify"
    },
    menuItem: {
        margin: 10
    },
    categoryContainer1: {
        flexDirection: 'row',
        width: '96%',
        alignSelf: 'center',
        marginTop: 1,
        marginBottom: 1,
    },
    body: {
        padding: 15,
        flexDirection:'column'
    },
    categoryIcon: {
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 50,
        height: 50,
        backgroundColor: '#fdeae7' /* '#FF6347' */,
        borderRadius: 50,
    },
    categoryContainer: {
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'center',
        marginTop: 25,
        marginBottom: 10,
    },
    categoryBtn: {
        flex: 1,
        width: '30%',
        marginHorizontal: 0,
        alignSelf: 'center',
    },
    categoryBtnTxt: {
        alignSelf: 'center',
        textAlign: 'center',
        marginTop: 5,
        color: "#ff2020",
    },
})
