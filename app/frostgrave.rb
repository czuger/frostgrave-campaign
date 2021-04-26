require 'sinatra'

puts "This is process #{Process.pid}"

get '/' do
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
