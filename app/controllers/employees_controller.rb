class EmployeesController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
    before_action :authorized
    # GET /employees
    def index
        render json: current_user.employees
    end

    # GET /employees/:id
    def show
        render json: find_employee, status: :ok
    end

    # POST
    def create
        employee = Employee.new(employee_params)
        current_user.employees << employee
        render json: employee, status: :created
    end

    # DELETE /employees/:id
    def destroy
        employee = find_employee
        employee.destroy
        head :no_content
    end

    # PATCH /employees/:id
    def update
        employee = find_employee
        employee.update!(employee_params)
        render json: employee, status: :accepted
    end

    private
    # employee details input during creation of account
    def employee_params
        params.permit(:name, :email, :password, :active)
    end

    # dynamically find an employee via :id
    def find_employee
        Employee.find_by!(id: params[:id])
    end

    # error validation for when an employee is not found within the database records
    def record_not_found
        render json: { error: "Employee not found" }, status: :not_found        
    end
end
