class ItemsController < ApplicationController

  before_action :list

  def index
    render json: @list.items
  end

  def create
    item = @list.item.new(item_params)
    if item.save
      render json: item
    else
      render json: { errors: item.errors.full_messages }
    end
  end

  private

  def list
    @list = List.find(params[:list_id])
  end

  def item_params
    params.require(:item).permit(:name, :description)
  end

end
