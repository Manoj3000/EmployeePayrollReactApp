import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from "axios";


function EmployeeList() {

    const [employeesArr, setEmployeesArr] = useState([]);

    const [sortOn, setSortOn] = useState('name');
    const [currentNameSort, setCurrentNameSort] = useState('default');
    const [currentSalarySort, setCurrentSalarySort] = useState('default');

    const [selectedRows, setSelectedRows] = useState([]);

    const sortTypes = {
        name: {
            up: {
                title: 'Ascending',
                class: 'sort-up',
                fn: (x, y) => {
                    if (x.name > y.name) return 1;
                    else if (x.name < y.name) return -1;
                    return 0;
                }
            },
            down: {
                title: 'Descending',
                class: 'sort-down',
                fn: (x, y) => {
                    if (x.name < y.name) return 1;
                    else if (x.name > y.name) return -1;
                    return 0;
                }
            },
            default: {
                title: 'Default',
                class: 'sort',
                fn: (x, y) => x
            }
        },
        salary: {
            up: {
                title: 'Ascending',
                class: 'sort-up',
                fn: (a, b) => a.salary - b.salary
            },
            down: {
                title: 'Descending',
                class: 'sort-down',
                fn: (a, b) => b.salary - a.salary
            },
            default: {
                title: 'Default',
                class: 'sort',
                fn: (a, b) => a
            }
        }
    };

    const onSortChange = (sortField) => {
        let nextSort;
        setSortOn(sortField);

        if (sortField === 'name') {
            if (currentNameSort === 'down') nextSort = 'default';
            else if (currentNameSort === 'up') nextSort = 'down';
            else if (currentNameSort === 'default') nextSort = 'up';

            setCurrentNameSort(nextSort);
            setCurrentSalarySort('default');

        } else if (sortField === 'salary') {
            if (currentSalarySort === 'down') nextSort = 'default';
            else if (currentSalarySort === 'up') nextSort = 'down';
            else if (currentSalarySort === 'default') nextSort = 'up';

            setCurrentSalarySort(nextSort);
            setCurrentNameSort('default');

        }
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

    const seleteRows = (e) => {
        var checkboxes = document.querySelectorAll('input[name=selectRow]');

        for (var i = 0; i < checkboxes.length; i++) {
            if (!checkboxes[i].checked) {
                document.getElementById("masterCheckBox").checked = false;
            }
        }

        if (e.target.checked) {
            selectedRows.push(parseInt(e.target.value))
            setSelectedRows([...selectedRows])
        }

        if (!e.target.checked) {
            for (var i = 0; i < selectedRows.length; i++) {
                if (selectedRows[i] === parseInt(e.target.value)) {
                    selectedRows.splice(i, 1);
                    i--;
                }
            }
        }
        console.log(selectedRows);
    }

    const selectedAllRows = (e) => {
        var checkboxes = document.querySelectorAll('input[name=selectRow]');

        for (var i = 0; i < checkboxes.length; i++) {
            selectedRows.pop()
            setSelectedRows([...selectedRows])
        }

        if (e.target.checked) {
            employeesArr.forEach(emp => {
                selectedRows.push(emp.id)
                setSelectedRows([...selectedRows])
            })
            for (var i = 0; i < checkboxes.length; i++) checkboxes[i].checked = true;
        } else {
            for (var i = 0; i < checkboxes.length; i++) checkboxes[i].checked = false;
            employeesArr.forEach(emp => {
                selectedRows.pop()
                setSelectedRows([...selectedRows])
            })
        }
        console.log(selectedRows);
    }

    const deleteMultipleEmployee = () => {
        if (selectedRows.length < 1) {
            toast.error("Select Atleast 1 Row", {
                position: "top-right"
            })
        } else {
            axios.delete('http://localhost:8085/deleteEmployees', {
                headers: {
                    ids : selectedRows
                }
            })
                .then(res => {
                    getEmployees();
                    toast.success('Deleted Employees Successfully!');
                })
                .catch(err => {
                    toast.error("Something Went Wrong!")
                    console.log(err);
                })
        }
    }

    return (
        <>
            <div className="container border py-4 px-5 list_div">
                <div className="d-flex justify-content-between align-items-center">
                    <h3>Employee List</h3>
                    <div>
                        <button className="btn btn-danger mr-1" onClick={deleteMultipleEmployee} >Delete</button>
                        <Link to="/add" className="btn btn-info" >Add Employee</Link>
                    </div>
                </div>
                <hr />
                <table className="table table-bordered table-hover table-striped text-center">
                    <thead className="header_bg text-white">
                        <tr>
                            <th>
                                <input type="checkbox" name="selectRow" id="masterCheckBox" onClick={selectedAllRows} />
                            </th>
                            <th>ID</th>
                            <th>Name
                                <button className="sort_btn" onClick={() => onSortChange('name')}>
                                    <i className={`fa fa-${sortTypes['name'][currentNameSort].class}`} title={sortTypes['name'][currentNameSort].title} />
                                </button>
                            </th>
                            <th>Gender</th>
                            <th>Department</th>
                            <th>Salary
                                <button className="sort_btn" onClick={() => onSortChange('salary')}>
                                    <i className={`fa fa-${sortTypes['salary'][currentSalarySort].class}`} title={sortTypes['salary'][currentSalarySort].title} />
                                </button>
                            </th>
                            <th>Start Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employeesArr.length > 0 ?
                                [...employeesArr].sort((sortOn === "name") ? sortTypes[sortOn][currentNameSort].fn : sortTypes[sortOn][currentSalarySort].fn).map((employee, index) => {
                                    return <tr key={employee.id}>
                                        <td>
                                            <input type="checkbox" name="selectRow" value={employee.id} onChange={(e) => seleteRows(e)} />
                                        </td>
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