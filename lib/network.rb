require 'httparty'
require 'json'

class Network
  def self.get(url)
    response = HTTParty.get(url)
    response.body
  end

  def self.get_json(url)
    response = self.get(url)
    JSON.parse(response)
  end
end
