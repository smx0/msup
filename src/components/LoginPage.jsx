import React, { useContext } from 'react'
import {createClient} from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useNavigate  } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileCircleExclamation, faBook, faScroll, faVideo, faFireAlt, faCommentAlt, faSquarePlus, faStar, faN} from '@fortawesome/free-solid-svg-icons'
import toast from 'react-hot-toast'
import { brad } from '../contexts/Auth'
import party from '../assets/partyblob.gif'
import { ScaleLoader } from 'react-spinners'

const PROJECT_URL = import.meta.env.VITE_PROJECT_URL
const PROJECT_API_KEY = import.meta.env.VITE_MSUP_API_KEY

// create a new supabase obj which requires the given params 
const supabase = createClient(PROJECT_URL, PROJECT_API_KEY)

export default function LoginPage() {
  // can't use 'brad' dir, NEED useContext first
  const llama = useContext(brad)

  const [loadingAnim, setloadingAnim] = React.useState(true)

  // DND, clg statements for testing user 
  // if (llama.user) {
    // console.log(llama.user)
    // console.log(llama.user.id, "is signed in!")
  // } 


  // ??? runs when login page reloads?
  supabase.auth.onAuthStateChange( async (event) => {
    // console.log(event)
    // the 'event' passed is a string, so we ck to see what it is
    if (event !== 'SIGNED_OUT') {
      // console.log('auth state change')
    }
    // else {
      // console.log("you are signed out")
      //forward to localhost 
      // navigate('/error')
    // }
  })


    React.useEffect( () => {

      // console.log("at uE getUserData()")

      async function getUserData() {
          await supabase.auth.getUser()
              .then( (value) => {

                  // value.date.user is an entire obj which has fields like id, authStatue, role, email, etc...
                  // but in case it that info bundle doesn't exist
                  // the q mark means, if value.data is undefnied, don't try to get the user
                  // this way, you can avoid getting an undefined error 
                  if (value.data?.user) {
                      // console.log('\tfound v.d.u:')
                      // console.log(value.data.user)
                    
                      console.log('hi',PROJECT_URL, PROJECT_API_KEY)
                      console.log('wlv is',window.location.origin)
                      redirectTo:window.location.origin
                      
                      llama.setUser(value.data.user); 
                      // toast(" ran get user data", {
                        // position: 'top-center'})

                      // we're just gonna use the auth data to set state, don't bother with local storage for anything
                      // localStorage.setItem('does this work?', 'true')
                  }  else {
                    // if we don't have value.data.user
                    // console.error('no v.d.u', value)
                  }
                  
              })
      }

      // now we have to call it so when the app loads
      //it'll try to get the user data of the person currently logged in 
      getUserData()
  }, [])

  // console.log('\thi',user.id)

  // fxn to sign a user out
  // has to be async b/w we have to use await when we're working w/supabase
  async function signOutUser() {

      // if we get an error we can store it here 
      const { error } = await supabase.auth.signOut()  
      console.error(error);
      llama.setUser(null)
      // alert('signed out!')
      toast('goodbye!', {
        style: {
          // backgroundColor: '#fa757566',
          backgroundColor: '#24293666',
          border: '1px solid red',
          borderRadius: '6px',
          color: '#ff0000'
        },
        position: 'bottom-center'
      })

  }


  // this is just to test toast btn 
  function toastThemeTest() {
    toast('goodbye!', {
      style: {
        // backgroundColor: '#fa757566',
        backgroundColor: '#24293666',
        border: '1px solid red',
        borderRadius: '6px',
        color: '#ff0000'
      },
      position: 'bottom-center'
    })
  }

  function turnOff() {
    setTimeout(() => {
      setloadingAnim(false)
    }, 500)
  }


  return (

    <div>
      <div className='login-bottom'>

{/* <div style={{ color: 'white' }}>'hello logged in user'</div> */}
<button
  onClick={() => toastThemeTest()}>
  toast test</button>
</div>
      { loadingAnim ? 
        
        <div className='login-scaleholder'>
          < ScaleLoader
          loading={turnOff()}
          color='white'
          height={30}
          width={5}
          radius={10}
          margin={3}
          />
          
        </div> 
        
        :
      
      llama.user ?

        <div className='login-loggedin'>
          <h1> nice</h1>
          <p> You are currently signed in. </p>
          <button 
            className='login-logout-btn'
            onClick={() => signOutUser()}> 
            sign out</button> </div>

          :

        <div className='login-container'>

          <div className='login'>
            <Auth
              supabaseClient={supabase}
              // only one at the moment??
              appearance={{ theme: ThemeSupa }}

              theme="dark"

              // contains every authoraized provider
              providers={['google']}
            />
          </div>

          <div className='loginHelp'>
            <h1> about logging in</h1>
            <p> All resources are visible by default to everyone! (aka no login required).
              <img src={party} alt="party" height='20px' />
            </p>
            <p>However, logged in users can additionally:</p>
            <ul>
              <li><FontAwesomeIcon icon={faSquarePlus} /> add new resources </li>
              <li><FontAwesomeIcon icon={faCommentAlt} /> comment on existing ones</li>
              <li><FontAwesomeIcon icon={faFireAlt} /> mark resources as helpful</li>
              <li><FontAwesomeIcon icon={faFileCircleExclamation} /> leave feedback</li>
              <li><FontAwesomeIcon icon={faStar} /> set classes as fav</li>
            </ul>
          </div> </div>

        }


          

    </div>
  )

}
