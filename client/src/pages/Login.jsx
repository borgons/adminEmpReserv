import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login, reset } from '../features/auth/authSlice'

import Spinner from '../components/Spinner'

function Login() {

  const initialLoginState = {
    adminEmail: '',
    adminPassword: ''
  }

  const [loginAdmin , setLoginAdmin] = useState(initialLoginState)

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
      navigate('/')
    }

    dispatch(reset())
  }, [admin, isError, isSuccess, message, navigate, dispatch])

  const handleInputChange = e => {
    const { name, value } = e.target
    setLoginAdmin({ ...loginAdmin, [name]: value})
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const { adminEmail, adminPassword } = loginAdmin

    dispatch(login(loginAdmin))
  }

  if (isLoading) {
    return <Spinner />
  }

    return (
        <>
          <section className="login mt-5" >
            <div className="container-sm">
              <div className="card text-center">
                <div className="card-header h4">
                  <i className="bi bi-star-fill me-3"></i>
                  Please LogIn
                </div>
                <div className="card-body">
                  <form onSubmit={onSubmit} className="mb-3">

                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="bi bi-envelope-at"></i>
                      </span>
                      <input 
                        type="email" 
                        name="adminEmail"
                        value={loginAdmin.adminEmail || ''} 
                        className="form-control" 
                        placeholder="Email"
                        onChange={handleInputChange} 
                        aria-label="Email" 
                        aria-describedby="basic-addon1" />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="bi bi-door-open-fill"></i>
                      </span>
                      <input 
                        type="password" 
                        name="adminPassword"
                        value={loginAdmin.adminPassword || ''} 
                        className="form-control" 
                        placeholder="Password"
                        onChange={handleInputChange} 
                        aria-label="Password" 
                        aria-describedby="basic-addon2" />
                    </div>
                    <div className="d-flex flex-row justify-content-center">
                        <button type="submit" className="btn btn-altsecondary">
                          <i className="bi bi-check-circle-fill me-2"></i> Login
                        </button>
                        <Link to="/register">
                          <button type="submit" className="btn btn-secondary ms-3">
                              <i className="bi bi-person-circle"></i> Register
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

export default Login