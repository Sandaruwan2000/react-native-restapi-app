import { View, Text, FlatList, Alert, Button, Picker, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function TaskScreen() {
  const [email, setEmail] = useState('');
  const [formData, setFormData] = useState([]);
  const [monthlyWeights, setMonthlyWeights] = useState([]); // State to hold combined weights
  const [taskType, setTaskType] = useState('week'); // Task type state
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(true); // State to control visibility

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

  useEffect(() => {
    getEmail();
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [email]);

  const calculateMonthlyWeights = (data) => {
    const weightsByMonth = {};

    data.forEach(item => {
      const date = new Date(item.createdAt);
      const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`; // Format: YYYY-MM
      const weight = parseFloat(item.weight) || 0; // Ensure weight is a number

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

  const toggleVisibility = () => {
    setIsVisible(!isVisible); // Toggle visibility state
  };

  const storeTask = async () => {
    try {
      const response = await fetch('http://192.168.8.130:3000/backend/task/Createtask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          weight: monthlyWeights.reduce((acc, item) => acc + item.totalWeight, 0), // Sum of all weights
          task_type: taskType,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        Alert.alert('Success', 'Task data saved successfully!');
        navigation.navigate("Rank");
      } else {
        Alert.alert('Error', result.error || 'Failed to save task data');
      }
    } catch (error) {
      console.error('Error saving task:', error);
      Alert.alert('Error', 'Could not save task data');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>Total Weight: {item.totalWeight} Kg</Text>
    </View>
  );

  return (
    <ImageBackground
      source={require('../assets/bg2.png')} // Replace with your image URL
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Task Management</Text>
        <TouchableOpacity style={styles.visibilityButton} onPress={toggleVisibility}>
          <Text style={styles.buttonText}>{isVisible ? "Hide Weights" : "Show Weights"}</Text>
        </TouchableOpacity>

        {isVisible && (
          <FlatList
            data={monthlyWeights}
            renderItem={renderItem}
            keyExtractor={item => item.monthYear}
          />
        )}

        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Select Task Type:</Text>
          <Picker
            selectedValue={taskType}
            onValueChange={(value) => setTaskType(value)}
            style={styles.picker}
          >
            <Picker.Item label="Week Task" value="week" />
            <Picker.Item label="Month Task" value="month" />
          </Picker>
        </View>

        <TouchableOpacity style={styles.storeButton} onPress={storeTask}>
          <Text style={styles.buttonText}>Store Task</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  visibilityButton: {
    backgroundColor: '#FF7043',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
    top:220
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    
  },
  itemContainer: {
    padding: 15,
    backgroundColor: '#E0F7FA',
    borderRadius: 8,
    marginBottom: 10,
    width: '100%',
    top:70,
  },
  itemText: {
    fontSize: 20,
    color: '#388E3C',
  },
  pickerContainer: {
    marginVertical: 20,
    width: '100%',
    alignItems: 'center',
    top:-300,
  },
  pickerLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  picker: {
    width: 200,
    height: 50,
    backgroundColor: '#E0F7FA',
    borderRadius: 10,
  },
  storeButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    top:-300,
  },
});

