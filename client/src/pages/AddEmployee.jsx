import { useState } from 'react'
import Navbar from '../layouts/Navbar'

import { useDispatch } from 'react-redux'
import { addEmployee } from '../features/employees/employeeSlice'

import { Link } from 'react-router-dom'

function AddEmployee() {

	const dispatch = useDispatch()

	const [file, setFile] = useState("")

	const [empFirstName, setEmpFirstName] = useState('')
	const [empLastName, setEmpLastName] = useState('')
	const [empLicensedNo, setEmpLicensedNo] = useState('')

	const onSubmit = (e) => {
		e.preventDefault()

		const formdata = new FormData()

		formdata.append("empFirstName", empFirstName)
		formdata.append("empLastName", empLastName)
		formdata.append("empLicensedNo", empLicensedNo)
		formdata.append("file", file)

		dispatch(addEmployee(formdata)) // include IMAGE

		
	}

    return (
			<>
				<Navbar />
				<section className="addEmployee mt-5">
					<div className="container">
						<div className="card text-center">
							<div className="card-header h4">
								<i className="bi bi-star-fill me-3"></i>
									Please Add Employee
							</div>
							<div className="card-body">
								<form onSubmit={onSubmit}>
									<div className="input-group mb-3">
										<span className="input-group-text" id="basic-addon1">
											<i className="bi bi-people-fill"></i>
										</span>
										<input 
											type="text" 
											name="empFirstName"
											value={empFirstName || ''}
											onChange={(e) => setEmpFirstName(e.target.value)}
											className="form-control" 
											placeholder="Employee's FirstName" 
											aria-label="FirstName" 
											aria-describedby="basic-addon1" />
									</div>
									<div className="input-group mb-3">
										<span className="input-group-text" id="basic-addon2">
											<i className="bi bi-people-fill"></i>
										</span>
										<input 
											type="text" 
											name="empLastName"
											value={empLastName || ''} 
											onChange={(e) => setEmpLastName(e.target.value)}
											className="form-control" 
											placeholder="Employee's LastName" 
											aria-label="LastName" 
											aria-describedby="basic-addon2" />
									</div>
									<div className="input-group mb-3">
										<span className="input-group-text" id="basic-addon3">
											<i className="bi bi-credit-card-2-front-fill"></i>
										</span>
										<input 
											type="text" 
											name="empLicensedNo"
											onChange={(e) => setEmpLicensedNo(e.target.value)}
											value={empLicensedNo || ''} 
											className="form-control" 
											placeholder="Employee's Licensed No." 
											aria-label="EmployeeLicensedNo" 
											aria-describedby="basic-addon3" />
									</div>
									<div className="input-group mb-3">
										<input 
											type="file"
											name="empImages" 
											id="inputGroupFile02" 
											className="form-control" 
											onChange={e => setFile(e.target.files[0])} />
											<label htmlFor="inputGroupFile02" className="input-group-text">
												<i className="bi bi-arrow-bar-up me-2"></i> Upload
											</label>
									</div>
									
									<div className="d-flex flex-row justify-content-center">
											<Link to="/dashboard">
													<button type="submit" className="btn btn-secondary">
													<i className="bi bi-arrow-left-square me-2"></i> Back
													</button>
											</Link>
											<button type="submit" className="btn btn-altsecondary ms-3">
													<i className="bi bi-check-circle-fill me-2"></i> Submit
											</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</section>
			</>
    )
}

export default AddEmployee