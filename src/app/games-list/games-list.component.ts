import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { State } from '../store/state';

import { Game } from '../games/game.model';
import {LoadAllGames, UpdateGame} from '../store/actions/game.actions';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent implements OnInit {

    allGames$: Observable<Game[]>;

    constructor(
        private router: Router,
        private store: Store<State>
    ) {
        this.allGames$ = store.select(state => state.games.all);
    }

    ngOnInit() {
        this.store.dispatch(new LoadAllGames());
    }

    openGame(game: Game) {
        this.router.navigate(['scoreboard', game._id]);
    }

}
