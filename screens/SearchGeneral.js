import React from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

import Swiper from 'react-native-swiper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function SearchGeneral() {
    const navigation = useNavigation()

    return (
        <ScrollView style={styles.body}>
            <View style={styles.categoryContainer1}>
                <Text style={{ fontWeight: 'bold', marginBottom: 10, textAlign: 'justify' }}>Para poder ayudarte con la busqueda de tu Comida/Bebida
                    ideal, tenemos estas opciones para ti:
                </Text>
            </View>
            <View style={styles.categoryContainer}>
                <TouchableOpacity
                    style={styles.categoryBtn}
                    onPress={() =>
                        navigation.navigate('search')
                    }>
                    <View style={styles.categoryIcon}>
                        <MaterialIcons name="menu-book" size={35} color="#ff2020" />
                    </View>
                    <Text style={styles.categoryBtnTxt}>Nombre del Producto</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.categoryBtn}
                    onPress={() =>
                        navigation.navigate("search-restaurant")
                    }>
                    <View style={styles.categoryIcon}>
                        <MaterialIcons name="food-bank" size={35} color="#ff2020" />
                    </View>
                    <Text style={styles.categoryBtnTxt}>Nombre del Restaurante</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.categoryBtn}
                    onPress={() =>
                        navigation.navigate("search-font")
                    }>
                    <View style={styles.categoryIcon}>
                        <MaterialIcons name="brunch-dining" size={35} color="#ff2020" />
                    </View>
                    <Text style={styles.categoryBtnTxt}>Tipo de Comida/Bebida/Insumo</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.categoryContainer, {marginTop: 12}]}>
                <TouchableOpacity
                    style={styles.categoryBtn}
                    onPress={() =>
                        navigation.navigate("search-typeattention")
                    }>
                    <View style={styles.categoryIcon}>
                        <MaterialIcons name="delivery-dining" size={35} color="#ff2020" />
                    </View>
                    <Text style={styles.categoryBtnTxt}>Tipo de Atencion</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.categoryBtn}
                    onPress={() =>
                        navigation.navigate("search-price")
                    }>
                    <View style={styles.categoryIcon}>
                        <MaterialIcons name="local-atm" size={35} color="#ff2020" />
                    </View>
                    <Text style={styles.categoryBtnTxt}>Precio</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.categoryBtn}
                    onPress={() =>
                        navigation.navigate("location-near")
                    }>
                    <View style={styles.categoryIcon}>
                        <MaterialIcons name="explore" size={35} color="#ff2020" />
                    </View>
                    <Text style={styles.categoryBtnTxt}>Cerca de ti</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.sliderContainer}>
            <Swiper
                autoplay
                horizontal={false}
                height={200}
                activeDotColor="#ff2020">
                <View style={styles.slide}>
                    <Image
                    source={require('../assets/banners/cusco-banner1.jpg')}
                    resizeMode="cover"
                    style={styles.sliderImage}
                    />
                </View>
                <View style={styles.slide}>
                    <Image
                    source={require('../assets/banners/cusco-banner2.jpg')}
                    resizeMode="cover"
                    style={styles.sliderImage}
                    />
                </View>
                <View style={styles.slide}>
                    <Image
                    source={require('../assets/banners/cusco-banner3.jpg')}
                    resizeMode="cover"
                    style={styles.sliderImage}
                    />
                </View>
                <View style={styles.slide}>
                    <Image
                    source={require('../assets/banners/cusco-banner4.jpg')}
                    resizeMode="cover"
                    style={styles.sliderImage}
                    />
                </View>
                <View style={styles.slide}>
                    <Image
                    source={require('../assets/banners/cusco-banner5.jpg')}
                    resizeMode="cover"
                    style={styles.sliderImage}
                    />
                </View>
                <View style={styles.slide}>
                    <Image
                    source={require('../assets/banners/cusco-banner6.jpg')}
                    resizeMode="cover"
                    style={styles.sliderImage}
                    />
                </View>
                <View style={styles.slide}>
                    <Image
                    source={require('../assets/banners/cusco-banner7.jpg')}
                    resizeMode="cover"
                    style={styles.sliderImage}
                    />
                </View>
            </Swiper>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    body: {
        padding: 15,
        flexDirection:'column'
    },
    images: {
        width: 75,
        height: 75,
    },
    row: {
        padding: 10,
        flexDirection: 'row',
        borderColor: "#ff2020",
        borderBottomWidth: 1,
    },
    txt1: {
        marginLeft: 10,
        alignSelf: 'center'
    },
    row1: {
        padding: 10,
        flexDirection: 'row',
        borderColor: "#ff2020",
        borderBottomWidth: 1,
        marginBottom: 30
    },
    categoryIcon: {
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 70,
        height: 70,
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
    categoryContainer1: {
        flexDirection: 'row',
        width: '92%',
        alignSelf: 'center',
        marginTop: 1,
        marginBottom: 1,
    },
    sliderContainer: {
        height: 200,
        width: '90%',
        marginTop: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 8,
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderRadius: 8,
    },
    sliderImage: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 8,
    }
})
