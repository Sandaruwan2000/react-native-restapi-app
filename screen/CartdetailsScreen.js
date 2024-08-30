import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons'; 

export default function CartDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { product } = route.params;  
  const [cart, setCart] = useState([]);
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await fetch('http://localhost:3000/backend/cart/getAllcarts');
        if (!response.ok) {
          throw new Error('Failed to fetch cart data');
        }
        const data = await response.json();
        setCart(data);

        const isAlreadyInCart = data.some(cartItem => cartItem.productId === product._id);
        setIsInCart(isAlreadyInCart);
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    };

    fetchCartData();
  }, [product._id]);

  const navigateToProductList = () => {
    navigation.navigate('ProductList'); 
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.productImage }} style={styles.productImage} />
      <Text style={styles.productName}>{product.productName}</Text>
      <Text style={styles.productBrand}>{product.productBrand || 'Brand not available'}</Text>
      <Text style={styles.productPrice}>{product.productPrice} USD</Text>
      <Text style={styles.productDescription}>{product.productDescription}</Text>
      <Text style={styles.productStock}>{product.productStock} in stock</Text>
      <Text style={styles.productSizes}>
        Sizes Available: {product.productSizes.join(', ')}
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={navigateToProductList}
          icon={() => <Icon name="list" size={20} color="#fff" />} 
          style={styles.button}
        >
          Go to Product List
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f5f5f5',
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
  },
  productName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
  },
  productBrand: {
    fontSize: 18,
    color: '#666',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 22,
    color: '#2a9d8f',
    marginVertical: 10,
  },
  productDescription: {
    fontSize: 16,
    color: '#555',
    marginVertical: 10,
    lineHeight: 22,
  },
  productStock: {
    fontSize: 16,
    color: '#d9534f',
    marginVertical: 10,
  },
  productSizes: {
    fontSize: 16,
    color: '#333',
    marginVertical: 10,
  },
  buttonContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
});
