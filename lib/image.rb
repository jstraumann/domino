require_relative 'filter'
require_relative 'network'

class Image
  def self.get(filter_param, page = 1)
    query = Filter.build(filter_param)
    url = "http://www.bildarchiv-js.com/api/images.json?sort=-Jahr&per_page=30&page=#{page}&#{query}"
    Network.get_json(url)
  end
end
