import React, { useEffect } from 'react'
import { ScaleLoader } from 'react-spinners'
import ResourceCard from './ResourceCard'

export default function Resources(props) {
  
  const resourceCards = props.data.map( elm => 
    <ResourceCard  key={elm.id}
                   data={elm}
                   handleLikeBtnClickfromResources={props.handleLikeBtnClickfromCoursePage}
                   handleClickfromResources={props.handleClickfromCoursePage}
                   trigger02={props.trigger01}
                   triggerComQ2={props.triggerComQ}
                   />)

                   
  return (
        // <div className='resource-container'>
        <div>
            {resourceCards} </div>
  )
}