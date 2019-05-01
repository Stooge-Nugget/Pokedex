import { Component, OnInit, Input } from '@angular/core';
import { pokemon, types, type } from '../pokemon.model';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent implements OnInit {
  private pokemonInfo;
  backgroundStyle;

  @Input()
  set pokemon(value: pokemon) {
    this.pokemonInfo = value;
    this.backgroundStyle = this.setBackground(value.types);
  }

  get pokemon() {
    return this.pokemonInfo;
  }

  constructor() { }

  ngOnInit() {
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
      default:
        return '333333'
    }
  }

}
