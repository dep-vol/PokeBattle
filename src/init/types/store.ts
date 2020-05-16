/**********************************
 ** TYPES METHODS 
 **********************************/
export type inferValues<T> = T extends {[key: string]: infer U} ? U : never;
export type inferActions<T> = T extends {['type']: infer U} ? U : never;


/**********************************
 ** ITEMS TYPES
 **********************************/
export type Alert = {
    msg: string;
    type: 'success' | 'info' | 'warning' | 'error' | undefined;
}

export type Char = {
    name: string;
    sprites: string;
    stats: {
        name: string;
        base: number;
    }[];
    baseHP: number;
    countHP: number;
    weight: number;
    played?: boolean;
}

/**********************************
 ** STATE TYPES
 **********************************/

export type CharsState = {
    chars: Char[];
    isLoading: boolean;
    offset: number;
    requestLimit: number;
}

export type AppState = {
    alert: Alert;
}

export type PlayerState = {
    Player: Char;
    Enemy: Char;
    gameStart: boolean;
    log: {
        value: string;
        action: string;
    };
};