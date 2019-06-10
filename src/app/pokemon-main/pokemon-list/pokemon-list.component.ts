import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, exhaustMap } from 'rxjs/operators';
import { PokemonApiService } from '../pokemon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  pokemon$: Observable<any>;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  loading = false;
  progress = 0;

  get pageSize() {
    return !!this.paginationData ? this.paginationData.resultCount : 0;
  }

  get totalCount() {
    return !!this.paginationData ? this.paginationData.totalCount : 0;
  }

  private paginationData;

  constructor(
    private pokemonApiSvc: PokemonApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.pokemon$ = this.getPokemon();
  }

  handleSelectedPokemon(pokemonId: number) {
    this.router.navigate([`pokemon/${pokemonId}`]);
  }

  pageEvent(event) {
    console.log(event);
    //offset=20&limit=20
    const next = event.pageIndex > event.previousPageIndex;
    const url: string = next
      ? this.paginationData.next
      : this.paginationData.prev;
    // url = url.replace('limit=20');
    this.pokemon$ = this.getPokemon(url);
    // .pipe(tap(p => console.log(p)));
  }

  private getPokemon(url: string = null): Observable<any> {
    return this.pokemonApiSvc.getPokemonList(url).pipe(
      tap(res => {
        this.loading = true;
        this.paginationData = {
          totalCount: res.count,
          next: res.next,
          prev: res.previous,
          resultCount: res.results.length
        };
      }),
      exhaustMap(res => {
        return this.pokemonApiSvc.getPokemon(res);
      }),
      tap(() => (this.loading = false))
    );
  }
}
