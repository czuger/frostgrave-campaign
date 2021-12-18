require 'sinatra/base'
require_relative '../app/models/user'
require_relative 'models/spell_school'
require_relative 'models/wizard'

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
            spells: @wizard.spell_knowns.map(&:id)
          }

          # pp @wizard_export
        else
          @wizard = Wizard.new()
        end
      end

      def set_spells
        @spells = File.open('data/spells.json').read
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

        redirect "/mage/#{@wizard.id}/edit/school"
      end

      app.get '/mage/:wizard_id/edit/:step' do
        set_wizard_from_params
        set_spells

        if params[:step] == 'school'
          haml :mage_edit_1_school
        end
      end

    end
  end

  register WizardEdition
end
