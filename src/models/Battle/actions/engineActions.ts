
export const asyncEngineActions = {
    attackAction: 'BATTLE/ENGINE/PLAYER_ATTACK' as const,
    specDefenseAction: 'BATTLE/ENGINE/SPECIAL_DEFENSE' as const,
    setLogAction: 'BATTLE/ENGINE/SET_LOG_ACTION' as const,
    clearLogAction: 'BATTLE/ENGINE/CLEAR_LOG_ACTION' as const
};


export const engineActions = {
    playerAttack: (isEnemy: boolean) => ({type: asyncEngineActions.attackAction, isEnemy} as const),
    setLogAction: (action: string) => ({type: asyncEngineActions.setLogAction, action} as const),
    makeAttack: (hp: number, isEnemy: boolean) => ({type:'BATTLE/ENGINE/MAKE_ATTACK', hp, isEnemy} as const),
    clearLog: () => ({type: asyncEngineActions.clearLogAction} as const)
};

