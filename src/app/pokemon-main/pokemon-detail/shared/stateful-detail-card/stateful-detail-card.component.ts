import { Component, OnInit, Input } from '@angular/core';
import { SimpleStateManagementService } from 'src/app/simple-state-management.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-stateful-detail-card',
  templateUrl: './stateful-detail-card.component.html',
  styleUrls: ['./stateful-detail-card.component.scss']
})
export class StatefulDetailCardComponent implements OnInit {
  @Input() heading: string;
  @Input() width = 'auto';
  @Input() minHeight = 'auto';

  layout$: Observable<boolean>;

  constructor(private ssmSvc: SimpleStateManagementService) { }

  ngOnInit() {
    this.layout$ = this.ssmSvc.store$.pipe(
      map(s => s.detailLayoutType === 'Grid')
    );
  }
}
