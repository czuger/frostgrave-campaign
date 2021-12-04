class User < ActiveRecord::Base
  has_many :wizards
  # has_many :campaigns, through: :players
end