//CORE
import Axios from 'axios';
//TYPES
import { CharApi, GetChar, GetCharactersType } from 'api/types';

export const api = {
    getChar: async (charUrl: string): Promise<CharApi> => {
        const response = await Axios.get<GetChar>(charUrl);
        const { name, sprites, stats, weight } = response.data;
        const hp = stats.find((el) => el.stat.name === 'hp');
        const mappedStats = stats.map((el) => {
            return {
                name: el.stat.name,
                base: el.base_stat
            };
        });
        const def = mappedStats.find(stat => stat.name === 'defense');

        if(def) {
            def.base <= 60
                ? mappedStats.push({name: 'mp', base: 40})
                : mappedStats.push({name: 'mp', base: 20});
        }

        const mp = mappedStats.find(stat => stat.name === 'mp');

        return {
            name,
            sprites: sprites.front_default,
            stats: mappedStats,
            baseHP: hp ? hp.base_stat : 0,
            baseMP: mp ? mp.base : 0,
            weight
        };
    },
    getCharacters: async (offset = 0): Promise<CharApi[]> => {
        const response = await Axios.get<GetCharactersType>(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=6`);
        const charactersBase = response.data.results;
        return Promise.all(charactersBase.map((el) => {
            return api.getChar(el.url);
        }));
    },
    getCount: async (): Promise<number> => {
        const response = await Axios.get('https://pokeapi.co/api/v2/pokemon/pokemon');
        const { count } = response.data;
        return count;
    }
};

