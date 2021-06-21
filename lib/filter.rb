require 'json'
require 'cgi'
require 'open-uri'

class Filter
  def self.all
    content = File.read('public/filters.json')
    JSON.parse(content,  object_class: OpenStruct)
  end

  def self.build(filter_param)
    filter_param.map do |term|
      key, value = term.split("=")
      "o_#{CGI.escape(key)}=\\b#{CGI.escape(value)}\\b"
    end.join('&')
  end

  def self.codes
    uri = URI.parse('https://bildarchiv-js.ch/api/filters/all.json')
    content = uri.read
    JSON.parse(content, object_class: OpenStruct)
  end
end
