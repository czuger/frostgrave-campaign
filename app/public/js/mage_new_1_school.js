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
                mage_manager.remove_spell(this.spell_name);
            }
            else{
                if(mage_manager.spells_amount() <3){
                    this.selected = true;
                    mage_manager.choose_spell(mage_manager.school, this.spell_name, this.spell_level);
                }
            }

            if(mage_manager.spells_amount() === 3){
                school_spells.can_validate = true;
            }
            else
            {
                school_spells.can_validate = false;
            }

            console.log(mage_manager);
        }
    }
});


// L'objet est ajouté à une instance de Vue
var school_spells = new Vue({
    el: '#wizard-choose-spells',
    data: { spells: [], can_validate: false},
    mounted: function () {
        this.name = name_gen();

        mage_manager.set_mage_info_from_dom();
        mage_manager.set_spells();

        console.log(mage_manager);

        this.spells = mage_manager.get_mage_school_spells();

        this.$nextTick(() => {
            // Fires before full page is rendered
            $('[data-toggle="popover"]').popover({
                trigger: 'focus'
            });
        });


        //     axios
    //         .get('/spells.json')
    //         .then(response => {
    //             const result = response.data;
    //
    //             mage_manager.set_mage_info_from_dom();
    //             mage_manager.load(mage_manager.name);
    //             mage_manager.set_spells(result);
    //
    //             this.spells = mage_manager.get_mage_school_spells();
    //             if(this.spells.length >= 3){
    //                 this.can_validate = true;
    //             }
    //
    //             this.$nextTick(() => {
    //                 // Fires before full page is rendered
    //                 $('[data-toggle="popover"]').popover({
    //                     trigger: 'focus'
    //                 });
    //             });
    // });
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
