require 'sinatra/base'
require 'json'
require_relative '../app/models/user'
require_relative 'models/spell_school'
require_relative 'models/wizard'
require_relative 'models/spell'

module Sinatra
  module WizardEdition

    module Helpers
      def set_wizard_from_params
        # p params

        if params[:wizard_id]

          @wizard = Wizard.find(params[:wizard_id])

          @wizard_export = {
            id: @wizard.id,
            name: @wizard.name,
            school_id: @wizard.spell_school_id,
            school_name: @wizard.spell_school.name,
            spells_names: @wizard.spell_knowns.includes(:spell).map{ |e| e.spell.name }
          }

          # pp @wizard_export
        else
          @wizard = Wizard.new()
        end
      end

      def set_spells
        @spells = File.open('data/spells.json').read
      end

      def set_full_flat_spells_map
        @flatten_spells = JSON.parse(File.open('data/flatten_spells.json').read)
        reversed_schools = JSON.parse(File.open('data/reversed_schools.json').read)

        spells = Hash[@wizard.spell_knowns.includes(:spell).map{ |e| [e.spell.name, e.level] }]
        spell_to_school = Hash[Spell.includes(:spell_school).all.map{ |e| [e.name, e.spell_school.name]}]

        wizard_school_name = @wizard.spell_school.name
        p wizard_school_name

        @flatten_spells.each do |spell_name, v|
          if spells[spell_name]
            v['selected_saved_state'] = true
            v['difficulty'] = spells[spell_name]
          else
            spell_school = spell_to_school[spell_name]
            v['selected_saved_state'] = false
            v['difficulty'] = v['difficulty'] + reversed_schools[wizard_school_name][spell_school]['malus']
          end
        end
      end

      def set_sorted_spells_keys
        @sorted_spells_keys = File.open('data/sorted_spells_keys.json').read
      end
    end

    def self.registered(app)
      app.helpers WizardEdition::Helpers

      app.get '/mage_new' do
        @schools = SpellSchool.all.order(:name)
        haml :mage_new
      end

      app.get'/mage_create' do
        set_wizard_from_params

        @school = SpellSchool.find_by_name(params[:mage_type])
        @wizard.name = params[:mage_name]
        @wizard.spell_school = @school
        @wizard.user = current_user

        @wizard.save!

        redirect "/mage/#{@wizard.id}/new/school"
      end

      app.get '/mage/:wizard_id/new/:step' do
        set_wizard_from_params
        set_spells

        if params[:step] == 'school'
          haml :mage_new_1_school
        end
      end

      app.get '/mage/:wizard_id/edit_spells' do
        set_wizard_from_params
        set_full_flat_spells_map
        set_sorted_spells_keys

        haml :mage_edit_spells
      end

    end
  end

  register WizardEdition
end
