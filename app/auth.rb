require 'jwt'
require 'sinatra/base'
require_relative '../app/models/user'

module Sinatra
  module Auth

    module Helpers
      def encode_jwt_token(payload)
        JWT.encode(payload, nil, 'none')
      end

      def decode_jwt_token
        JWT.decode(session[:jwt_token], nil, false)
      end

      def authorized?
        # Force session load (assign dummy)
        session[:warm_up] = :warmup

        if session[:jwt_token]
          return true if decode_jwt_token
        end

        false
      end

      def authorize!
        redirect '/login' unless authorized?
      end

      def logout!
        session[:jwt_token] = nil
      end

      def register_user(auth_hash)
        u = User.find_or_initialize_by(uid: auth_hash['uid'])
        u.name = auth_hash['info']['name']
        u.avatar = auth_hash['info']['image']
        u.save!

        session[:jwt_token] = encode_jwt_token({ id: u.id, name: u.name, avatar: u.avatar })
      end

      def current_user
        token = decode_jwt_token
        User.find(token[0]['id'])
      end
    end

    def self.registered(app)
      app.helpers Auth::Helpers

      app.get '/login' do
        # p session.loaded?
        # session[:init] = true
        # p session.loaded?
        #
        # p session

        @session_failure = session['crfs_failed']

        p request.env['rack.session']

        haml :login
      end

      app.get '/auth/:provider/callback' do
        register_user(request.env['omniauth.auth'])
        session['crfs_failed'] = false
        redirect '/'
      end

      app.get '/auth/failure' do
        if !session.loaded?
          session['crfs_failed'] = true
          redirect '/login'
        else
          erb "<h1>Authentication Failed:</h1><h3>message:<h3> <pre>#{params}</pre>"
        end
      end

      app.get '/auth/:provider/deauthorized' do
        erb "#{params[:provider]} has deauthorized this app."
      end

      app.get '/protected' do
        throw(:halt, [401, "Not authorized\n"]) unless session[:authenticated]
        erb "<pre>#{request.env['omniauth.auth'].to_json}</pre><hr>
         <a href='/logout'>Logout</a>"
      end

      app.get '/logout' do
        logout!
        redirect '/'
      end
    end
  end

  register Auth
end
