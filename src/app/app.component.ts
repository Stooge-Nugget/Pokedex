import { Component, OnInit } from '@angular/core';
import { PokemonApiService } from './pokemon.service';
import { Observable, combineLatest } from 'rxjs';
import { tap, map, exhaustMap } from 'rxjs/operators';
import { pokemon } from './pokemon.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  opened = false;
  pokemon$: Observable<any>;
  pageSizeOptions: number[] = [5, 10, 20, 50];

  get pageSize() {
    return !!this.paginationData ? this.paginationData.resultCount : 0;
  }

  get totalCount() {
    return !!this.paginationData ? this.paginationData.totalCount : 0;
  }

  private paginationData;

  constructor(private pokemonApiSvc: PokemonApiService) {
  }

  ngOnInit(): void {
    this.pokemon$ = this.getPokemon();
    // .pipe(
    //   tap(p => console.log(p)));
  }

  toggleSideNav() {
    this.opened = !this.opened;
  }

  pageEvent(event) {
    console.log(event);
    //offset=20&limit=20
    const next = event.pageIndex > event.previousPageIndex;
    const url: string = next ? this.paginationData.next : this.paginationData.prev;
    // url = url.replace('limit=20');
    this.pokemon$ = this.getPokemon(url).pipe(
      tap(p => console.log(p)));
  }

  private getPokemon(url: string = null): Observable<pokemon> {
    return this.pokemonApiSvc.getPokemonList(url).pipe(
      tap(res => {
        this.paginationData = {
          totalCount: res.count,
          next: res.next,
          prev: res.previous,
          resultCount: res.results.length
        }
      }),
      exhaustMap(res => {
        return this.pokemonApiSvc.getPokemon(res);
      }));

  }
}