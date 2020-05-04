export enum asyncActionsTypes {
    FETCH_CHARS='FETCH_CHARS'
}

export const asyncActions = {
    fetchChars: () => ({type: asyncActionsTypes.FETCH_CHARS} as const)
}