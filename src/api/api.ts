//CORE
import Axios from 'axios';
//TYPES
import {CharApi, GetChar, GetCharactersType} from 'api/types';

const instance = Axios.create({baseURL:'https://pokeapi.co/api/v2/'});

export const api = {
    getChar: async (charUrl: string): Promise<CharApi> => {
        const response = await instance.get<GetChar>(charUrl);
        const { name, sprites, stats, weight } = response.data;
        const hp = stats.find((el) => el.stat.name === 'hp');
        const mappedStats = stats.map((el) => {
            return {
                name: el.stat.name,
                base: el.base_stat
            };
        });

        return {
            name,
            sprites: sprites.front_default,
            stats: mappedStats,
            baseHP: hp ? hp.base_stat : 0,
            weight
        };
    },
    getCharacters: async (offset = 0): Promise<CharApi[]> => {
        const response = await instance.get<GetCharactersType>(`pokemon/?offset=${offset}&limit=6`);
        const charactersBase = response.data.results;
        return Promise.all(charactersBase.map((el) => {
            return api.getChar(el.url);
        }));
    },
    getCount: async (): Promise<number> => {
        const response = await instance.get('pokemon');
        const { count } = response.data;
        return count;
    }
};