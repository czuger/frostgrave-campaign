class AddCreationStateToWizard < ActiveRecord::Migration[6.1]
  def change
    add_column :wizards, :creation_state, :string, null: true
  end
end
