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
        this.wizard_id = $('#wizard_id').val();
    }

    // Set the spells list
    set_spells(_spells){
        const json_str = $('#spells');
        const spells = JSON.parse(json_str);
        this.all_spells = spells;
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

    // Increase spells value (for aligned and neutral schools)
    increase_spells(spells, value){
        let result = [];
        for(let spell of spells){
            spell.difficulty += value;
            result.push(spell);
        }
        return spells;
    }

    spellbook(){
        const spellbook = [];

        const flat_spells = {};

        for(const school of Object.values(this.all_spells)){
            // console.log(school);
            for(const spell of school['spells']){
                // console.log(spell);
                flat_spells[spell.title] = spell;
            }
        }

        console.log(this.mage_spells);
        for(const spell in this.mage_spells){
            const school = this.mage_spells[spell].school;
            const spell_data = flat_spells[spell];


            console.log(spell);
            spellbook.push({'title':spell, 'difficulty':this.mage_spells[spell].level,
                'target': spell_data.target, 'description': spell_data.description});
        }
        return spellbook;
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
