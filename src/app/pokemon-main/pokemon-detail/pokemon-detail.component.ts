import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { SimpleStateManagementService } from 'src/app/simple-state-management.service';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

const assetBase = 'assets/svg-icons/';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit, OnDestroy {
  layout$: Observable<boolean>;

  largeBreakpointSub: Subscription;

  pokemon: Pokemon;
  species: Species;
  description: string;
  genderRatio;
  metrics = [];
  stats: Stat[];
  moves: Move[];
  evolutionChain: EvolutionChain[];
  isLarge = false;

  constructor(
    private route: ActivatedRoute,
    private ssmSvc: SimpleStateManagementService,
    private breakpointObserver: BreakpointObserver // Wrap into a service
  ) { }

  ngOnInit() {
    this.layout$ = this.ssmSvc.store$.pipe(
      map(s => s.detailLayoutType === 'Grid')
    );
    this.pokemon = this.route.snapshot.data.pokemonData.pokemon;
    this.species = this.route.snapshot.data.pokemonData.species;
    this.moves = this.route.snapshot.data.pokemonData.moves;
    this.evolutionChain = this.route.snapshot.data.pokemonData.evolutionChain;
    const flavourText: any[] = this.species.flavor_text_entries;
    this.description = flavourText.find(f => f.language.name === 'en');
    this.metrics = this.getMetrics(this.pokemon, this.species);
    this.genderRatio = this.getGenderRatio(this.species.gender_rate);
    this.stats = this.pokemon.stats.map(s => this.createStatMap(s)).reverse();
    this.largeBreakpointSub = this.breakpointObserver.observe([Breakpoints.Large, Breakpoints.XLarge])
      .subscribe(r => this.isLarge = r.matches);
  }

  ngOnDestroy() {
    this.largeBreakpointSub.unsubscribe();
  }

  private createStatMap(stat): Stat {
    let statMap;
    for (const statName in StatNameDataMap) {
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

    return [
      {
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
    ];
  }
}
