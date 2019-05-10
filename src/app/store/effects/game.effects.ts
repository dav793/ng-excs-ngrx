import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import {of, iif, throwError} from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';

import * as GameActions from '../actions/game.actions';

import { Game } from '../../games/game.model';
import { GamesService } from '../../games/games.service';
import {Action} from '@ngrx/store';

@Injectable()
export class GameEffects {

    @Effect()
    updateGame$ = this.actions$.pipe(
        ofType(GameActions.ActionTypes.UpdateGame),
        mergeMap((action: any) => {
            return this.gamesService.updateById(action.payload._id, action.payload).pipe(
                map(status => {
                    if (status === 200)
                        return { type: GameActions.ActionTypes.LoadAllGames };
                    else
                        return new Error('Could not update game');
                })
            );
        })
    );

    @Effect()
    loadGames$ = this.actions$.pipe(
        ofType(GameActions.ActionTypes.LoadAllGames),
        mergeMap(() => this.gamesService.getAll().pipe(
            map(games => ({ type: GameActions.ActionTypes.APILoadAllGamesSuccess, payload: games })),
            catchError((e) => of({ type: GameActions.ActionTypes.APILoadAllGamesError, payload: e }))
        ))
    );

    @Effect({dispatch: false})
    logError$ = this.actions$.pipe(
        ofType(GameActions.ActionTypes.APILoadAllGamesError),
        tap((x: any) => console.error(x.payload))      // log error
    );

    constructor(
        private actions$: Actions,
        private gamesService: GamesService
    ) {}

}
