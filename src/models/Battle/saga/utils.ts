/*
 * Calculate damage, base attack, critical damage and result of HP after attack
 */
import { Char } from '../../../init/types/store';

//Calculate possibility of critical attack (~1/5 | ~20%). Result x2 damage or x1
const calculateCritAttackPossibility = (isCrit: boolean) => {
    return isCrit ? 3 : (5 - Math.round((Math.random())*5)) === 5 ? 2 : 1;
};

//Calculate base attack on difference between enemies attack stats
const calculateBaseAttack = (defenderAttack: number, attackerAttack: number) => {
    return defenderAttack - attackerAttack >=30
        ? 21
        : defenderAttack - attackerAttack >=20
            ? 12
            : 4;
};

//If attacker attack stat larger - make weakening on his defense from 5~10
const calculateDefenderShield = (defenderAttack: number, attackerAttack: number, defenderDefense: number) => {
    return attackerAttack > defenderAttack
        ? defenderDefense
        : defenderDefense - (Math.round(Math.random()*5) + 5);
}

export const calcDamage = (attacker: Char, defender: Char, isSpecial: boolean, isCrit: boolean) => {
    const attackerStats: {[key: string]: number} = {};
    const defenderStats: {[key: string]: number} = {};

    //map stats from Obj to array [stat]: stat.base
    attacker.stats.forEach((stat) => {
        attackerStats[stat.name] = stat.base;
    } );
    defender.stats.forEach((stat) => {
        defenderStats[stat.name] = stat.base;
    } );

    const critAttack = calculateCritAttackPossibility(isCrit);

    const baseAttack = calculateBaseAttack(defenderStats['attack'], attackerStats['attack']);

    const defenderShield = calculateDefenderShield(defenderStats['attack'], attackerStats['attack'], defenderStats['defense']);

    const damage = (((attackerStats['attack'] * baseAttack / defenderShield) * attackerStats['speed']) * critAttack) / (Math.sqrt(defenderStats['hp'] * defenderStats['defense']));
    const specDamage = attackerStats['special-attack'] / defenderStats['special-defense'];
    const defineDamage = isSpecial ? specDamage : damage;

    const hp = defenderStats['hp'] - defineDamage;
    return {damage: Math.round(defineDamage), hp: Math.round(hp), critAttack};
};