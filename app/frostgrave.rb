require 'sinatra'
require 'sinatra'
require 'sinatra/activerecord'
# require 'sinatra/cors'
require 'json'
require 'securerandom'

require 'omniauth'
require 'omniauth-discord'

require_relative 'auth'
require_relative 'wizard_edition'

require_relative 'models/user'
require_relative 'models/wizard'
require_relative 'models/spell_school'
require_relative 'models/spell_known'
require_relative 'models/spell'
require 'sinatra/activerecord'
require_relative 'libs/name_generator/name_gen'
require 'pp'

settings = File.read("#{Dir.getwd}/config/settings.json")
settings = JSON.parse(settings)

use Rack::Session::Cookie,
    :secret => settings['session_key'],
    :key => 'frostgrave_campaign_session'

# Need this otherwise first connection don't work. Need to work with only one session.
# set :sessions, true
# set :session_secret, (ENV['CC_SESSION_SECRET'].to_s == '' ? SecureRandom.base64 : ENV['CC_SESSION_SECRET'])
set :database_file, "#{Dir.getwd}/config/database.yml"
set :port, settings['port']

# set :allow_origin, '*'
# set :allow_methods, 'GET,HEAD,POST,OPTIONS'
# set :allow_headers, 'content-type,if-modified-since'
# set :expose_headers, 'location,link'

use OmniAuth::Builder do
  provider :discord, settings['discord_auth_id'], settings['discord_auth_key']
end

before do
  pass if %w[auth login logout].include? request.path_info.split('/')[1]
  authorize!
end

get '/name' do
  gen_name(params['sex'], params['title'])
end

get '/' do
  @wizards = current_user.wizards
  haml :index
end

get '/new_mage_school_spells' do
  haml :new_mage_school_spells, :locals => {mage_type: params[:mage_type], mage_name: params[:mage_name]}
end

get '/new_mage_aligned_spells' do
  @wizard = Wizard.find(params['mage_id'])
  p @wizard
  haml :new_mage_aligned_spells, :locals => {mage_type: params[:mage_type], mage_name: params[:mage_name]}
end

get '/new_mage_neutral_spells' do
  haml :new_mage_neutral_spells, :locals => {mage_type: params[:mage_type], mage_name: params[:mage_name]}
end

get '/show_mage_spells' do
  haml :show_mage_spells, :locals => {mage_type: params[:mage_type], mage_name: params[:mage_name]}
end

post '/sync_mage' do
  pp params

  user = current_user
  p user
  school = SpellSchool.find_by(name: params[:school])
  p school


  mage = Wizard.find_or_create_by!(name: params[:name], user_id: user.id, spell_school_id: school.id)

  params[:mage_spells].each do |k, v|
    spell = Spell.find_by(name: k)
    SpellKnown.find_or_create_by!(spell_id: spell.id, wizard_id: mage.id, level: v['level'])
  end

  content_type :json

  {mage_id: mage.id}.to_json
end


# sleep(5)

# File.open('frostgrave.pid', 'w') do |f|
#   f.puts Process.pid
# end