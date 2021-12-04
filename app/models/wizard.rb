class Wizard < ActiveRecord::Base
  belongs_to :user
  # has_many :campaigns, through: :players
end