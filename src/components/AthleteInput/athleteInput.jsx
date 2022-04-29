import React, {useState, useEffect, useContext} from "react";
import './style.scss'
import { Upload, message, Select, Input, Space, DatePicker, Button } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import {Context} from "../../contexts/athleteContext";
import {AthleteManager} from "../../api/athleteManager";

export default function AthleteInput() {
  
    const athleteContext = useContext(Context)
    let athleteManager = new AthleteManager()
    const {Option} = Select;
    const { TextArea } = Input;
    const sports = ['Golf', 'Swimming', 'Tennis', 'Cricket', 'Basketball', 'American Football', 'Soccer']
    const [sportsList, setSportsList] = useState([])
    const [loading, setLoading] = useState(false)
    const [imageUrl, setImageUrl] = useState(false)
    const uploadButton = (
        <div>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        console.log("we gert here", isJpgOrPng, isLt2M)
        return isJpgOrPng && isLt2M;
    }
    const getImage = (url) => {
        console.log(url)
        setLoading(false)
        setImageUrl(url)
    }
    useEffect(() => {
        let placeholdList = []
        for (let sport of sports){
            console.log(sport)
            placeholdList.push(<Option key={sport}>{sport}</Option>)
        }
        setSportsList(placeholdList)
    }, [])

    const addAthlete = () => {
        athleteContext.dispatchContext({type:'athletePage', value:{page:'confirm', edit:false}})
    }
    const cancelAdd = () => {
        if(athleteContext.state.profileId != ''){
            athleteContext.dispatchContext({type:'athletePage', value:{page:'profile', edit:false}})
        }
        else{
            athleteContext.dispatchContext({type:'cancelAdd', value:{page:'list', edit:false}})
        }
    }
    const [dob, setDob] = useState('')

    const setDate = (date, dateString) => {
        athleteContext.dispatchContext({type:'setDate', value:dateString})
    }
    const setName = (e) => {
        athleteContext.dispatchContext({type:'setName', value:e.target.value})
    }
    const setLocation = (e) => {
        athleteContext.dispatchContext({type:'setLocation', value:e.target.value})
    }
    const setTeam = (e) => {
        athleteContext.dispatchContext({type:'setTeam', value:e.target.value})
    }
    const setGender = (value) => {
        athleteContext.dispatchContext({type:'setGender', value:value})
    }
    const setSports = (value) => {
        athleteContext.dispatchContext({type:'setSports', value:value})
    }
    const setAbout = (e) => {
        athleteContext.dispatchContext({type:'setAbout', value:e.target.value})
    }
    const setInterests = (e) => {
        athleteContext.dispatchContext({type:'setInterests', value:e.target.value})
    }
    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    const uploadImage = (info) => {
        console.log('we get here')
        if (info.file.status === 'uploading') {
            console.log('we are uploading')
            setLoading(true);
            return;
          }
        if (info.file.status === 'done') {
        // Get this url from response in real world.
            console.log('we are done')
            getBase64(info.file.originFileObj, imageUrl =>
                {
                    console.log(imageUrl)
                    setLoading(false)
                    setImageUrl(imageUrl)
                }
            );
        }
    }

    /*
        Name
        Date of Birth
        Location
        Team (e.g. New York Giants)
        Gender
        Sports (Can Multiple)
        About
        Interests
        Profile Image
    */
   const request = {"name": "xxx.png", "status": "done","url": "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png","thumbUrl": "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"}

    return (
        <div className="athlete-input-body">
            <p className='athlete-input-title'> Athlete Information: </p>
            {
            athleteContext.state.edit ? 
            <Space direction="vertical">
                <Input defaultValue={athleteContext.state.name} onChange={setName}/>
                Date of Birth: <DatePicker defaultValue={moment(athleteContext.state.date)} onChange={setDate} />
                <Input defaultValue={athleteContext.state.location} onChange={setLocation}/>
                <Input defaultValue={athleteContext.state.team} onChange={setTeam}/>
                <Select 
                 style={{ width: '250px' }} 
                 showSearch  
                 defaultValue={athleteContext.state.gender} 
                 placeholder="Gender" 
                 onChange={setGender}>
                    <Option value="Male">Male</Option>
                    <Option value="Female">Female</Option>
                </Select>
                <Select
                 mode="multiple"
                 allowClear
                 style={{ width: '100%' }}
                 placeholder="Select Sports (Multiple)"
                 defaultValue={athleteContext.state.sports}
                 onChange={setSports}
                >
                    {sportsList}
                </Select>
                <TextArea showCount maxLength={500} style={{ height: 120 }} defaultValue={athleteContext.state.about} placeholder="About..." onChange={setAbout} />
                <TextArea showCount maxLength={500} style={{ height: 80 }} defaultValue={athleteContext.state.interests} placeholder="Interests..." onChange={setInterests} />
                <div className='button-area'>
                    <Button type="primary" size={'large'} style={{ width: 150, margin: 5 }} onClick={addAthlete}>{athleteContext.state.profileId != '' ? 'Update Athlete': 'Add Athlete'}</Button>
                    <Button type="primary" size={'large'} style={{ width: 150, margin: 5 }} onClick={cancelAdd}>Cancel</Button>
                </div>
            </Space>
            :
            <Space direction="vertical">
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action={request}
                    beforeUpload={beforeUpload}
                    onChange={uploadImage}
                >
                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
                <Input placeholder="Name" onChange={setName}/>
                <div className='athlete-input-date'> Date of Birth: <DatePicker onChange={setDate} /> </div>
                <Input placeholder="Location" onChange={setLocation}/>
                <Input placeholder="Team" onChange={setTeam}/>
                <Select 
                 style={{ width: '350px' }} 
                 showSearch placeholder="Gender" 
                 onChange={setGender}>
                    <Option value="Male">Male</Option>
                    <Option value="Female">Female</Option>
                </Select>
                <Select
                 mode="multiple"
                 allowClear
                 style={{ width: '100%' }}
                 placeholder="Select Sports (Multiple)"
                 defaultValue={athleteContext.state.sports}
                 onChange={setSports}
                >
                    {sportsList}
                </Select>
                <TextArea showCount maxLength={500} style={{ height: 120 }} placeholder="About..." onChange={setAbout} />
                <TextArea showCount maxLength={500} style={{ height: 80 }} placeholder="Interests..." onChange={setInterests} />
                <div className='button-area'>
                    <Button type="primary" size={'large'} style={{ width: 150, margin: 5 }} onClick={addAthlete}>{athleteContext.state.profileId != '' ? 'Update Athlete':'Add Athlete'}</Button>
                    <Button type="primary" size={'large'} style={{ width: 150, margin: 5 }} onClick={cancelAdd}>Cancel</Button>
                </div>
            </Space>
            }
        </div>
    )
}