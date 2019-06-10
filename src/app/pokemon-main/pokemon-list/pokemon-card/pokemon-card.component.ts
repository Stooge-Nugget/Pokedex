import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  Pokemon,
  PokemonTypes,
  PokemonType,
  getTypeColour
} from '../../pokemon.model';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnInit {
  private pokemonInfo: Pokemon;
  backgroundStyle;

  @Input()
  set pokemon(value: Pokemon) {
    this.pokemonInfo = value;
    this.backgroundStyle = this.setBackground(value.types);
  }

  @Output() pokemonSelected = new EventEmitter<number>();

  get pokemon() {
    return this.pokemonInfo;
  }

  constructor() {}

  ngOnInit() {}

  selectPokemon() {
    this.pokemonSelected.emit(this.pokemonInfo.id);
  }

  private setBackground(types: PokemonTypes[]) {
    const primary = getTypeColour(types.find(t => t.slot === 1).type);
    const typeTwo = types.find(t => t.slot === 2);
    const secondary = !!typeTwo ? getTypeColour(typeTwo.type) : '';

    return !!typeTwo
      ? {
          'background-image': `linear-gradient(to right, ${primary} 50%, ${secondary} 50%)`
        }
      : { 'background-color': `${primary}` };
  }
}
