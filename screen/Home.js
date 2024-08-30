import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TextInput } from 'react-native';
import { Button } from 'react-native-paper';

const Home = ({ navigation }) => {
  const Image1 = require('./../assets/i1.jpg'); 
  const Image2 = require('./../assets/i3.jpg');
  const Image3 = require('./../assets/i6.avif');
  const Image4 = require('./../assets/12.jpg');
  const Image5 = require('./../assets/i4.jpg');
  const Image6 = require('./../assets/i8.jpg');

  const handleProductList = () => {
    navigation.navigate("ProductList");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to Our Store</Text>
      </View>

      <TextInput
        style={styles.searchBar}
        placeholder="Search for products..."
      />

      <Button
        mode="contained"
        onPress={handleProductList}
        style={styles.button}
      >
        Product List
      </Button>

      <View style={styles.table}>
        <View style={styles.row}>
          <View style={styles.cell}>
            <View style={styles.imageContainer}>
              <Image source={Image6} style={styles.image} />
              <Text style={styles.imageText}>Puma Shoes</Text>
            </View>
          </View>
          <View style={styles.cell}>
            <View style={styles.imageContainer}>
              <Image source={Image1} style={styles.image} />
              <Text style={styles.imageText}>Nike Shoes</Text>
            </View>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.cell}>
            <View style={styles.imageContainer}>
              <Image source={Image2} style={styles.image} />
              <Text style={styles.imageText}>Puma Shoes</Text>
            </View>
          </View>
          <View style={styles.cell}>
            <View style={styles.imageContainer}>
              <Image source={Image3} style={styles.image} />
              <Text style={styles.imageText}>Nike Shoes</Text>
            </View>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.cell}>
            <View style={styles.imageContainer}>
              <Image source={Image4} style={styles.image} />
              <Text style={styles.imageText}>Puma Shoes</Text>
            </View>
          </View>
          <View style={styles.cell}>
            <View style={styles.imageContainer}>
              <Image source={Image5} style={styles.image} />
              <Text style={styles.imageText}>Cinema 6</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  searchBar: {
    width: '100%',
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    width: '50%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#2A3F84',
    alignSelf: 'flex-start', 
    marginBottom: 20, 
    borderWidth: 2,
    borderColor: 'gary',
  },
  table: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  cell: {
    width: '48%',
    marginBottom: 10,
    padding: 5,
  },
  imageContainer: {
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f4f4f4',
    padding: 10,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  imageText: {
    textAlign: 'center',
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Home;
