import { faBook } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext,useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../client'
import { AuthContext } from '../contexts/Auth'
import CourseData from './CourseData'

// this page is used to add resources 
export default function AddRes() {
  
  // has user info from context 
  const userInfo = useContext(AuthContext)
  // console.log('@ addres, userInfo is',userInfo)
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState( 
    {
      uid: userInfo.user.id,
      resName: '',
      resCourse: '',
      resFrom: '',
      resTopics: '',
      resType: '',
      resLocation: ''
    }
  )


  // creates options for 'course' form sxn
  const courseOptions = CourseData.map( item => {
    return <option value={ `${item.courseID}` }>
      {item.courseID} {item.courseName}
          </option>
  })
  // console.log(formData)

  function handleChange(e) {
    // console.log(e.target.value)
    const { name, value, type, checked } = e.target
    setFormData( prevFormData => {
      return {
        ...prevFormData,
        [name]: type === 'checkbox' ? checked : value
      }
    })
    // console.log( Object.keys(formData) ) 


  }
  
  // setDisableSubmitBtn(Object.keys(formData).some( k => !formData[k]))

  // todo , clear form data, and nav to homepage 
  function handleSubmit(event) {
    event.preventDefault()

    if (Object.keys(formData).some(k => !formData[k])) {
      toast('please fill out all fields!', {
        style: {
          // backgroundColor: '#fa757566',
          backgroundColor: '#24293666',
          border: '1px solid red',
          borderRadius: '6px',
          color: '#ff0000'
        },
        position: 'bottom-center'
      })
    } else {
        const { uid, resName, resCourse, resFrom, resTopics, resType, resLocation } = formData

        const topicArray = []
        resTopics.split(",").forEach( item => topicArray.push(item.trim().toLowerCase()))
        // console.log(topicArray)

        async function submitRes() {
        const res = await supabase
          .from('resources')
          // the keys should have the same name as the row to insert into 
          .insert(
            {
              name: resName,
              from: resFrom,
              topic: topicArray,
              courseID: resCourse,
              type: resType,
              location: resLocation,
              user_id: uid,
              // add_date: (new Date()).toISOString().toLocaleString()
            })

        // if not working, put the obj in an square brackets and then send it
        // console.log("testing response!", res)
        }
        toast('thanks for your help!', {
          style: {
            backgroundColor: '#24293666',
            border: '1px solid #58ff7c',
            borderRadius: '6px',
            color: '#58ff7c'
          },
          position: 'bottom-center'
        })

        submitRes()
        navigate('/home')

      }

    // TODO close winddow after submitting, also clear comment and id

  }

  // console.log( ((new Date()).toISOString()).toLocaleString())

  return <div >
    {userInfo.user ? 
    <div>
        <div className='ar-title'>
        {/* < FontAwesomeIcon  icon={faBook}/> add a new resource  */}
         add a new resource 
      </div>

    <form className='ar-form'>

      <div className='ar-form-section'>
        <div className='ar-form-cat-cnt'>
          <h1 className='ar-form-cat'>course</h1>
          </div>
          <p className='ar-form-descr'>which course do you recommend this for? </p>
          <select 
                // id="resCourse"
                className='ar-form-select'
                name="resCourse"
                value={formData.resCourse}
                onChange={() => handleChange(event)}
            >
                <option value=""> (＾▽＾)  Select a Class</option>
                {courseOptions}

            </select>
      </div>

      <div className='ar-form-section'>
      <div className='ar-form-cat-cnt'>
        <h1 className='ar-form-cat'>name</h1></div>

        <p className='ar-form-descr'>give a brief, descriptive title
          <br></br>something like <span className='ar-form-descr-span'>Notes on Direct Proof</span> or <span className='ar-form-descr-span'>Java Acess Modifiers</span>. </p>
      <input 
          type="text" 
          className='ar-form-text'
          placeholder='name'
          name='resName'
          value={formData.resName}
          onChange={() => handleChange(event)}
          // onChange={handleChange}
           />
      </div>

      <div className='ar-form-section'>
      <div className='ar-form-cat-cnt'>
        <h1 className='ar-form-cat'>from</h1>
        </div>
        <p className='ar-form-descr'>where is this resource from?  <br></br> ex: TrevTutor, Khan Academy, Oracle Java Docs, free code camp, University of StateName CS lectures, Baeldung</p>
      <input 
          type="text" 
          className='ar-form-text'
          placeholder='from'
          name='resFrom'
          value={formData.resFrom}
          onChange={handleChange}
           />
      </div>

      <div className='ar-form-section'>
      <div className='ar-form-cat-cnt'>
        <h1 className='ar-form-cat'>topics</h1>
          </div>
          <p className='ar-form-descr'>the topics covered <br />
             people should be able to find this resource  based on the topics you provide <br/>
            if there are multiple topics covered, separate them with commas.<br />
            ex: induction, csv parsing, pointers, expectation, functional programming</p>
      <input 
          type="text" 
          className='ar-form-text'
          placeholder='topic01, topic02, ...topic99'
          name='resTopics'
          value={formData.resTopics}
          onChange={handleChange}
           />
      </div>


      <div className='ar-form-section ar-form-fieldset' >
      <div className='ar-form-cat-cnt'>
        <h1 className='ar-form-cat type'>type</h1>
          </div>
          {/* <p className='ar-form-descr'>which category best fits? </p> */}

        <fieldset >
          <legend>which category best fits?</legend>

          <input
            type="radio"
            name="resType"

            id="video"
            value="video"
            checked={formData.resType === "video"}
            onChange={handleChange}
          />
          <label htmlFor="video">video</label>
          <br />

          <input
            type="radio"
            name="resType"

            id="textbook"
            value="textbook"
            checked={formData.resType === "textbook"}
            onChange={handleChange}
          />
          <label htmlFor="textbook">textbook</label>
          <br />

          <input
            type="radio"
            name="resType"

            id="webpage"
            value="webpage"
            checked={formData.resType === "webpage"}
            onChange={handleChange}
          />
          <label htmlFor="webpage" >webpage</label>
          <br />
        </fieldset>
      </div>

      <div className='ar-form-section'>
      <div className='ar-form-cat-cnt'>
        <h1 className='ar-form-cat'>location</h1>
          </div>
          <p className='ar-form-descr'>this is just the webpage url. <br/>
            of course, don't add anything illegal or against uni policy, etc.<br/>
            if it's a paid course/text, maybe just put a link to the product page? ¯\_(ツ)_/¯ </p>
      <input 
          type="text" 
          className='ar-form-text'
          placeholder='http://www.example.com'
          name='resLocation'
          value={formData.resLocation}
          onChange={handleChange}
           />
      </div>


      <div className='ar-footer'>
        {

        }
        <button 
          className='ar-footer-submit-btn'
          // disabled={true}
          onClick={handleSubmit}
          type='button'
          >
            submit
        </button>

      </div>


    </form>
    </div>

    : 
    "You're not supposed to be here! Go sign in first!"}

  </div>
}