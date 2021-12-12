require 'sinatra/activerecord'
require_relative 'models/spell'
require_relative 'models/spell_school'
require 'json'

APP_ENV = ENV.fetch('APP_ENV', 'development')

ActiveRecord::Base.configurations = YAML.load(ERB.new(File.read('config/database.yml')).result)
ActiveRecord::Base.establish_connection(ActiveRecord::Base.configurations[APP_ENV])

File.open('app/public/spells.json') do |f|
  data_hash = JSON.parse(f.read)

  data_hash.each do |k ,v|
    sch = SpellSchool.find_or_create_by!(name: k)

    v['spells'].each do |spell|
      pp spell
      Spell.find_or_create_by!(name: spell['title'], spell_school_id: sch.id)
    end
  end

end
