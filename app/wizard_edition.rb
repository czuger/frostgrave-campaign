require 'sinatra/base'
require_relative '../app/models/user'
require_relative 'models/spell_school'
require_relative 'models/wizard'

module Sinatra
  module WizardEdition

    module Helpers
      def set_wizard_from_params
        if params[:wizard_id]

          @wizard = Wizard.find(params[:wizard_id])

          @wizard_to_html = {
            name: @wizard.name,
            school: @wizard.school,
            spells: @wizard.known_spells.map(&:name)
          }

          pp &@wizard_to_html
        else
          @wizard = Wizard.new()
        end
      end
    end

    def self.registered(app)
      app.helpers WizardEdition::Helpers

      app.get '/mage_new' do
        authorize!

        set_wizard_from_params
        @schools = SpellSchool.all.order(:name)

        haml :mage_new
      end

      app.get'/mage_create' do
        authorize!

        set_wizard_from_params
        @school = SpellSchool.find_by_name(params[:mage_type])
        @wizard.name = params[:mage_name]
        @wizard.spell_school = @school
        @wizard.user = current_user

        @wizard.save!
      end

    end
  end

  register WizardEdition
end
