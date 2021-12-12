/**
 * Created by cedric on 28/04/2021.
 */

function sync_mage(mage_manager){

    // console.log("Mage manager", JSON.stringify(mage_manager));

    // axios.post('/sync_mage',
    //     { fooBar: mage_manager} )
    //     .then(function (response) {
    //         console.log("Response : ", response);
    //     })
    //     .catch(function (error) {
    //         console.log("Error : ", error);
    //     });

    mm = Object.assign({}, mage_manager);
    mm.all_spells = null;

    $.post( "/sync_mage", mm );

}
