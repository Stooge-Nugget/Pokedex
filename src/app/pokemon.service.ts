import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, combineLatest } from 'rxjs';
import { pokemonQuery, pokemon } from './pokemon.model';
import { exhaustMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonApiService {

  constructor(private httpClient: HttpClient) { }

  getPokemon(pokemonQuery: pokemonQuery) {
    const queries = pokemonQuery.results.map(r => this.httpClient.get(r.url));
    return combineLatest<pokemon>(queries);
  }

  getPokemonList(providedUrl: string = null): Observable<pokemonQuery> {
    const url = !!providedUrl ? providedUrl : 'https://pokeapi.co/api/v2/pokemon';
    return this.httpClient.get<pokemonQuery>(url);
  }
}
