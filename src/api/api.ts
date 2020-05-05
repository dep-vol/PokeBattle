import Axios from 'axios';
import {Char, CharactersBase, GetChar, GetCharactersType} from '../types/api';

const instance = Axios.create({baseURL:'https://pokeapi.co/api/v2/'});

export const api = {
    getChar: async (charUrl: string): Promise<Char> => {
        const response = await instance.get<GetChar>(charUrl);
        const { name, sprites, stats, weight} = response.data;

        return {
            name,
            sprites: sprites.front_default,
            stats: stats.map((el) => {
                return {
                    name: el.stat.name,
                    base: el.base_stat
                };
            }),
            weight
        };
    },
    getCharacters: async (offset = 0): Promise<Char[]> => {
        const response = await instance.get<GetCharactersType>(`pokemon/?offset=${offset}&limit=10`);
        const charactersBase = response.data.results;
        return Promise.all(charactersBase.map((el) => {
            return api.getChar(el.url);
        }));
    }
};