import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, merge } from 'rxjs';
import { Pokemon, EvolutionChain, Species, Move } from './pokemon.model';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { exhaustMap, map, reduce } from 'rxjs/operators';

@Injectable()
export class PokemonResolver
  implements
    Resolve<{
      pokemon: Pokemon;
      species: Species;
      moves: Move[];
      evolutionChain: EvolutionChain[];
    }> {
  constructor(private httpClient: HttpClient) {}

  // Add type
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<{
    pokemon: Pokemon;
    species: Species;
    moves: Move[];
    evolutionChain: EvolutionChain[];
  }> {
    return this.getPokemonById(route.params.id);
  }

  private getPokemonById(pokemonId: number) {
    //Temporary, use store and db to check cache for pokemon
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
    return this.httpClient.get<Pokemon>(url).pipe(
      exhaustMap(pokemon => {
        return this.getPokemonSpecies(pokemon);
      }),
      exhaustMap(pokemonData => {
        return this.getPokemonMoves(pokemonData);
      }),
      exhaustMap(pokemonData => {
        return this.getPokemonEvolution(pokemonData);
      })
    );
  }

  private getPokemonSpecies(pokemon: Pokemon) {
    return this.httpClient
      .get<Species>(pokemon.species.url)
      .pipe(map(species => ({ pokemon, species })));
  }

  private getPokemonMoves(pokemonData: { pokemon: Pokemon; species: Species }) {
    const moveQueries = pokemonData.pokemon.moves.map(m =>
      this.httpClient.get<Move>(m.move.url)
    );
    return merge(...moveQueries).pipe(
      reduce((acc: Move[], move: Move) => {
        acc.push(move);
        return acc;
      }, []),
      // Sort moves
      map(moves => {
        const orderedMoves = moves.sort((a,b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0))
        return { ...pokemonData, ...{ moves: orderedMoves } };
      })
    );
  }

  private getPokemonEvolution(pokemonData: {
    moves: Move[];
    pokemon: Pokemon;
    species: Species;
  }) {
    return this.httpClient
      .get<any>(pokemonData.species.evolution_chain.url)
      .pipe(
        exhaustMap(ec => {
          return this.getEvolutionChain(ec.chain).pipe(
            map(e => ({
              ...pokemonData,
              ...{ evolutionChain: e }
            }))
          );
        })
      );
  }

  private getEvolutionChain(headOfChain) {
    // Starting from headOfChain, need to get all branching evolutions, as it can have multiple evolutions
    // For now naive single branch evolution will be handled, chain.evolves_to[0]
    const evolutionChain = this.buildEvolutionChain(headOfChain);
    return merge(...evolutionChain).pipe(
      map(
        (p: Pokemon) =>
          <EvolutionChain>{
            id: p.id,
            name: p.name,
            sprite: p.sprites.front_default
          }
      ),
      reduce((acc: EvolutionChain[], ec: EvolutionChain) => {
        acc.push(ec);
        return acc;
      }, []),
      map(ec => ec.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0)))
    );
  }

  private buildEvolutionChain(evolution) {
    const pokemon = `https://pokeapi.co/api/v2/pokemon/${
      evolution.species.name
    }`;
    if (evolution.evolves_to.length > 0) {
      return [
        ...this.buildEvolutionChain(evolution.evolves_to[0]),
        this.httpClient.get<Pokemon>(pokemon)
      ];
    }

    return [this.httpClient.get<Pokemon>(pokemon)];
  }
}
