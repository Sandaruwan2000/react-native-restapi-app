import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function StartScreen() {

    const navigation = useNavigation();


    const handleServiceNavigation = () => {
        navigation.navigate("Signin"); // Use navigation to go to the Plastic screen
      };
  return (
    <ImageBackground
      source={require('../assets/bg6.png')} // Replace with your image URL
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Button positioned in the center */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={handleServiceNavigation}>Slide to Start</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    top:-50,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5, // For Android shadow
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
