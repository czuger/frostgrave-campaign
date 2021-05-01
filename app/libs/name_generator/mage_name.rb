class MageName
  
  NM1 = ['a','e','i','o','u']
  NM2 = ['','','','c','cr','d','dh','dr','g','gr','j','k','kr','kh','p','pr','q','qr','r','rh','sh','st','str','t','th','tr','v','vr','w','x','z']
  NM3 = ['a','e','i','o','u','a','e','i','o','u']
  NM4 = ['d','g','l','n','r','v','z','d','g','l','n','r','v','z','d','dr','g','gr','l','lr','lv','lz','n','nd','nv','nz','r','rl','v','z']
  NM5 = ['bahn','barin','beus','bin','bras','bus','dalf','darin','del','dium','dius','dor','dore','dus','farihm','faris','feus','flyn','forn','gast','geor','gorim','gron','grus','hagan','harad','haris','hith','hone','jahr','jamar','kalis','key','kius','kore','kron','ldor','lenor','leus','lin','lius','lore','maex','marim','mazz','monar','morn','naxx','neth','neus','nior','nitor','norim','pan','phiar','phior','pius','prix','qihr','qiohr','qirax','qium','qor','quam','ras','rhan','rick','rius','rnas','ronin','rune','shan','sim','sior','sorin','strum','tarum','taz','thar','tior','torn','trix','veus','viar','vior','vius','vras','wix','wyn','xar','xeor','xium','xius','xon','zahl','zahr','zax','zin','zohr','zor']
  NM6 = ['','','','','','c','ch','d','f','fr','h','l','m','n','ph','q','r','rh','s','sh','th','v','z']
  NM7 = ['d','h','l','ll','m','mn','n','nn','ph','r','s','t','z']
  NM8 = ['baris','belle','bess','bine','bis','dali','deis','delis','dores','drisse','dyora','dyrin','ffaeh','faris','ffea','fora','fyne','gaell','ganis','ghis','goris','greth','haen','harise','harith','hione','hith','khealis','kely','key','kon','kora','llaes','lleas','less','lore','lune','lyn','lyna','maev','mari','menazz','monora','morith','naxis','nneas','nelle','ni','nilorh','nora','nydae','nyll','phaen','phi','phiane','phior','phyx','pianne','prixy','qia','qille','qinn','qiohne','qora','rass','rihann','rish','ro','rune','ssaem','shann','sinore','sophi','strea','tarish','tazz','thall','tiye','tosh','trixi','vae','via','vile','vira','vys','waelle','weahl','wixe','wyss','wyn','xaryl','xea','xis','xone','xyll','zahne','zith','zohra','zora','zyni']
  NM9 = ['barin','baris','bin','bine','bis','bras','dall','dali','darin','deis','del','delis','dor','dyrin','farih','ffaeh','ffyn','gaell','ghis','gorin','goris','greth','haen','haris','harith','hion','hith','kalis','kelis','key','kias','konn','kore','karon','ldor','lenor','less','lin','llaes','lleas','lore','lyn','mal','mari','monar','morith','nell','neth','neas','ni','nilorh','nior','nneas','noran','norim','nyll','pan','phiar','phior','prix','qihr','qill','qinn','qiohn','qor','ras','rass','rhan','rihann','rish','rias','rnas','ro','ronin','rin','shan','shann','sim','sior','sorin','ssaem','strea','tarish','thall','tior','tosh','trix','veus','viar','vior','vius','vys','wyn','wyss','xyll','zahl','zin','zith','zohr','zor']
  NM10 = ['','','d','dh','g','h','k','kh','l','m','n','p','ph','r','rh','s','sh','t','th','v','z']
  NM11 = ['d','h','l','ll','m','n','nn','ph','r','rr','s','v','z']

  # type = female : 1, neutral : 2, male : undefined 
  # 
  def gen_name(type) 
    tp = type
    rnd5 = rand * NM3.length || 0
    nTp = rand * 3 || 0

    if(tp == 1)
      if(nTp == 0)
        rnd3 = rand * NM3.length || 0
        rnd6 = rand * NM8.length || 0

        name = NM3[rnd5] + NM8[rnd6]
      elsif(nTp == 1)
        rnd2 = rand * NM6.length || 0
        rnd5 = rand * NM3.length || 0
        rnd6 = rand * NM8.length || 0

        while(NM6[rnd2] == NM8[rnd6][0])
          rnd2 = rand * NM6.length || 0
          p ('Mage loop 1')
        end

        name = NM6[rnd2] + NM3[rnd5] + NM8[rnd6]
      else
        rnd = rand * NM1.length || 0
        rnd2 = rand * NM7.length || 0
        rnd5 = rand * NM3.length || 0
        rnd6 = rand * NM8.length || 0

        while(NM7[rnd2] == NM8[rnd6][0])
          rnd2 = rand * NM7.length || 0
          p ('Mage loop 2')
        end

        name = NM1[rnd] + NM7[rnd2] + NM3[rnd5] + NM8[rnd6]
      end
    elsif(tp == 2)
      if(nTp == 0)
        rnd3 = rand * NM3.length || 0
        rnd6 = rand * NM9.length || 0

        name = NM3[rnd5] + NM9[rnd6]
      elsif(nTp == 1)
        rnd2 = rand * NM10.length || 0
        rnd5 = rand * NM3.length || 0
        rnd6 = rand * NM9.length || 0

        while(NM10[rnd2] == NM9[rnd6][0])
          rnd2 = rand * NM10.length || 0
          p ('Mage loop 3')
        end

        name = NM10[rnd2] + NM3[rnd5] + NM9[rnd6]
      else
        rnd = rand * NM1.length || 0
        rnd2 = rand * NM11.length || 0
        rnd5 = rand * NM3.length || 0
        rnd6 = rand * NM9.length || 0

        while(NM11[rnd2] == NM9[rnd6][0])
          rnd2 = rand * NM11.length || 0
          p ('Mage loop 4')
        end

        name = NM1[rnd] + NM11[rnd2] + NM3[rnd5] + NM9[rnd6]
      end
    else
      if(nTp == 0)
        rnd5 = rand * NM3.length || 0
        rnd6 = rand * NM5.length || 0

        name = NM3[rnd5] + NM5[rnd6]
      elsif(nTp == 1)
        rnd2 = rand * NM2.length || 0
        rnd5 = rand * NM3.length || 0
        rnd6 = rand * NM5.length || 0

        while(NM2[rnd2] == NM5[rnd6][0])
          rnd2 = rand * NM2.length || 0
          p ('Mage loop 5')
        end

        name = NM2[rnd2] + NM3[rnd5] + NM5[rnd6]
      else
        rnd = rand * NM1.length || 0
        rnd2 = rand * NM4.length || 0
        rnd5 = rand * NM3.length || 0
        rnd6 = rand * NM5.length || 0

        while(NM4[rnd2] == NM5[rnd6][0])
          rnd2 = rand * NM4.length || 0
          p ('Mage loop 6')
        end

        name = NM1[rnd] + NM4[rnd2] + NM3[rnd5] + NM5[rnd6]
      end
    end

    return name[0].upcase + name[1..-1]
  end

  def gen(sex = :male)
    if(sex == :female)
      return gen_name(1)
    else
      if rand(2) == 1
        # p 'neutral'
        return gen_name(0)
      else
        return gen_name(nil)
      end
    end
  end
end
