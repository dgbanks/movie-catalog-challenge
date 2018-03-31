class Movie < ApplicationRecord
  validates :title, presence: true

  def self.search(query)
    self.where(
      "title ILIKE ?", "%#{query}%").limit(5)
  end

end
