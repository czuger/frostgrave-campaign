/**
 * Created by cedric on 24/04/2021.
 */

// L'objet est ajouté à une instance de Vue
new Vue({
    el: '#wizard-choice',
    data: { wiz_types: [], name: null, sex: false, title: false },
    mounted: function () {
        axios
            .get('/name')
            .then(response => {
                this.name = response.data;
            });

        axios
            .get('/wizards.json')
            .then(response => {
                const result = response.data;
                console.log(result);
                this.wiz_types = Object.keys(result);
            });
    },
    methods: {
        greet: function (event) {
            // `this` fait référence à l'instance de Vue à l'intérieur de `methods`
            alert('Bonjour ' + this.name + ' !')
            // `event` est l'évènement natif du DOM
            if (event) {
                alert(event.target.tagName)
            }
        }
    }

});
