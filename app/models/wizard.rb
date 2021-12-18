class Wizard < ActiveRecord::Base
  belongs_to :user
  belongs_to :spell_school

  # has_many :campaigns, through: :players
  has_many :spell_knowns
end