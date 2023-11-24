import { useEffect, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { getEmployees, reset } from '../features/employees/employeeSlice'

import Spinner from '../components/Spinner'
import EmpDataTable from '../components/table/EmpDataTable'
import EmpsPaginate from '../components/EmployeePaginate'

function EmployeeData() {

	// SEARCH empLicensedNo
	const initialSearch = {
		empLicensedNo: ''
	}

	const [search, setSearch] = useState(initialSearch)
	
	// EMPLOYEES
	const employees = useSelector(state => state.employees)
	
	// PLUCK EMPLOYEES
	const emps = employees.employees.docs
	console.log(emps)

	const [currentPage, setCurrentPage] = useState(1)
	const [empsPerPage] = useState(4)


	const indexOfLastRecord = currentPage * empsPerPage
	const indexOfFirstRecord = indexOfLastRecord - empsPerPage
	const currentRecords = emps && emps.slice(indexOfFirstRecord, indexOfLastRecord)

	const nPages = Math.ceil(emps && Object.values(emps).length / empsPerPage)
	
	// Change page
	const paginate = pageNumber => setCurrentPage(pageNumber)
	
	
	// ADMIN
	const { admin, isLoading, isError, message } = useSelector(state => state.auth) 
	
	const navigate = useNavigate()
	const dispatch = useDispatch()

	if(isLoading) {
		return <Spinner />
	}

	const initEmpFetch = useCallback(() => {
		dispatch(getEmployees())
	}, [dispatch])

	const initReset = useCallback(() => {
		dispatch(reset())
	}, [dispatch])

	// USEEFFECT FOR initEmpFetch() and initReset()
	useEffect(() => {
		if(isError) {
			console.log(message)
		}

		if(!admin) {
			navigate('/')
		}

		initEmpFetch()

		initReset()

		return () => {
			dispatch(reset())
		}
	}, [admin, navigate, isError, message, initEmpFetch, initReset])

	const handleInputChange = e => {
		const { name, value } = e.target
		setSearch({ ...search, [name]: value})
	}

	// SEARCH empLicensedNo

	const onSubmit = (e) => {
		e.preventDefault()

		const { empLicensedNo } = search
		dispatch(getEmployees(empLicensedNo))
	}




	return (
		<>
				{/* SEARCH for empLicensedNo */}
				<form onSubmit={onSubmit}>
					<div className="input-group mb-5">
						<input 
							type="text" 
							name="empLicensedNo" 
							id="empLicensedNo"
							onChange={handleInputChange} 
							className="form-control" 
							placeholder="Search Employee Licensed No." 
							aria-label="Recipient" />
						<button className="btn btn-altsecondary" type="submit" id="button-addon1">
							<i className="bi bi-search m3"></i> Search
						</button> 
					</div>
				</form>

				<div className="mb-5">
					<table className="table">
						<thead>
							<tr className="table-success text-center">
								<th>Lic No.</th>
								<th>FirstName</th>
								<th>LastName</th>
								<th>Rate</th>
								<th>Status</th>
								<th>Reg Date</th>
								<th colSpan="2">Actions</th>
								
							</tr>
						</thead>					
						<tbody>
							{currentRecords && currentRecords.length > 0 ? (
										<>
											{ currentRecords && currentRecords.map((emp, index) => {
													return (
														<EmpDataTable emp={emp} key={index} />	
													)
											})}
										</>
									) : (
										<tr className="text-center">
											<td colSpan="6">
												You dont have Employee Records yet
											</td>
										</tr>
							)}
							</tbody>
					</table>

					{/* PAGINATION */}
				
					<EmpsPaginate 
						empsPerPage={empsPerPage}
						totalEmps={emps && Object.values(emps).length}
						paginate={paginate}
						nPages={nPages}
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
					/>
				</div>
		
		</>
	)
}

export default EmployeeData