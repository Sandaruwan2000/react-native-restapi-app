import { View, Text, StyleSheet, Image, ScrollView, ImageBackground } from 'react-native';
import React from 'react';

export default function BuyerScreen() {
  // Sample data to render buyer details
  const buyers = [
    {
      name: 'Saman',
      price: '1kg - 2$',
      image: 'https://img.freepik.com/free-photo/top-view-plastic-bags-arrangement_23-2149439632.jpg?size=626&ext=jpg&ga=GA1.2.1428904956.1720906317&semt=ais_hybrid-rr-similar', // Replace with your image URL
    },
    {
      name: 'Nimal',
      price: '1kg - 3$',
      image: 'https://img.freepik.com/premium-photo/reducing-singleuse-plastics-is-significant-step-towards-sustainability_727137-20589.jpg?size=626&ext=jpg&ga=GA1.2.1428904956.1720906317&semt=ais_hybrid-rr-similar', // Replace with your image URL
    },
    {
      name: 'Kmal',
      price: '1kg - 1$',
      image: 'https://img.freepik.com/premium-photo/closeup-recyclable-plastic-waste_861973-36571.jpg?w=826', // Replace with your image URL
    },
  ];

  return (

    <ImageBackground
      source={require('../assets/bg2.png')} // Replace with your image URL
      style={styles.background}
    >
    <View style={styles.container}>
      <Text style={styles.header}>Buyers</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {buyers.map((buyer, index) => (
          <View key={index} style={styles.buyerCard}>
            <Image source={{ uri: buyer.image }} style={styles.image} />
            <Text style={styles.buyerName}>{buyer.name}</Text>
            <Text style={styles.buyerPrice}>{buyer.price}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent', // Light background color
    padding: 20,
  },

  background: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000000', // Header color
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  buyerCard: {
    backgroundColor: '#D3D3D3', // Card background color
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 2, // Android shadow effect
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  buyerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  buyerPrice: {
    fontSize: 16,
    color: '#FF5722', // Price color
  },
});
