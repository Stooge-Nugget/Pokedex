import { Component, OnInit } from '@angular/core';
import { PokemonApiService } from './pokemon.service';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  opened = false;
  pokemon$: Observable<any>;

  constructor(private pokemonApiSvc: PokemonApiService) {
  }

  ngOnInit(): void {
    this.pokemon$ = this.pokemonApiSvc.getPokemon().pipe(tap(p => console.log(p)));
  }

  toggleSideNav() {
    this.opened = !this.opened;
  }
}