import React, {useContext} from "react";
import './style.scss'
import { Button } from 'antd';
import {Context} from "../../contexts/athleteContext";
import {AthleteManager} from "../../api/athleteManager";

export default function AthleteConfirm() {
  
    const athleteContext = useContext(Context)
    let athleteManager = new AthleteManager()

    const addAthlete = () => {
        if(athleteContext.profileId != ''){
            athleteManager.editAthlete(
                athleteContext.state.profileId,
                {
                name: athleteContext.state.name,
                dob: athleteContext.state.date,
                location: athleteContext.state.location,
                team: athleteContext.state.team,
                gender: athleteContext.state.gender, 
                sports: athleteContext.state.sports,
                about: athleteContext.state.about,
                interests: athleteContext.state.interests
                }
            )
            athleteContext.dispatchContext({type:'athletePage', value:{page:'profile', edit:false}})
        }else{
            athleteManager.addAthlete({
                name: athleteContext.state.name,
                dob: athleteContext.state.date,
                location: athleteContext.state.location,
                team: athleteContext.state.team,
                gender: athleteContext.state.gender, 
                sports: athleteContext.state.sports,
                about: athleteContext.state.about,
                interests: athleteContext.state.interests
            })
        athleteContext.dispatchContext({type:'closeAthlete', value:{page:'list', edit:false}})
        }
    }

    const editAthlete = () => {
        athleteContext.dispatchContext({type:'athletePage', value:{page:'add', edit:true}})
    }
  

    return (
        <div className="athlete-confirm-body">
            <p className='athlete-confirm-title'> Athlete Summary: </p>
            <div className='athlete-confirm-input-container'>
                <div className='athlete-confirm-input-title'>Name:</div>
                <div className='athlete-confirm-input'> {athleteContext.state.name} </div>
            </div>
            <div className='athlete-confirm-input-container'>
                <div className='athlete-confirm-input-title'>Date of Birth:</div>
                <div className='athlete-confirm-input'> {athleteContext.state.date} </div>
            </div>
            <div className='athlete-confirm-input-container'>
                <div className='athlete-confirm-input-title'>Location:</div>
                <div className='athlete-confirm-input'> {athleteContext.state.location} </div>
            </div>
            <div className='athlete-confirm-input-container'>
                <div className='athlete-confirm-input-title'>Team:</div>
                <div className='athlete-confirm-input'> {athleteContext.state.team} </div>
            </div>
            <div className='athlete-confirm-input-container'>
                <div className='athlete-confirm-input-title'>Gender:</div>
                <div className='athlete-confirm-input'> {athleteContext.state.gender} </div>
            </div>
            <div className='athlete-confirm-input-container'>
                <div className='athlete-confirm-input-title'>Sports:</div>
                {athleteContext.state.sports.map((sport) =>{
                        return <div className='athlete-confirm-input'> {sport} </div>
                    })
                } 
            </div>
            <div className='athlete-confirm-input-container'>
                <div className='athlete-confirm-input-title'>About:</div>
                <div className='athlete-confirm-input'> {athleteContext.state.about} </div>
            </div>
            <div className='athlete-confirm-input-container'>
                <div className='athlete-confirm-input-title'>Interests:</div>
                <div className='athlete-confirm-input'> {athleteContext.state.interests} </div>
            </div>
            <div className='button-area'>
            <Button type="primary" size={'large'} style={{ width: 120, margin: 5 }} onClick={editAthlete}>Edit</Button>
            <Button type="primary" size={'large'} style={{ width: 120, margin: 5 }} onClick={addAthlete}>Confirm</Button>
            </div>
        </div>
    )
}