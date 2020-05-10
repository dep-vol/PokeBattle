import { RootState } from 'init/store';

export const getOffsetAndLimit = (state: RootState) => {
    return {offset: state.charsState.offset, requestLimit: state.charsState.requestLimit};
};
export type OffsetAndLimit = ReturnType<typeof getOffsetAndLimit>;