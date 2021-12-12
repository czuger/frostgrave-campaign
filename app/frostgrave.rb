require 'sinatra'
require 'sinatra'
require 'sinatra/activerecord'
# require 'sinatra/cors'
require 'json'
require 'securerandom'

require 'omniauth'
require 'omniauth-discord'

require_relative 'auth'

require_relative 'models/user'
require_relative 'models/wizard'
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

get '/name' do
  gen_name(params['sex'], params['title'])
end

get '/' do
  authorize!
  @wizards = current_user.wizards
  haml :index
end

get '/new_mage_create' do
  haml :new_mage_create
end

get '/new_mage_school_spells' do
  haml :new_mage_school_spells, :locals => {mage_type: params[:mage_type], mage_name: params[:mage_name]}
end

get '/new_mage_aligned_spells' do
  haml :new_mage_aligned_spells, :locals => {mage_type: params[:mage_type], mage_name: params[:mage_name]}
end

get '/new_mage_neutral_spells' do
  haml :new_mage_neutral_spells, :locals => {mage_type: params[:mage_type], mage_name: params[:mage_name]}
end

get '/show_mage_spells' do
  haml :show_mage_spells, :locals => {mage_type: params[:mage_type], mage_name: params[:mage_name]}
end

post '/sync_mage' do
  # p 'request'
  # pp request

  p 'params'
  pp params

  nil
end


# sleep(5)

# File.open('frostgrave.pid', 'w') do |f|
#   f.puts Process.pid
# end