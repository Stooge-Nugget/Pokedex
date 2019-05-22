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
import { PokemonApiService } from './pokemon.service';

@Injectable()
export class PokemonResolver
  implements
    Resolve<{
      pokemon: Pokemon;
      species: Species;
      moves: Move[];
      evolutionChain: EvolutionChain[];
    }> {
  constructor(
    private httpClient: HttpClient,
    private pokemonApiSvc: PokemonApiService
  ) {}

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
    // Temporary, use store and db to check cache for pokemon
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
    return this.httpClient.get<Pokemon>(url).pipe(
      exhaustMap(pokemon => {
        return this.pokemonApiSvc.getPokemonSpecies(pokemon);
      }),
      exhaustMap(pokemonData => {
        return this.pokemonApiSvc.getPokemonMoves(pokemonData);
      }),
      exhaustMap(pokemonData => {
        return this.pokemonApiSvc.getPokemonEvolution(pokemonData);
      })
    );
  }
}
