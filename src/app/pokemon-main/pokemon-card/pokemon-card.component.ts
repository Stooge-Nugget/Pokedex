import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { pokemon, types, type } from '../pokemon.model';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent implements OnInit {
  private pokemonInfo: pokemon;
  backgroundStyle;

  @Input()
  set pokemon(value: pokemon) {
    this.pokemonInfo = value;
    this.backgroundStyle = this.setBackground(value.types);
  }

  @Output() pokemonSelected = new EventEmitter<number>();

  get pokemon() {
    return this.pokemonInfo;
  }

  constructor() { }

  ngOnInit() {
  }

  selectPokemon() {
    this.pokemonSelected.emit(this.pokemonInfo.id);
  }

  private setBackground(types: types[]) {
    const primary = this.getColour(types.find(t => t.slot === 1).type);
    const typeTwo = types.find(t => t.slot === 2);
    const secondary = !!typeTwo ? this.getColour(typeTwo.type) : '';

    return !!typeTwo ? { 'background-image': `linear-gradient(to right, #${primary} 50%, #${secondary} 50%)` } : { 'background-color': `#${primary}` }
  }

  private getColour(type: type): string {
    switch (type.name) {
      case 'grass':
        return '78C850'
      case 'poison':
        return 'A040A0'
      case 'fire':
        return 'F08030'
      case 'water':
        return '6890F0'
      case 'bug':
        return 'A8B820'
      case 'flying':
        return 'A890F0'
      case 'normal':
        return 'A8A878';
      case 'electric':
        return 'F8D030'
      case 'fairy':
        return 'EE99AC';
      case 'fighting':
        return 'C03028';
      case 'steel':
        return 'B8B8CF';
      case 'ground':
        return 'E0C068';
      case 'psychic':
        return 'F85888';
      case 'rock':
        return 'B8A038';
      case 'ghost':
        return '705898';
      case 'ice':
        return '98D8D8';
      case 'dragon':
        return '7038F8';
      case 'dark':
        return '705848';
      default:
        return '333333';
    }
  }

}
