require_relative 'title_gen'
require_relative 'mage_name'

def gen_name(sex, title)
  sex = (sex == 'female' ? :female : :male)
  title = (title == 'true')

  # For now sex and title are random

  sex = (rand(1..3) == 1 ? :female : :male)
  title = (rand(1..3) == 1)

  name = MageName.new.gen(sex)

  name = add_title(name, sex) if title

  name
end

# p gen_name(:male, true)


# https://www.fantasynamegenerators.com/wizard-names.php
# https://www.fantasynamegenerators.com/demon_names.php
# https://www.fantasynamegenerators.com/gargoyle-names.php
# https://www.fantasynamegenerators.com/griffin-names.php
# https://www.fantasynamegenerators.com/ifrit-names.php
# https://www.fantasynamegenerators.com/hydra-names.php
# https://www.fantasynamegenerators.com/minotaur-names.php
# https://www.fantasynamegenerators.com/necromancer-names.php
# https://www.fantasynamegenerators.com/rakshasa-names.php
# https://www.fantasynamegenerators.com/sphinx-names.php
# https://www.fantasynamegenerators.com/valkyrie-names.php