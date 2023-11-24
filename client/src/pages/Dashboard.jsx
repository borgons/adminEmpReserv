import React from 'react'
import Navbar from '../layouts/Navbar'
import EmpData from '../components/EmployeeData'

import { Link } from 'react-router-dom'



function Dashboard() {

	return (
			<>
				<Navbar />
				<section className="dashboard mt-5">
					<div className="container">
						<div className="text-center mb-5">
							<h2>
								<i className="bi bi-star-fill me-3"></i> Dashboard
							</h2>
						</div>

						<div className="addEmpBtn d-flex justify-content-sm-center justify-content-md-end  mb-5">
							<Link to="/addEmployee">
								<button className="btn btn-altsecondary" type="submit" id="button-addon1">
									<i className="bi bi-person-plus m3"></i> Add Employees
								</button>
							</Link>
						</div>

						{/* COMPONENT empData */}
						<EmpData/>

					</div>
				</section>
			</>
	)
}


export default Dashboard