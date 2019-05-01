import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, combineLatest } from 'rxjs';
import { pokemonQuery } from './pokemon.model';
import { exhaustMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonApiService {

  constructor(private httpClient: HttpClient) { }

  getPokemon() {
    return this.getPokemonList().pipe(
      exhaustMap(res => {
        const queries = res.results.map(r => this.httpClient.get(r.url));
        return combineLatest(queries);
      }));
  }

  private getPokemonList(): Observable<pokemonQuery> {
    const url = 'https://pokeapi.co/api/v2/pokemon';
    return this.httpClient.get<pokemonQuery>(url);
  }
}
