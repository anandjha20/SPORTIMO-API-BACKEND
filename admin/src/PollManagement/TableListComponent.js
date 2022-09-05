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

const [data,setData] = useState([]) ;


let token = localStorage.getItem("token");
let header = ({ 'token': `${token}` });
let options1 = ({ headers: header });

const polllist = async () =>
{
    await axios.get(`/web_api/poll_list`,  options1)
    .then(res => {
      const data = res.data.body;
      setData(data);
      console.log(data); 
    })
}

useEffect(()=> {
    polllist()
},[])

// const get_data = async()=>{

//     {  try{ 
//         let formData = {};    
//         let token = localStorage.getItem("token");
//         let header = ({ 'token': `${token}` });
//         let options1 = ({ headers: header });
//          let response = await axios.get('/poll_list', options1, formData);
//         let t_data = response.data.body;
//         setTblData(t_data);
//         const result_type = t_data.result_type
//        } catch(err){ console.error(err); toast.error('some errror'); return false;  }
       
//    } 
// }
    /////////////////delete poll /////////////////
    const delPoll = (_id) => {
        axios.delete(`/web_api/delete_poll/${_id}`)
            .then(res => {
                if (res.status) {
                    let data = res.data;
                    if (data.status) { 
                        toast.success(data.msg);
                        return (
                             axios.get(`/web_api/poll_list`,  options1)
                            .then(res => {
                              const data = res.data.body;
                              setData(data);
                              console.log(data); 
                            })
                        );
                    } else {
                        toast.error('something went wrong please try again');
                    }
                }
                else {
                    toast.error('something went wrong please try again..');
                }

            })
           
    }



const [datadetail, setDataDetail] = useState('')

const disclosedPoll = (_id) =>
{ 

            const setDataForm = {disclosed_status : '1'}
             axios.put(`/web_api/poll_result_disclosed/${_id}`, setDataForm, options1)
             .then(res => {
                if (res.status) {
                    let data = res.data;
                    if (data.status) { 
                        toast.success(data.msg);
                        return (
                             axios.get(`/web_api/poll_list`,  options1)
                            .then(res => {
                              const data = res.data.body;
                              setData(data);
                              console.log(data); 
                            })
                        );
                    } else {
                        toast.error('something went wrong please try again');
                    }
                }
                else {
                    toast.error('something went wrong please try again..');
                }

            })
             
}



    const columns =
        [
            { title: 'Match/league', field: 'match'},
            { title: 'Poll Type', field: 'poll_type', },
            { title: 'Poll Fee', field: 'fee_type'  },
            { title: 'Amount', field: 'amount'  },
            { title: 'Appearance Time', field: 'apperance_time' },
            { title: 'Duration', field: 'time_duration'},
            { title: 'Poll Result', render: rowData => {
                if (rowData.result_type == "Undisclosed" && rowData.disclosed_status == "1") {
                    return (
                        <>
                          <span>Poll Result Disclosed</span>
                        </>
                    );
                  }
                  if (rowData.result_type == "Undisclosed" && rowData.disclosed_status == "0") {
                    return (
                        <>
                         <Button onClick={() => { disclosedPoll(rowData._id);}}  type='submit' className="mr-3 btn-pd btnBg">Disclose</Button>
                        </>
                    );
                  }
            }
              },
         ]
////////////////////////////////////////////////////////

//const history = useHistory();
// const viewFun = (_id)=>{
//     navigate(`/user-detail/${_id}`);
//     return false;   

//   } 

const navigate = useNavigate();
const detailFun = (id)=>{
    navigate(`/poll/detail/${id}`)
  return false;   

} 

const editFun = (id)=>{
    navigate(`/poll/update/${id}`)
  return false;   

} 


    return (

        <>

            <div className="row">
                <div className="col-lg-12">
               
                    <MaterialTable
                        title="Poll List"
                        columns={columns}
                        data={data}
                        actions={[
                            {       
                                icon: 'visibility',
                                iconProps: { style: { color: "#6259ca" } },
                                tooltip: 'View Detail',
                                onClick: (event, rowData) => { detailFun(rowData._id);}
                            },
                            {       
                                icon: 'edit',
                                iconProps: { style: { color: "#6259ca" } },
                                tooltip: 'Update Poll',
                                onClick: (event, rowData) => { editFun(rowData._id);}
                            },
                            {       
                                icon: 'delete',
                                iconProps: { style: { color: "#6259ca" } },
                                tooltip: 'Delete Poll',
                                onClick: (event, rowData) => { delPoll(rowData._id);}
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