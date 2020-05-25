import { calcDamage } from './utils';
import { Char } from '../../../init/types/store';

const attacker: Char = {
    name: 'Pikachu',
    stats: [
        {name: 'hp', base: 100},
        {name: 'mp', base: 40},
        {name: 'defense', base: 100},
        {name: 'attack', base: 50},
        {name: 'speed', base: 50},
        {name: 'special-defense', base: 100},
        {name: 'special-attack', base: 60}
    ],
    baseHP: 100,
    baseMP: 40,
    countHP: 100,
    countMP: 100,
    weight: 100,
    sprites: 'img',
    played: false
};
const defender: Char = {
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

describe('calcDamage function', () => {
    const mockMath = Object.create(global.Math);
    mockMath.random = () => 0.5;
    global.Math = mockMath;

    it('should return damage, hp, crit attack on ordinary attack', () => {

        //50 - 50 !== 30 !== 20 => baseAttack = 4
        //50 !> 50 => defenderShield = 100 - (0.5*5 + 5) = 92
        //damage = 50 * 4 / 92 * 50 * 1 / 100  = 1

        const damage = 1;
        const hp = 99;

        expect({hp, damage, critAttack: 1}).toEqual(calcDamage(attacker, defender, false, false));
    });

    it('should return damage, hp, crit attack on critical attack', () => {
        //50 - 50 !== 30 !== 20 => baseAttack = 4
        //50 !> 50 => defenderShield = 100 - (0.5*5 + 5) = 92
        //damage = 50 * 4 / 92 * 50 * 3 / 100  = 3
        const critAttack = 3;
        const damage = 3;
        const hp = 97;

        expect({hp, damage, critAttack}).toEqual(calcDamage(attacker, defender, false, true));
    });

    it('should return damage, hp, crit attack on special attack', () => {
        //damage = 50 / 100  = 1
        const critAttack = 1;
        const damage = 1;
        const hp = 99;

        expect({hp, damage, critAttack}).toEqual(calcDamage(attacker, defender, true, false));
    });
});