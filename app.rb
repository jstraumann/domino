require 'sinatra/base'
require 'sinatra/reloader'
require 'sinatra/activerecord'

require './lib/filter'
require './lib/search'
require './lib/image'
require './lib/network'

class Collection < ActiveRecord::Base

end

class Domino < Sinatra::Base
  enable :sessions
  register Sinatra::ActiveRecordExtension

  configure :development do
    register Sinatra::Reloader
    also_reload 'lib/filter.rb'
    after_reload do
      puts 'reloaded'
    end
  end

  get '/' do
    @stats = Search.stats(params[:filter] || [])
    @images = Image.get(params[:filter] || [])
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
end
