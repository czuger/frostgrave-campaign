require 'sinatra'

get '/' do
  haml :index
end

get '/new_mage_create' do
  haml :new_mage_create
end

get '/new_mage_school_spells' do
  haml :new_mage_school_spells, :locals => {mage_type: params[:mage_type]}
end
