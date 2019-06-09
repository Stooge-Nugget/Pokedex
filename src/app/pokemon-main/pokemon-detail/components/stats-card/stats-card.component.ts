import { Component, Input, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Stat } from 'src/app/pokemon-main/pokemon.model';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-stats-card',
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.css']
})
export class StatsCardComponent {
  @ViewChild('statBar') statBarElement: ElementRef;

  @Input() stats: Stat[];

  get statBarWidth() {
    return `${this.barTotal}px`;
  }

  private barTotal = 400; // Make this responsive
  private baseCap = 255;

  constructor(private breakpointObserver: BreakpointObserver) { }

  @HostListener('window:resize', ['$event'])
  recalculateBarTotal() {
    const aboveThreshold = this.breakpointObserver.isMatched('(min-width: 1216px)');
    const leftMarginSpacing = 250;
    this.barTotal = !!this.statBarElement && !aboveThreshold
      ? this.statBarElement.nativeElement.offsetWidth - leftMarginSpacing
      : 400;
  }

  getValueBarWidth(stat: Stat) {
    const basePercentage = (stat.baseStat / this.baseCap) * 100;
    const width = (this.barTotal * basePercentage) / 100;
    return `${width}px`;
  }
}
