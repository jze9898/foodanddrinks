import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import CountryPicker from 'react-native-country-picker-modal'
import {Picker} from '@react-native-picker/picker'

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
    const [selectedClass, setSelectedClass] = useState("")
    const [selectedType, setSelectedType] = useState("")
    const [selectedFont, setSelectedFont] = useState("")
    const [selectedAttentionType, setSelectedAttentionType] = useState("")

    return (
        <View style={styles.viewForm}>
            <Input
                placeholder="Nombre del producto."

            />
            <Input
                placeholder="Nombre del restaurante."
                
            />
            <Picker
                selectedValue={selectedClass}
                style={styles.pickerClass}
                onValueChange={(itemValue) =>
                   setSelectedClass(itemValue) }
            >
                <Picker.Item label="Comida" value="comida"/>
                <Picker.Item label="Bebida" value="bebida"/>
                
            </Picker>
            {/* <Input
                placeholder="Clasificacion."
                
            /> */}
            <Picker
                selectedValue={selectedType}
                style={styles.pickerClass}
                onValueChange={(itemValue) =>
                   setSelectedType(itemValue) }
            >
                <Picker.Item label="Casero" value="casero"/>
                <Picker.Item label="Restaurante" value="restaurante"/>
                <Picker.Item label="Quinta" value="quinta"/>
                <Picker.Item label="Tipica" value="tipica"/>
                <Picker.Item label="Extravagante" value="extravagante"/>
                <Picker.Item label="Vegana" value="vegana"/>
                
            </Picker>
            {/* <Input
                placeholder="Tipo."
                
            /> */}
            <Picker
                selectedValue={selectedFont}
                style={styles.pickerClass}
                onValueChange={(itemValue) =>
                   setSelectedFont(itemValue) }
            >
                <Picker.Item label="Mariscos" value="mariscos"/>
                <Picker.Item label="Pescado" value="pescado"/>
                <Picker.Item label="Carnes" value="carnes"/>
                <Picker.Item label="Pollo" value="pollo"/>
                <Picker.Item label="Cerdo" value="cerdo"/>
                <Picker.Item label="Vegetales" value="vegetales"/>
                <Picker.Item label="Pavo" value="pavo"/>
                <Picker.Item label="Bebidas calientes" value="bebidacaliente"/>
                <Picker.Item label="Bebidas frias" value="bebidasfrias"/>
                <Picker.Item label="Bebidas alcoholicas" value="bebidasalcoholicas"/>
                <Picker.Item label="Empanadas" value="empanadas"/>
                <Picker.Item label="Postres" value="postres"/>
            </Picker>
            {/* <Input
                placeholder="Fuente."
                
            /> */}
            <Input
                placeholder="Direccion del restaurante."
                multiline
                
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
            <Picker
                selectedValue={selectedAttentionType}
                style={styles.pickerClass}
                onValueChange={(itemValue) =>
                   setSelectedAttentionType(itemValue) }
            >
                <Picker.Item label="Delivery" value="delivery"/>
                <Picker.Item label="Consumo en local" value="consumolocal"/>
                <Picker.Item label="Recojo en local" value="recojolocal"/>
            </Picker>
            {/* <Input
                placeholder="Tipo de atencion."
                
            /> */}
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
    }
})
