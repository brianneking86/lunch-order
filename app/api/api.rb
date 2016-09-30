require 'grape'

module API
  class Base < Grape::API
    content_type :json, 'application/json'
    default_format :json
    format :json

    rescue_from ActiveRecord::RecordNotFound do |e|
      error_response(message: e.message, status: 404)
    end

    mount API::LunchOptions => '/lunch_options'
  end
end
