import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native'
import { SearchBar, ListItem, Icon, Image } from 'react-native-elements'
import { isEmpty, size } from 'lodash'

import { searchProducts } from '../utils/actions'

export default function Search({ navigation }) {
    const [search, setSearch] = useState("")
    const [products, setProducts] = useState([])

    useEffect(() => {
        if (isEmpty(search)) {
            return
        }

        async function getData() {
            const response = await searchProducts(search)
            if (response.statusResponse) {
                setProducts(response.products)
            }
        }
        getData();
    }, [search])

    return (
        <ScrollView>
            <SearchBar
                placeholder="Ingrese el nombre del producto..."
                onChangeText={(e) => setSearch(e)}
                containerStyle={styles.searchBar}
                value={search}
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
                        <Text style={styles.notFound}>
                            Ingrese las primeras letras del nombre del producto.{"\n"}
                        </Text>

                    ) : (
                        <Text style={styles.notFound}>
                            No hay restaurantes que coincidan con el criterio de busqueda.
                        </Text>
                    )
                )
            }
        </ScrollView>
    )
}

function Product({ product, navigation }) {
    const { id, nameProduct, images } = product.item

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
        marginBottom: 8,
        backgroundColor: "#fff"
    },
    imageRestaurant: {
        width: 90,
        height: 90
    },
    notFound: {
        alignSelf: "center",
        width: "90%"
    },
    menuItem: {
        margin: 10
    }
})
