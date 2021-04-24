/**
 * Created by cedric on 24/04/2021.
 */

// L'objet est ajouté à une instance de Vue
new Vue({
    el: '#wizard-choice',
    data: { wiz_types: [] },
    mounted: function () {
        axios
            .get('/wizards.json')
            .then(response => {
                const result = response.data;
                console.log(result)
                this.wiz_types = Object.keys(result);
    });
}});

