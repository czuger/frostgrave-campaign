var nm1 = ["a","e","i","o","u"];
var nm2 = ["","","","c","cr","d","dh","dr","g","gr","j","k","kr","kh","p","pr","q","qr","r","rh","sh","st","str","t","th","tr","v","vr","w","x","z"];
var nm3 = ["a","e","i","o","u","a","e","i","o","u"];
var nm4 = ["d","g","l","n","r","v","z","d","g","l","n","r","v","z","d","dr","g","gr","l","lr","lv","lz","n","nd","nv","nz","r","rl","v","z"];
var nm5 = ["bahn","barin","beus","bin","bras","bus","dalf","darin","del","dium","dius","dor","dore","dus","farihm","faris","feus","flyn","forn","gast","geor","gorim","gron","grus","hagan","harad","haris","hith","hone","jahr","jamar","kalis","key","kius","kore","kron","ldor","lenor","leus","lin","lius","lore","maex","marim","mazz","monar","morn","naxx","neth","neus","nior","nitor","norim","pan","phiar","phior","pius","prix","qihr","qiohr","qirax","qium","qor","quam","ras","rhan","rick","rius","rnas","ronin","rune","shan","sim","sior","sorin","strum","tarum","taz","thar","tior","torn","trix","veus","viar","vior","vius","vras","wix","wyn","xar","xeor","xium","xius","xon","zahl","zahr","zax","zin","zohr","zor"];

function name_gen(){

    nTp = Math.random() * 3 | 0;

    if(nTp === 0){
        rnd5 = Math.random() * nm3.length | 0;
        rnd6 = Math.random() * nm5.length | 0;
        name = nm3[rnd5] + nm5[rnd6];
    }else if(nTp === 1){
        rnd2 = Math.random() * nm2.length | 0;
        rnd5 = Math.random() * nm3.length | 0;
        rnd6 = Math.random() * nm5.length | 0;
        while(nm2[rnd2] === nm5[rnd6].charAt(0)){
            rnd2 = Math.random() * nm2.length | 0;
        }
        name = nm2[rnd2] + nm3[rnd5] + nm5[rnd6];
    }else{
        rnd = Math.random() * nm1.length | 0;
        rnd2 = Math.random() * nm4.length | 0;
        rnd5 = Math.random() * nm3.length | 0;
        rnd6 = Math.random() * nm5.length | 0;
        while(nm4[rnd2] === nm5[rnd6].charAt(0)){
            rnd2 = Math.random() * nm4.length | 0;
        }
        name = nm1[rnd] + nm4[rnd2] + nm3[rnd5] + nm5[rnd6];
    }

    return name.charAt(0).toUpperCase() + name.slice(1);
}