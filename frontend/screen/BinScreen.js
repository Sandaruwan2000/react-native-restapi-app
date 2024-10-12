import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BinScreen() {
  const [email, setEmail] = useState(null); // Store logged-in email
  const [binType, setBinType] = useState(''); // Bin type
  const [height, setHeight] = useState(0); // Default height
  const [imageIndex, setImageIndex] = useState(0); // Current image index
  const [createdBins, setCreatedBins] = useState([]); // Store created bins
  const [maxBinsReached, setMaxBinsReached] = useState(false); // Check if max bins are reached

  // Images to choose from
  const images = [
    'https://i.imgur.com/UrVvG11.png',
    'https://i.imgur.com/FzPclqk.png',
    'https://imgur.com/bYd1gP6.png',
  ];

  useEffect(() => {
    // Fetch logged-in email from AsyncStorage
    const fetchEmail = async () => {
      const userEmail = await AsyncStorage.getItem('userEmail');
      setEmail(userEmail);
    };
    fetchEmail();
  }, []);

  const handleSubmit = async () => {
    if (!binType || !images[imageIndex]) {
      alert("Please enter bin type and choose an image.");
      return;
    }

    if (createdBins.length >= 3) {
      setMaxBinsReached(true);
      return;
    }

    try {
      const response = await fetch('http://192.168.8.130:3000/backend/bin/Createbin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          bin_type: binType,
          height,
          image: images[imageIndex],
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setCreatedBins(prevBins => [...prevBins, { binType, height, image: images[imageIndex] }]);
        alert('Bin uploaded successfully!');
        setBinType('');
        setHeight(10);
        setImageIndex(0);
      } else {
        console.error("Error uploading bin:", data);
        alert('Failed to upload bin.');
      }
    } catch (error) {
      console.error("Error uploading bin:", error);
      alert('Failed to upload bin.');
    }
  };

  const goToNextImage = () => {
    setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevImage = () => {
    setImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (

    <ImageBackground
    source={require('../assets/bg2.png')} // Replace with your image URL
    style={styles.background}
  >
    <View style={styles.container}>

      
      <Text style={styles.title}>Upload Bin</Text>

      {maxBinsReached ? (
        <Text style={styles.maxBinsMessage}>You can only create up to 3 bins. Please manage your existing bins.</Text>
      ) : (
        <>
          <Text style={styles.label}>Choose an Image:</Text>
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={goToPrevImage}>
              <Text style={styles.arrow}>←</Text>
            </TouchableOpacity>

            <Image 
              source={{ uri: images[imageIndex] }} 
              style={styles.image} 
            />

            <TouchableOpacity onPress={goToNextImage}>
              <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.label}>Bin Type:</Text>
          <TextInput
            style={styles.input}
            value={binType}
            onChangeText={setBinType}
            placeholder="Enter bin type"
          />
          <Button title="Submit" onPress={handleSubmit} color="#008000" />
        </>
      )}
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'transparent',
  },

  background: {
    flex: 1, 
    justifyContent: 'center', 
    width: '100',
  },
  title: {
    fontSize: 26,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  label: {
    fontSize: 24,
    marginBottom: 5,
    color: '#FFFFFF',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  image: {
    width: 150, // Increased size
    height: 150, // Increased size
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 2,
    backgroundColor: '#fff',
  },
  arrow: {
    fontSize: 30,
    paddingHorizontal: 20,
    color: '#6200EE',
  },
  maxBinsMessage: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
});
