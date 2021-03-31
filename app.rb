require 'uri'

require 'sinatra/base'
require 'sinatra/reloader'
require 'sinatra/activerecord'

require 'httparty'
require 'cgi'

require './lib/filter'

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
    if params[:filter]
      @images = images(params[:filter])
    else
      @images = all_images
    end
    erb :index
  end
end

def all_images
  url = "http://www.bildarchiv-js.com/api/images.json?sort=-Jahr&per_page=2000&page=1"
  puts url
  response = get(url)
  data = JSON.parse(response)
  data[0..200].map do |datum|
    datum['thumb']
  end
end

def images(filter)
  # http://www.bildarchiv-js.com/api/images?sort=-Jahr&per_page=30&page=1&o_Motiven=\bmF\b&o_Technik=\bAc\b
  query = filter.map do |term|
    key, value = term.split("=")
    "o_#{key}=\\b#{CGI.escape(value)}\\b"
  end.join('&')
  url = "http://www.bildarchiv-js.com/api/images.json?sort=-Jahr&per_page=30&page=1&#{query}"
  puts url
  response = get(url)
  data = JSON.parse(response)
  data.map do |datum|
    datum['thumb']
  end
end

def get(url)
  response = HTTParty.get(url)
  response.body
end
