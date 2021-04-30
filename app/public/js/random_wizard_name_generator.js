class MageTitle{
    titles_m=['le grand', 'le superbe', 'le huttin', 'le hautin', 'le terrible', 'le borgne', 'le beau', "l'ancien",
    'le terrible', 'le fourbe', 'le cagneux', 'le vil', 'le magnanime', 'le formidable', "l'affreux", 'le noir',
        'le blanc', 'le gris', 'le brun', "l'écarlate"];
    titles_f=['la grande', 'la superbe', 'la hautaine', 'la terrible', 'la belle', 'la traitresse', 'la bigarrée',
    'la noire', 'la blanche', 'la brune', "l'écarlate", 'la purpurine'];

    gen(sex){
        if(sex==='female'){
            return _.sample(this.titles_f);
        }
        else
        {
            return _.sample(this.titles_m);
        }
    }
}

class MageName{
    nm1 = ["a","e","i","o","u"];
    nm2 = ["","","","c","cr","d","dh","dr","g","gr","j","k","kr","kh","p","pr","q","qr","r","rh","sh","st","str","t","th","tr","v","vr","w","x","z"];
    nm3 = ["a","e","i","o","u","a","e","i","o","u"];
    nm4 = ["d","g","l","n","r","v","z","d","g","l","n","r","v","z","d","dr","g","gr","l","lr","lv","lz","n","nd","nv","nz","r","rl","v","z"];
    nm5 = ["bahn","barin","beus","bin","bras","bus","dalf","darin","del","dium","dius","dor","dore","dus","farihm","faris","feus","flyn","forn","gast","geor","gorim","gron","grus","hagan","harad","haris","hith","hone","jahr","jamar","kalis","key","kius","kore","kron","ldor","lenor","leus","lin","lius","lore","maex","marim","mazz","monar","morn","naxx","neth","neus","nior","nitor","norim","pan","phiar","phior","pius","prix","qihr","qiohr","qirax","qium","qor","quam","ras","rhan","rick","rius","rnas","ronin","rune","shan","sim","sior","sorin","strum","tarum","taz","thar","tior","torn","trix","veus","viar","vior","vius","vras","wix","wyn","xar","xeor","xium","xius","xon","zahl","zahr","zax","zin","zohr","zor"];
    nm6 = ["","","","","","c","ch","d","f","fr","h","l","m","n","ph","q","r","rh","s","sh","th","v","z"];
    nm7 = ["d","h","l","ll","m","mn","n","nn","ph","r","s","t","z"];
    nm8 = ["baris","belle","bess","bine","bis","dali","deis","delis","dores","drisse","dyora","dyrin","ffaeh","faris","ffea","fora","fyne","gaell","ganis","ghis","goris","greth","haen","harise","harith","hione","hith","khealis","kely","key","kon","kora","llaes","lleas","less","lore","lune","lyn","lyna","maev","mari","menazz","monora","morith","naxis","nneas","nelle","ni","nilorh","nora","nydae","nyll","phaen","phi","phiane","phior","phyx","pianne","prixy","qia","qille","qinn","qiohne","qora","rass","rihann","rish","ro","rune","ssaem","shann","sinore","sophi","strea","tarish","tazz","thall","tiye","tosh","trixi","vae","via","vile","vira","vys","waelle","weahl","wixe","wyss","wyn","xaryl","xea","xis","xone","xyll","zahne","zith","zohra","zora","zyni"];
    nm9 = ["barin","baris","bin","bine","bis","bras","dall","dali","darin","deis","del","delis","dor","dyrin","farih","ffaeh","ffyn","gaell","ghis","gorin","goris","greth","haen","haris","harith","hion","hith","kalis","kelis","key","kias","konn","kore","karon","ldor","lenor","less","lin","llaes","lleas","lore","lyn","mal","mari","monar","morith","nell","neth","neas","ni","nilorh","nior","nneas","noran","norim","nyll","pan","phiar","phior","prix","qihr","qill","qinn","qiohn","qor","ras","rass","rhan","rihann","rish","rias","rnas","ro","ronin","rin","shan","shann","sim","sior","sorin","ssaem","strea","tarish","thall","tior","tosh","trix","veus","viar","vior","vius","vys","wyn","wyss","xyll","zahl","zin","zith","zohr","zor"];
    nm10 = ["","","d","dh","g","h","k","kh","l","m","n","p","ph","r","rh","s","sh","t","th","v","z"];
    nm11 = ["d","h","l","ll","m","n","nn","ph","r","rr","s","v","z"];

