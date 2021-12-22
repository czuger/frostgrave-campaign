/**
 * Created by cedric on 24/04/2021.
 */

var mage_manager = new MageManagerNeutral();

Vue.component('spell-button', {
    data: function () {
        return { selected: false, nonSelected: 'btn-light', Selected: 'btn-primary', Btn: 'btn btn-block'}
    },
    props: ['spell_name', 'spell_content', 'spell_level', 'neutralSpellsCode'],
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
                mage_manager.remove_spell(this.spell_namee);
            }
            else{
                if(mage_manager.can_choose(this.neutralSpellsCode)){
                    this.selected = true;
                    mage_manager.choose_spell(this.spell_name, this.spell_level, this.neutralSpellsCode);
                }
            }
            neutral_spells.can_validate = mage_manager.can_validate();
        }
    }
});


// L'objet est ajouté à une instance de Vue
var neutral_spells = new Vue({
    el: '#wizard-choose-spells',
    data: { neutral_spells_1: [], neutral_spells_2: [], neutral_spells_3: [], neutral_spells_4: [], neutral_spells_5: [],
            can_validate: false},
    mounted: function () {
        axios
            .get('/spells.json')
            .then(response => {
                mage_manager.set_mage_info_from_dom();
                mage_manager.set_spells(response.data);

                axios
                    .get('/schools.json')
                    .then(response => {
                        mage_manager.set_wizards(response.data);
                        mage_manager.load(mage_manager.name);

                        const [a1, a2, a3, a4, a5] = mage_manager.get_neutral_spells_names();
                        [this.neutral_spells_1, this.neutral_spells_2, this.neutral_spells_3,
                            this.neutral_spells_4, this.neutral_spells_5] = [a1, a2, a3, a4, a5];

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
            mage_manager.save();

            window.location.href = "show_mage_spells?mage_name="+mage_manager.name+"&mage_type="+mage_manager.school;
        }
    }
});