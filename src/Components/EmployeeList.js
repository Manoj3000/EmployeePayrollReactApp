import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from "axios";


function EmployeeList() {

    const [employeesArr, setEmployeesArr] = useState([]);

    const [currentSort, setCurrentSort] = useState('default');

    const sortTypes = {
        up: {
            class: 'sort-up',
            fn: (a, b) => a.salary - b.salary
        },
        down: {
            class: 'sort-down',
            fn: (a, b) => b.salary - a.salary
        },
        default: {
            class: 'sort',
            fn: (a, b) => a
        }
    };

    const onSortChange = () => {
        let nextSort;

        if (currentSort === 'down') nextSort = 'up';
        else if (currentSort === 'up') nextSort = 'default';
        else if (currentSort === 'default') nextSort = 'down';

        setCurrentSort(nextSort);
    };

    useEffect(() => {
        getEmployees()
    }, [])

    const getEmployees = () => {
        axios.get('http://localhost:8085/getEmployees')
            .then(res => {
                setEmployeesArr(res.data.token);
                // toast.success('Fetch  Employees Successfully!');
            })
            .catch(err => {
                toast.error("Something Went Wrong!")
                console.log(err);
            })
    }

    const deleteEmployee = id => {
        axios.delete('http://localhost:8085/deleteEmployee', {
            headers: {
                token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbXBfaWQiOjU5fQ.66R9pkcN7oRSS_I5NfW5CocldTBQn4mh3KEd3V4z0RE"
            }
        })
            .then(res => {
                getEmployees();
                toast.success('Deleted Employee Successfully!');
            })
            .catch(err => {
                toast.error("Something Went Wrong!")
                console.log(err);
            })
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
                            <th>ID</th>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Department</th>
                            <th className="d-flex"> Salary
                                <button className="sort_btn" onClick={onSortChange}>
                                    <i className={`fa fa-${sortTypes[currentSort].class}`} />
                                </button>
                            </th>
                            <th>Start Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employeesArr.length > 0 ?
                                [...employeesArr].sort(sortTypes[currentSort].fn).map((employee, index) => {
                                    return <tr key={employee.id}>
                                        <td>{employee.id}</td>
                                        <td className="text-left"> <img src={employee.profilePic} className="profile_img mr-2" /> {employee.name} </td>
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