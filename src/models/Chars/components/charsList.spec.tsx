import React from 'react';
import '@testing-library/jest-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { RootState } from '../../../init/store';
import { Char } from '../../../init/types/store';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { CharsList } from './CharsList';
import { CardItem } from './CardItem/CardItem';
import { actions } from 'init/rootActions';
import { History } from 'history';

jest.mock('models/Chars/components/CardItem/CardItem', () => {
    return {
        CardItem: jest.fn(({char}) => <div data-testid={char.name}>it`s render {char.name}</div>)
    };
});
jest.mock('react-router-dom', () => {
    return {
        useHistory: jest.fn(() => ({} as History) )
    };
});
jest.mock('elements/', () => {
    return {
        Loader: jest.fn(() => <div>mock loading...</div>)
    };
});

afterEach(cleanup);

const player: Char = {
    name: 'Pikachu',
    stats: [
        {name: 'hp', base: 100},
        {name: 'mp', base: 40},
        {name: 'defense', base: 100},
        {name: 'attack', base: 50},
        {name: 'speed', base: 50},
        {name: 'special-defense', base: 100},
        {name: 'special-attack', base: 50}
    ],
    baseHP: 100,
    baseMP: 40,
    countHP: 100,
    countMP: 100,
    weight: 100,
    sprites: 'img',
    played: false
};
const enemy: Char = {
    name: 'Bulbasaur',
    stats: [
        {name: 'hp', base: 100},
        {name: 'mp', base: 40},
        {name: 'defense', base: 100},
        {name: 'attack', base: 50},
        {name: 'speed', base: 50},
        {name: 'special-defense', base: 100},
        {name: 'special-attack', base: 50}
    ],
    baseHP: 100,
    baseMP: 40,
    countHP: 100,
    countMP: 100,
    weight: 100,
    sprites: 'img',
    played: false
};
const mockedState = {
    charsState: {
        chars: [player, enemy],
        requestLimit: 200,
        offset: 0,
        isLoading: false
    },
    initGame: {
        gameStart: false
    }
} as RootState;

const mockStore = configureStore<RootState>();
const store = mockStore(mockedState);

const setupRender = (newStore = store) => {
    return render(
        <Provider store={newStore}>
            <CharsList />
        </Provider>
    );
};


describe('Chars List', () => {
    it('should render chars nodes', () => {
        const {getByTestId} = setupRender();

        const firstMockChar = store.getState().charsState.chars[0];
        const secondMockChar = store.getState().charsState.chars[1];
        const dispatched = store.getActions();

        expect(dispatched).toContainEqual(actions.charsRequest(0));
        expect(CardItem).toHaveBeenCalled();
        expect(getByTestId(firstMockChar.name)).toBeInTheDocument();
        expect(getByTestId(secondMockChar.name)).toBeInTheDocument();

    });

    it('should render loader when isLoading state true', () => {
        const newState = {
            ...mockedState,
            charsState: {...mockedState.charsState, isLoading: true}
        };

        const { getByText } = setupRender(mockStore(newState));

        expect(getByText('mock loading...')).toBeInTheDocument();
    });

    it('should render choose buttons', () => {
        const { getAllByText } = setupRender();

        const btns = getAllByText('Choose');

        expect(btns.length).toBe(2);

    });

    it('should disable choose buttons when loading', () => {
        const newState = {
            ...mockedState,
            charsState: {...mockedState.charsState, isLoading: true}
        };

        const { getAllByText } = setupRender(mockStore(newState));

        const btns = getAllByText('Choose').map(btn => btn.closest('button'));

        expect(btns.every(btn => btn!.disabled)).toBe(true);

    });

    it('should push init action on click choose button', () => {
        const { getAllByText } = setupRender();
        const btns = getAllByText('Choose').map(btn => btn.closest('button'));

        fireEvent.click(btns[0] as Element);
        const dispatched = store.getActions();


        expect(dispatched).toContainEqual(actions.initGame(player.name, {} as History));
    });

    it('should disable show more button on loading', () => {
        const newState = {
            ...mockedState,
            charsState: {...mockedState.charsState, isLoading: true}
        };

        const { getByText } = setupRender(mockStore(newState));

        const btn = getByText('SHOW MORE').closest('button');

        expect(btn!.disabled).toBeTruthy();
    });

    it('should disable show more button if offset > request limit', () => {
        const newState = {
            ...mockedState,
            charsState: {...mockedState.charsState, offset: 400}
        };

        const { getByText } = setupRender(mockStore(newState));

        const btn = getByText('SHOW MORE').closest('button');

        expect(btn!.disabled).toBeTruthy();
    });

    it('should fetch additional chars on click show more button', () => {
        const { getByText } = setupRender();
        const btn = getByText('SHOW MORE').closest('button');

        fireEvent.click(btn as Element);
        const dispatched = store.getActions();

        expect(dispatched).toContainEqual(actions.charsRequest(0));

    });
});