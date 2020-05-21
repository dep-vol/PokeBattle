
export const asyncEngineActions = {
    attackAction: 'BATTLE/ENGINE/PLAYER_ATTACK' as const,
    specDefenseAction: 'BATTLE/ENGINE/SPECIAL_DEFENSE' as const,
    setLogAction: 'BATTLE/ENGINE/SET_LOG_ACTION' as const,
    clearLogAction: 'BATTLE/ENGINE/CLEAR_LOG_ACTION' as const,
    isWaitingAction: 'BATTLE/ENGINE/IS_WAITING' as const,
    healAction: 'BATTLE/ENGINE/HEAL_ACTION' as const,
    reduceMPAction: 'BATTLE/ENGINE/REDUCE_MP' as const,
    pushResultOfTheBattleAction: 'BATTLE/ENGINE/PUSH_RESULT' as const,
    isLooserAction: 'BATTLE/ENGINE/IS_LOOSER' as const,
    isWinnerAction: 'BATTLE/ENGINE/IS_WINNER' as const
};


export const engineActions = {
    playerAttack: (isEnemy: boolean, isCrit: boolean) => ({type: asyncEngineActions.attackAction, isEnemy, isCrit} as const),
    setLogAction: (action: string) => ({type: asyncEngineActions.setLogAction, action} as const),
    makeAttack: (hp: number, isEnemy: boolean) => ({type:'BATTLE/ENGINE/MAKE_ATTACK', hp, isEnemy} as const),
    clearLog: () => ({type: asyncEngineActions.clearLogAction} as const),
    isWaiting: () => ({type: asyncEngineActions.isWaitingAction} as const),
    healActivate: (isEnemy: boolean) => ({type: asyncEngineActions.healAction, isEnemy} as const),
    healing: (hp: number, isEnemy: boolean) => ({type: 'BATTLE/ENGINE/HEALING', hp, isEnemy} as const),
    reduceMP: (mp: number, isEnemy: boolean) => ({type: asyncEngineActions.reduceMPAction, mp, isEnemy} as const),
    pushResultOfTheBattle:() => ({type: asyncEngineActions.pushResultOfTheBattleAction} as const) ,
    setIsLooser: () => ({type: asyncEngineActions.isLooserAction} as const),
    playerIsWinner: () => ({type: asyncEngineActions.isWinnerAction} as const)
};

