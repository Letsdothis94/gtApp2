class CreateJwtTokens < ActiveRecord::Migration[7.0]
  def change
    create_table :jwt_tokens do |t|

      t.timestamps
    end
  end
end
