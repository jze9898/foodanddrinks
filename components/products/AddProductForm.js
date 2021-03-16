import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import CountryPicker from 'react-native-country-picker-modal'

export default function AddProductForm({ toastRef, setLoading, navigation }) {
    const addProduct = () => {
        console.log("ga")
    }

    return (
        <View style={styles.viewContainer}>
            <FormAdd/>
            <Button
                title="Crear Producto"
                onPress={addProduct}
                buttonStyle={styles.btnAddProduct}
            />
        </View>
    )
}

function FormAdd(){
    const [country, setCountry] = useState("PE")
    const [callingCode, setCallingCode] = useState("51")
    const [phone, setPhone] = useState("")

    return (
        <View style={styles.viewForm}>
            <Input
                placeholder="Nombre del producto."

            />
            <Input
                placeholder="Nombre del restaurante."
                
            />
            <Input
                placeholder="Clasificacion."
                
            />
            <Input
                placeholder="Tipo."
                
            />
            <Input
                placeholder="Fuente."
                
            />
            <Input
                placeholder="Direccion del restaurante."
                
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
                        setCountry(country.cca2)
                        setCallingCode(country.callingCode[0])
                    }}
                />
                <Input
                    placeholder="Numero del restaurante."
                    keyboardType="phone-pad"
                    containerStyle={styles.inputPhone}
                />
            </View>
            <Input
                placeholder="Tipo de atencion."
                
            />
            <Input
                placeholder="Descripcion del producto."
                multiline
                containerStyle={styles.textArea}
                
            />
            <Input
                placeholder="Precio del producto."
                keyboardType="phone-pad"
                
            />
        </View>
    )
}

const styles = StyleSheet.create({
    viewContainer: {
        height: "100%"
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
    }
})
