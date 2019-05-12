import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import {of, iif, throwError} from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';

import * as GameActions from '../actions/game.actions';

import { Game } from '../../games/game.model';
import { GamesService } from '../../games/games.service';

@Injectable()
export class GameEffects {

    @Effect()
    updateGame$ = this.actions$.pipe(
        ofType(GameActions.ActionTypes.UpdateGame),
        mergeMap((action: any) => {

            const savingToast = this.toastr.show('Please wait...', 'Saving', {
                toastClass: 'ngx-toastr ngx-custom-default',
                timeOut: 3000
            });

            return this.gamesService.updateById(action.payload._id, action.payload).pipe(
                map(status => {
                    if (status === 200) {

                        this.toastr.clear(savingToast.toastId);
                        this.toastr.success('', 'Saved!', { timeOut: 3000 });

                        return { type: GameActions.ActionTypes.LoadAllGames };
                    }
                    else {

                        this.toastr.clear(savingToast.toastId);
                        this.toastr.error('An error ocurred.', 'Oops!', { timeOut: 3000 });

                        return new Error('Could not update game');

                    }
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
        private gamesService: GamesService,
        private toastr: ToastrService
    ) {}

}
