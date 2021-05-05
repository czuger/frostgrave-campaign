/**
 * Created by cedric on 24/04/2021.
 */

// L'objet est ajouté à une instance de Vue
new Vue({
    el: '#wizard-index',
    data: { names: [] },
    mounted: function () {
        for(const name of Object.keys(localStorage))
        {
            this.names.push(name);
        }
    }
});
