import { Injectable } from '@angular/core';

import {
    Observable,
    timer,
    from,
    iif,
    throwError
} from 'rxjs';

import {
    map,
    concatMap,
    filter
} from 'rxjs/operators';

import * as _ from 'lodash';

import {Game} from './game.model';

@Injectable({
    providedIn: 'root'
})
export class GamesService {

    _games: Game[] = [
        new Game({
            _id: '0',
            teamHome: 'Deportivo Saprissa',
            teamVisitor: 'Liga Deportiva Alajuelense',
            score: {
                home: 0,
                visitor: 0
            }
        }),

        new Game({
            _id: '1',
            teamHome: 'C.S. Herediano',
            teamVisitor: 'C.S. Cartaginés',
            score: {
                home: 0,
                visitor: 0
            }
        }),

        new Game({
            _id: '2',
            teamHome: 'A.D. Municipal Pérez Zeledón',
            teamVisitor: 'A.D San Carlos',
            score: {
                home: 0,
                visitor: 0
            }
        })
    ];

    constructor() { }

    getAll(): Observable<Game[]> {
        return timer(1000).pipe(
            map(() => this._games)
        );

        // return throwError(new Error('something went wrong...'));
    }

    getById(id: string): Observable<Game> {
        return timer(1000).pipe(
            concatMap(x => from(this._games).pipe(
                filter(y => y._id === id)
            ))
        );
    }

    updateById(id: string, body: Game): Observable<number> {
        return iif(
            () => this._updateById(id, body),
            timer(1000).pipe( map(() => 200) ),     // status code 200 - OK
            timer(1000).pipe( map(() => 500) ),     // status code 500 - Server Error
        );
    }

    private _updateById(id: string, body: Game): boolean {
        const gameIdx = this._games.findIndex(g => g._id === id);
        if (gameIdx >= 0) {
            this._games = _.cloneDeep(this._games);
            this._games[gameIdx] = body;
            return true;
        }
        return false;
    }

}
