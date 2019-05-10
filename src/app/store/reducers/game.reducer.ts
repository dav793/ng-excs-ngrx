import { GamesState, initialAllGamesState } from '../state';
import * as GameActions from '../actions/game.actions';

export function gameReducer(
    state = initialAllGamesState,
    action: GameActions.ActionsUnion
): GamesState {
    switch (action.type) {

        case GameActions.ActionTypes.UpdateGame: {
            return state;
        }

        case GameActions.ActionTypes.LoadAllGames: {
           return state;
        }

        case GameActions.ActionTypes.APILoadAllGamesSuccess: {
            return { all: action.payload };
        }

        case GameActions.ActionTypes.APILoadAllGamesError: {
            return state;
        }

        default: {
            return state;
        }

    }
}


