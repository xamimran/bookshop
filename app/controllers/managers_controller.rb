class ManagersController < ApplicationController
rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
    before_action :authorized, except: [:create]
    before_action :is_manager?, except: [:index, :create]
    # GET /managers
    def index
        render json: Manager.all
    end

    # GET /managers/:id
    def show
        render json: manager, status: :ok
    end

    # POST
    def create
        manager = Manager.create!(manager_params)
        token = encode_token(user_id: manager.id)
        render json: {user: manager, jwt: token}, status: :created
    end

    # DELETE /managers/:id
    def destroy
        current_user.destroy
        head :no_content
    end

    #PATCH /managers/:id
    def update
        current_user.update!(manager_params)
        render json: current_user, status: :accepted
    end

    private

    def find_manager
        Manager.find_by!(id: params[:id])
    end

    def manager_params
        params.permit(:name, :email, :password, :confirm_password, :bookshop_name, :bookshop_items_alert_limit)
    end
    def record_not_found
        render json: { error: "Manager not found" }, status: :not_found        
    end
end
