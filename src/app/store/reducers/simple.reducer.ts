import { Action } from '@ngrx/store';
import { ActionTypes } from '../actions/simple.actions';

export const initialState = 'Hello World';

export function simpleReducer(state: string = initialState, action: Action) {

  switch (action.type) {

    case ActionTypes.SetLangSpanish:
      return 'Hola Mundo';

    case ActionTypes.SetLangFrench:
      return 'Bonjour le monde';

    default:
      return state;
  }

}
