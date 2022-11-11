import React from "react";
import MaterialTable from 'material-table';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import Moment from 'moment';


function TableGroups() {


    const navigate = useNavigate();
    const viewFun = (id)=>{
        navigate(`/groups/chat/${id}`);
        return false;   
    }  
    const MemebersFun = (id)=>{
        navigate(`/groups/members/${id}`);
        return false;   
    }  

      let token = localStorage.getItem("token");
      let header = ({ 'token': `${token}` });
      let options1 = ({ headers: header });


    const [data, setData] = useState([]);
    const GroupListData = async () =>
    {
        await axios.get(`/web_api/FirebaseGroupListData`, options1)
        .then(res => {
          const data = res.data.body;
          setData(data);
        })
    }

    useEffect(() => {
        GroupListData()
      }, []);


    const columns =
        [  
           
            { title: 'Group Name', field: 'name'},
            { title: 'Members', field: 'size'},
            { title: 'Date', field: 'gamedate'},  
        ]

    return (

        <>

            <div className="row">
                <div className="col-lg-12">
                    <MaterialTable
                        title="Groups Management"
                        columns={columns}
                        data={data}
                        actions={[
                            {
                                icon: 'groups',
                                iconProps: { style: { color: "#6259ca" } },
                                tooltip: 'Members List',
                                onClick: (event, rowData) => { MemebersFun(rowData.id);} 
                            },
                            {
                                icon: 'sms',
                                iconProps: { style: { color: "#6259ca" } },
                                tooltip: 'Chat',
                                onClick: (event, rowData) => { viewFun(rowData.id);}
                            },
                            
                        ]}
                        options={{
                            search: true,
                            actionsColumnIndex: -1,
                            showFirstLastPageButtons: true,
                            pageSize: 5,
                            pageSizeOptions: [5, 20, 50]
                        }}

                    />
                </div>
            </div>
        </>

    )
}

export default TableGroups