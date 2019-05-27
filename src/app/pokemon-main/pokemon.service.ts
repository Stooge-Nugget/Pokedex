import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, merge, Subject, timer } from 'rxjs';
import { PokemonQuery, Pokemon, Species, Move, EvolutionChain } from './pokemon.model';
import { tap, reduce, map, debounce, exhaustMap } from 'rxjs/operators';

@Injectable()
export class PokemonApiService {
  progress;

  constructor(private httpClient: HttpClient) {
    this.progress = new Subject<number>().pipe(debounce(() => timer(250)));
  }

  getPokemon(pokemonQuery: PokemonQuery) {
    const queries = pokemonQuery.results.map(r => this.httpClient.get(r.url));
    let completed = 0;
    return merge(...queries).pipe(
      tap(() => this.progress.next(((++completed / queries.length) * 100) | 0)),
      reduce((acc: Pokemon[], pokemon: Pokemon) => {
        acc.push(pokemon);
        return acc
      }, []),
      map(pokemon => pokemon.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0)),
      tap(() => this.progress.next(0)),
    );
  }

  getPokemonById(pokemonId: number) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
    return this.httpClient.get<Pokemon>(url);
  }

  getPokemonList(providedUrl: string = null): Observable<PokemonQuery> {
    const url = !!providedUrl ? providedUrl : 'https://pokeapi.co/api/v2/pokemon?limit=50';
    return this.httpClient.get<PokemonQuery>(url);
  }

  getPokemonSpecies(pokemon: Pokemon) {
    return this.httpClient
      .get<Species>(pokemon.species.url)
      .pipe(map(species => ({ pokemon, species })));
  }

  getPokemonMoves(pokemonData: { pokemon: Pokemon; species: Species }) {
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
        const orderedMoves = moves.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0))
        return { ...pokemonData, ...{ moves: orderedMoves } };
      })
    );
  }

  getPokemonEvolution(pokemonData: {
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
