require_relative 'filter'
require_relative 'network'

class Search
  def self.stats(filter_param)
    s = Time.now
    query = Filter.build(filter_param)
    url = "https://bildarchiv-js.ch/api/images?sort=-Jahr&per_page=10000&page=1&#{query}"
    puts url
    res = Network.get_json(url)
    puts "Search.stats: #{Time.now - s}"
    return res
  end
end
