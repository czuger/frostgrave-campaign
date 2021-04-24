/**
 * Created by cedric on 24/04/2021.
 */

var selected_components = new Set([]);

Vue.component('spell-button', {
    data: function () {
        return { selected: false, nonSelected: 'btn-light', Selected: 'btn-primary', Btn: 'btn btn-block'}
    },
    props: ['spell_name'],
    template: '<button type="button" :class="[selected ? Selected : nonSelected, Btn]"  @click="clicked">{{ spell_name }}</button>',
    methods: {
        clicked(event) {
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

            console.log(selected_components);
        }
    }
});


// L'objet est ajouté à une instance de Vue
new Vue({
    el: '#wizard-choose-spells',
    data: { spells: [] },
    mounted: function () {
        this.name = name_gen();

        axios
            .get('/spells.json')
            .then(response => {
                const result = response.data;
                const mage_type = $('#mage_type').val();

                this.spells = result[mage_type]['spells'].map(x => x['title']);
    });
}});

