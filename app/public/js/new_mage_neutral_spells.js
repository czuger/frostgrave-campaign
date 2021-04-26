/**
 * Created by cedric on 24/04/2021.
 */


Vue.component('spell-button', {
    data: function () {
        return { selected: false, nonSelected: 'btn-light', Selected: 'btn-primary', Btn: 'btn btn-block'}
    },
    props: ['spell_name', 'spell_content', 'neutralSpellsCode'],
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
                neutral_spells.selected_neutral[this.neutralSpellsCode] = false;
            }
            else{
                if(!neutral_spells.selected_neutral[this.neutralSpellsCode] && neutral_spells.spells_count < 2){
                    this.selected = true;
                    neutral_spells.selected_neutral[this.neutralSpellsCode]=this.spell_name;
                }
            }

            neutral_spells.spells_count = 0;
            for(_select in neutral_spells.selected_neutral){
                console.log(neutral_spells.selected_neutral[_select]);
                if(neutral_spells.selected_neutral[_select]){
                    neutral_spells.spells_count += 1;
                }
            }


            if(neutral_spells.spells_count >= 2){
                neutral_spells.can_validate = true;
            }
            else
            {
                neutral_spells.can_validate = false;
            }
        }
    }
});


// L'objet est ajouté à une instance de Vue
var neutral_spells = new Vue({
    el: '#wizard-choose-spells',
    data: { neutral_spells_1: [], neutral_spells_2: [], neutral_spells_3: [], neutral_spells_4: [], neutral_spells_5: [],
            selected_neutral: { 'a': null, 'b': null, 'c': null, 'd': null, 'e': null },
            can_validate: false, spells_list: null, spells_count: 0,
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

                        this.neutral_spells_1 = this.spells_list[this.wizards[this.mage_type]['neutral'][0]]['spells'];
                        this.neutral_spells_2 = this.spells_list[this.wizards[this.mage_type]['neutral'][1]]['spells'];
                        this.neutral_spells_3 = this.spells_list[this.wizards[this.mage_type]['neutral'][2]]['spells'];
                        this.neutral_spells_4 = this.spells_list[this.wizards[this.mage_type]['neutral'][3]]['spells'];
                        this.neutral_spells_5 = this.spells_list[this.wizards[this.mage_type]['neutral'][4]]['spells'];

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
            const mage_name = $('#mage_name').val();

            let spells = LsManager.get_value(mage_name, 'spells');

            for(_select in neutral_spells.selected_neutral){
                if(neutral_spells.selected_neutral[_select]){
                    spells.push(neutral_spells.selected_neutral[_select]);
                }
            }

            LsManager.set_value(mage_name, 'spells', spells);
            window.location.href = "show_mage_spells?mage_name="+mage_name+"&mage_type="+mage_type;
        }
    }
});