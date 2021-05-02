/**
 * Created by cedric on 28/04/2021.
 */

class MageManager{

    constructor (){
        this.mage_spells = {};
    }

    // Set the mage info
    set_mage_info_from_dom(){
        this.name = $('#mage_name').val();
        this.school = $('#mage_type').val();
    }

    // Set the spells list
    set_spells(_spells){
        this.all_spells = _spells;
    }

    // Set the wizard school list
    set_wizards(_schools){
        this.all_wizards_school = _schools;
    }

    // Count the current amount of spells in the wizard spellbook
    spells_amount(){
        return Object.keys(this.mage_spells).length;
    }

    // Add a spell to the mage spellbook
    choose_spell(school, spell, level){
        this.mage_spells[spell]={school: school, level: level}
    }

    // Remove a spell from the mage spellbook
    remove_spell(spell){
        delete this.mage_spells[spell];
    }

    // Return all spells for a given school
    get_school_spells(school){
        return this.all_spells[school]['spells'];
    }

    // Return all spells for the mage school
    get_mage_school_spells(){
        let spells = [];

        for (const spell of this.get_school_spells(this.school)) {
            if(this.mage_spells[spell.title]){
                spell.selected_saved_state = true;
            }
            spells.push(spell);
        }

        return spells;
    }

    // Save the data
    save(){
        if(this.name){
            LsManager.set_value(this.name, 'name', this.name);
            LsManager.set_value(this.name, 'school', this.school);
            LsManager.set_value(this.name, 'spells', this.mage_spells);
        }
    }

    // Load the data
    load(name){
        this.name = name;

        const school = LsManager.get_value(name, 'school');
        if(school){
            this.school = school;
        }

        const spells = LsManager.get_value(name, 'spells');
        if(spells){
            this.mage_spells = spells;
        }
    }
}