    // type = female : 1, neutral : 2, male : undefined
    gen_name(type){
        const tp = type;

        let rnd = null;
        let rnd1 = null;
        let rnd2 = null;
        let rnd3 = null;
        let rnd4 = null;
        let rnd5 = null;
        let rnd6 = null;
        rnd5 = Math.random() * this.nm3.length | 0;
        
        const nTp = Math.random() * 3 | 0;
        if(tp === 1){
            if(nTp === 0){
                rnd3 = Math.random() * this.nm3.length | 0;
                rnd6 = Math.random() * this.nm8.length | 0;
                name = this.nm3[rnd5] + this.nm8[rnd6];
            }else if(nTp === 1){
                rnd2 = Math.random() * this.nm6.length | 0;
                rnd5 = Math.random() * this.nm3.length | 0;
                rnd6 = Math.random() * this.nm8.length | 0;
                while(this.nm6[rnd2] === this.nm8[rnd6].charAt(0)){
                    rnd2 = Math.random() * this.nm6.length | 0;
                    console.log('Mage loop 1');
                }
                name = this.nm6[rnd2] + this.nm3[rnd5] + this.nm8[rnd6];
            }else{
                const rnd = Math.random() * this.nm1.length | 0;
                rnd2 = Math.random() * this.nm7.length | 0;
                rnd5 = Math.random() * this.nm3.length | 0;
                rnd6 = Math.random() * this.nm8.length | 0;
                while(this.nm7[rnd2] === this.nm8[rnd6].charAt(0)){
                    rnd2 = Math.random() * this.nm7.length | 0;
                    console.log('Mage loop 2')
                }
                name = this.nm1[rnd] + this.nm7[rnd2] + this.nm3[rnd5] + this.nm8[rnd6];
            }
        }else if(tp === 2){
            if(nTp === 0){
                rnd3 = Math.random() * this.nm3.length | 0;
                rnd6 = Math.random() * this.nm9.length | 0;
                name = this.nm3[rnd5] + this.nm9[rnd6];
            }else if(nTp === 1){
                rnd2 = Math.random() * this.nm10.length | 0;
                rnd5 = Math.random() * this.nm3.length | 0;
                rnd6 = Math.random() * this.nm9.length | 0;
                while(this.nm10[rnd2] === this.nm9[rnd6].charAt(0)){
                    rnd2 = Math.random() * this.nm10.length | 0;
                    console.log('Mage loop 3')
                }
                name = this.nm10[rnd2] + this.nm3[rnd5] + this.nm9[rnd6];
            }else{
                const rnd = Math.random() * this.nm1.length | 0;
                rnd2 = Math.random() * this.nm11.length | 0;
                rnd5 = Math.random() * this.nm3.length | 0;
                rnd6 = Math.random() * this.nm9.length | 0;
                while(this.nm11[rnd2] === this.nm9[rnd6].charAt(0)){
                    rnd2 = Math.random() * this.nm11.length | 0;
                    console.log('Mage loop 4')
                }
                name = this.nm1[rnd] + this.nm11[rnd2] + this.nm3[rnd5] + this.nm9[rnd6];
            }
        }else{
            if(nTp === 0){
                rnd5 = Math.random() * this.nm3.length | 0;
                rnd6 = Math.random() * this.nm5.length | 0;
                name = this.nm3[rnd5] + this.nm5[rnd6];
            }else if(nTp === 1){
                rnd2 = Math.random() * this.nm2.length | 0;
                rnd5 = Math.random() * this.nm3.length | 0;
                rnd6 = Math.random() * this.nm5.length | 0;
                while(this.nm2[rnd2] === this.nm5[rnd6].charAt(0)){
                    rnd2 = Math.random() * this.nm2.length | 0;
                    console.log('Mage loop 5')
                }
                name = this.nm2[rnd2] + this.nm3[rnd5] + this.nm5[rnd6];
            }else{
                const rnd = Math.random() * this.nm1.length | 0;
                rnd2 = Math.random() * this.nm4.length | 0;
                rnd5 = Math.random() * this.nm3.length | 0;
                rnd6 = Math.random() * this.nm5.length | 0;
                while(this.nm4[rnd2] === this.nm5[rnd6].charAt(0)){
                    rnd2 = Math.random() * this.nm4.length | 0;
                    console.log('Mage loop 6')
                }
                name = this.nm1[rnd] + this.nm4[rnd2] + this.nm3[rnd5] + this.nm5[rnd6];
            }
        }

        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    gen(sex){
        if(sex==='female'){
            return this.gen_name(1);
        }else
        {
            const rnd = Math.floor(Math.random() * 2);
            switch (rnd){
                case 0:
                    return this.gen_name(null);
                case 1:
                    return this.gen_name(0);
                default:
                    console.log(`Sorry, we are out of ${rnd}.`);
            }
        }
    }
}

function name_gen(sex){
    const title = new MageTitle();
    const mn = new MageName();

    let name = mn.gen('male');

    const gen_title = Math.floor(Math.random() * 10);
    if(gen_title === 1){
        name += ' ' + title.gen('male')
    }

    return name;
}