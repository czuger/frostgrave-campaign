require 'json'

spell_book = {}
status = :waiting
spells = {}
current_spell = {}

File.open('spells.txt').readlines.each do |line|
  spline = line.split

  if spline.count == 1 and spline.first.upcase == spline.first
    spells[:title] = spline.first
    spells[:spells] = []
    status = :spell
  elsif status == :spell and spline.count == 0
    if current_spell != {}
      spells[:spells] << current_spell
    end

    spell_book[spells[:title]] = spells
    puts("Adding #{spells[:title]}")

    spells = {}
    current_spell = {}
    status = :waiting
  elsif status == :spell and spline.first.upcase == spline.first and spline.first.length > 1
    if current_spell != {}
      spells[:spells] << current_spell
      current_spell = {}
    end

    spell_title = line.split('/')
    # p spell_title[1]
    current_spell[:title] = spell_title[0].split[0..-2].join(' ')
    current_spell[:difficulty] = spell_title[1].to_i
    current_spell[:target] = spell_title[2].strip
  else
    current_spell[:description] ||= ''
    current_spell[:description] += line.strip
  end
end

File.open('html/spells.json', 'w') do |f|
  f.puts JSON.pretty_generate(spell_book)
end
