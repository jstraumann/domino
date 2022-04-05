require 'httparty'
require 'sinatra/base'
require 'sinatra/reloader'
require 'sinatra/activerecord'

require './lib/filter'
require './lib/search'
require './lib/network'
require './lib/kuckucksei'
require './lib/image'

class Collection < ActiveRecord::Base

end

class Domino < Sinatra::Base
  enable :sessions
  register Sinatra::ActiveRecordExtension

  configure :development do
    register Sinatra::Reloader
    also_reload 'lib/*.rb'
    after_reload do
      puts 'reloaded'
    end
  end

  get '/' do
    @stats = Search.stats([])
    @filters = Filter.all
    erb :index
  end

  post '/collections' do
    data = JSON.parse(request.body.read)
    Collection.create!(data)
  end

  get '/collections' do
    erb :collections
  end

  get '/schnupperlehre' do
    erb :schnupperlehre
  end

  get '/wervechselt' do
    erb :wervechselt
  end

  get '/kuckucksei' do
    redirect '/kuckucksei/Köpfe'
  end

  get '/kuckucksei/:kind' do
    k = Kuckucksei.new(params[:kind])
    @images = k.images
    @previous = k.previous
    @next = k.next
    erb :kuckucksei
  end

  post '/transform' do
    request.body.rewind
    d = JSON.parse(request.body.read)
    d = Image.transform(d)
    d.to_json
  end

  post '/preview' do
    request.body.rewind
    d = JSON.parse(request.body.read)
    @image = Image.transform(d)
    erb :image_with_overlay
  end
end
