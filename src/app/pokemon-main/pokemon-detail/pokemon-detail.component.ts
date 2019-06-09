import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Pokemon,
  Species,
  Stat,
  StatNameDataMap,
  StatName,
  StatIcons,
  EvolutionChain,
  Move
} from '../pokemon.model';

const assetBase = 'assets/svg-icons/';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit {
  pokemon: Pokemon;
  species: Species;
  description: string;
  genderRatio;
  metrics = [];
  stats: Stat[];
  moves: Move[];
  evolutionChain: EvolutionChain[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.pokemon = this.route.snapshot.data.pokemonData.pokemon;
    this.species = this.route.snapshot.data.pokemonData.species;
    this.moves = this.route.snapshot.data.pokemonData.moves;
    this.evolutionChain = this.route.snapshot.data.pokemonData.evolutionChain;
    let flavourText: any[] = this.species.flavor_text_entries;
    this.description = flavourText.find(f => f.language.name === 'en');
    this.metrics = this.getMetrics(this.pokemon, this.species);
    this.genderRatio = this.getGenderRatio(this.species.gender_rate);
    this.stats = this.pokemon.stats.map(s => this.createStatMap(s)).reverse();
  }

  private createStatMap(stat): Stat {
    let statMap;
    for (var statName in StatNameDataMap) {
      if (StatNameDataMap[statName] === stat.stat.name) {
        statMap = statName;
      }
    }
    return {
      name: StatName[statMap],
      baseStat: stat.base_stat,
      effort: stat.effort,
      icon: `${assetBase}${StatIcons[statMap].icon}`,
      iconText: StatIcons[statMap].iconText
    };
  }

  private getMetrics(pokemon: Pokemon, species: Species) {
    return [
      {
        name: 'Height',
        value: pokemon.height / 10,
        format: '0.1',
        symbol: 'm',
        icon: `${assetBase}height-icon.svg`,
        iconText: 'Height'
      },
      {
        name: 'Weight',
        value: pokemon.weight / 10,
        format: '0.1',
        symbol: 'kg',
        icon: `${assetBase}/weight-icon.svg`,
        iconText: 'Weight'
      },
      {
        name: 'Catch Rate',
        value: species.capture_rate,
        format: '2.0',
        symbol: '%',
        icon: `${assetBase}pokeball-icon.svg`,
        iconText: 'Catch Rate'
      }
    ];
  }

  private getGenderRatio(genderRate: number) {
    const female = (genderRate / 8) * 100;
    const male = 100 - female;

    return [{
      name: 'Male',
      value: male,
      format: '2.0',
      symbol: '%',
      icon: `${assetBase}male-icon.svg`,
      iconText: 'Male Ratio'
    },
    {
      name: 'Female',
      value: female,
      format: '2.0',
      symbol: '%',
      icon: `${assetBase}female-icon.svg`,
      iconText: 'Female Ratio'
    }
    ]
  }
}
