import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import img1 from "../assets/images/img1.png"
import img2 from "../assets/images/img2.png"
import img3 from "../assets/images/img3.png"
import img4 from "../assets/images/img4.png"
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';


function EmployeeFrom({ employeesArr, setEmployeesArr }) {

    const navigate = useNavigate();
    const params = useParams()

    const departmentData = [{ name: "HR" }, { name: "Sales" }, { name: "Finance" }, { name: "Engineer" }, { name: "Others" }];
    const [departmentArr, setDepartmentArr] = useState([]);

    const [employee, setEmployee] = useState(
        {
            id: employeesArr.length,
            name: "",
            profilePic: "",
            gender: "",
            department: [],
            salary: "",
            startDate: "",
            note: ""
        }
    );

    useEffect(() => {
        employeesArr.forEach(element => {
            if (element.id == params.id) {
                document.getElementById("employee_id").value = params.id;

                setEmployee({
                    id: element.id,
                    name: element.name,
                    profilePic: element.profilePic,
                    gender: element.gender,
                    department: element.department,
                    salary: element.salary,
                    startDate: element.startDate,
                    note: element.note
                })
            }
        });
    }, [])

    const submitHandler = e => {
        e.preventDefault();

        let emp_id = document.getElementById("employee_id").value

        if (emp_id) {
            employeesArr.forEach(item => {
                if (emp_id == item.id) {
                    item.id = employee.id;
                    item.name = employee.name;
                    item.profilePic = employee.profilePic;
                    item.gender = employee.gender;
                    item.department = employee.department;
                    item.salary = employee.salary;
                    item.startDate = employee.startDate;
                    item.note = employee.note;
                }
            })
            localStorage.setItem("employees", JSON.stringify([...employeesArr]));
            toast.success('Updated Successfully!', {
                position: "bottom-right",
                autoClose: 2000,
            });
        } else {
            setEmployeesArr([...employeesArr, employee]);
            localStorage.setItem("employees", JSON.stringify([...employeesArr, employee]));
            toast.success('Added Successfully!', {
                position: "bottom-right",
                autoClose: 2000,
            });
        }
        setTimeout(() => { resetForm(); navigate("/"); }, 3000);
    }

    const checkDepartments = (e) => {
        if (e.target.checked) {
            departmentArr.push(e.target.value)
            setDepartmentArr(departmentArr)
        }

        if (!e.target.checked) {
            for (var i = 0; i < departmentArr.length; i++) {
                if (departmentArr[i] === e.target.value) {
                    departmentArr.splice(i, 1);
                    i--;
                }
            }
        }
        setEmployee({ ...employee, department: [...departmentArr] })
    }

    const resetForm = () => {
        setEmployee({
            id: employeesArr.length + 1,
            name: "",
            profilePic: "",
            gender: "",
            department: [],
            salary: "",
            startDate: "",
            note: ""
        })
        setDepartmentArr([])
        document.getElementById("myForm").reset();
    }

    return (
        <>
            <div className="container border py-4 px-5 form_div">
                <div className="d-flex justify-content-between align-items-center">
                    <h3>Employee Payroll App</h3>
                    <Link to="/" className="btn btn-info" >Employee List</Link>
                </div>
                <hr />
                <form id="myForm" onSubmit={submitHandler}>
                    <input type="hidden" id="employee_id" />
                    <div className="form-group">
                        <label htmlFor="name" className="label_area" >Name : </label>
                        <input type="text" className="form-control shadow-sm" placeholder="Enter Name" id="name" name="name" value={employee.name} onChange={(e) => { setEmployee({ ...employee, name: e.target.value }) }} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="profilePic" className="label_area_btn">Profile Image : </label>
                        <div className="custom-control custom-radio custom-control-inline">
                            <input type="radio" className="custom-control-input radio_input" id="img1" name="profile_img" value={img1} onClick={(e) => { setEmployee({ ...employee, profilePic: e.target.value }) }} />
                            <label className="custom-control-label" htmlFor="img1"><img className="profile_img" src={img1} alt="" /></label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline">
                            <input type="radio" className="custom-control-input radio_input" id="img2" name="profile_img" value={img2} onClick={(e) => { setEmployee({ ...employee, profilePic: e.target.value }) }} />
                            <label className="custom-control-label" htmlFor="img2"><img className="profile_img" src={img2} alt="" /></label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline">
                            <input type="radio" className="custom-control-input radio_input" id="img3" name="profile_img" value={img3} onClick={(e) => { setEmployee({ ...employee, profilePic: e.target.value }) }} />
                            <label className="custom-control-label" htmlFor="img3"><img className="profile_img" src={img3} alt="" /></label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline">
                            <input type="radio" className="custom-control-input radio_input" id="img4" name="profile_img" value={img4} onClick={(e) => { setEmployee({ ...employee, profilePic: e.target.value }) }} />
                            <label className="custom-control-label" htmlFor="img4"><img className="profile_img" src={img4} alt="" /></label>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="gender" className="label_area_btn">Gender : </label>
                        <div className="custom-control custom-radio custom-control-inline">
                            <input type="radio" className="custom-control-input" id="male" name="gender" value="male" onClick={(e) => { setEmployee({ ...employee, gender: e.target.value }) }} />
                            <label className="custom-control-label" htmlFor="male">Male</label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline">
                            <input type="radio" className="custom-control-input" id="female" name="gender" value="female" onClick={(e) => { setEmployee({ ...employee, gender: e.target.value }) }} />
                            <label className="custom-control-label" htmlFor="female">Female</label>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="department" className="label_area_btn">Department : </label>
                        {
                            departmentData.map((dp, i) => {
                                return <div key={i} className="custom-control custom-checkbox custom-control-inline">
                                    <input type="checkbox" className="custom-control-input" id={dp.name} value={dp.name}
                                        name="department" onClick={(e) => { checkDepartments(e) }} />
                                    <label className="custom-control-label" htmlFor={dp.name}>{dp.name}</label>
                                </div>

                            })
                        }
                    </div>

                    <div className="form-group">
                        <label htmlFor="salary" className="label_area">Salary : </label>
                        <input type="number" className="form-control shadow-sm" placeholder="Enter Salary" id="salary" name="salary" value={employee.salary} onChange={(e) => { setEmployee({ ...employee, salary: e.target.value }) }} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="startDate" className="label_area">Start Date : </label>
                        <input type="date" className="form-control shadow-sm" id="startDate" name="startDate" value={employee.startDate} onChange={(e) => { setEmployee({ ...employee, startDate: e.target.value }) }} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="notes" className="label_area">Note : </label>
                        <textarea type="text" className="form-control shadow-sm" placeholder="Enter Note" id="notes" name="notes" value={employee.note} onChange={(e) => { setEmployee({ ...employee, note: e.target.value }) }} ></textarea>
                    </div>

                    <div className="text-center">
                        <button className="btn btn-success mr-2" type="submit">Save</button>
                        <button className="btn btn-info" type="reset" onClick={resetForm}>Reset</button>
                    </div>

                </form>
            </div>
        </>
    );
}

export default EmployeeFrom;