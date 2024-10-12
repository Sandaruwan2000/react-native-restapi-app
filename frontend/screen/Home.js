import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const Home = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState(null); // State to hold the user's email
  const [currentDate, setCurrentDate] = useState(''); // State to hold the current date

  useEffect(() => {
    const fetchEmail = async () => {
      const email = await AsyncStorage.getItem('userEmail');
      setUserEmail(email); // Set the retrieved email to state
    };

    const formatDate = () => {
      const date = new Date();
      const options = { year: 'numeric', month: 'long', day: 'numeric' }; 
      setCurrentDate(date.toLocaleDateString('en-US', options)); 
    };

    fetchEmail(); 
    formatDate(); 
  }, []);

  const handleServiceNavigation = (screen) => {
    navigation.navigate(screen); 
  };

  return (
    <ImageBackground 
      source={require('../assets/bg1.png')} 
      style={styles.background}
      resizeMode="cover" 
    >
      <ScrollView style={styles.container}>
        {/* Wavy Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Welcome! </Text> 
          <Text style={styles.date}>Today is {currentDate}</Text>
        </View>

        {/* Services Section */}
        <View style={styles.servicesContainer}>
          <Text style={styles.sectionTitle}>My Services</Text>
          <View style={styles.serviceRow}>
            <TouchableOpacity style={styles.serviceCard} onPress={() => handleServiceNavigation('PropertyInfo')}>
              <Image source={'https://img.freepik.com/premium-photo/off-plan-real-estate-project-multi-floor-residential-building-with-miniature-model-wide-banner_937679-18416.jpg?w=826'} style={styles.serviceImage} />
              <Text style={styles.serviceText}>Property Information</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.serviceCard} onPress={() => handleServiceNavigation('Maritime')}>
              <Image source={'https://t3.ftcdn.net/jpg/08/21/59/98/240_F_821599863_1kbnIA1UmyHsbRxqHagMgJHHBgxSTKwD.jpg'} style={styles.serviceImage} />
              <Text style={styles.serviceText}>Maritime</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal={true}>
            <View style={styles.serviceRow}>
              <TouchableOpacity style={styles.serviceCard} onPress={() => handleServiceNavigation('PlasticScreen')}>
                <Image source={'https://img.freepik.com/premium-psd/3d-rendering-star-icon-transparent-background_178156-520.jpg'} style={styles.serviceIcon} />
                <Text style={styles.serviceText}>Waste & Get Point</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.serviceCard} onPress={() => handleServiceNavigation('PreTaskScreen')}>
                <Image source={'https://cdn-icons-png.flaticon.com/512/5930/5930147.png'} style={styles.serviceIcon} />
                <Text style={styles.serviceText}>Play & Reward!</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.serviceCard} onPress={() => handleServiceNavigation('CreateBin')}>
                <Image source={'https://img.freepik.com/free-vector/green-vector-trash-can-illustration_1308-164994.jpg'} style={styles.serviceIcon} />
                <Text style={styles.serviceText}>Create Bin</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.serviceCard} onPress={() => handleServiceNavigation('Rank')}>
                <Image source={'https://img.freepik.com/premium-photo/game-level-up-star-badge-win-icon-gambling-app-ui-victory-prize-symbol-game-task_1197797-213020.jpg?w=826'} style={styles.serviceIcon} />
                <Text style={styles.serviceText}>Rank</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>    
        </View>

        <View style={styles.awarenessContainer}>
          <Text style={styles.sectionTitle}>Awareness Community</Text>
          <View style={styles.awarenessRow}>
            <Image source={require('../assets/v1.png')} style={styles.awarenessImage} />
            <Image source={require('../assets/v2.png')} style={styles.awarenessImage} />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent', // Make the background transparent to show the background image
  },
  background: {
    flex: 1, // Ensures the background image covers the entire screen
    justifyContent: 'center', 
    width: '100',
  },
  header: {
     // Semi-transparent background for header
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  greeting: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFF',
  },
  date: {
    fontSize: 28,
    color: '#FFF',
    marginTop: 5,
  },
  servicesContainer: {
    marginVertical: 20,
    paddingHorizontal: 20,
    top:50,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333', // Add color to make the section title more visible
  },
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  serviceCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    alignItems: 'center',
    padding: 10,
    width: '45%',
  },
  serviceImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  serviceIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  serviceText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  awarenessContainer: {
    paddingHorizontal: 20,
    top:50,
  },
  awarenessRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  awarenessImage: {
    width: '48%',
    height: 120,
    borderRadius: 15,
  },
});

export default Home;
