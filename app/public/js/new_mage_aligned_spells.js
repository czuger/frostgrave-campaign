/**
 * Created by cedric on 24/04/2021.
 */


Vue.component('spell-button', {
    data: function () {
        return { selected: false, nonSelected: 'btn-light', Selected: 'btn-primary', Btn: 'btn btn-block'}
    },
    props: ['spell_name', 'spell_content', 'alignedSpellsCode'],
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
            console.log(this.alignedSpellsCode);
            console.log(aligned_spells.selected_aligned[this.alignedSpellsCode]);

            if(this.selected) {
                this.selected = false;
                aligned_spells.selected_aligned[this.alignedSpellsCode] = false;
            }
            else{
                if(!aligned_spells.selected_aligned[this.alignedSpellsCode]){
                    this.selected = true;
                    aligned_spells.selected_aligned[this.alignedSpellsCode]=this.spell_name;
                }
            }

            console.log(aligned_spells.selected_aligned['a'] && aligned_spells.selected_aligned['b'] &&
                aligned_spells.selected_aligned['c']);

            if(aligned_spells.selected_aligned['a'] && aligned_spells.selected_aligned['b'] &&
                aligned_spells.selected_aligned['c']){
                aligned_spells.can_validate = true;
            }
            else
            {
                aligned_spells.can_validate = false;
            }
        }
    }
});


// L'objet est ajouté à une instance de Vue
var aligned_spells = new Vue({
    el: '#wizard-choose-spells',
    data: { aligned_spells_1: [], aligned_spells_2: [], aligned_spells_3: [],
            selected_aligned: { 'a': null, 'b': null, 'c': null },
            can_validate: false, spells_list: null,
            mage_type: null, mage_name: null, wizards: null},
    mounted: function () {
        axios
            .get('/spells.json')
            .then(response => {
                this.spells_list = response.data;
                this.mage_type = $('#mage_type').val();
                this.mage_name = $('#mage_name').val();

                axios
                    .get('/wizards.json')
                    .then(response => {
                        this.wizards = response.data;

                        this.aligned_spells_1 = this.spells_list[this.wizards[this.mage_type]['aligned'][0]]['spells'];
                        this.aligned_spells_2 = this.spells_list[this.wizards[this.mage_type]['aligned'][1]]['spells'];
                        this.aligned_spells_3 = this.spells_list[this.wizards[this.mage_type]['aligned'][2]]['spells'];
                    });
            });

        this.$nextTick(() => {
            // Fires before full page is rendered
            $('[data-toggle="popover"]').popover({
                trigger: 'focus'
            });
        });
    },
    methods: {
        validate: function() {
            const mage_name = $('#mage_name').val();

            let spells = LsManager.get_value(mage_name, 'spells');
            spells.push(aligned_spells.selected_aligned['a']);
            spells.push(aligned_spells.selected_aligned['b']);
            spells.push(aligned_spells.selected_aligned['c']);

            LsManager.set_value(mage_name, 'spells', spells);
            window.location.href = "new_mage_neutral_spells";
        }
    }
});
