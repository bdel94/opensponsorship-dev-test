import React, {useState, useEffect} from 'react'

let Context = React.createContext();

let initState = {
    page: 'list',
    profileId:'',
    loadingProfile: true,
    edit: false,
    name: '',
    date: '',
    location: '',
    team: '',
    gender: '', 
    sports: [],
    interests: '',
}

let reducer = (state, {type, value}) => {
    switch(type){
        case 'athletePage':
            return {...state, page:value.page, edit: value.edit}
        case 'closeAthlete':
            return {...state, page:value.page, profileId: '', edit: value.edit}
        case 'setDate':        
            return {...state, date: value}   
        case 'setName':        
            return {...state, name: value}
        case 'setLocation':        
            return {...state, location: value}   
        case 'setTeam':        
            return {...state, team: value}  
        case 'setGender':        
            return {...state, gender: value}  
        case 'setSports':        
            return {...state, sports: value}        
        case 'setAbout':        
            return {...state, about: value}
        case 'setInterests':        
            return {...state, interests: value}
        case 'viewProfile':
            return {...state, profileId: value.profileId, page:value.page, edit:value.edit}
        case 'loadProfile':
            console.log('value', value)        
            return {...state, 
                    loadingProfile: false,
                    name: value.name,
                    date: value.dob,
                    location: value.location,
                    team: value.team,
                    gender: value.gender,
                    sports: value.sports,
                    about: value.about,
                    interests: value.interests}              
        default:
            return initState
    }
}

const ContextProvider = (props) => {
    let [state, dispatchContext] = React.useReducer(reducer, initState)

    let value = {state, dispatchContext}

    return(
        <Context.Provider value={value}>{props.children}</Context.Provider>
    )
}

let ContextConsumer = Context.Consumer

export {Context, ContextProvider, ContextConsumer}