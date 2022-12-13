/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Dimensions, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SearchInput } from '../components/SearchInput';
import { usePokemonSearch } from '../hooks/usePokemonSearch';
import { styles } from '../themes/appTheme';
import { PokemonCard } from '../components/PokemonCard';
import { Loading } from '../components/Loading';
import { SimplePokemon } from '../interfaces/pokemon.interfaces';

const screenWidth = Dimensions.get('window').width;

export const SearchScreen = () => {
  const [term, setTerm] = useState('');
  const [pokemonFiltered, setPokemonFiltered] = useState<SimplePokemon[]>([]);

  const { isFetching, simplePokemonList } = usePokemonSearch();

  useEffect(() => {
    if (!term.length) {
      return setPokemonFiltered([]);
    }
    if (isNaN(Number(term))) {
      return setPokemonFiltered(
        simplePokemonList.filter(poke =>
          poke.name.toLowerCase().includes(term.toLowerCase()),
        ),
      );
    }
    setPokemonFiltered(simplePokemonList.filter(poke => poke.id === term));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term]);

  const { top } = useSafeAreaInsets();

  if (isFetching) {
    return <Loading />;
  }

  return (
    <View style={{ flex: 1, marginHorizontal: 20 }}>
      <SearchInput
        onDebounce={value => setTerm(value)}
        style={{
          position: 'absolute',
          zIndex: 999,
          width: screenWidth - 40,
          top: Platform.OS === 'ios' ? top : top + 25,
        }}
      />
      <FlatList
        data={pokemonFiltered}
        keyExtractor={(pokemon, index) => pokemon.id + index}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        ListHeaderComponent={
          <Text
            style={{
              ...styles.title,
              ...styles.globalMargin,
              paddingBottom: 10,
              marginTop: top + 75,
            }}>
            {term}
          </Text>
        }
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
      />
    </View>
  );
};
