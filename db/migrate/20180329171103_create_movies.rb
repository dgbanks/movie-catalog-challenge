class CreateMovies < ActiveRecord::Migration[5.1]
  def change
    create_table :movies do |t|
      t.string :title, null: false
      t.text :storyline
      t.date :release_date
      t.string :genres, array: true, default: []
      t.string :imdb_link
      t.timestamps
    end
  end
end
