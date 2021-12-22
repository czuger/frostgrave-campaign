/**
 * Created by cedric on 24/04/2021.
 */

var mage_manager = new MageManager();

Vue.component('spell-button', {
    data: function () {
        return { selected: this.selected_saved_state, nonSelected: 'btn-light', Selected: 'btn-primary', Btn: 'btn btn-block'}
    },
    props: ['spell_name', 'spell_content', 'spell_level', 'from_disk', 'selected_saved_state', ],
    template: `
        <div class="row mt-2">
        <div class="col-8">
            <button type="button" :class="[selected ? Selected : nonSelected, Btn]" @click="select">{{ spell_name }}</button>        
        </div>
        <div class="col-1">
            <input type="number" id="form12" class="form-control" :value="spell_level" />     
        </div>        
        <div class="col-3">
            <button type="button" class="btn btn-block btn-warning" data-toggle="popover" data-placement="left" :data-content="spell_content">Info</button>        
        </div>
        </div>
    `,
    methods: {
        select(event) {
            this.selected = !this.selected;
        }
    }
});


// L'objet est ajouté à une instance de Vue
var school_spells = new Vue({
    el: '#wizard-choose-spells',
    data: { spells: [], can_validate: false},
    mounted: function () {
        mage_manager.set_mage_info_from_dom();


        const flatten_spells = JSON.parse($('#flatten_spells').val());
        const sorted_spells_keys = JSON.parse($('#sorted_spells_keys').val());

        for (index = 0; index < sorted_spells_keys.length; index++) {
            var spell = flatten_spells[sorted_spells_keys[index]];
            this.spells.push(spell);
        }

        this.$nextTick(() => {
            // Fires before full page is rendered
            $('[data-toggle="popover"]').popover({
                trigger: 'focus'
            });
        });
    },
    methods: {
        validate: function() {

            const next_url = "/mage/"+mage_manager.id+"/edit/aligned";
            sync_mage(mage_manager, next_url);

            // mage_manager.save();
            // window.location.href = "new_mage_aligned_spells?mage_name="+mage_manager.name+"&mage_type="+mage_manager.school;
        }
    }
});
