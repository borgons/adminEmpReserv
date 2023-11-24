import { useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { register, reset } from '../features/auth/authSlice'



import Spinner from '../components/Spinner'

function Register() {

		const initialRegisterState = {
			adminName: '',
			adminEmail: '',
			adminPassword: '',
			adminConfPassword: '',
		}

		const [newAdmin, setNewAdmin] = useState(initialRegisterState)
		const [errMessage, setErrMessage] = useState(false)

		const navigate = useNavigate()
		const dispatch = useDispatch()

		const { admin, isLoading, isError, isSuccess, message } = useSelector(
			(state) => state.auth
		)

		useEffect(() => {
			if(isError) {
				console.log(message)
			} 
	
			if (isSuccess || admin) {
				navigate('/dashboard')
			} else {
				navigate('/register')
			}
	
			dispatch(reset())
		}, [admin, isError, isSuccess, message, navigate, dispatch])

		const handleInputChange = e => {
			const { name, value } = e.target
			setNewAdmin({ ...newAdmin, [name]: value })
		}

		const onSubmit = (e) => {
			e.preventDefault()

			let {adminEmail, adminPassword, adminConfPassword} = newAdmin

			const isEmailValid = adminEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
			
			if(isEmailValid) {
				setErrMessage("Please input a valid Email Address")
			}
			
			if(adminPassword !== adminConfPassword) {
				setErrMessage("Password do not match")
			}


			dispatch(register(newAdmin))
			.then(data => {
				console.log(data)
				setNewAdmin({
					adminName: data.adminName, 
					adminEmail: data.adminEmail,
					adminPassword: data.adminPassword
				})
			})
			.catch(err => {
				console.log(err)
			})
		}

		if(isLoading) {
			return <Spinner />
		}

    return (
        <>
					<section className="register mt-5">
						<div className="container">
							<div className="card text-center">
								<div className="card-header h4">
									<i className="bi bi-star-fill me-3"></i>
										Please Register
								</div>
								<div className="card-body">
									{/* ALERT */}
									{errMessage ? (
									<div className="alert alert-danger alert-dismissible fade show" role="alert">
										<i className="bi bi-exclamation-octagon-fill me-3"></i>{errMessage}
										<button 
											type="button" 
											className="btn-close" 
											data-bs-dismiss="alert" 
											aria-label="Close">
										</button>
									</div>
									) : ''}
									<form onSubmit={onSubmit}>
										<div className="input-group mb-3">
											<span className="input-group-text" id="basic-addon1">
												<i className="bi bi-people-fill"></i>
											</span>
											<input 
												type="text"
												name="adminName"
												value={newAdmin.adminName || ''}
												className="form-control"
												placeholder='Name'
												aria-label="Email"
												onChange={handleInputChange}
												aria-describedby="basic-addon1"/>
										</div>
										<div className="input-group mb-3">
											<span className="span input-group-text" id="basic-addon1">
												<i className="bi bi-envelope-at"></i>
											</span>
											<input 
												type="text"
												name="adminEmail"
												value={newAdmin.adminEmail || ''}
												className="form-control"
												placeholder='Email'
												onChange={handleInputChange}
												aria-label="Email"
												aria-describedby="basic-addon1"/>
										</div>
										<div className="input-group mb-3">
											<span className="span input-group-text" id="basic-addon1">
												<i className="bi bi-door-open-fill"></i>
											</span>
											<input 
												type="password"
												name="adminPassword"
												value={newAdmin.adminPassword || ''}
												className="form-control"
												placeholder='Password'
												onChange={handleInputChange}
												aria-label="Email"
												aria-describedby="basic-addon1"/>
										</div>
										<div className="input-group mb-3">
											<span className="span input-group-text" id="basic-addon1">
												<i className="bi bi-door-open-fill"></i>
											</span>
											<input 
												type="password"
												name="adminConfPassword"
												value={newAdmin.adminConfPassword || ''}
												className="form-control"
												placeholder='Confirm Password'
												onChange={handleInputChange}
												aria-label="Email"
												aria-describedby="basic-addon1" />
										</div>
										<div className="d-flex flex-row justify-content-center">
											<button type="submit" className="btn btn-altsecondary">
												<i className="bi bi-check-circle-fill me-2"></i> Register
											</button>
											<Link to="/">
													<button type="submit" className="btn btn-secondary ms-3">
													<i className="bi bi-arrow-left-square me-2"></i> Back
													</button>
											</Link>
										</div>
											
									</form>
								</div>
							</div>
						</div>			
					</section>
        </>    
    )

}



export default Register