class ApplicationController < ActionController::API
# 
rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity_method
    # stores secret key in environment variable
    SECRET = Rails.application.secret_key_base
    def encode_token(payload)
        JWT.encode(payload, SECRET)
    end
    # bearer token {Authorization: 'Bearer <tokrn>'}
    def auth_header
        request.headers['Authorization']
    end

    def decoded_token
        if auth_header
            # get the token from the header which is an array object
            token = auth_header.split(' ')[1]
            begin
                JWT.decode(token, SECRET)
            rescue JWT::DecodeError
                nil
            end
        end
    end

    # check user role from the decoded token
    def current_user
        if decoded_token
            decoded_id = decoded_token[0]['user_id']
            request.headers['role'] === "manager" ? Manager.find_by(id: decoded_id) : Employee.find_by(id:decoded_id)
        end
    end
    # checks if the user logged in shares the same user_id
    def logged_in?
        !!current_user
    end
    def show_user
        if current_user
            render json: current_user
        else
            render json: {errors: "User not found"}, status: :unauthorized
        end
    end

    # checks if a user is authorized to view a resource if not, expected to sign in
    def authorized
        render json: { message: 'Please sign in' }, status: :unauthorized unless logged_in?
    end

    # Check if user is a manager
    def manager_access?
        # current_user.is_a?(Manager)
        request.headers['role'] === "manager"
    end

    def is_manager?
        render json: {message: "Kindly login as Manager"}, status: :unauthorized unless manager_access?
    end

    private
    # error messages 
    def unprocessable_entity_method entity
        render json: { errors: entity.record.errors.full_messages },status: :unprocessable_entity
    end
end
