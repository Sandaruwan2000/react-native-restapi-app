import { View, Text, FlatList, Alert, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { ImageBackground } from 'react-native';

export default function PlasticScreen() {
  const [formData, setFormData] = useState([]);
  const [monthlyWeights, setMonthlyWeights] = useState([]); // State to hold combined weights
  const [email, setEmail] = useState('');

  const navigation = useNavigation();

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

  const fetchUserData = async () => {
    if (email) {
      try {
        const response = await fetch(`http://192.168.8.130:3000/backend/plastic/Plasticview/${email}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFormData(data); // Set the fetched data
        calculateMonthlyWeights(data); // Calculate the monthly weights
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  };

  const calculateMonthlyWeights = (data) => {
    const weightsByMonth = {};
    data.forEach(item => {
      const date = new Date(item.createdAt);
      const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`; // Format: YYYY-MM
      const weight = parseFloat(item.weight) || 0;

      if (!weightsByMonth[monthYear]) {
        weightsByMonth[monthYear] = 0;
      }
      weightsByMonth[monthYear] += weight;
    });

    const combinedWeights = Object.entries(weightsByMonth).map(([monthYear, totalWeight]) => ({
      monthYear,
      totalWeight
    }));
    setMonthlyWeights(combinedWeights); // Set the monthly weights state
  };

  const handleButtonPress = () => {
    navigation.navigate("Suggestion");
  };

  const handlePress = () => {
    navigation.navigate("PreTaskScreen");
  };

  const handlePressBuyer = () => {
    navigation.navigate("BuyerScreen");
  };

  useEffect(() => {
    getEmail();
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [email]);

  const renderItem = ({ item }) => (
    <View style={styles.statsContainer}>
      <Text style={styles.statsText}>Plastic Amount</Text>
      <Text style={styles.weightText}>{item.totalWeight} Kg</Text> {/* Use dynamic totalWeight */}
      {item.totalWeight > 4 && (
        <TouchableOpacity style={styles.suggestionButton} onPress={handleButtonPress}>
          <Text style={styles.buttonText}>Suggestion</Text>
        </TouchableOpacity>
      )}
      {item.totalWeight > 4 && (
        <TouchableOpacity style={styles.gameButton} onPress={handlePress}>
          <Text style={styles.buttonText}>Game</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <ImageBackground
      source={require('../assets/bg3.png')} // Replace with your background image path
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Plastic Waste</Text>
          
        </View>

        <FlatList
          data={monthlyWeights}
          renderItem={renderItem}
          keyExtractor={item => item.monthYear}
        />

        <TouchableOpacity style={styles.sellButton} onPress={handlePressBuyer}>
          <Text style={styles.buttonText}>SELL</Text>
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
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF', // Green color like in the example image
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  statsContainer: {
    backgroundColor: '#E0F7FA', // Light green for background
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    top:200,
  },
  statsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  weightText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#388E3C', // Darker green for emphasis
  },
  sellButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  suggestionButton: {
    backgroundColor: '#50C878', 
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    width: 200,
  },

  sellButton: {
    backgroundColor: '#50C878', 
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    width: 200,
    left: 100,
  },
  gameButton: {
    backgroundColor: '#FF5722', // Orange for game button
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    width: 200,
    
  },
});
