import React, {useState, useEffect, useContext} from "react";
import './styles.scss'
import { Button, Table, Tag, Space } from 'antd';
import {Context} from "../../contexts/athleteContext";
import {AthleteManager} from "../../api/athleteManager";

export default function AthleteList() {
  
    const athleteContext = useContext(Context)
    let athleteManager = new AthleteManager()
    const [athleteList, setAthleteList] = useState([])

    const addAthlete = () => {
        athleteContext.dispatchContext({type:'athletePage', value:{page:'add', edit:false}})
    }

    const getList = async() =>{
        return await athleteManager.listAthletes()
    }

    const viewProfile = (id) => {
      athleteContext.dispatchContext({type:'viewProfile', value:{page:'profile', profileId:id, edit:false}})
    }

    const deleteItem = async(id) => {
        await athleteManager.deleteAthlete(id).then(()=>{
            getList().then(result=>{
                setAthleteList(result)
            })
        })
    }

    useEffect(() => {
        getList().then(result=>{
            console.log(result)
            setAthleteList(result)
        })
        
    }, [])

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: '_id',
          render: (text, record) => <a onClick={() => viewProfile(record._id)}>{text}</a>,
        },
        {
          title: 'Location',
          dataIndex: 'location',
          key: 'location',
        },
        {
          title: 'Team',
          dataIndex: 'team',
          key: 'team',
        },
        {
          title: 'Sports',
          key: 'sports',
          dataIndex: 'sports',
          render: sports => (
            <>
              {sports.map(sport => {
                let color = 'geekblue' 
                return (
                  <Tag color={color} key={sport}>
                    {sport.toUpperCase()}
                  </Tag>
                );
              })}
            </>
          ),
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <Space size="middle">
              <a onClick={() => deleteItem(record._id)}> Delete </a>
            </Space>
          ),
        },
      ];

    return (
        <div className="athlete-list-body">
            <Table columns={columns} dataSource={athleteList} />
            <div className="button-area">
                <Button type="primary" size={'large'} onClick={()=>addAthlete()}>Add Athlete</Button>
            </div>
        </div>
    )
}