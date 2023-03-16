import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle ,faHouse, faInfoCircle, faRightFromBracket, faSpinner, faBookOpen } from "@fortawesome/free-solid-svg-icons"
import React, {useContext} from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { brad } from '../contexts/Auth'
import "@fortawesome/fontawesome-svg-core/styles.css"

export default function FloatBarBL() {

    const navigate = useNavigate()

    // context from brad 
    const llama = useContext(brad)
    // console.log(llama.user)


  return (
    <div className='floatbarbl'>

        <div className='floatbar-btn'
              onClick={() => navigate('/home')}>
            <FontAwesomeIcon 
            icon={faBookOpen}
              />
        </div>
        { llama.user &&
        <div className='floatbar-btn'
            onClick={ () => navigate('/addresource')}>
            <FontAwesomeIcon 
            icon={faPlusCircle}
            />
        </div>
        }
        
        <div className='floatbar-btn'
            onClick={ () => navigate('/about')}>
            <FontAwesomeIcon 
            icon={faInfoCircle}
            />
        </div>
        

        <div className='floatbar-btn'
            onClick={ () => navigate('/login')}>
            <FontAwesomeIcon 
            icon={faRightFromBracket}
            />
        </div>

        <div >

        </div>


    </div>
  )
}
