require 'sinatra'

get '/' do
  haml :index
end

get '/create' do
  haml :new_mage_create
end
