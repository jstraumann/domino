class CreateCollections < ActiveRecord::Migration[6.1]
  def change
    create_table :collections do |t|
      t.string :title
      t.string :username
      t.jsonb :images
      t.boolean :admin

      t.timestamps
    end
  end
end
