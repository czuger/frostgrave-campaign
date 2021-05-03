/**
 * Created by cedric on 24/04/2021.
 */

var mage_manager = new MageManager();

// L'objet est ajouté à une instance de Vue
new Vue({
    el: '#mage-spells',
    data: { spells: [] },
    mounted: function () {
        axios
            .get('/spells.json')
            .then(response => {
                mage_manager.set_mage_info_from_dom();
                mage_manager.set_spells(response.data);

                mage_manager.load(mage_manager.name);

                this.spells = mage_manager.spellbook();
    });
}});

