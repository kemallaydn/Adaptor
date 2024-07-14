import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Button from '../Button';

const Dropdown = ({ options, callback ,size}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    callback(option);
  };

  const getSize = () => {
    switch (size) {
      case 'sm':
        return 30;
      case 'md':
        return 50;
      case 'lg':
        return 70;
      default:
        return 0;
    }
  }

  return (
    <View style={{marginHorizontal:getSize()}}>
      <Button
        title={selectedOption || 'Tablo Seçiniz'}
        onPress={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.dropdownMenu}>
          {options.map((option: string) => (
            <TouchableOpacity
              key={option}
              style={styles.optionItem}
              onPress={() => handleOptionClick(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    marginTop: 12,
    backgroundColor: 'white',
  },
  dropdownMenu: {
    maxHeight: 195,
    backgroundColor: 'transparent',
  },
  optionItem: {
    paddingVertical: 8,
    paddingHorizontal: 13,
    marginVertical: '0.5%',
    borderRadius: 30,
    backgroundColor: 'rgba(0, 23, 31, 0.7)',
  },
  optionText: {
    color: 'white',
    fontSize: 11,
  },
});

export default Dropdown;
