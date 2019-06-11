import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {
  isXSmall$: Observable<boolean>;
  isSmall$: Observable<boolean>;
  isLarge$: Observable<boolean>;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointSetup();
  }

  private breakpointSetup() {
    this.isXSmall$ = this.getBreakpointObserver([Breakpoints.XSmall]);
    this.isSmall$ = this.getBreakpointObserver([Breakpoints.XSmall, Breakpoints.Small]);
    this.isLarge$ = this.getBreakpointObserver([Breakpoints.Large, Breakpoints.XLarge]);
  }

  private getBreakpointObserver(breakpoints: string[]) {
    return this.breakpointObserver.observe(breakpoints)
      .pipe(map(r => r.matches));
  }
}
