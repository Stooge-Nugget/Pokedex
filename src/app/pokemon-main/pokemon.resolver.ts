import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, merge } from 'rxjs';
import { Pokemon, EvolutionChain, Species } from './pokemon.model';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { exhaustMap, map, reduce } from 'rxjs/operators';

@Injectable()
export class PokemonResolver
  implements Resolve<{ pokemon: Pokemon; species: any }> {
  constructor(private httpClient: HttpClient) {}

  // Add type
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<{
    pokemon: Pokemon;
    species: Species;
    evolutionChain: EvolutionChain[];
  }> {
    return this.getPokemonById(route.params.id);
  }

  private getPokemonById(pokemonId: number) {
    //Temporary, use store and db to check cache for pokemon
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
    return this.httpClient.get<Pokemon>(url).pipe(
      exhaustMap(pokemon => {
        return this.httpClient
          .get<Species>(pokemon.species.url)
          .pipe(map(species => ({ pokemon, species })));
      }),
      exhaustMap(pokemon => {
        return this.httpClient
          .get<any>(pokemon.species.evolution_chain.url)
          .pipe(
            exhaustMap(ec => {
              return this.getEvolutionChain(ec.chain).pipe(
                map(e => ({
                  pokemon: pokemon.pokemon,
                  species: pokemon.species,
                  evolutionChain: e
                }))
              );
            })
          );
      })
    );
  }

  private getEvolutionChain(headOfChain) {
    // Starting from headOfChain, need to get all branching evolutions, as it can have multiple evolutions
    // For now naive single branch evolution will be handled, chain.evolves_to[0]
    const evolutionChain = this.buildChain(headOfChain);
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

  private buildChain(evolution) {
    const pokemon = `https://pokeapi.co/api/v2/pokemon/${
      evolution.species.name
    }`;
    if (evolution.evolves_to.length > 0) {
      return [
        ...this.buildChain(evolution.evolves_to[0]),
        this.httpClient.get<Pokemon>(pokemon)
      ];
    }

    return [this.httpClient.get<Pokemon>(pokemon)];
  }
}
