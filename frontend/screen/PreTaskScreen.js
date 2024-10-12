import { View, Text, StyleSheet, ImageBackground, Button, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';

export default function PreTaskScreen() {
    const navigation = useNavigation();


    const handleServiceNavigation = () => {
        navigation.navigate("Game"); // Use navigation to go to the Plastic screen
      };
  return (
    <ImageBackground
      source={require('../assets/bg2.png')} // Use the appropriate background image
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.header}>Task</Text>
        <Text style={styles.subHeader}>Earn rewards with the goal.....</Text>

        <View style={styles.stepContainer}>
          <View style={styles.step}>
            <View style={styles.circle}>
              <Text style={styles.stepText}>1</Text>
            </View>
          </View>
          <Text style={styles.arrow}>→</Text>
          <View style={styles.step}>
            <View style={styles.circle}>
              <Text style={styles.stepText}>2</Text>
            </View>
          </View>
        </View>

        <Text style={styles.stepLabel}>Step 1</Text>
        <Text style={styles.stepLabel}>Step 2</Text>

        <Text style={styles.instructionHeader}>How to start the task......</Text>
        <View style={styles.videoContainer}>
          {/* Corrected Image component usage */}
          <Image
            source={{ uri: 'https://st2.depositphotos.com/1823785/7833/i/450/depositphotos_78333908-stock-photo-many-people-hands-holding-red.jpg' }}
            style={styles.videoPlaceholder}
            resizeMode="contain" // Use contain to fit the image properly
          />
        </View>

        <TouchableOpacity style={styles.storeButton} onPress={handleServiceNavigation}>
          <Text style={{color:'#FFFFFF'}}>Start</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  storeButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
   
  },
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000', // Header color
  },
  subHeader: {
    fontSize: 16,
    color: '#000000', // Subheader color
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  step: {
    alignItems: 'center',
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: '#000000',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // Circle background color
  },
  stepText: {
    fontWeight: 'bold',
    color: '#000000',
  },
  arrow: {
    fontSize: 24,
    color: '#000000',
  },
  stepLabel: {
    fontSize: 14,
    color: '#000000',
    textAlign: 'center',
  },
  instructionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 20,
  },
  videoContainer: {
    width: '100%',
    height: 200,
    backgroundColor: '#e0e0e0', // Placeholder color for video
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    borderRadius: 10,
  },
  videoPlaceholder: {
    width: '100%',
    height: '100%', // Adjust the image to cover the container
  },
});
