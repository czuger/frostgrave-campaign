/**
 * Created by ced on 02/05/2021.
 */

class MageManagerNeutral extends MageManager{

    constructor (){
        super();
        this.neutral_spell_code = {};
        this.neutral_school = {};
    }

    // Return all spells names for the neutral schools
    get_neutral_spells_names(){
        this.neutral_school['school1'] = this.all_wizards_school[this.school]['neutral'][0];
        this.neutral_school['school2'] = this.all_wizards_school[this.school]['neutral'][1];
        this.neutral_school['school3'] = this.all_wizards_school[this.school]['neutral'][2];
        this.neutral_school['school4'] = this.all_wizards_school[this.school]['neutral'][3];
        this.neutral_school['school5'] = this.all_wizards_school[this.school]['neutral'][4];

        return [
            this.increase_spells(this.all_spells[this.neutral_school['school1']]['spells'], 4),
            this.increase_spells(this.all_spells[this.neutral_school['school2']]['spells'], 4),
            this.increase_spells(this.all_spells[this.neutral_school['school3']]['spells'], 4),
            this.increase_spells(this.all_spells[this.neutral_school['school4']]['spells'], 4),
            this.increase_spells(this.all_spells[this.neutral_school['school5']]['spells'], 4)

        ];
    }

    // Add an neutral spell to the mage spellbook
    choose_spell(spell, level, neutral_spell_code){
        super.choose_spell(this.neutral_school[neutral_spell_code], spell, level);
        this.neutral_spell_code[neutral_spell_code]=true;

    }

    // Remove an neutral spell from the mage spellbook
    remove_spell(spell, neutral_spell_code){
        super.remove_spell(spell);
        this.neutral_spell_code[neutral_spell_code]=false;
    }

    __spells_count(){
        let spells_count = 0;
        for(const _select in this.neutral_spell_code){
            console.log(this.neutral_spell_code[_select]);
            if(this.neutral_spell_code[_select]){
                spells_count += 1;
            }
        }
        console.log(spells_count);
        return spells_count;
    }

    // True if we can add a new spell
    can_choose(neutral_spell_code){
        return !this.neutral_spell_code[neutral_spell_code] && this.__spells_count() < 2;
    }

    // Check if can validate
    can_validate(){
        console.log(this.neutral_spell_code);
        
        if(this.__spells_count() >= 2){
            return true;
        }
        else
        {
            return false;
        }
    }
}