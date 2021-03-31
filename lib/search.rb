require_relative 'filter'
require_relative 'network'

class Search
  def self.stats(filter_param)
    query = Filter.build(filter_param)
    url = "http://www.bildarchiv-js.com/api/images?sort=-Jahr&per_page=30&page=1&#{query}"
    Network.get_json(url)
  end
end
