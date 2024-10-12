import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { ImageBackground } from 'react-native-web';

export default function BinlevelScreen() {
  const [email, setEmail] = useState('');
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBinType, setSelectedBinType] = useState('plastic');
  const [binElapsedTimes, setBinElapsedTimes] = useState({ plastic: 0, food: 0, ewaste: 0 });
  const [percentage, setPercentage] = useState(0);
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
        const response = await fetch(`http://192.168.8.130:3000/backend/bin/Binview/${email}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFormData(data);
        updatePercentage(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getEmail();
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [email]);

  const storeElapsedTime = async (type, time) => {
    try {
      await AsyncStorage.setItem(`timeElapsed_${type}`, JSON.stringify(time));
    } catch (error) {
      console.error('Error storing time:', error);
    }
  };

  const getStoredElapsedTime = async (type) => {
    try {
      const storedTime = await AsyncStorage.getItem(`timeElapsed_${type}`);
      if (storedTime !== null) {
        setBinElapsedTimes((prev) => ({ ...prev, [type]: JSON.parse(storedTime) }));
      }
    } catch (error) {
      console.error('Error retrieving time:', error);
    }
  };

  useEffect(() => {
    Object.keys(binElapsedTimes).forEach((type) => getStoredElapsedTime(type));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setBinElapsedTimes((prev) => {
        const newTimes = { ...prev };
        Object.keys(newTimes).forEach((type) => {
          newTimes[type] = prev[type] + 1;
        });
        storeElapsedTime(selectedBinType, newTimes[selectedBinType]);
        return newTimes;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [selectedBinType]);

  const resetTimer = () => {
    setBinElapsedTimes((prev) => ({
      ...prev,
      [selectedBinType]: 0,
    }));
    AsyncStorage.removeItem(`timeElapsed_${selectedBinType}`);
  };

  const filteredData = formData.filter((item) => {
    return item.bin_type.toLowerCase() === selectedBinType.toLowerCase();
  });

  const updatePercentage = (data) => {
    const maxHeight = 10; 
    const bin = data.find((item) => item.bin_type.toLowerCase() === selectedBinType.toLowerCase());
    if (bin) {
      const binHeight = bin.height;
      const calculatedPercentage = 100 * (1 - binHeight / maxHeight);
      setPercentage(calculatedPercentage);
    }
  };

  useEffect(() => {
    if (formData.length > 0) {
      updatePercentage(formData); 
    }
  }, [formData, selectedBinType]);

  // Effect to call storeNotification when percentage updates
  useEffect(() => {
    if (percentage > 0) {
      storeNotification(selectedBinType, Math.round(percentage));
    }
  }, [percentage]);

  const updateBinHeight = async (binType, binId) => {
    try {
      const response = await fetch(`http://192.168.8.130:3000/backend/bin/updatebin/${binId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          bin_type: binType,
          height: 10,
          weight: 0,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update bin height');
      }
      const updatedData = await response.json();
      console.log('Bin height updated successfully:', updatedData);
      fetchUserData();
    } catch (error) {
      console.error('Error updating bin height:', error);
    }
  };

  const storeNotification = async (binType, percentage) => {
    try {
      const response = await fetch('http://192.168.8.130:3000/backend/notification/Createnotification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          bin_type: binType,
          notification: `Bin level is at ${percentage}%`, 
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to save notification');
      }
  
      const result = await response.json();
      console.log('Notification saved successfully:', result);
    } catch (error) {
      console.error('Error saving notification:', error);
    }
  };

  const savePlasticBinData = async () => {
    try {
      const response = await fetch('http://192.168.8.130:3000/backend/plastic/Createplastic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email, // Use the logged-in email
          weight: filteredData[0]?.weight || '0', // Get the weight from the plastic bin or default to '0'
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to save plastic bin data');
      }
  
      const result = await response.json();
      console.log('Plastic bin data saved successfully:', result);
    } catch (error) {
      console.error('Error saving plastic bin data:', error);
    }
  };
 
  const plastic = () => {
    navigation.navigate("PlasticScreen"); // Use navigation to go to the Plastic screen
  };
  const renderItem = ({ item }) => (
    <View style={styles.tableRow}>
      <View>
        <Text style={styles.typeText}>{item.bin_type}</Text>
      </View>
      <View style={styles.imageContainer}>
        {item.image ? (
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            resizeMode="contain"
            onError={(error) => console.error('Error loading image:', error)}
          />
        ) : (
          <Text>No Image Available</Text>
        )}
      </View>
      <View style={styles.rowContent}>
        {/* <Text style={styles.rowText}>Height: {item.height}</Text> */}
      </View>
      <View>
        <Text style={styles.typeText}>Weight: {item.weight}kg</Text>
      </View>
    </View>
  );

  if (loading) {
    return <Text>Loading...</Text>;
  }

  const days = Math.floor(binElapsedTimes[selectedBinType] / (24 * 3600));
  const hours = Math.floor((binElapsedTimes[selectedBinType] % (24 * 3600)) / 3600);
  const minutes = Math.floor((binElapsedTimes[selectedBinType] % 3600) / 60);
  const seconds = binElapsedTimes[selectedBinType] % 60;

  return (
    
    <ImageBackground
    source={require('../assets/bg2.png')} // Replace with your image URL
    style={styles.background}
  >
    <ScrollView style={styles.container}>
      

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.filterButton, selectedBinType === 'plastic' && styles.selectedButton]}
          onPress={() => setSelectedBinType('plastic')}
        >
          <Text style={styles.buttonText}>Plastic</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, selectedBinType === 'food' && styles.selectedButton]}
          onPress={() => setSelectedBinType('food')}
        >
          <Text style={styles.buttonText}>Food</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, selectedBinType === 'Paper' && styles.selectedButton]}
          onPress={() => setSelectedBinType('Paper')}
        >
          <Text style={styles.buttonText}>Paper</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.percentageContainer}> 
        <Text style={styles.levelText}>{Math.round(percentage)}%</Text> 
      </View> 

      <View style={styles.middleContainer}>
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.tableContainer}
        />
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.box}>
          <Text style={styles.boxText}>Days: <br></br>{days}</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.boxText}>Hours: {hours}</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.boxText}>Minutes: {minutes}</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.boxText}>Seconds: {seconds}</Text>
        </View>
      </View>

      {selectedBinType === 'plastic' && (
      <TouchableOpacity style={styles.saveButton} onPress={() =>{
        savePlasticBinData();
        plastic();

      }}>
        <Text style={styles.buttonText}>Sell Plastic Bin Data</Text>
      </TouchableOpacity>
    )}

      <TouchableOpacity
        style={styles.resetButton}
        onPress={() => {
          resetTimer();
          updateBinHeight(selectedBinType, filteredData[0]?._id); 
        }}
      >
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
    </ScrollView>
    </ImageBackground>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'transparent',
  },

  background: {
    flex: 1, 
    justifyContent: 'center', 
    width: '100',
  },
  imageContainer: {
    width: 300,
    height: 200,
    marginBottom: 10,
  },
  image: {
    width: 300,
    height: 250,
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  percentageContainer: {
    alignSelf: 'flex-start',
    marginBottom: 20,
    left: 150,
  },
  levelText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  filterButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#000000',
    borderRadius: 5,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  middleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tableContainer: {
    flex: 1,
  },
  timerContainer: {
    alignItems: 'flex-end',
  },
  timerLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
  },
  timerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF5722',
  },
  typeText: {
    fontSize: 30,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: 'black',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  box: {
    padding: 10,
    backgroundColor: '#000000',
    borderRadius: 5,
    width: '20%',
    alignItems: 'center',
  },
  boxText: {
    fontSize: 16,
    color: 'white',
  },
  resetButton: {
    backgroundColor: '#008000',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    top: 20,
  },

  saveButton: {
    backgroundColor: '#99A3A3',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',

  },
  tableRow: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 5,
  },
  rowText: {
    fontSize: 16,
    flex: 1,
  },
  rowContent: {
    flex: 1,
    alignItems: 'center',
  },
});
