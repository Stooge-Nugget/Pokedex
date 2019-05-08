import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from './pokemon.model';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { exhaustMap, map } from 'rxjs/operators';

@Injectable()
export class PokemonResolver implements Resolve<{ pokemon: Pokemon, species: any }> {

    constructor(private httpClient: HttpClient) { }

    // Add type
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ pokemon: Pokemon, species: any }> {
        return this.getPokemonById(route.params.id);
    }

    private getPokemonById(pokemonId: number) {
        //Temporary, use store and db to check cache for pokemon
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
        return this.httpClient.get<Pokemon>(url).pipe(exhaustMap(pokemon => {
            return this.httpClient.get<Pokemon>(pokemon.species.url).pipe(map(species => ({ pokemon, species })))
        }));
    }
}
