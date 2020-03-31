import React from 'react';
import {View, Image, StyleSheet, Button, Text} from 'react-native';
import TitleText from '../components/TitleText';
import BodyText from '../components/BodyText';
import Colors from '../constants/color';
import MainButton from '../components/MainButton';

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <TitleText>The game is over!</TitleText>
            <View style={styles.imageContainer}>
                <Image
                    source={require('../assets/success.png')}
                    //source={{uri:'https://image.shutterstock.com/image-photo/sport-life-achievements-success-concept-600w-165529670.jpg'}}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.resultContainer}>
                <BodyText style={styles.resultText}>Your phone needed                 
                    <Text style={styles.highlight}> {props.roundNumber} </Text> rounds to guess the number
                    <Text style={styles.highlight}> {props.userNumber} </Text>
                </BodyText>
            </View>            
            <MainButton onPress={props.newGame}>NEW GAME</MainButton>            
        </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center'
    },
    imageContainer: {
        borderRadius:100,
        borderWidth: 3,
        borderColor:'black',
        width: 300,
        height: 300,
        overflow: 'hidden',
        marginVertical: 30
    },
    image:{
        width: '100%',
        height: '100%'
    },
    resultContainer: {
        marginHorizontal: 30,
        marginVertical: 15
    },
    resultText:{
        textAlign: 'center',
        fontSize: 20
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    }
});

export default GameOverScreen;