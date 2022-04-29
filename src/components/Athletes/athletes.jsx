import React, {useState, useRef, useContext} from "react";
import './style.scss'
import { Button } from 'antd';
import {Context} from "../../contexts/athleteContext";

import AthleteList from "../AthleteList/athleteList.jsx"
import AthleteInput from "../AthleteInput/athleteInput.jsx"
import AthleteConfirm from "../AthleteConfirm/athleteConfirm.jsx"
import AthleteProfile from "../AthleteProfile/athleteProfile.jsx"

export default function Athletes() {
  
    const athleteContext = useContext(Context)
    const currentPage = athleteContext.state.page
    const pages = {
        'list': <AthleteList />,
        'add':  <AthleteInput />,
        'confirm': <AthleteConfirm />,
        'profile': <AthleteProfile id={athleteContext.state.profileId}/>
    }

    return (
        <div className="athletes-body">
            {pages[currentPage]}
        </div>
    )
}