// this is the file that we are creating context in
import React from 'react'

// need to improt CreateContext first 
import { createContext, useState } from 'react'
// import { supabase } from '../supabase'

// then call createContext and store it in a var, here that var is called AuthContext 
// the var will be given two things, a var.Provider and var.Consumer 
// also, in createContext, we pass in an initial value 

export const brad = createContext(null)

export function Flubber(props) {
    
    const [ user, setUser ] = useState(null);

    return ( <brad.Provider value={{user, setUser }}> {props.children}</brad.Provider> ) }