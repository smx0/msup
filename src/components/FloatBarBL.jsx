import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle ,faHouse, faInfoCircle, faRightFromBracket, faSpinner, faBookOpen } from "@fortawesome/free-solid-svg-icons"
import React, {useContext} from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/Auth'
import "@fortawesome/fontawesome-svg-core/styles.css"

export default function FloatBarBL() {

    const navigate = useNavigate()

    // context from AuthContext 
    const userInfo = useContext(AuthContext)
    // console.log(userInfo.user)


  return (
    <div className='floatbarbl'>

        <div className='floatbar-btn'
              onClick={() => navigate('/home')}>
          <FontAwesomeIcon 
            icon={faBookOpen}
            />
            <span className='floatbar-tooltip'>courses</span>
        </div>
      

        {userInfo.user &&
        <div className='floatbar-btn'
            onClick={ () => navigate('/addresource')}>
            <FontAwesomeIcon 
            icon={faPlusCircle}
          />
            <span className='floatbar-tooltip'>add</span>
        </div>
        }
        
        <div className='floatbar-btn'
            onClick={ () => navigate('/about')}>
            <FontAwesomeIcon 
            icon={faInfoCircle}
            />
            <span className='floatbar-tooltip'>info</span>
        </div>
        

        <div className='floatbar-btn'
            onClick={ () => navigate('/login')}>
            <FontAwesomeIcon 
            icon={faRightFromBracket}
            />
            <span className='floatbar-tooltip'>{ userInfo.user ? "logout" : "login"}</span>
        </div>

        <div >

        </div>


    </div>
  )
}
