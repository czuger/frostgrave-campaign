class SpellKnown < ActiveRecord::Base
  belongs_to :spell
  belongs_to :wizard
end