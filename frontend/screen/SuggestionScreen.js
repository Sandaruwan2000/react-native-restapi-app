import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

export default function SuggestionScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Suggestions to Reduce Plastic Waste</Text>

      {/* Image and Tip 1 */}
      <View style={styles.suggestionContainer}>
        <Image
          style={styles.image}
          source={{ uri: 'https://img.freepik.com/free-vector/go-zero-waste-with-recycle-symbol-design-element_53876-114850.jpg?t=st=1728716592~exp=1728720192~hmac=ddb2e247bee8331a107dd5fdb6e7f7d70085e90514a882642ce0ba1980991dcc&w=740' }} // Replace with a valid image URL or local asset
        />
        <Text style={styles.note}>
          1. Use reusable shopping bags instead of plastic ones.
        </Text>
      </View>

      {/* Image and Tip 2 */}
      <View style={styles.suggestionContainer}>
        <Image
          style={styles.image}
          source={{ uri: 'https://www.ludlowjute.com/wp-content/uploads/2023/12/Jute_Reusable.jpg' }} // Replace with a valid image URL or local asset
        />
        <Text style={styles.note}>
          2. Switch to reusable water bottles to minimize single-use plastics.
        </Text>
      </View>

      {/* Image and Tip 3 */}
      <View style={styles.suggestionContainer}>
        <Image
          style={styles.image}
          source={{ uri: 'https://img.freepik.com/premium-photo/natural-cotton-eco-shopping-bag-glass-reusable-water-bottle-zero-waste-concept_132254-784.jpg' }} // Replace with a valid image URL or local asset
        />
        <Text style={styles.note}>
          3. Carry a reusable straw and utensils to avoid using disposable ones.
        </Text>
      </View>

      {/* Image and Tip 4 */}
      <View style={styles.suggestionContainer}>
        <Image
          style={styles.image}
          source={{ uri: 'https://img.freepik.com/free-vector/green-vector-trash-can-illustration_1308-164994.jpg' }} // Replace with a valid image URL or local asset
        />
        <Text style={styles.note}>
          4. Opt for products with minimal or plastic-free packaging.
        </Text>
      </View>
      
      {/* Add more suggestions as needed */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  suggestionContainer: {
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  note: {
    fontSize: 16,
    marginTop: 10,
  },
});
