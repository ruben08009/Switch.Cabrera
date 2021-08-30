import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
  Dimensions,
  StyleSheet
} from 'react-native';
import Input from '../components/input';
import Card from '../components/card';
import NumberContainer from '../components/numberContainer';
import { COLORS } from '../constants/colors';

const StartGameScreen = (props) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState('');

  const handlerInputNumber = (text) => {
    setEnteredValue(text.replace(/[^0-9]/g, ''));
  }

  const handlerResetInput = () => {
    setEnteredValue('');
    setConfirmed(false);
  }

  const handlerConfirmInput = () => {
    const chosenNumber = parseInt(enteredValue);
    if (chosenNumber === NaN || chosenNumber <= 0 || chosenNumber > 99) return;

    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue('');
  }

  let confirmedOutput;
  if (confirmed) {
    confirmedOutput = (
      <Card>
        <Text style={styles.cardTitle}>Numero elegido</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <Button title="EMPEZAR JUEGO" onPress={() => props.onStartGame(selectedNumber)} color={COLORS.primary} />
      </Card>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'position' : 'height'}
      keyboardVerticalOffset={30}
      style={styles.container}
    >
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.screen}>
            <Text style={styles.title}>Comenzar Juego</Text>
            <Card style={styles.inputContainer}>
              <Text  style={styles.textIContainer}>Elija un número</Text>
              <Input
                blurOnSubmit
                autoCapitalization="none"
                autoCorrect={false}
                keyboardType="numeric"
                maxLength={2}
                value={enteredValue}
                onChangeText={handlerInputNumber}
              />
              <View style={styles.buttonContainer}>
                <View style={styles.button}>
                  <Button title="Limpiar" onPress={handlerResetInput} color={COLORS.accent} />
                </View>
                <View style={styles.button}>
                  <Button title="Confirmar" onPress={handlerConfirmInput} color={COLORS.primary} />
                </View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    marginVertical: 10,
    fontFamily: 'caveat-bold',
  },
  inputContainer: {
    width: '80%',
    maxWidth: '95%',
    minWidth: 300,
    marginBottom: 10,
    fontFamily: 'caveat-regular',
  },
 textIContainer:{
  fontSize: 30,
  fontFamily: 'caveat-regular',
 },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  button: {
    width: Dimensions.get('window').width / 4,
  },
  cardTitle:{
    fontSize: 30,
    fontFamily: 'caveat-regular', 
  }
});

export default StartGameScreen;