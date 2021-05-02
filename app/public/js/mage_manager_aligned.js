/**
 * Created by ced on 02/05/2021.
 */

class MageManagerAligned extends MageManager{

    constructor (){
        super();
        this.aligned_spell_code = {};
        this.aligned_school = {};
    }

    increase_spells(spells){
        let result = [];
        for(let spell of spells){
            spell.difficulty += 2;
            result.push(spell);
        }
        return spells;
    }

    // Return all spells names for the aligned schools
    get_aligned_spells_names(){
        this.aligned_school['school1'] = this.all_wizards_school[this.school]['aligned'][0];
        this.aligned_school['school2'] = this.all_wizards_school[this.school]['aligned'][1];
        this.aligned_school['school3'] = this.all_wizards_school[this.school]['aligned'][2];

        return [
            this.increase_spells(this.all_spells[this.aligned_school['school1']]['spells']),
            this.increase_spells(this.all_spells[this.aligned_school['school2']]['spells']),
            this.increase_spells(this.all_spells[this.aligned_school['school3']]['spells'])
        ];
    }

    // Add an aligned spell to the mage spellbook
    choose_spell(spell, level, aligned_spell_code){
        super.choose_spell(this.aligned_school[aligned_spell_code], spell, level);
        this.aligned_spell_code[aligned_spell_code]=true;

    }

    // Remove an aligned spell from the mage spellbook
    remove_spell(spell, aligned_spell_code){
        super.remove_spell(spell);
        this.aligned_spell_code[aligned_spell_code]=false;
    }

    // Check if can validate
    can_validate(){
        console.log(this.aligned_spell_code);

        if(this.aligned_spell_code['school1'] && this.aligned_spell_code['school2'] &&
            this.aligned_spell_code['school3']){
            return true;
        }
        else
        {
            return false;
        }
    }



}