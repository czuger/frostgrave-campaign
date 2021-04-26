/**
 * Created by cedric on 24/04/2021.
 */

// L'objet est ajouté à une instance de Vue
new Vue({
    el: '#mage-spells',
    data: { spells: [] },
    mounted: function () {
        axios
            .get('/spells.json')
            .then(response => {
                const spells_list = response.data;
                // console.log(spells_list);

                let flat_spells = {};

                for(const school of Object.values(spells_list)){
                    // console.log(school);
                    for(const spell of school['spells']){
                        // console.log(spell);
                        flat_spells[spell.title] = spell;
                    }
                }

                console.log(flat_spells);

                const mage_name = $('#mage_name').val();
                let spells = LsManager.get_value(mage_name, 'spells');

                console.log(spells);

                for(const spell of spells){
                    this.spells.push(flat_spells[spell]);
                }
    });
}});

