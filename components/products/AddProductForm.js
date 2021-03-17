import React, { useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Avatar, Button, Icon, Input } from 'react-native-elements'
import CountryPicker from 'react-native-country-picker-modal'
import { Picker } from '@react-native-picker/picker'
import { map, size, filter } from 'lodash'

import { loadImageFromGallery } from '../../utils/helpers'

export default function AddProductForm({ toastRef, setLoading, navigation }) {
    const [formData, setFormData] = useState(defaultFormValues())
    const [errorNameProduct, setErrorNameProduct] = useState(null)
    const [errorNameRestaurant, setErrorNameRestaurant] = useState(null)
    const [errorClass, setErrorClass] = useState(null)
    const [errorType, setErrorType] = useState(null)
    const [errorFont, setErrorFont] = useState(null)
    const [errorAddress, setErrorAddress] = useState(null)
    const [errorPhone, setErrorPhone] = useState(null)
    const [errorDescription, setErrorDescription] = useState(null)
    const [errorPrice, setErrorPricer] = useState(null)
    const [errorTypeAttention, setErrorTypeAttention] = useState(null)
    const [imagesSelected, setImagesSelected] = useState([])

    const addProduct = () => {
        console.log(formData)
        console.log("ga")
    }

    return (
        <View style={styles.viewContainer}>
            <FormAdd
                formData={formData}
                setFormData={setFormData}
                errorNameProduct={errorNameProduct}
                errorNameRestaurant={errorNameRestaurant}
                errorAddress={errorAddress}
                errorPhone={errorPhone}
                errorDescription={errorDescription}
                errorPrice={errorPrice}
            />
            <UploadImage
                toastRef={toastRef}
                imagesSelected={imagesSelected}
                setImagesSelected={setImagesSelected}
            />
            <Button
                title="Crear Producto"
                onPress={addProduct}
                buttonStyle={styles.btnAddProduct}
            />
        </View>
    )
}

function UploadImage({ toastRef, imagesSelected, setImagesSelected }) {
    const imageSelect = async() => {
        const response = await loadImageFromGallery([4,3])
        if (!response.status){
            toastRef.current.show("No has seleccionado ninguna imagen", 3000)
            return
        }
        setImagesSelected([...imagesSelected, response.image])
    }
    const removeImage = (image) => {
        Alert.alert(
            "Eliminar Imagen",
            "¿Estas seguro que deseas eliminar la imagen?",
            [
                {
                    text: "No",
                    style: "cancel"
                },
                {
                    text: "Si",
                    onPress: () => {
                        setImagesSelected(
                            filter(imagesSelected, (imageUrl) => imageUrl !== image)
                        )
                    }
                }
            ],
            {
                cancelable: true
            }
        )
    }

    return (
        <ScrollView
            horizontal
            style={styles.viewImage}
        >
            {
                size(imagesSelected) < 10 && ( 
                    <Icon
                    type="material-community"
                    name="camera"
                    color="#7a7a7a"
                    containerStyle={styles.containerIcon}
                    onPress={imageSelect}
                    />
                )
            }
            {
                map(imagesSelected, (imageProduct, index) => (
                    <Avatar
                        key={index}
                        style={styles.miniatureStyle}
                        source={{uri: imageProduct}}
                        onPress={() => removeImage(imageProduct)}

                    />
                ))
            }

        </ScrollView>
    )
}

