Encoding.default_internal = Encoding.default_internal = Encoding::UTF_8

require 'rubygems'
require 'bundler/setup'
require 'sinatra'
require 'slim'

class Main < Sinatra::Base
  get '/' do
    slim :index
  end
end

run Main
