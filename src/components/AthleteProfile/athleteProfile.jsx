import React, {useState, useEffect, useContext} from "react";
import './style.scss'
import { Button } from 'antd';
import {Context} from "../../contexts/athleteContext";
import {AthleteManager} from "../../api/athleteManager";

export default function AthleteProfile(props) {
  
    const athleteContext = useContext(Context)
    let athleteManager = new AthleteManager()

    const closeProfile = () => {
        athleteContext.dispatchContext({type:'closeAthlete', value:{page:'list', edit:false}})
    }

    const getAthlete = async() =>{
        return await athleteManager.getAthlete(props.id)
    }

    const editAthlete = () => {
        athleteContext.dispatchContext({type:'athletePage', value:{page:'add', edit:true}})
    }

    useEffect(() => {   
        console.log('im updating: ', props.id)
        getAthlete().then(result=>{
            console.log('result', result)
            athleteContext.dispatchContext({type:'loadProfile', value:result})
        
        })
          
    }, [])

    return (
        <div className="athlete-profile-body">
            {athleteContext.state.loadingProfile?
            <div>loading</div>:
            <div className='athlete-profile-main'>
                <div className='athlete-profile-col-1'>
                    <div className='athlete-profile-image'></div>
                    <div className='athlete-profile-input-container'>
                        <div className='athlete-profile-input-title'>Location:</div>
                        <div className='athlete-profile-input'> {athleteContext.state.location} </div>
                    </div>
                    <div className='athlete-profile-input-container'>
                        <div className='athlete-profile-input-title'>Team:</div>
                        <div className='athlete-profile-input'> {athleteContext.state.team} </div>
                    </div>
                    <div className='athlete-profile-input-container'>
                        <div className='athlete-profile-input-title'>Gender:</div>
                        <div className='athlete-profile-input'> {athleteContext.state.gender} </div>
                    </div>
                    <div className='athlete-profile-input-container'>
                        <div className='athlete-profile-input-title'>Sports:</div>
                        {athleteContext.state.sports.map((sport) =>{
                                return <div className='athlete-profile-input'> {sport} </div>
                            })
                        } 
                    </div>
                    <div className='athlete-profile-input-container'>
                        <div className='athlete-profile-input-title'>DOB:</div>
                        <div className='athlete-profile-input'> {athleteContext.state.date} </div>
                    </div>
                </div>
                <div className='athlete-profile-col-2'>
                <div className='athlete-profile-name'> {athleteContext.state.name} </div>
                    <div className='athlete-profile-bio-container'>
                        <div className='athlete-profile-input-title'>About:</div>
                        <div className='athlete-profile-input'> {athleteContext.state.about} </div>
                    </div>
                    <div className='athlete-profile-bio-container'>
                        <div className='athlete-profile-input-title'>Interests:</div>
                        <div className='athlete-profile-input'> {athleteContext.state.interests} </div>
                    </div>
                </div>
                
            </div>
            }
            <div className='button-area'>
                <Button type="primary" size={'large'} style={{ width: 120, margin: 5 }} onClick={closeProfile}>Close</Button>
                <Button type="primary" size={'large'} style={{ width: 120, margin: 5 }} onClick={editAthlete}>Edit</Button>
            </div>
        </div>
    )
}

