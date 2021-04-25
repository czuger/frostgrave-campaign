/**
 * Created by cedric on 24/04/2021.
 */

var selected_components = new Set([]);
var spells_items = {};

Vue.component('spell-button', {
    data: function () {
        return { selected: false, nonSelected: 'btn-light', Selected: 'btn-primary', Btn: 'btn btn-block'}
    },
    props: ['spell_name', 'spell_content'],
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
                selected_components.delete(this.spell_name);
            }
            else{
                if(selected_components.size <3){
                    this.selected = true;
                    selected_components.add(this.spell_name);
                }
            }

            if(selected_components.size === 3){
                school_spells.can_validate = true;
            }
            else
            {
                school_spells.can_validate = false;
            }

            console.log(selected_components);
        }
    }
});


// L'objet est ajouté à une instance de Vue
var school_spells = new Vue({
    el: '#wizard-choose-spells',
    data: { spells: [], can_validate: false},
    mounted: function () {
        this.name = name_gen();

        axios
            .get('/spells.json')
            .then(response => {
                const result = response.data;
                const mage_type = $('#mage_type').val();
                const mage_name = $('#mage_name').val();

                LsManager.set_value(mage_name, 'type', mage_type);
                LsManager.set_value(mage_name, 'name', mage_name);

                for (const spell of result[mage_type]['spells']) {
                    this.spells.push(spell);
                    spells_items[spell['title']]=spell;
                }

        this.$nextTick(() => {
            // Fires before full page is rendered
            $('[data-toggle="popover"]').popover({
                trigger: 'focus'
            });
        });
    });
    },
    methods: {
        validate: function() {
            const mage_type = $('#mage_type').val();
            const mage_name = $('#mage_name').val();

            LsManager.set_value(mage_name, 'spells', Array.from(selected_components));
            window.location.href = "new_mage_aligned_spells?mage_name="+mage_name+"&mage_type="+mage_type;
        }
    }
});
