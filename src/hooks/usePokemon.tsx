import { useState, useEffect } from 'react';

import { PokemonDetail } from '../interfaces/pokemon.interfaces';
import { pokemonApi } from '../api/pokemonApi';

export const usePokemon = (id: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemon, setPokemon] = useState<PokemonDetail>({} as PokemonDetail);

  const loadPokemon = async () => {
    const resp = await pokemonApi.get<PokemonDetail>(
      `https://pokeapi.co/api/v2/pokemon/${id}`,
    );
    setPokemon(resp.data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadPokemon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isLoading,
    pokemon,
  };
};
