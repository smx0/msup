import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileCircleExclamation,faInfoCircle, faHammer, faXmark, faFireAlt, faRightFromBracket, faHomeAlt, faBookOpen } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

export default function About() {

    const navigate = useNavigate()
    const mostrel = {borderBottom: '1px yellow dashed', color:'yellow'}
    const peerrev = {borderBottom: '1px orange dashed', color:'orange'}

  return (
    <div>
      <div className='aboutText'>
          <h1><FontAwesomeIcon icon={faInfoCircle}/> about msup</h1>
          <p> ⭐ msup was created to connect MCIT online students with  <br></br> ✨<span style={mostrel} > the most relevant</span> and <FontAwesomeIcon icon={faFireAlt} color='orangered'/> <span style={peerrev}>peer approved</span> supplemental resources on challenging topics. </p>
          <p className='warn'> 👿 Do not post links to specific homework problems, test questions, code repositories, etc. that violate the Academic Integrity policies.</p>
          <h1>✉ get in touch</h1>
          <p>❓ To request that a specific resource be <FontAwesomeIcon icon={faXmark} color='red'/>  <span style={{color:'red', borderBottom: '1px red dashed'}}>deleted</span> or <FontAwesomeIcon icon={faHammer} color='lightgreen' /> <span style={{color:'lightgreen', borderBottom: '1px lightgreen dashed'}}>improved</span> ,
              send an email to 🌐<span className='email' >msupdb0@gmail.com</span>.</p>
              <p><FontAwesomeIcon icon={faRightFromBracket} color='gold' /> If you are logged in, each resource card will display additional icons at the bottom. Click on the <FontAwesomeIcon icon={faFileCircleExclamation} /> icon on the lower right corner of the specific resource you are inquiring about.</p>
      </div>
      <div className='about-section'>
          <div className='about-btn-holder'>
          <FontAwesomeIcon 
              icon={faRightFromBracket} 
              className='about-btns'
              onClick={() => navigate('/login')}
              />
              <div className='about-btn-text'>login</div>
            </div>

          <div className='about-btn-holder'>
          <FontAwesomeIcon 
              icon={faBookOpen} 
              className='about-btns'
              onClick={() => navigate('/home')}
              />
              <div className='about-btn-text'>courses</div>
            </div>

      </div>
    </div>
  )
}
