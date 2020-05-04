import {charsActions} from './charsActions';
import {asyncActions} from './asyncActions';

type inferValues<T> = T extends {[key: string]: infer U} ? U : never;

export const actions = {
    ...charsActions,
    ...asyncActions
};

export type ActionsType = ReturnType<inferValues<typeof actions>>;
