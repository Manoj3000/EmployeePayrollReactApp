import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import img1 from "../assets/images/img1.png"
import img2 from "../assets/images/img2.png"
import img3 from "../assets/images/img3.png"
import img4 from "../assets/images/img4.png"
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from "axios";

function EmployeeFrom({loginToken}) {

    const navigate = useNavigate();
    const params = useParams()

    const departmentData = [{ name: "HR" }, { name: "Sales" }, { name: "Finance" }, { name: "Engineer" }, { name: "Others" }];
    const [departmentArr, setDepartmentArr] = useState([]);

    const [employee, setEmployee] = useState(
        {
            id: "",
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
        if (params.id) {
            document.getElementById("employee_id").value = params.id;

            axios.get('http://localhost:8085/getEmployee', {
                headers: {
                    loginToken: loginToken,
                    id: params.id
                }
            })
                .then(res => {
                    setDepartmentArr(res.data.token.department)
                    setEmployee({
                        id: res.data.token.id,
                        name: res.data.token.name,
                        profilePic: res.data.token.profilePic,
                        gender: res.data.token.gender,
                        department: res.data.token.department,
                        salary: res.data.token.salary,
                        startDate: res.data.token.startDate,
                        note: res.data.token.note
                    })
                })
                .catch(err => {
                    toast.error("Something Went Wrong!")
                    console.log(err);
                })
        }
    }, [])

    const submitHandler = e => {
        e.preventDefault();
        let emp_id = document.getElementById("employee_id").value
        if (emp_id) {
            axios.put('http://localhost:8085/editEmployee', employee, {
                headers: {
                    loginToken :loginToken,
                    id: emp_id
                }
            })
                .then((res) => {
                    toast.success('Updated Successfully!');
                })
                .catch(err => {
                    toast.error("Something Went Wrong!")
                    console.log(err);
                })
        } else {
            axios.post('http://localhost:8085/addEmployee', employee, {
                headers : {
                    loginToken: loginToken
                }
            })
                .then((res) => {
                    toast.success('Added Successfully!');
                })
                .catch(err => {
                    toast.error("Something Went Wrong!")
                    console.log(err);
                })
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
            id: "",
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
                        <input type="text" className="form-control shadow-sm" placeholder="Enter Name" id="name" name="name"
                            value={employee.name} onChange={(e) => { setEmployee({ ...employee, name: e.target.value }) }} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="profilePic" className="label_area_btn">Profile Image : </label>
                        <div className="custom-control custom-radio custom-control-inline">
                            <input type="radio" className="custom-control-input radio_input" id="img1" name="profile_img" value={img1} onChange={(e) => { setEmployee({ ...employee, profilePic: e.target.value }) }} checked={employee.profilePic === img1} />
                            <label className="custom-control-label" htmlFor="img1"><img className="profile_img" src={img1} alt="" /></label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline">
                            <input type="radio" className="custom-control-input radio_input" id="img2" name="profile_img" value={img2} onChange={(e) => { setEmployee({ ...employee, profilePic: e.target.value }) }} checked={employee.profilePic === img2} />
                            <label className="custom-control-label" htmlFor="img2"><img className="profile_img" src={img2} alt="" /></label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline">
                            <input type="radio" className="custom-control-input radio_input" id="img3" name="profile_img" value={img3} onChange={(e) => { setEmployee({ ...employee, profilePic: e.target.value }) }} checked={employee.profilePic === img3} />
                            <label className="custom-control-label" htmlFor="img3"><img className="profile_img" src={img3} alt="" /></label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline">
                            <input type="radio" className="custom-control-input radio_input" id="img4" name="profile_img" value={img4} onChange={(e) => { setEmployee({ ...employee, profilePic: e.target.value }) }} checked={employee.profilePic === img4} />
                            <label className="custom-control-label" htmlFor="img4"><img className="profile_img" src={img4} alt="" /></label>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="gender" className="label_area_btn">Gender : </label>
                        <div className="custom-control custom-radio custom-control-inline">
                            <input type="radio" className="custom-control-input" id="male" name="gender" value="male" onChange={(e) => { setEmployee({ ...employee, gender: e.target.value }) }} checked={employee.gender === "male"} />
                            <label className="custom-control-label" htmlFor="male">Male</label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline">
                            <input type="radio" className="custom-control-input" id="female" name="gender" value="female"
                                onChange={(e) => { setEmployee({ ...employee, gender: e.target.value }) }}
                                checked={employee.gender === "female"} />
                            <label className="custom-control-label" htmlFor="female">Female</label>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="department" className="label_area_btn">Department : </label>
                        {
                            departmentData.map((dp, i) => {
                                return <div key={i} className="custom-control custom-checkbox custom-control-inline">
                                    <input type="checkbox" className="custom-control-input" id={dp.name} value={dp.name}
                                        name="department" onChange={(e) => { checkDepartments(e) }} checked={employee.department.includes(dp.name)} />
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
                        {params.id ? "" : <button className="btn btn-info" type="reset" onClick={resetForm}>Reset</button>}
                    </div>

                </form>
            </div>
        </>
    );
}

export default EmployeeFrom;