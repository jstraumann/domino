require 'json'

class Filter
  def self.all
    content = File.read('public/filters.json')
    JSON.parse(content,  object_class: OpenStruct)
  end
end
