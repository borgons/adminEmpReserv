import { useState } from 'react'
import { useDispatch } from 'react-redux';

import { useLocation, Link } from 'react-router-dom';

import Navbar from '../layouts/Navbar'

import EditEmpData from '../components/EditEmployeeData'
import moment from 'moment'

import { deleteEmployee, editEmployee } from '../features/employees/employeeSlice'

function ShowEmployee() {

  const [showEditForm, setShowEditForm] = useState(false)

  const location = useLocation();
  const data = location.state;
  const {empFirstName, empLastName, empLicensedNo, empRate, empStatus, empImage, empRegDate, _id} = data

  const dispatch = useDispatch()

  const empImageUrl = 'http://localhost:6001/'

  const handleToggle = () => {
    setShowEditForm((showEditForm) => !showEditForm)
  }

  const deleteEmp = () => {
    dispatch(deleteEmployee(_id))
    window.location.href='/dashboard'
  }

  return (
    <>
      <Navbar />
      <section className="showEmp mt-5 mb-2">
        <div className="container">
          <div className="card text-center">
            <div className="card-header h4">
              <i className="bi bi-people-fill me-3"></i> Employee Information
            </div>
            <div className="card-body">
              <div className="d-flex flex-column justify-content-center align-items-center mb-3">
                <img src={empImageUrl + empImage} alt={empImage} className="w-50 h-50 mb-3"/>
                <ul className="list-group">
                  <li className="list-group-item active" aria-current="true"><b>Personal Information</b></li>
                  <li className="list-group-item">
                    <i className="bi bi-people-fill me-3"></i><label className="me-3">FirstName:</label>{empFirstName}
                  </li>
                  <li className="list-group-item">
                    <i className="bi bi-people-fill me-3"></i><label className="me-3">LastName:</label>{empLastName}
                  </li>
                  <li className="list-group-item">
                    <i className="bi bi-people-fill me-3"></i><label className="me-3">Registration:</label>{moment(empRegDate).format("MM/DD/YYYY")}
                  </li>
                  <li className="list-group-item">
                    <i className="bi bi-credit-card-2-front-fill me-3"></i><label className="me-3">Employee's Licensed No. :</label>{empLicensedNo}
                  </li>
                  <li className="list-group-item">
                    <i className="bi bi-clipboard2-pulse-fill me-3"></i><label className="me-3">Rate:</label>{parseFloat(empRate).toFixed(2)}
                  </li>
                  <li className="list-group-item">
                  <i className="bi bi-people-fill me-3"></i><label className="me-3">Employee Status</label>{empStatus}
                  </li>
                </ul>
              </div>
              <div className="d-flex justify-content-center">
                  <Link to="/dashboard">
                    <button type="submit" className="btn btn-secondary ms-3">
                      <i className="bi bi-arrow-left-square me-2"></i> Back
                    </button>
                  </Link>
                {
                  showEditForm ? 
                    <button
                      onClick={handleToggle} 
                      type="submit" 
                      className="btn btn-altinfo mx-3">
                      <i className="bi bi-x-circle me-2"></i>Close 
                    </button>
                    :
                    <button
                      onClick={handleToggle} 
                      type="submit" 
                      className="btn btn-altinfo mx-3">
                      <i className="bi bi-pencil-square me-2"></i>Update 
                    </button>
                
                }
                <button 
                  onClick={() => deleteEmp() }
                  type="submit" 
                  className="btn btn-altdanger">
                  <i className="bi bi-trash-fill me-2"></i>Delete 
								</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      { /* EDIT FORM  */}
      {showEditForm && (
        <EditEmpData 
          data={data} 
          editEmployee={editEmployee}
        />  
      )}
    </>
  )
}


export default ShowEmployee