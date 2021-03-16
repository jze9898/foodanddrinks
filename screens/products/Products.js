import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'

import Loading from '../../components/Loading'
import { getCurrentUser } from '../../utils/actions'

export default function Products() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        setUser(getCurrentUser()) 
    }, [])

    if(user === null){
        return <Loading isVisible={true} text="Cargando..."/>
    }

    return (
        <View style={styles.view}>
            <Text>Products</Text>
            {
                user && (
                <Icon
                type="material-community"
                name="plus"
                color="#721c1c"
                reverse
                containerStyle={styles.btnContainer}
                />  
                )
            } 
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
    },
    btnContainer: {
        position: "absolute",
        bottom: 10,
        right: 10,
        shadowColor: "black",
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.5
    }
})
