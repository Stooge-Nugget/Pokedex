import { Component, OnInit, Input } from '@angular/core';
import { Stat } from 'src/app/pokemon-main/pokemon.model';

@Component({
  selector: 'app-stats-card',
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.css']
})
export class StatsCardComponent implements OnInit {
  @Input() stats: Stat[];

  get statBarWidth() {
    return `${this.barTotal}px`;
  }

  private barTotal = 225;
  private baseCap = 255;

  constructor() {}

  ngOnInit() {}

  getValueBarWidth(stat: Stat) {
    const basePercentage = (stat.baseStat / this.baseCap) * 100;
    const width = (this.barTotal * basePercentage) / 100;
    return `${width}px`;
  }
}
