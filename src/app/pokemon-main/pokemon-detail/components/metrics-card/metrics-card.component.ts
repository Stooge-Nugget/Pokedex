import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { BreakpointService } from 'src/app/breakpoint.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-metrics-card',
    templateUrl: './metrics-card.component.html',
    styleUrls: ['./metrics-card.component.scss']
})
export class MetricsCardComponent implements OnInit, OnDestroy {
    @Input()
    layoutGrid: boolean;

    @Input()
    metrics = [];

    @Input()
    heading = 'Metrics';

    isXSmall = false;

    private smallBreakpointSub: Subscription;

    constructor(private breakpointSvc: BreakpointService) { }

    ngOnInit() {
        this.smallBreakpointSub = this.breakpointSvc.isXSmall$.subscribe(isXSmall => this.isXSmall = isXSmall);
    }

    ngOnDestroy(): void {
        this.smallBreakpointSub.unsubscribe();
    }
}
