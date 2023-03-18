import React, { useState, useContext } from 'react'
import { AuthContext } from '../contexts/Auth'

export default function TestModal(props) {

  // has user info from context 
  const userInfo = useContext(AuthContext)

  const { on, name, id} = props.info
  // console.log('display style is:',on )

  const displayStyle = on ? 'block' : 'none'

  function handleCommentBoxChange(e) {
    props.setCommentContent(e.target.value)
  }

  return (
    <div>

      <div className="submit-comment-overlay" 
           style={{display: displayStyle}}>
            <div className="submit-top-text">write a new comment for:</div>
        <div className="submit-resource-name-text">
              {name}</div>
        
        
        
        <textarea 
          placeholder="comment..."
          name="comments"
          className='submit-comment-input'
          // value={commentBoxState}
          value={props.commentContent}
          onChange={handleCommentBoxChange}
          />
          
          
          <div className='submit-comment-footer'>
            

            <button 
              className='submit-comment-close-btn'
              onClick={props.setCommentModalState}>
                ↩ close</button>


            <button 
              className='submit-comment-submit-btn'
              name='comment'
              onClick={ () => props.setComment({
                  resourceID: id, 
                  comment: props.commentContent,
                  userID: userInfo.user.id
                })}>
                submit→</button>


          </div>

      </div>

    </div>
  )
}