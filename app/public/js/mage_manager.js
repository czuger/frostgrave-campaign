/**
 * Created by cedric on 28/04/2021.
 */

class MageManager{

    constructor (){
        this.mage_spells = {};
    }

    set_mage_info(name, school){
        this.name = name;
        this.school = school;
    }

    set_spells(_spells){
        this.all_spells = _spells;
    }

    get_school_spells(school){
        return this.all_spells[school]['spells'];
    }

    get_mage_school_spells(){
        let spells = [];

        for (const spell of this.get_school_spells(this.school)) {
            spells.push(spell);
        }

        return spells;
    }

}