function FormAdd({ formData, setFormData, errorNameProduct, errorNameRestaurant, errorAddress, errorPhone, errorDescription, errorPrice }){
    const [country, setCountry] = useState("PE")
    const [callingCode, setCallingCode] = useState("51")
    const [phone, setPhone] = useState("")
    const [selectedClass, setSelectedClass] = useState("")
    const [selectedType, setSelectedType] = useState("")
    const [selectedFont, setSelectedFont] = useState("")
    const [selectedAttentionType, setSelectedAttentionType] = useState("")

    const onChange= (e, type) => {
        setFormData({ ...formData, [type] : e.nativeEvent.text })
    }

    return (
        <View style={styles.viewForm}>
            <Input
                placeholder="Nombre del producto."
                defaultValue={formData.nameProduct}
                onChange={(e) => onChange(e, "nameProduct")}
                errorMessage={errorNameProduct}

            />
            <Input
                placeholder="Nombre del restaurante."
                defaultValue={formData.nameRestaurant}
                onChange={(e) => onChange(e, "nameRestaurant")}
                errorMessage={errorNameRestaurant}
                
            />
            <Picker
                selectedValue={selectedClass}
                style={styles.pickerClass}
                onValueChange={(itemValue) =>{
                   setSelectedClass(itemValue)
                   setFormData({
                        ...formData, 
                        "class": itemValue
                })   
                }}
            >
                <Picker.Item label="Comida" value="Comida"/>
                <Picker.Item label="Bebida" value="Bebida"/>
                
            </Picker>
            {/* <Input
                placeholder="Clasificacion."
                
            /> */}
            <Picker
                selectedValue={selectedType}
                style={styles.pickerClass}
                onValueChange={(itemValue) =>{
                    setSelectedType(itemValue)
                    setFormData({
                        ...formData, 
                        "typeProduct": itemValue 
                    })    
            }}
            >
                <Picker.Item label="Casero" value="Casero"/>
                <Picker.Item label="Restaurante" value="Restaurante"/>
                <Picker.Item label="Quinta" value="Quinta"/>
                <Picker.Item label="Tipica" value="Tipica"/>
                <Picker.Item label="Extravagante" value="Extravagante"/>
                <Picker.Item label="Vegana" value="Vegana"/>
                
            </Picker>
            {/* <Input
                placeholder="Tipo."
                
            /> */}
            <Picker
                selectedValue={selectedFont}
                style={styles.pickerClass}
                onValueChange={(itemValue) =>{
                    setSelectedFont(itemValue)
                    setFormData({
                        ...formData,
                        "font": itemValue
                    }) 
                }
            }
            >
                <Picker.Item label="Mariscos" value="Mariscos"/>
                <Picker.Item label="Pescado" value="Pescado"/>
                <Picker.Item label="Carnes" value="Carnes"/>
                <Picker.Item label="Pollo" value="Pollo"/>
                <Picker.Item label="Cerdo" value="Cerdo"/>
                <Picker.Item label="Vegetales" value="Vegetales"/>
                <Picker.Item label="Pavo" value="Pavo"/>
                <Picker.Item label="Bebidas calientes" value="Bebidas calientes"/>
                <Picker.Item label="Bebidas frias" value="Bebidas frias"/>
                <Picker.Item label="Bebidas alcoholicas" value="Bebidas alcoholicas"/>
                <Picker.Item label="Empanadas" value="Empanadas"/>
                <Picker.Item label="Postres" value="Postres"/>
            </Picker>
            {/* <Input
                placeholder="Fuente."
                
            /> */}
            <Input
                placeholder="Direccion del restaurante."
                multiline
                defaultValue={formData.address}
                onChange={(e) => onChange(e, "address")}
                errorMessage={errorAddress}
                
            />
            <View style={styles.phoneView}>
                <CountryPicker
                    withFlag
                    withCallingCode
                    withFilter
                    withCallingCodeButton
                    containerStyle = {styles.countryPicker}
                    countryCode={country}
                    onSelect={(country) => {
                        setFormData({
                            ...formData, 
                            "country": country.cca2, 
                            "callingCode": country.callingCode[0] 
                        })
                        setCountry(country.cca2)
                        setCallingCode(country.callingCode[0])
                    }}
                />
                <Input
                    placeholder="Numero del restaurante."
                    keyboardType="phone-pad"
                    containerStyle={styles.inputPhone}
                    defaultValue={formData.phone}
                    onChange={(e) => onChange(e, "phone")}
                    errorMessage={errorPhone}
                />
            </View>
            <Picker
                selectedValue={selectedAttentionType}
                style={styles.pickerClass}
                onValueChange={(itemValue) =>{
                    setSelectedAttentionType(itemValue)
                    setFormData({
                        ...formData,
                        "typeAttention": itemValue
                    })
                }
            }
            >
                <Picker.Item label="Delivery" value="Delivery"/>
                <Picker.Item label="Consumo en local" value="Consumo en local"/>
                <Picker.Item label="Recojo en local" value="Recojo en local"/>
            </Picker>
            {/* <Input
                placeholder="Tipo de atencion."
                
            /> */}
            <Input
                placeholder="Descripcion del producto."
                multiline
                containerStyle={styles.textArea}
                defaultValue={formData.description}
                onChange={(e) => onChange(e, "description")}
                errorMessage={errorDescription}
                
            />
            <Input
                placeholder="Precio del producto."
                keyboardType="phone-pad"
                defaultValue={formData.price}
                onChange={(e) => onChange(e, "price")}
                errorMessage={errorPrice}
            />
        </View>
    )
}
const defaultFormValues = () => {
    return{
        nameProduct: "",
        nameRestaurant: "",
        class: "",
        typeProduct: "",
        font: "",
        address: "",
        country: "PE",
        callingCode: "51",
        phone: "",
        typeAttention: "",
        description: "",
        price: ""
    }
}

const styles = StyleSheet.create({
    viewContainer: {
        height: "100%",
        marginTop: 6
    },
    viewForm: {
        marginHorizontal: 10
    },
    textArea: {
        height: 100,
        width: "100%"
    },
    phoneView: {
        width: "80%",
        flexDirection: "row",
        marginLeft: 12
    },
    inputPhone: {
        width: "80%"
    },
    btnAddProduct: {
        margin: 20,
        backgroundColor: "#721c1c"
    },
    pickerClass: {
        width: "100%",
        height: 35,
        marginBottom: 10,
        marginLeft: 2
    },
    viewImage: {
        flexDirection: "row",
        marginHorizontal: 20,
        marginTop: 30
    },
    containerIcon: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        height: 70,
        width: 70,
        backgroundColor: "#e3e3e3"
    },
    miniatureStyle: {
        width: 70,
        height: 70,
        marginRight: 10
    }
})
