import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

interface SearchBarProps {
  onFocus: () => void;
  searchText: string;
  setSearchText: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onFocus, searchText, setSearchText }) => {
  return (
    <TextInput
      style={styles.searchBar}
      placeholder="Rechercher un lieu..."
      value={searchText}
      onChangeText={setSearchText}
      onFocus={onFocus}
      autoCapitalize="none"
      autoCorrect={false}
    />
  );
};

const styles = StyleSheet.create({
  searchBar: {
    position: 'absolute',
    top: 50, 
    left: 10,
    right: 10,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    elevation: 5, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    zIndex: 10, 
  },
});

export default SearchBar;