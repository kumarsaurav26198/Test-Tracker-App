import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../Themes/Colors';
import { FontsWeights } from '../../Themes/Fonts';

const capitalizeFirstLetter = (string) => {
  if (typeof string !== 'string') return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const ProductCard = ({ title, body, id}) => {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.title}>{id}. {capitalizeFirstLetter(title)}</Text>
        <Text style={styles.body}>{capitalizeFirstLetter(body)}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    margin: 15,
  },
  cardContent: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: FontsWeights.FW500,
    color:Colors.black,
    marginBottom: 10,
  },
  body: {
    fontSize: 14,
    color: '#333',
  },
});
