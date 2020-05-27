import React from 'react';
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import { Char } from '../../../init/types/store';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Battle } from './Battle';
import { CardItem } from '../../Chars/components/CardItem/CardItem';
import { getEnemyData, getPlayerData } from '../../../init/selectors/selectors';
import { RootState } from '../../../init/store';
import { actions } from '../../../init/rootActions';

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
    initGame: {
        Player: player,
        Enemy: enemy,
        isPlayerWinner: false,
        isLooser: false,
        gameStart: true,
        log: {action: '', value: ''},
        playerWaiting: false,
        resultLog: []
    }
};

const mockStore = configureStore();
const store = mockStore(mockedState);

afterEach(cleanup);

jest.mock('models/Chars/components/CardItem/CardItem', () => {
    return {
        CardItem: jest.fn(({char}) => <div data-testid={char.name}>it`s render {char.name}</div>)
    };
});

describe('Battle component render test', () => {

    const setupRender = () => {
        return render(
            <Provider store={store}>
                <Battle />
            </Provider>);
    };


    it('should render player and enemy cards', () => {
        const { getByTestId } = setupRender();

        expect(getByTestId('player card')).toBeInTheDocument();
        expect(getByTestId('enemy card')).toBeInTheDocument();
    });

    it('should render CardItems with player and enemy data', async () => {
        const { getByTestId } = setupRender();

        const playerData = getPlayerData(store.getState() as RootState);
        const enemyData = getEnemyData(store.getState() as RootState);

        expect(CardItem).toHaveBeenCalled();
        expect(getByTestId(playerData.name)).toBeInTheDocument();
        expect(getByTestId(enemyData.name)).toBeInTheDocument();

    });

    it('should render attack, super attack and heal buttons', () => {
        const { getByTestId } = setupRender();

        expect(getByTestId('attack-btn')).toBeInTheDocument();
        expect(getByTestId('super attack-btn')).toBeInTheDocument();
        expect(getByTestId('heal-btn')).toBeInTheDocument();
    });
});

describe('Attack button behavior', () => {
    const setupRender = () => {
        return render(
            <Provider store={store}>
                <Battle />
            </Provider>);
    };

    it('should call attack action on click', () => {
        const {getByTestId} = setupRender();

        const btn = getByTestId('attack-btn');

        fireEvent.click(btn);

        const dispatched = store.getActions();

        expect(dispatched).toContainEqual(actions.playerAttack(false, false));
    });
});

describe('Heal button behavior', () => {
    const setupRender = () => {
        return render(
            <Provider store={store}>
                <Battle />
            </Provider>);
    };

    it('should call heal action on click', () => {
        const {getByTestId} = setupRender();

        const btn = getByTestId('heal-btn');

        fireEvent.click(btn);

        const dispatched = store.getActions();

        expect(dispatched).toContainEqual(actions.healActivate(false));
    });
});

describe('Super attack button behavior', () => {
    const setupRender = () => {
        return render(
            <Provider store={store}>
                <Battle />
            </Provider>);
    };

    it('should call super attack action on click', () => {
        const {getByTestId} = setupRender();

        const btn = getByTestId('super attack-btn');

        fireEvent.click(btn);

        const dispatched = store.getActions();

        expect(dispatched).toContainEqual(actions.playerAttack(false, true));
    });
});

describe('Logger', () => {
    const setupRender = (mockStore = store) => {
        return render(
            <Provider store={mockStore}>
                <Battle />
            </Provider>);
    };

    it('should be clear after render', () => {
        const { getByLabelText } = setupRender();

        const logger = getByLabelText('Logger');
        expect(logger.textContent).toBe('');
    });

    it('should show log messages if state was changed', () => {
        const newState = {
            ...mockedState,
            initGame: {...mockedState.initGame, log: {value: 'some text'}}
        };

        const { getByLabelText } = setupRender(mockStore(newState));

        const logger = getByLabelText('Logger');
        expect(logger.textContent).toBe('some text');
    });
});