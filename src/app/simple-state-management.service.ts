import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SimpleStateManagementService {

  private readonly _store = new BehaviorSubject<State>({
    detailLayoutType: 'Card'
  });

  readonly store$ = this._store.asObservable();

  get state(): State {
    return this._store.getValue();
  }

  private setState(state: State) {
    this._store.next(state);
  }

  setDetailLayout(detailLayoutType: 'Grid' | 'Card') {
    this.setState({ ...this.state, detailLayoutType });
  }
}

interface State {
  detailLayoutType: 'Grid' | 'Card';
}
