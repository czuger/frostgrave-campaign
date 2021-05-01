require_relative 'titles'

def get_male_list
  TITLES.map{ |e| e[0] }.compact
end

def get_female_list
  TITLES.map{ |e| e[1] }.compact
end

def add_title(name, sex)
  name += ' '
  if sex == :female
    name += get_female_list.sample
  else
    name += get_male_list.sample
  end
  name
end
