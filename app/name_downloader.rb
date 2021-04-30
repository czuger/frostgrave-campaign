require 'open-uri'
require 'nokogiri'

doc = Nokogiri.HTML(open('https://www.fantasynamegenerators.com/wizard-names.php'))

p doc.at_css('[id="nameGen"]')
# inline_script = doc.xpath('//script[not(@src)]')
# inline_script.each do |script|
#   puts "-"*50, script.text
# end

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