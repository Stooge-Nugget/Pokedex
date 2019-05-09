import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, merge, Subject, timer } from 'rxjs';
import { PokemonQuery, Pokemon } from './pokemon.model';
import { tap, reduce, map, debounce } from 'rxjs/operators';

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

  getPokemonList(providedUrl: string = null): Observable<PokemonQuery> {
    const url = !!providedUrl ? providedUrl : 'https://pokeapi.co/api/v2/pokemon?limit=50';
    return this.httpClient.get<PokemonQuery>(url);
  }
}
