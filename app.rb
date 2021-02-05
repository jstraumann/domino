require 'sinatra'
require 'httparty'
require 'cgi'

EXCLUDE_FILTERS = ['Selbstbildnisse', 'Capricci', 'Themenkreis Ecuador']

get '/' do
  # get('http://www.bildarchiv-js.com/api/images.json?sort=-Jahr&per_page=-1')
  @filters = filters
  erb :index
end

get '/images' do
  data = images(params[:filter])
  data.to_json
end

def filters
  response = get('http://www.bildarchiv-js.com/api/filters/all.json')
  data = JSON.parse(response)
  data.select do |datum|
    datum['Mode'] == 'Inhalt' && datum['Type'] == 'Motive' && !EXCLUDE_FILTERS.include?(datum['Title'])
  end
end

def images(filter)
  url = "http://www.bildarchiv-js.com/api/images.json?sort=-Jahr&per_page=30&page=1&o_Motiven=\\b#{CGI.escape(filter)}\\b"
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
