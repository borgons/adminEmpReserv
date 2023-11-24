import { useDispatch } from 'react-redux'
import { deleteEmployee } from '../../features/employees/employeeSlice'

// import Moment from 'react-moment'
import moment from 'moment'

import { useNavigate } from 'react-router-dom'


function EmpDataTable({ emp, index }) {


  const { empLicensedNo, empFirstName, empLastName, empRate, empStatus, _id, empRegDate } = emp

	const nav = useNavigate()	
	const dispatch = useDispatch()

	const deleteEmp = () => {
		dispatch(deleteEmployee(emp._id))
	}

	const isAvailable = empStatus === 'AV' ? 'isAvailable' : 'isNotAvailable'

  return(
      <tr key={index} className="text-center">
				<td>{empLicensedNo}</td>
				<td>{empFirstName}</td>
				<td>{empLastName}</td>
				<td>{parseFloat(empRate).toFixed(2)}</td>
				<td className={isAvailable}>{empStatus}</td>
				<td>{moment(empRegDate).format("MM/DD/YYYY")}</td>
				<td className="d-inline-block-sm">
					{/* LINK to a single record pages */}
					<button 
					onClick={() => {
						nav(`/showEmployee/${_id}`, { state: emp});
					}} 
					type="button" className="btn btn-altinfo mx-3 my-1">
						<i className="bi bi-person-lines-fill"></i>
					</button>
					{/* DELETE single record */}
					<button 
						onClick={() => deleteEmp()}
						type="button" 
						className="btn btn-altdanger">
						<i className="bi bi-trash-fill"></i>
					</button>
				</td>
				<td></td>
      </tr>
    
  )
}

export default EmpDataTable