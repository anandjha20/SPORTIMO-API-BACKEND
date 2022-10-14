import React from "react";
import MaterialTable from 'material-table';
import { TextField } from "@material-ui/core";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


import {Link, useHistory } from 'react-router-dom';

import { useState, useEffect } from "react";
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function TableListComponent() {

const [tblData,setTblData] = useState([]) ;

const get_data = async()=>{

    {  try{ 
        let formData = {};    
        
        let token = localStorage.getItem("token");
        let header = ({ 'token': `${token}` });
        let options1 = ({ headers: header });

        // let options1 = { headers:{"Content-type": "application/json","token": localStorage.getItem('token')  }};
        let response = await axios.get('/poll_list',options1, formData);
       let t_data = response.data;
       if(t_data.status){
             setTblData(t_data.body);
       }
       
        return   response.data;
       } catch(err){ console.error(err); toast.error('some errror'); return false;  }
   } 
}

    useEffect(() => {
        get_data();
      },[]); 


console.log("tblData == ", tblData);


    const columns =
        [
            { title: 'Match/league', field: 'match'},
            { title: 'Poll Type', field: 'poll_type', },
            { title: 'Poll Fee', field: 'fee_type'  },
            { title: 'Amount', field: 'amount'  },
            { title: 'Appearance Time', field: 'apperance_time' },
            { title: 'Duration', field: 'time_duration'},
        ]
////////////////////////////////////////////////////////

//const history = useHistory();


// const viewFun = (_id)=>{
//     navigate(`/user-detail/${_id}`);
//     return false;   

//   } 

const navigate = useNavigate();

const editFun = (id)=>{
    navigate(`/poll/detail/${id}`)
  return false;   

} 



    return (

        <>

            <div className="row">
                <div className="col-lg-12">
               
                    <MaterialTable
                        title="Poll List"
                        columns={columns}
                        data={tblData}
                        actions={[
                            {       
                                icon: 'visibility',
                                iconProps: { style: { color: "#6259ca" } },
                                tooltip: 'View Detail',
                                onClick: (event, rowData) => { editFun(rowData._id);}
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
                <ToastContainer  position="top-right"  />     
            </div>
        </>

    )
}

export default TableListComponent