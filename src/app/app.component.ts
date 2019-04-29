import {ChangeDetectionStrategy, Component} from '@angular/core';

import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

interface AppState {
  message: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  message$: Observable<string>;

  constructor(private store: Store<AppState>) {
    this.message$ = store.select('message');
  }

  setLang(language: 'spanish'|'french') {
    switch (language) {

      case 'spanish':
        this.store.dispatch({type: 'SPANISH'});
        break;

      case 'french':
        this.store.dispatch({type: 'FRENCH'});
        break;

    }
  }

}
