import { charsActions, charsAsyncActions } from 'models/Chars/actions/charsActions';
import { appActions } from 'models/App/actions/appActions';
import { inferValues, inferActions } from 'init/types/store';
import { initGameActions } from '../models/Battle/actions/initGameActions';


export const actions = {
    ...charsActions,
    ...appActions,
    ...initGameActions
};

export const asyncActions = {
    ...charsAsyncActions
};

export type ActionsType = ReturnType<inferValues<typeof actions>>;

export type ActionsConstants = inferActions<ActionsType>;

export type ExtractAction <T> = T extends ActionsType['type'] ? Extract<ActionsType, {type: T}> : never


