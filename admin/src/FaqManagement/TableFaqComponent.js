import React from "react";
import MaterialTable from 'material-table';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useState, useEffect } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TableFaqComponent() {

    const [data, setData] = useState([])

    const navigate = useNavigate();

  


    const viewFun = (_id)=>{
        navigate(`/faq/update/${_id}`);
        return false;   
    
      } 

      let token = localStorage.getItem("token");
      let header = ({ 'token': `${token}` });
      let options1 = ({ headers: header });

    const FaqList = async () =>
    {
        await axios.get(`/web_api/faq_list`, options1)
        .then(res => {
          const userData = res.data.body;
          setData(userData);
          const faq_cat_id = userData.faq_cat_id;
          console.log(userData); 
          console.log(faq_cat_id); 
        })
    }

  useEffect(()=> {
     FaqList()
  },[])

  

    const columns =
        [

            { title: 'Category Name',  render: rowData => <div>{rowData.faq_cat_id.cat_name}</div> },
            // { title: 'Date', field: 'date' },
            { title: 'Questions', field: 'question' },
            { title: 'Answer', field: 'answer' },

        ]


///////////////// delete api call  /////////////////
const deleteFaq = (_id) => {  
    let sendData = { id : _id  }
    axios.delete(`/web_api/delete_faq/${_id}`,options1)
        .then(res => {
            if (res.status) {
                let data = res.data;

                if (data.status) { 
                    toast.success(data.msg);
                     return axios.get("/web_api/faq_list")
                        .then(res => {
                            const userData = res.data.body;
                            setData(userData);
                        })
                } else {
                    toast.error('something went wrong please try again');
                }
            }
            else {
                toast.error('something went wrong please try again..');
            }

        })
        .catch(error => {
            console.log(this.state);
        })
}



    return (

        <>

            <div className="row">
                <div className="col-lg-12">

                    <MaterialTable
                        title="Faq List"
                        columns={columns}
                        data={data}
                        actions={[
                            {
                                icon: 'edit',
                                iconProps: { style: { color: "#6259ca" } },
                                tooltip: 'Update Faq',
                                onClick: (event, setData) => { viewFun(setData._id); }
                            },
                            // {
                            //     icon: 'visibility',
                            //     iconProps: { style: { color: "#6259ca" } },
                            //     tooltip: 'View Detail',
                            //     onClick: (event, setData) => { viewFun(setData._id); }
                            // },

                            {
                                icon: 'delete',
                                iconProps: { style: { color: "#ff0000 !important" } },
                                tooltip: 'Delete',
                                onClick: (event, setData) => { deleteFaq(setData._id); }
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

export default TableFaqComponent