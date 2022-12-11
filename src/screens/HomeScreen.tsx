/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { ActivityIndicator, FlatList, Image, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FadeInImage } from '../components/FadeInImage';

import { usePokemonPaginated } from '../hooks/usePokemonPaginated';
import { styles } from '../themes/appTheme';

export const HomeScreen = () => {
  const { top } = useSafeAreaInsets();

  const { loadPokemons, simplePokemonList, isLoading } = usePokemonPaginated();

  return (
    <>
      <Image
        source={require('../assets/pokebola.png')}
        style={styles.pokebolaBG}
      />
      <Text style={{ ...styles.title, ...styles.globalMargin, top: top + 20 }}>
        Pokedex
      </Text>
      <FlatList
        data={simplePokemonList}
        keyExtractor={(pokemon, index) => pokemon.id + index}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <FadeInImage uri={item.picture} style={{ width: 100, height: 100 }} />
        )}
        onEndReached={loadPokemons}
        onEndReachedThreshold={0.4}
        ListFooterComponent={
          <ActivityIndicator style={{ height: 100 }} size={20} color="grey" />
        }
      />
    </>
  );
};
