import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function CartScreen({ navigation }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    try {
      const response = await fetch('http://localhost:3000/backend/cart/getAllcarts');
      if (!response.ok) {
        throw new Error('Failed to fetch cart data');
      }
      const data = await response.json();
      setCart(data);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const removeItemFromCart = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:3000/backend/cart/deletecart/${itemId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to remove item from cart');
      }

      setCart(cart.filter(item => item._id !== itemId));
      Alert.alert('Item removed from cart');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const navigateToProductList = () => {
    navigation.navigate('ProductList'); 
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('CartDetail', { product: item })}>
      <View style={styles.cartItem}>
        <Image source={{ uri: item.productImage }} style={styles.productImage} />
        <View style={styles.textContainer}>
          <Text style={styles.cartItemName}>{item.productName}</Text>
          <Text style={styles.cartItemPrice}>{item.productPrice} USD</Text>
          <TouchableOpacity 
            style={styles.removeButton} 
            onPress={() => removeItemFromCart(item._id)}
          >
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={navigateToProductList} style={styles.iconContainer}>
          <Icon name="list" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.cartIconContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>
            <Icon name="shopping-cart" size={30} color="#333" />
            {cart.length > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cart.length}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={cart}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
        contentContainerStyle={styles.listContent}
      />
    </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 15,
  },
  iconContainer: {
    padding: 10,
  },
  cartIconContainer: {
    position: 'relative',
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
  cartItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 10,
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 15,
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  cartItemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cartItemPrice: {
    fontSize: 16,
    color: '#2a9d8f',
    marginVertical: 5,
  },
  removeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  listContent: {
    paddingBottom: 20,
  },
});
