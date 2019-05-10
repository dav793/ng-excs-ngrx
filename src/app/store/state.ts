
import { Game } from '../games/game.model';

export interface State {
    games: GamesState;
}

export interface GamesState {
    all: Game[];
}

export const initialAllGamesState: GamesState = {
    all: []
};
