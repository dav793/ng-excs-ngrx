import { Action } from '@ngrx/store';
import { Game } from '../../games/game.model';

export enum ActionTypes {
    UpdateGame = '[Scoreboard] Update game',
    LoadAllGames = '[Game List] Load All',
    APILoadAllGamesSuccess = '[Games API] Games Load Success',
    APILoadAllGamesError = '[Games API] Games Load Error'
}

export class UpdateGame implements Action {
    readonly type = ActionTypes.UpdateGame;

    constructor(public payload: Game) {}
}

export class LoadAllGames implements Action {
    readonly type = ActionTypes.LoadAllGames;
}

export class APILoadAllGamesSuccess implements Action {
    readonly type = ActionTypes.APILoadAllGamesSuccess;

    constructor(public payload: Game[]) {}
}

export class APILoadAllGamesError implements Action {
    readonly type = ActionTypes.APILoadAllGamesError;

    constructor(public payload: Error) {}
}

export type ActionsUnion = UpdateGame | LoadAllGames | APILoadAllGamesSuccess | APILoadAllGamesError;
