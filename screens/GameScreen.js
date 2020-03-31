import React, { useState, useRef, useEffect } from 'react';
import {View, Text, StyleSheet,Button, Alert, ScrollView, FlatList} from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';
import { Ionicons } from '@expo/vector-icons';

const generateRamdonBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rnNbr = Math.floor(Math.random() * (max - min)) + min;
    if (rnNbr === exclude) {
        return generateRamdonBetween(min, max, exclude);
    }
    else{
        return rnNbr;
    }
};

const renderListItem = (listLength, itemData) => (
<View style={styles.listItem}>
    <BodyText>#{listLength - itemData.index}</BodyText>
    <BodyText>{itemData.item}</BodyText>
</View>);

const GameScreen = props => {
    const initialGuess = generateRamdonBetween(1, 100, props.userChoise);
    const [currentGuess,setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const {userChoise, onGameOver} = props;

    useEffect(() => {
        if(currentGuess === userChoise){            
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoise, onGameOver]);

    const nextGuestHandler = direction => {
        if ((direction === 'lower' && currentGuess < props.userChoise) ||
            (direction === 'greater' && currentGuess > props.userChoise)){
            Alert.alert('Don\' t lie!', 'You know that this is wrong...', 
                        [{text: 'Sorry' , style: 'cancel'}])
            return;
        }
        if(direction === 'lower'){
            currentHigh.current = currentGuess; 
        } else {
            currentLow.current = currentGuess + 1 ;
        }

        const nextNumber = generateRamdonBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        //setRounds(curRounds => curRounds + 1);
        setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses]);
    }

    return(
        <View style={styles.screen}>
            <TitleText>Opponent's Guess</TitleText>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuestHandler.bind(this, 'lower')}>
                    <Ionicons name="md-remove" size={24} color="white"/>
                </MainButton>
                <MainButton onPress={nextGuestHandler.bind(this, 'greater')}>
                    <Ionicons name="md-add" size={24} color="white"/>
                </MainButton>                
            </Card>
            <View style={styles.listContainer}>
                {/* <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index)) }
                </ScrollView> */}
                <FlatList keyExtractor={item => item}
                          data={pastGuesses}
                          renderItem={renderListItem.bind(this, pastGuesses.length)}
                          contentContainerStyle={styles.list}
                />
            </View>            
        </View>        
    );
}

const styles = StyleSheet.create({
   screen: {
       flex: 1,
       padding: 10,
       alignItems: 'center'
   },
   buttonContainer:{
       flexDirection: 'row',
       justifyContent: 'space-around',
       marginTop: 20,
       width: 400,
       maxWidth: '90%'
   },
   listContainer:{
       flex: 1,
       width: '60%'
   },
   list:{
       flexGrow: 1,       
       //    alignItems:'center',
       justifyContent: 'flex-end'
   },
   listItem:{
       borderColor: '#ccc',
       borderWidth:1,
       padding: 15,
       marginVertical: 10,
       backgroundColor:'white',
       flexDirection: 'row',
       justifyContent: 'space-between',
       width: '100%'
   }
});

export default GameScreen;