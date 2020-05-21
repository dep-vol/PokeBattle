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
    anchor?: {
        vertical: 'top' | 'bottom';
        horizontal: 'left' | 'right' | 'center';
    };
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
    baseMP: number;
    countMP: number;
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
    Player: Omit<Required<Char>, 'played'>;
    Enemy: Omit<Required<Char>, 'played'>;
    gameStart: boolean;
    log: {
        value: string;
        action: string;
    };
    playerWaiting: boolean;
    resultLog: {
        enemy: string;
        log: string;
    }[];
    isLooser: boolean;
    isPlayerWinner: boolean;
};