module API
  class LunchOptions < Grape::API
    get '/' do
      LunchOption.all
    end
  end
end