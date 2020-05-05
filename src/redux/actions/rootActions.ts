import {charsActions} from './charsActions';

type inferValues<T> = T extends {[key: string]: infer U} ? U : never;
type inferActions<T> = T extends {['type']: infer U} ? U : never;

export const actions = {
    ...charsActions,
};

export type ActionsType = ReturnType<inferValues<typeof actions>>;

export type ActionsConstants = inferActions<ActionsType>;