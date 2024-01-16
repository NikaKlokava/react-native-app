import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

type Props = {
  num: number;
  id: number;
  isSelected: boolean;
  onPress: (id: number) => void;
};

export const RandomNumber = ({num, id, isSelected, onPress}: Props) => {
  const handlePress = () => {
    !isSelected && onPress(id);
  };
  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={[styles.number, isSelected && styles.selected]}>{num}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  number: {
    width: 100,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'pink',
    textAlign: 'center',
    fontSize: 40,
    color: 'pink',
  },
  selected: {
    borderColor: 'purple',
    color: 'purple',
    textShadowColor: 'grey',
    textShadowRadius: 5,
  },
});
