require_relative 'filter'
require_relative 'network'

class Search
  def self.stats(filter_param)
    s = Time.now
    query = Filter.build(filter_param)
    url = "https://bildarchiv-js.ch/api/images?sort=-Jahr&per_page=30&page=1&#{query}"
    Network.get_json(url)
  end
end
