class Api::UsersController < ApplicationController
  before_action :require_logged_out, only: :create
  wrap_parameters include: User.attribute_names + ['password']
  # WRAP PARAMETERS IN CAMELCASE

  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      render :show
    else
      render json: { errors: @user.errors.full_messages, status: :unprocessable_entity }
    end

  end

  private

  def user_params
    params.require(:user).permit(:email, :username, :password)
  end
  
end
