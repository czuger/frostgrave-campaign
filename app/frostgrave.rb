require 'sinatra'

get '/' do
  haml :index
end

get '/create' do
  haml :create
end
