import React from "react";
import MaterialTable from 'material-table';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useState, useEffect } from "react";


function TableComplaintComponent() {

    const [data, setData] = useState([])

    const [userCategory, setuserCategory] = useState([])

    const navigate = useNavigate();


    const viewFun = (_id)=>
    {
        navigate(`/complaint-reply/${_id}`); 
        return false;   
      } 

    const FaqList = async () =>
    {
        let formData = {};    
        let token = localStorage.getItem("token");
        let header = ({ 'token': `${token}` });
        let options1 = ({ headers: header });
        await axios.get(`/api/user_complaint_all`, options1)
        .then(res => {
          const userData = res.data.body;
          setData(userData);
          const category = userData.category;
          const image = res.data.body.image;
          console.log(userData); 
        //   console.log(userCategory); 
        })
    }

  useEffect(()=> {
     FaqList()
  },[])

  

    const columns =
        [

            { title: 'Image', render: rowData => <img src={rowData.image} alt='img'  style={{width:'50px', borderRadius: '5px'}} />},
            { title: 'User Name', field: 'user_id' },
            // { title: 'Date', field: 'date' },
            { title: 'Complaint Category', render: rowData => <div>{rowData.category.map(category => <div>{category.cat_name}</div>)}</div> },
            { title: 'Complaint', field: 'question' },
            { title: 'Date Time', field: 'date_time' , render: rowData => <h6>25-08-22</h6> },
            // { title: 'Status', field: 'status' },

        ]
        
       

    return (

        <>

            <div className="row">
                <div className="col-lg-12">

                    <MaterialTable
                        title="Complaint List"
                        columns={columns}
                        data={data}
                        actions={[
                            {
                                icon: 'sms',
                                iconProps: { style: { color: "#6259ca" } },
                                tooltip: 'Reply',
                                 onClick: (event, setData) => { viewFun(setData._id); }
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

export default TableComplaintComponent