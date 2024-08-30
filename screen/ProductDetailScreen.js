import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function ProductDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { product } = route.params;
  const [cart, setCart] = useState([]);

  const addToCart = async () => {
    try {
      // Check if the product is already in the cart
      const isAlreadyInCart = cart.some(cartItem => cartItem.productId === product.id);

      if (isAlreadyInCart) {
        Alert.alert('Product is already in the cart.');
        return;
      }

      const response = await fetch('http://localhost:3000/backend/cart/addcart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productName: product.name,
          productImage: product.mainImage,
          productPrice: product.price.amount,
          productBrand: product.brandName || '',
          productStock: product.stockStatus,
          productSizes: product.sizes,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add to cart');
      }

      const result = await response.json();

      setCart((prevCart) => {
        const updatedCart = [...prevCart, result];
        Alert.alert('Added to cart', '', [{ text: 'Go to Cart', onPress: () => navigateToCart(updatedCart) }]);
        return updatedCart;
      });
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const navigateToCart = (updatedCart) => {
    navigation.navigate('Cart', { cart: updatedCart });
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.mainImage }} style={styles.productImage} />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productBrand}>{product.brandName || 'Brand not available'}</Text>
      <Text style={styles.productPrice}>
        {product.price.amount} {product.price.currency}
      </Text>
      <Text style={styles.productDescription}>{product.description}</Text>
      <Text style={styles.productStock}>{product.stockStatus}</Text>
      <Text style={styles.productSizes}>
        Sizes Available: {product.sizes.join(', ')}
      </Text>
      <Button title="Add to Cart" onPress={addToCart} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  productBrand: {
    fontSize: 18,
    color: 'gray',
  },
  productPrice: {
    fontSize: 20,
    color: 'green',
    marginVertical: 10,
  },
  productDescription: {
    fontSize: 16,
    color: '#333',
    marginVertical: 10,
  },
  productStock: {
    fontSize: 16,
    color: 'red',
    marginVertical: 10,
  },
  productSizes: {
    fontSize: 16,
    marginVertical: 10,
  },
});
