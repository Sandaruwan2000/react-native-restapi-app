import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function ProductDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { product } = route.params;
  const [cart, setCart] = useState([]);
  const [isInCart, setIsInCart] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await fetch('http://localhost:3000/backend/cart/getAllcarts');
        if (!response.ok) {
          throw new Error('Failed to fetch cart data');
        }
        const data = await response.json();
        setCart(data);

        // Set cart count
        setCartCount(data.length);

        const isAlreadyInCart = data.some(cartItem => cartItem.productId === product.id);
        setIsInCart(isAlreadyInCart);
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    };

    fetchCartData();
  }, [product.id]);

  const addToCart = async () => {
    try {
      if (isInCart) {
        Alert.alert('Product is already in the cart.');
        return;
      }

      const response = await fetch('http://localhost:3000/backend/cart/addcart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
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
        setIsInCart(true);
        setCartCount(updatedCart.length); // Update cart count
        return updatedCart;
      });
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const navigateToCart = (updatedCart) => {
    navigation.navigate('Cart', { cart: updatedCart });
  };

  const navigateToCartPage = () => {
    navigation.navigate('Cart');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={navigateToCartPage} style={styles.cartIconContainer}>
          <Icon name="shopping-cart" size={24} color="black" style={styles.cartIcon} />
          {cartCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
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
      {!isInCart && (
        <TouchableOpacity style={styles.addButton} onPress={addToCart}>
          <Text style={styles.addButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  cartIconContainer: {
    position: 'relative',
    padding: 10,
  },
  cartIcon: {
    padding: 10,
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#ff0000',
    borderRadius: 8,
    padding: 3,
    minWidth: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
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
    color: '#28a745',
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
    color: '#dc3545',
    marginVertical: 10,
  },
  productSizes: {
    fontSize: 16,
    color: '#333',
    marginVertical: 10,
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
