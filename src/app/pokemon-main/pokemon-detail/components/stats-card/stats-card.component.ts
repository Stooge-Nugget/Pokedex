import { Component, Input, ViewChild, ElementRef, HostListener, OnDestroy, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Stat } from 'src/app/pokemon-main/pokemon.model';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stats-card',
  templateUrl: './stats-card.component.html',
  styleUrls: ['./stats-card.component.scss']
})
export class StatsCardComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('statBar') statBarElement: ElementRef;

  @Input()
  layoutGrid: boolean;

  @Input() stats: Stat[];

  get statBarWidth() {
    return `calc(100% - ${this.leftIndent}px)`;
  }

  smallBreakpointSub: Subscription;
  largeBreakpointSub: Subscription;

  isSmall = false;
  isLarge = false;

  private barTotal = 400;
  private baseCap = 255;
  private get leftIndent() {
    return this.isSmall ? 170 : 200;
  };

  constructor(private breakpointObserver: BreakpointObserver, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.breakpointSetup();
  }

  ngAfterViewInit() {
    this.recalculateBarTotal();
    this.cd.detectChanges();
  }

  ngOnDestroy() {
    this.smallBreakpointSub.unsubscribe();
    this.largeBreakpointSub.unsubscribe();
  }

  @HostListener('window:resize', ['$event'])
  recalculateBarTotal() {
    this.barTotal = this.statBarElement.nativeElement.offsetWidth - this.leftIndent;
  }

  getValueBarWidth(stat: Stat) {
    const basePercentage = (stat.baseStat / this.baseCap) * 100;
    const width = (this.barTotal * basePercentage) / 100;
    return `${width}px`;
  }

  private breakpointSetup() {
    this.smallBreakpointSub = this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe(r => {
        this.isSmall = r.matches;
        this.recalculateBarTotal();
      });
    this.largeBreakpointSub = this.breakpointObserver.observe([Breakpoints.Large, Breakpoints.XLarge])
      .subscribe(r => {
        this.isLarge = r.matches;
        this.recalculateBarTotal();
      });
  }
}
