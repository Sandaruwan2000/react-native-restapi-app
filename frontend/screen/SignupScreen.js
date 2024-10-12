import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 

export default function SignupScreen() {
  const navigation = useNavigation(); 
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [userType, setUserType] = useState(''); 
  const [size, setSize] = useState(''); // Added state for size

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match');
      return;
    }

    if (!userType) {
      Alert.alert('Please select your role (Center or Resident)');
      return;
    }

    const requestData = {
      username,
      email,
      phone,
      password,
      type: userType,
    };

    const additionalData = {
      email, // Include email in the additional request
      size: 0, // Fixed the assignment to use a colon
    };

    try {
      // First API for registration
      const registerResponse = await fetch('http://192.168.8.130:3000/backend/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      // Second API call (for the additional data)
      const additionalResponse = await fetch('http://192.168.8.130:3000/backend/condition/Createconditon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(additionalData),
      });

      // Wait for both API responses
      const [registerResult, additionalResult] = await Promise.all([
        registerResponse.json(),
        additionalResponse.json(),
      ]);

      if (registerResponse.ok) {
        Alert.alert('Registration Successful', 'You can now log in');
        navigation.replace("Signin");
      } else {
        Alert.alert('Registration Failed', registerResult.message || 'Something went wrong');
      }

      // Handle additional API response if needed
      if (!additionalResponse.ok) {
        Alert.alert('Additional Data Submission Failed', additionalResult.message || 'Something went wrong with additional API');
      }

    } catch (error) {
      Alert.alert('Error', 'Failed to connect to the server');
    }
  };

  return (

  //   <ImageBackground
  //   source={require('../assets/bg2.png')} // Replace with your image URL
  //   style={styles.background}
  // >
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Signup</Text>
        <Text style={styles.subTitle}>Who you are</Text>
      </View>

      {/* User type selection */}
      <View style={styles.userTypeContainer}>
        <View style={styles.userType}>
          <TouchableOpacity onPress={() => setUserType('Center')}>
            <Icon
              name="account-circle"
              size={60}
              color={userType === 'Center' ? 'purple' : '#ddd'} 
            />
            <Text style={styles.userTypeText}>Center</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.userType}>
          <TouchableOpacity onPress={() => setUserType('Resident')}>
            <Icon
              name="account-circle"
              size={60}
              color={userType === 'Resident' ? 'orange' : '#ddd'} 
            />
            <Text style={styles.userTypeText}>Resident</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Form Fields */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile"
        keyboardType="number-pad"
        value={phone}
        onChangeText={setPhone}
      />
      
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={!passwordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Icon
            name={passwordVisible ? 'visibility' : 'visibility-off'}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirm password"
          secureTextEntry={!passwordVisible}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <Icon
            name={passwordVisible ? 'visibility' : 'visibility-off'}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>
    </ScrollView>
    // </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },

  background: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2A3F84',
  },
  subTitle: {
    fontSize: 18,
    color: '#5C5C5C',
    marginTop: 5,
  },
  userTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  userType: {
    alignItems: 'center',
  },
  userTypeText: {
    marginTop: 5,
    fontSize: 16,
    color: '#5C5C5C',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
  },
  registerButton: {
    backgroundColor: '#3DA95D',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
