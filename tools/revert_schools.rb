require 'json'

def malus(alignment)
  case alignment
    when 'aligned'
      2
    when 'neutral'
      4
    when 'opposed'
      6
  end
end
r = {}

s = JSON.parse(File.open('data/schools.json').read)

s.each do |k, v|
  p k
  r[k] ||= {}
  v.each do |kk, vv|
    p kk, vv
    if kk == 'title'
      r[k][vv] = { alignment: :school, malus: 0 }
    else
      vv.each do |vvv|
        r[k][vvv] = { alignment: kk, malus: malus(kk) }
      end
    end
  end
end

File.open('data/reversed_schools.json', 'w') do |f|
  f.write(JSON.pretty_generate(r))
end