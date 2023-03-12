import React, { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import {createClient} from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

import { useNavigate  } from 'react-router-dom'

const one = 'https://ivdkbtfxpwfusinunqgn.supabase.co'
const two = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2ZGtidGZ4cHdmdXNpbnVucWduIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc4ODUyOTcsImV4cCI6MTk5MzQ2MTI5N30.yg4TrrSwagWJ9i9s2DB8m4Q-39r8Fi6BQVV9W0-ozjw'

// create a new supabase obj which requires the two above strings (from the notes.md)
const supabase = createClient(one, two)


export default function LoginSuccess() {

    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect( () => {
        async function getUserData() {
            await supabase.auth.getUser()
                .then( (value) => {
                    // value.date.user has all info relating to user
                    //but in case it that info bundle doesn't exist
                    // the q mark means, if value.data is undefnied, don't try to get the user
                    // this way, you can avoid getting an undefined error 
                    if (value.data?.user) {
                        // console.log(value.data.user)
                        setUser(value.data.user); 
                    }
                })
        }

        // now we have to call it
        // so when the app loads, it'll try to get the user data of the person
        // currently logged in 
        getUserData()
    }, [])

    // has to be async b/w we have to use await when we're working w/supabase
    async function signOutUser() {

        // if we get an error we can store it here 
        const { error } = await supabase.auth.signOut() 
        navigate('/')
    }

  return (
    <div>
        <header>

        </header>
        
<div className='sectionName'>LoginSuccess...</div>
        <button onClick={ () => signOutUser()}>sign out</button>
    
    </div>
  )
}  