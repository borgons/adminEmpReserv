import { useState } from 'react'
import { useDispatch } from 'react-redux'



import { useParams } from 'react-router-dom'

function EditEmployeeData({data, editEmployee}) {

	const dispatch = useDispatch()

	const empID = useParams()

	
	const {empFirstName, empLastName, empLicensedNo, empStatus} = data
	
	const initialEditEmpState = {
		empFirstName: empFirstName,
		empLastName: empLastName,
		empLicensedNo: empLicensedNo,
		empRate: '',
		empStatus: empStatus
	}
	
	const [updateEmp, setUpdateEmp] = useState(initialEditEmpState)

	const handleInputChange = e => {
		const { name, value } = e.target
		setUpdateEmp({ ...updateEmp, [name]: value})
	}

	const onSubmit = (e) => {
		e.preventDefault()

		dispatch(editEmployee(
			{id:empID,
			updateEmp}))
		.then(data => {
			setUpdateEmp({
				empFirstName: data.empFirstName, 
				empLastName: data.empLastName, 
				empLicensedNo: data.empLicensedNo, 
				empRate: data.empRate, 
				empStatus: data.empStatus
			})
		})
		.catch(err => {
			console.log(err)
		}) 
	}

  return (
    <>
				<section className="updateEmployee mt-5">
					<div className="container">
						<div className="card text-center">
							<div className="card-header h4">
								<i className="bi bi-star-fill me-3"></i>
									Edit Employee
							</div>
							<div className="card-body">
								<form onSubmit={onSubmit} >
									<div className="input-group mb-3">
											<span className="input-group-text" id="basic-addon1">
												<i className="bi bi-people-fill"></i>
											</span>
										<input 
											type="text" 
											name="empFirstName" 
											value={updateEmp.empFirstName || ''}
											className="form-control" 
											placeholder="Employee's First Name"
											onChange={handleInputChange} 
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
											value={updateEmp.empLastName  || ''}
											className="form-control" 
											placeholder="Employee's Last Name"
											onChange={handleInputChange} 
											aria-label="LastName" 
											aria-describedby="basic-addon1" />
									</div>
									<div className="input-group mb-3">
										<span className="input-group-text" id="basic-addon3">
											<i className="bi bi-credit-card-2-front-fill"></i>
										</span>
										<input 
											type="text" 
											name="empLicensedNo"
											value={updateEmp.empLicensedNo || ''} 
											className="form-control" 
											placeholder="Employee's Licensed No." 
											onChange={handleInputChange} 
											aria-label="EmployeeLicensedNo" 
											aria-describedby="basic-addon1" />
									</div>
									{/* COMPUTED RATE(P450 / 8) */}
									<div className="input-group mb-3">
										<span className="input-group-text" id="basic-addon3">
											<i className="bi bi-clipboard2-pulse-fill me-3"></i> P450.00/hr
										</span>
										<input 
											type="number" 
											name="empRate" 
											value={updateEmp.empRate  || ''}
											className="form-control" 
											placeholder="Type of Working Hours"
											onChange={handleInputChange} 
											aria-label="EmployeeRate" 
											aria-describedby="basic-addon1" />
									</div>
									<div className="input-group mb-3">
										<label htmlFor="inputGroupSelect01" className="input-group-text">
											<i className="bi-people-fill me-3"></i> Employee's Status
										</label>
										<select 
											id="inputGroupSelect01" 
											name="empStatus" 
											value= {updateEmp.empStatus  || ''}
											onChange={handleInputChange}  
											className="form-select">
											<option value="NAV">NAV</option>
											<option value="AV">AV</option>
										</select>
									</div>
									{/* <div className="input-group mb-3">
										
										<input 
											type="text" 
											name="empStatus" 
											value={updateEmp.empStatus  || ''}
											className="form-control" 
											onChange={handleInputChange} 
											placeholder="Employee's status"
											aria-label="EmployeeStatus" 
											aria-describedby="basic-addon1" />
									</div> */}
									<button type="submit" className="btn btn-altsecondary">
											<i className="bi bi-check-circle-fill me-2"></i> Submit
									</button>
								</form>
							</div>
						</div>
					</div>
				</section>
    </>  
  )
}

export default EditEmployeeData