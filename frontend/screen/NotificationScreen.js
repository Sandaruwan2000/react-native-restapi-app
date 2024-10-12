import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importing the icon library

export default function NotificationScreen() {
  const [formData, setFormData] = useState([]);
  const [email, setEmail] = useState('');

  // Function to retrieve the email from AsyncStorage
  const getEmail = async () => {
    try {
      const savedEmail = await AsyncStorage.getItem('userEmail');
      if (savedEmail !== null) {
        setEmail(savedEmail);
      }
    } catch (error) {
      console.error('Error retrieving email:', error);
    }
  };

  // Function to fetch user data from the API
  const fetchUserData = async () => {
    if (email) {
      try {
        const response = await fetch(`http://192.168.8.130:3000/backend/notification/Notificationview/${email}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Filter out duplicates based on the notification text
        const uniqueNotifications = Array.from(new Map(data.map(notification => [notification.notification, notification])).values());

        setFormData(uniqueNotifications);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  };

  // Function to delete a notification
  const deleteNotification = async (id) => {
    try {
      const response = await fetch(`http://192.168.8.130:3000/backend/notification/deletenotification/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Remove the notification from local state
      setFormData(prevData => prevData.filter(notification => notification._id !== id));
      Alert.alert('Success', 'Notification deleted successfully.');
    } catch (error) {
      console.error('Error deleting notification:', error);
      Alert.alert('Error', 'Failed to delete notification. Please try again.');
    }
  };

  useEffect(() => {
    getEmail();
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [email]);

  // Render each notification item
  const renderItem = ({ item }) => (
    <View style={styles.notificationContainer}>
      <Text style={styles.notificationText}>{item.bin_type}</Text>
      <Text style={styles.notificationText}>{item.notification}</Text>
      <Text style={styles.notificationDate}>
        {new Date(item.createdAt).toLocaleString()}
      </Text>
      <TouchableOpacity onPress={() => deleteNotification(item._id)} style={styles.deleteButton}>
      <Icon name="close" size={24} color="#FFF" style={styles.icon} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notifications</Text>
      </View>

      <FlatList
        data={formData}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  notificationContainer: {
    padding: 15,
    backgroundColor: '#E8F5E9',
    borderRadius: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  notificationText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  notificationDate: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: '#FF3D00',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center', // Centering the icon
    width: 40, // Setting a width for the button
    height: 40, // Setting a height for the button
    top: -90,
    left: 300,
  },
});
