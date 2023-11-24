import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'

import Spinner from '../components/Spinner'

function Navbar() {
	
	const { admin, isLoading, isError, message } = useSelector((state) => state.auth)

	const navigate = useNavigate()
	const dispatch = useDispatch()

	// console.log(admin)

	if(isLoading) {
		return <Spinner />
	}

	// USEEFFECT
	useEffect(() => {
		if(!admin) {
			navigate('/')
		}
	})



	const onLogout = () => {
		dispatch(logout())
	}

	return (

		// ADMINS 

		<>
			<div className="container-fluid">
				<nav className="navbar navbar-expand-lg bg-altprimary">
					<div className="container 
						d-flex 
						justify-content-md-end 
						d-sm-column 
						justify-content-center ">
							<p className="mx-5 mt-2 lead">
								<i className="bi bi-people-fill me-3"></i>Welcome {admin && admin.name}
							</p>
							<button className="btn btn-altdanger" onClick={() => onLogout()}>
								<i className="bi bi-door-open-fill me-3"></i>Logout
							</button>
					</div>
				</nav>
			</div>
		</>
	)

}

export default Navbar