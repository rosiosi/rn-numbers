import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/color'

const Header = props => {
    return(
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{props.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        width: '100%',
        height: 90,
        padding:50,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerTitle:{
        color: 'white',
        fontSize: 18,
        fontFamily: 'open-sans-bold'
    }
});

export default Header;