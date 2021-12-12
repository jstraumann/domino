class AddCommentToCollections < ActiveRecord::Migration[6.1]
  def change
    add_column :collections, :comment, :string
  end
end
