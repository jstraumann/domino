require_relative 'filter'
require_relative 'network'

class Image
  def self.get(filter_param, page = 1)
    query = Filter.build(filter_param)
    url = "https://bildarchiv-js.ch/api/images.json?sort=-Jahr&per_page=30&page=#{page}&#{query}"
    data = Network.get_json(url)
    codes = Filter.codes
    data.each do |d|
      t_match = d['Techniken'].split(' ').map{ |t| codes.find{ |c| c.Column == 'Technik' && c.Code == t } }
      d['Techniken'] = t_match.empty? ? '-' : t_match.map{ |x| x.nil? ? '-' : x.Title }.join(', ')
      m_match = d['Motiven'].split(' ').map{ |t| codes.find{ |c| c.Column == 'Motiven' && c.Code == t } }
      d['Motiven'] = m_match.empty? ? '-' : m_match.map{ |x| x.nil? ? '-' : x.Title }.join(', ')
      d_match = d['Darstellungsformen'].split(' ').map{ |t| codes.find{ |c| c.Column == 'Darstellungsformen' && c.Code == t } }
      d['Darstellungsformen'] = d_match.empty? ? '-' : d_match.map{ |x| x.nil? ? '-' : x.Title }.join(', ')
      d['Status'] = (d['Status'] == 'res' ? 'reserviert' : nil)
    end
    return data
  end
end
