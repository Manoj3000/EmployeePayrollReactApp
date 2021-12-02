import React from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

function EmployeeList({ employees, setEmployeesArr }) {

    const deleteEmployee = id => {
        const newEmployeeList = employees.filter(item => item.id !== id)

        setEmployeesArr([...newEmployeeList]);

        localStorage.setItem("employees", JSON.stringify([...newEmployeeList]));

        toast.success('Deleted Successfully!', {
            position: "bottom-right",
            autoClose: 2000,
        });
    }

    return (
        <>
            <div className="container border py-4 px-5 list_div">
                <div className="d-flex justify-content-between align-items-center">
                    <h3>Employee List</h3>
                    <Link to="/add" className="btn btn-info" >Add Employee</Link>
                </div>
                <hr />
                <table className="table table-bordered table-hover table-striped text-center">
                    <thead className="header_bg text-white">
                        <tr>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Department</th>
                            <th>Salary</th>
                            <th>Start Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employees.length > 0 ?
                                employees.map((employee, index) => {
                                    return <tr key={employee.id}>
                                        <td>{employee.name} </td>
                                        <td>{employee.gender}</td>
                                        <td>{employee.department.map((emp, i) => <span className="department_badde badge  badge-info mr-1" key={i}>{emp}</span>)}</td>
                                        <td>{employee.salary}</td>
                                        <td>{employee.startDate}</td>
                                        <td>
                                            <Link to={`/edit/${employee.id}`} className="action_btn fa fa-edit  text-success px-1" title="Edit"></Link>
                                            <i onClick={() => deleteEmployee(employee.id)} className="action_btn fa fa-trash text-danger px-1" title="Delete"></i>
                                        </td>
                                    </tr>
                                })
                                : <tr>
                                    <td colSpan="6"> <strong>No Data Found!</strong></td>
                                </tr>
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default EmployeeList;