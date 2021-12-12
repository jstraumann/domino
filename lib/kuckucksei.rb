class Kuckucksei
  def initialize(kind)
    @kind = kind
  end

  def images
    chapters[@kind.to_sym][:ids].map do |id|
      if id.nil?
        chapters[@kind.to_sym][:cuckoo]
      else
        url = "https://bildarchiv-js.ch/api/images.json?sort=-Jahr&per_page=30&page=1&o_Nummer=#{id}"
        response = HTTParty.get(url)
        data = JSON.parse(response.body).first
        image = Image.transform(data)
        image['Titel'] = "JS #{image['Titel']}"
        image
      end
    end
  end

  def previous
    prev_idx = (current_idx - 1) % chapters.count
    chapters.keys[prev_idx]
  end

  def next
    next_idx = (current_idx + 1) % chapters.count
    chapters.keys[next_idx]
  end

  private

  def current_idx
    chapters.keys.index(@kind.to_sym) || 0
  end

  def chapters
    {
      Köpfe: {
        ids: ['6025', '7264', '7507', '7284', nil, '6764', '8285', '5975'],
        cuckoo: OpenStruct.new(
          url: 'https://domino.juergstraumann.ch/kuckuck/koepfe.jpg',
          Titel: 'Henry Miller',
          Techniken: 'Wasserfarben',
          Grösse: 'mittel',
          Ausrichtung: 'hoch',
          Jahr: 1938,
          Format: nil
        )
      },
      Ungegenständliches: {
        ids: ['7619', '3394', nil, '4055', '7136', '5718', '7720', '7992'],
        cuckoo: OpenStruct.new(
          url: 'https://domino.juergstraumann.ch/kuckuck/ungegenstaendliches.jpg',
          Titel: 'Pia Fries',
          Techniken: 'Ölfarbe',
          Grösse: 'klein',
          Ausrichtung: 'breit',
          Jahr: 1999,
          Format: '65x80'
        )
      },
      Figuren: {
        ids: ['6909', nil, '5447', '7475', '4982', '4490', '5835', '6342'],
        cuckoo: OpenStruct.new(
          url: 'https://domino.juergstraumann.ch/kuckuck/figuren.jpg',
          Titel: 'Martin Disler',
          Techniken: 'Lithografie',
          Grösse: 'mittel',
          Ausrichtung: 'hoch',
          Jahr: nil,
          Format: nil
        )
      },
      Radierung: {
        ids: ['5296', '5177', '5474', nil, '5127', '5275', '5186', '5143'],
        cuckoo: OpenStruct.new(
          url: 'https://domino.juergstraumann.ch/kuckuck/radierung.jpg',
          Titel: 'Martin Ziegelmüller',
          Techniken: 'Radierung',
          Grösse: 'klein',
          Ausrichtung: 'breit',
          Jahr: nil,
          Format: nil
        )
      },
      Akt: {
        ids: ['0509', '0996', '7956', '4832', '4238', '0785', nil, '0445'],
        cuckoo: OpenStruct.new(
          url: 'https://domino.juergstraumann.ch/kuckuck/akt.jpg',
          Titel: 'Rudolf Mumprecht: der fliegende Teppich',
          Techniken: 'Tusche auf Papier',
          Grösse: 'mittel',
          Ausrichtung: 'hoch',
          Jahr: nil,
          Format: nil
        )
      }
    }
  end
end
