// import React from 'react';
// import { View, Text, StyleSheet, FlatList } from 'react-native';
// import { useRoute } from '@react-navigation/native';

// export default function CartScreen() {
//   const route = useRoute();
//   const { cart } = route.params || { cart: [] };

//   const renderItem = ({ item }) => (
//     <View style={styles.cartItem}>
//       <Text style={styles.cartItemName}>{item.name}</Text>
//       <Text style={styles.cartItemPrice}>
//         {item.price.amount} {item.price.currency}
//       </Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={cart}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id.toString()}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: '#fff',
//   },
//   cartItem: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//   },
//   cartItemName: {
//     fontSize: 18,
//   },
//   cartItemPrice: {
//     fontSize: 16,
//     color: 'green',
//   },
// });
import { View, Text } from 'react-native'
import React from 'react'

export default function CartScreen() {
  return (
    <View>
      <Text>CartScreen</Text>
    </View>
  )
}