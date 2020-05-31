import { api } from './api';
import { CharApi, GetChar, GetCharactersType } from './types';
import axiosAdapter from 'axios-mock-adapter';
import axios from 'axios';

const mockedAxios = new axiosAdapter(axios);

describe('API getChar()', () => {

    it('should fetch character data from api', async () => {

        const char: CharApi = {
            name: 'Pokemon',
            sprites: 'img',
            stats: [{name: 'attack', base: 100}],
            baseHP: 0,
            baseMP: 0,
            weight: 100
        };

        const response: GetChar = {
            name: 'Pokemon',
            // eslint-disable-next-line @typescript-eslint/camelcase
            sprites: {front_default: 'img'},
            // eslint-disable-next-line @typescript-eslint/camelcase
            stats: [{base_stat: 100, stat: {name: 'attack'}}],
            weight: 100
        };

        mockedAxios.onGet('https://pokeapi.co/api/v2/pokemon/25555/').reply(200, response);


        const gettedCharFromApi = await api.getChar('https://pokeapi.co/api/v2/pokemon/25555/');

        expect(gettedCharFromApi).toEqual(char);
    });

    it('should add baseMP and baseHP stats and push hp and mp to stats' , async () => {

        const char: CharApi = {
            name: 'Pokemon',
            sprites: 'img',
            stats: [{name: 'defense', base: 100}, {name: 'hp', base: 200}, {name: 'mp', base: 20}],
            baseHP: 200,
            baseMP: 20,
            weight: 100
        };

        const response: GetChar = {
            name: 'Pokemon',
            // eslint-disable-next-line @typescript-eslint/camelcase
            sprites: {front_default: 'img'},
            // eslint-disable-next-line @typescript-eslint/camelcase
            stats: [{base_stat: 100, stat: {name: 'defense'}}, {base_stat: 200, stat: {name: 'hp'}}],
            weight: 100
        };

        mockedAxios.onGet('https://pokeapi.co/api/v2/pokemon/51/').reply(200, response);

        const gettedCharFromApi = await api.getChar('https://pokeapi.co/api/v2/pokemon/51/');

        expect(gettedCharFromApi).toEqual(char);
    });

});

describe('API getCharacters()', () => {

    it('should fetch chars', async () => {

        const response: GetCharactersType = {
            results: [
                {name: 'Pokemon', url: 'https://pokeapi.co/api/v2/pokemon/5/'},
                {name: 'Bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/6/'}]
        };

        const responsePokemon: GetChar = {
            name: 'Pokemon',
            // eslint-disable-next-line @typescript-eslint/camelcase
            sprites: {front_default: 'img'},
            // eslint-disable-next-line @typescript-eslint/camelcase
            stats: [{base_stat: 100, stat: {name: 'defense'}}, {base_stat: 200, stat: {name: 'hp'}}],
            weight: 100
        };
        const responseBulbasaur: GetChar = {
            name: 'Bulbasaur',
            // eslint-disable-next-line @typescript-eslint/camelcase
            sprites: {front_default: 'img'},
            // eslint-disable-next-line @typescript-eslint/camelcase
            stats: [{base_stat: 100, stat: {name: 'defense'}}, {base_stat: 200, stat: {name: 'hp'}}],
            weight: 100
        };

        const result = [
            {
                name: 'Pokemon',
                sprites: 'img',
                stats: [{name: 'defense', base: 100}, {name: 'hp', base: 200}, {name: 'mp', base: 20}],
                baseHP: 200,
                baseMP: 20,
                weight: 100
            },
            {
                name: 'Bulbasaur',
                sprites: 'img',
                stats: [{name: 'defense', base: 100}, {name: 'hp', base: 200}, {name: 'mp', base: 20}],
                baseHP: 200,
                baseMP: 20,
                weight: 100
            }
        ];


        mockedAxios.onGet('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=6').reply(200, response);
        mockedAxios.onGet('https://pokeapi.co/api/v2/pokemon/5/').reply(200, responsePokemon);
        mockedAxios.onGet('https://pokeapi.co/api/v2/pokemon/6/').reply(200, responseBulbasaur);


        const fetchedChars = await api.getCharacters();

        expect(fetchedChars).toEqual(result);

    });
});

describe('API getCount()', () => {
    it('should fetch count of chars from API', async () => {

        const response = {
            count: 150
        };

        mockedAxios.onGet('https://pokeapi.co/api/v2/pokemon/').reply(200, {count: 150});

        const fetchedCount = await api.getCount();

        expect(fetchedCount).toEqual(150);

    });
});