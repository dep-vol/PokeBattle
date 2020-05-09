import { charsActions, charsAsyncActions } from './charsActions';
import { appActions } from './appActions';

type inferValues<T> = T extends {[key: string]: infer U} ? U : never;
type inferActions<T> = T extends {['type']: infer U} ? U : never;

export const actions = {
    ...charsActions,
    ...appActions
};

export const asyncActions = {
    ...charsAsyncActions
}

export type ActionsType = ReturnType<inferValues<typeof actions>>;

export type ActionsConstants = inferActions<ActionsType>;

export type ExtractAction <T> = T extends ActionsType['type'] ? Extract<ActionsType, {type: T}> : never


