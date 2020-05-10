import { charsActions, charsAsyncActions } from 'models/Chars/actions/charsActions';
import { appActions } from 'App/actions/appActions';
import { inferValues, inferActions } from 'init/types/store';


export const actions = {
    ...charsActions,
    ...appActions
};

export const asyncActions = {
    ...charsAsyncActions
};

export type ActionsType = ReturnType<inferValues<typeof actions>>;

export type ActionsConstants = inferActions<ActionsType>;

export type ExtractAction <T> = T extends ActionsType['type'] ? Extract<ActionsType, {type: T}> : never


