import React, { useContext, useEffect, useState } from 'react'
import { supabase } from '../client'
import { useParams } from "react-router-dom"
import CourseData from './CourseData'
import TagBar from './TagBar'
import Resources from './Resources'
import TestModal from './TestModal'
import toast, { Toaster } from 'react-hot-toast'
import { AuthContext } from '../contexts/Auth'

export default function CoursePage() {

  // gets id from browser URL
  const { id } = useParams()
  // converts the id to an int (it's a string originally)
  const classID = parseInt(id)

  // for checking in login statuss
  const userInfo = useContext(AuthContext)

  // holds topics from APi data 
  const [topicsFromApi, setTopicsFromApi] = React.useState()

  // state to hold API data for rows matching currentClass, used to create tag list
  const [apiReturnData, setApiReturnData] = React.useState([])

  // state for selectedTag 
  const [selectedTag, setSelectedTag] = React.useState('')

  // state to toggle visibility of addCommentModal
  const [toggleCommentModalState, setToggleCommentModalState] = React.useState({ on: false, id: null, name: null })

  // used to cpn reload 
  const [triggerMe, setTriggerMe] = useState(false)

  // trigger component to query db for commnents 
  const [triggerCommentQ, setTriggerCommentQ] = useState(false)

  const [commentBoxState, setCommentBoxState] = useState('')

  // used to hold colors to color tag bg
  const [colorsArray, setcolorsArray] = useState([])


  // DL used to test whether API request was successful
  const noApiDataArray = ["no", "topics", "found", "ಠ_ಠ", "\\^_^/"]

  // creates a colors array so pills don't change color everytime they are creaetd 
  const colors = ['darkblue','blue', '#4e10a0', '#2657b3']

  // used to make tag lists, runs on startup
  React.useEffect(() => {

    // dl 
    // console.log("quering w/"+classID)

    // this is just the def 
    async function getDataJSON() {
      const res = await supabase
        .from('resources')
        .select('topic')
        .eq('courseID', classID)
      // console.log("\t API packed tags is: ", res.data) 
      
      const temp = []

      if (res.data.length == 0) {
        noApiDataArray.forEach( elm => temp.push(elm))
      }
      
      res.data.forEach( row => temp.push(row.topic))
      const tagSet = new Set(temp.flat().map( elm => elm.toLowerCase()))
      // console.log(temp)
      // console.log(temp.flat())  
      // console.log('array.set of', tagSet.size ,Array.from(tagSet))
      setTopicsFromApi(Array.from(tagSet))



      const temp2 = []
      for (let i = 0; i < tagSet.size; i++) {
        const rndInt = Math.floor(colors.length * Math.random())
        temp2.push(colors[rndInt])
      }
      // console.log('\ttemp2 is', temp2)
      setcolorsArray(temp2)


    }

    // this actually calls the function 
    getDataJSON()
  }, [])



  // uses selectedTag to requery db 
  // runs when selectedTag state is changed
  React.useEffect(() => {
    // dl 
    // console.log("\tusing tag: " + selectedTag)

    // this is just the def 
    async function getResourcesJSON() {
      const res = await supabase
        .from('resources')
        .select()
        .contains('topic', [`${selectedTag}`])
        .eq('courseID', classID)
      // console.log("\tdbl sqzd is: ", res.data) 
      setApiReturnData(res.data)

    }

    // this actually calls the function 

    if (selectedTag) {
      getResourcesJSON()
    } else {
      // console.log('blank tag')
    }

  }, [selectedTag, triggerMe])

  
  // return course name for use in header
  // dl todo - change to switch
  // uses classId and iterates thru array until match is found 
  const courseName = CourseData.find(item => item.courseID === classID).courseName
  // const courseName = 'asdf'

  // sent as handleClick to Tagbar
  function userChoseATag(tag) {
    setSelectedTag(tag)
  }

  // determines the displayed text just below tagsbox
  function filterStatus() {
    if (selectedTag) {
      if (apiReturnData.length == 1) {
        return `1 resource on ${selectedTag} `
      } else { return `${apiReturnData.length} resources on ${selectedTag}` }

    } else if (!selectedTag) { return "select a topic" }
  }


  // sent as prop in order to toggle comment modal visbility and use data of the card it was clicked from
  function handleCommentButtonClk(id, name) {

    // console.log("@CoursePage: state:", toggleCommentModalState.on, "id:", toggleCommentModalState.id)
    console.log("from resource #", id, name)
    setToggleCommentModalState(prev => ({ on: !prev.on, id: id, name: name }))

  }


  // if curBtnValue == false, create a new entry in 'likedRes' (liked resources) table
  // also, we increment the count of the given resource (id) in the 'resources' table
  // if curBtnValue == true, we set the value in 'likedRes' to false
  // we also decrement the given res (id)'s count value 
  async function sendLikeInfo(id, uid, curBtnValue) {
    
    // console.log(id, "is cur",curBtnValue)

    if (!curBtnValue) {
      const res = await supabase
        .from('likedRes')
        .upsert(
          {from_user: uid,
            parent_resource: id,
            btn_status: true
          }
          )

      const res2 = await supabase
          .from('resources')
          .select('likes')
          .eq('id', id)
          // console.log('likes are',res2.data[0].likes)
          const newInt = (res2.data[0].likes) + 1
          // console.log('ni is',newInt)

      const res3 = await supabase
          .from('resources')
          .update({ 'likes': newInt })
          .eq('id', id)

          //console.log(res3)

          setTriggerMe(prev => !prev)

      // user cliked on a liked resource, so we set it to false
      } else {
        const res = await supabase
          .from('likedRes')
          .upsert(
           {from_user: uid,
              parent_resource: id,
            btn_status: false
           }
          //,{onConflict: ['from_user', 'parent_resource']}
          )
          console.log('made false', res)
          setTriggerMe(prev => !prev)

          const res2 = await supabase
            .from('resources')
            .select('likes')
            .eq('id', id)
            // console.log('likes are',res2.data[0].likes)
          const newInt = (res2.data[0].likes) - 1
          // console.log('ni is',newInt)

          const res3 = await supabase
            .from('resources')
            .update({ 'likes': newInt })
            .eq('id', id)


          setTriggerMe(prev => !prev)


      }
  }


  // handles button click from 'like' button on a given resource card 
  function handleLikeBtnClick(id, btnStatus) {
    
    // user is logged in and we can toggle the button status 
    if (userInfo.user) {
      toast('good to know!', {
        style: {
          backgroundColor: '#24293666',
          border: '1px solid #58ff7c',
          borderRadius: '6px',
          color: '#58ff7c'
        },
        position: 'bottom-center'
      })

      // call the sendLIkeInfo btn here!! w/id, btnStatus
      sendLikeInfo(id, userInfo.user.id, btnStatus)

    // sends toast asking u login 
    } else (
      toast('please login first!', {
        style: {
          // backgroundColor: '#fa757566',
          backgroundColor: '#24293666',
          border: '1px solid red',
          borderRadius: '6px',
          color: '#ff0000'
        },
        position: 'bottom-center'
      })
    )
  }




  function closeModalAndClearComment(){
    setCommentBoxState('')
    setToggleCommentModalState({ on: false, id: null, name: null })
    // console.log('new close feature')    
  }

  // sends comment to db, closes modal, and TODO reloads comp 
  // also clears comment box, so it won't have the same content when opeend again
  function setCommentAndCloseModal(obj) {
    const { resourceID, comment, userID } = obj
    // console.log("sending comment with:",resourceID, comment, userID)

    setToggleCommentModalState({ on: false, id: null, name: null })

    if (!comment) {
      toast('please enter a comment!', {
        style: {
          // backgroundColor: '#fa757566',
          backgroundColor: '#24293666',
          border: '1px solid red',
          borderRadius: '6px',
          color: '#ff0000'
        },
        position: 'bottom-center'
      })
    return
    }

    // inserting form into info supabase
    async function submitForm() {
      const res = await supabase
        .from('comments')
        // the keys should have the same name as the row to insert into 
        .insert(
          {
            parent_resource: resourceID,
            comment: comment,
            user_id: userID
          })
      }
      toast(' ✅ comment submitted!', {
        style: {
          backgroundColor: '#24293666',
          border: '1px solid #58ff7c',
          borderRadius: '6px',
          color: '#58ff7c'
        },
        position: 'bottom-center'
      })



    // after submitting the form data, we wait 3 seconds 
    // to pull the new comment data from the database
    // if we don't do this, sometimes the new comment data will not have 
    // the most recent comment that was submitted. 
    function stagger() {
      submitForm()
      // console.log('after submitForm()')

      // console.log('starting setTimeout')
      setTimeout(() => {
        setTriggerCommentQ( prev => !prev)
        // console.log('after triggerCommentQ')      
        }, 2000);
  
    }

    stagger()


    

    setCommentBoxState('')
    // console.log('after setCommentBoxState')
    // TODO close winddow after submitting, also clear comment and id

  }

  
  return (
    <div>

      < Toaster />
      {/* <div className='course-page-heading'> */}
        {/* <div className='course-page-heading-id'>{classID}</div> */}
        {/* <div className='course-page-heading-name'>{courseName}</div> */}
      {/* </div> */}

      <h1><TestModal
        info={toggleCommentModalState}
        // used to turn the modal off 

        // for close button
        // setCommentModalState={setToggleCommentModalState}
        setCommentModalState={closeModalAndClearComment}

        // for submit button
        setComment={setCommentAndCloseModal}


        setCommentContent={setCommentBoxState}
        commentContent={commentBoxState}
      />
      </h1>

      <TagBar tags={topicsFromApi} handleClick={userChoseATag} colorsArray={colorsArray} />

      <div className='course-page-filter-status'>
        {filterStatus()}</div>

      <div><Resources
        data={apiReturnData}
        handleLikeBtnClickfromCoursePage={handleLikeBtnClick}
        handleClickfromCoursePage={handleCommentButtonClk} 
        trigger01={triggerMe}
        triggerComQ={triggerCommentQ}
        /></div>
    </div>
  )
} 