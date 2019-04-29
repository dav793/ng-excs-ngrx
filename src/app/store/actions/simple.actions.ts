import { Action } from '@ngrx/store';

export enum ActionTypes {
  SetLangSpanish = '[App Component] SET LANG SPANISH',
  SetLangFrench = '[App Component] SET LANG FRENCH',
}

export class SetLangSpanish implements Action {
  readonly type = ActionTypes.SetLangSpanish;
}

export class SetLangFrench implements Action {
  readonly type = ActionTypes.SetLangFrench;
}
