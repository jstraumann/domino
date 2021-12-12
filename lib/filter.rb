require 'json'
require 'cgi'
require 'open-uri'

class Filter
  def self.all
    content = File.read('public/filters.json')
    categories = JSON.parse(content,  object_class: OpenStruct)
    categories.each do |c|
      c.filters.each do |f|
        f.count = 0
        next if f.codes.nil?
        f.codes.each do |code|
          match = Filter.codes.find { |co| co.Code == code }
          if match
            f.count += match.Count
          end
        end
      end
    end
    categories
  end

  def self.codes
    uri = URI.parse('https://bildarchiv-js.ch/api/filters/all.json')
    @@codes ||= JSON.parse(uri.read, object_class: OpenStruct)
  end

  def self.build(filter_param)
    filter_param.map do |term|
      key, value = term.split("=")
      "o_#{CGI.escape(key)}=\\b#{CGI.escape(value)}\\b"
    end.join('&')
  end
end
