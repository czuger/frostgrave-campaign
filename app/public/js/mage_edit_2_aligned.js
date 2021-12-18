/**
 * Created by cedric on 24/04/2021.
 */


var mage_manager = new MageManagerAligned();

Vue.component('spell-button', {
    data: function () {
        return { selected: false, nonSelected: 'btn-light', Selected: 'btn-primary', Btn: 'btn btn-block'}
    },
    props: ['spell_name', 'spell_content', 'spell_school', 'spell_level', 'alignedSpellsCode'],
    template: `
        <div class="row mt-2">
        <div class="col-9">
            <button type="button" :class="[selected ? Selected : nonSelected, Btn]" @click="select">{{ spell_name }}</button>        
        </div>
        <div class="col-3">
            <button type="button" class="btn btn-block btn-warning" data-toggle="popover" data-placement="left" :data-content="spell_content">Info</button>        
        </div>
        </div>
    `,
    methods: {
        select(event) {
            if(this.selected) {
                this.selected = false;
                mage_manager.remove_spell(this.spell_name, this.alignedSpellsCode);
            }
            else{
                if(!aligned_spells.selected_aligned[this.alignedSpellsCode]){
                    this.selected = true;
                    aligned_spells.selected_aligned[this.alignedSpellsCode]=this.spell_name;
                    mage_manager.choose_spell(this.spell_name, this.spell_level, this.alignedSpellsCode);
                }
            }

            aligned_spells.can_validate = mage_manager.can_validate();
        }
    }
});


// L'objet est ajouté à une instance de Vue
var aligned_spells = new Vue({
    el: '#wizard-choose-spells',
    data: { aligned_spells_1: [], aligned_spells_2: [], aligned_spells_3: [],
            selected_aligned: { 'a': null, 'b': null, 'c': null },
            can_validate: false },
    mounted: function () {
        axios
            .get('/spells.json')
            .then(response => {
                mage_manager.set_mage_info_from_dom();
                mage_manager.set_spells(response.data);

                axios
                    .get('/wizards.json')
                    .then(response => {
                        mage_manager.set_wizards(response.data);
                        mage_manager.load(mage_manager.name);

                        const [a1, a2, a3] = mage_manager.get_aligned_spells_names();
                        [this.aligned_spells_1, this.aligned_spells_2, this.aligned_spells_3] = [a1, a2, a3];

                        this.$nextTick()
                            .then(function () {
                                // DOM updated
                                $('[data-toggle="popover"]').popover({
                                    trigger: 'focus'
                                });
                            });
                    });
            });
    },
    methods: {
        validate: function() {
            // mage_manager.save();

            const next_url = "new_mage_neutral_spells?mage_type="+mage_manager.school;
            sync_mage(mage_manager, next_url);

        }
    }
});