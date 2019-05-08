import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from '../pokemon.model';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit {
  pokemon: Pokemon;
  species: any;
  description: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.pokemon = this.route.snapshot.data.pokemonData.pokemon;
    this.species = this.route.snapshot.data.pokemonData.species;
    let flavourText: any[] = this.species.flavor_text_entries;
    this.description = flavourText.find(f => f.language.name === 'en');
  }

}
