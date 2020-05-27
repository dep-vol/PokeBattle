import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { CardItem } from './CardItem';
import '@testing-library/jest-dom';

afterEach(cleanup);

describe('Card item', () => {
    const char = {
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

    it('should render avatar img', () => {
        const { getByTestId } = render(<CardItem char={char} />);

        expect(getByTestId('img avatar').firstChild).toHaveAttribute('src', char.sprites)
    });

    it ('should render title of pokemon', () => {
        const { getByText } = render(<CardItem char={char} />);

        expect(getByText(char.name)).toBeInTheDocument();
    });

    it('should render stats with it`s base', () => {
        const { getAllByTestId } = render(<CardItem char={char} />);

        const statNames = getAllByTestId('stat name').map((stat) => stat.firstChild!.textContent);
        const baseValues = getAllByTestId('stat base').map((stat) => Number(stat.firstChild!.textContent));

        expect(char.stats.map(stat => stat.name)).toEqual(statNames);
        expect(char.stats.map(stat => stat.base)).toEqual(baseValues);
    });
});