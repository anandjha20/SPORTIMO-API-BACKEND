import React from "react";
import MaterialTable from 'material-table';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from 'axios';

function TableContent() {

   const [data, setData] = useState([])
   
   const regex = /(<([^>]+)>)/ig;
  const ContentList = async () =>
    {
         await axios.get(`/web_api/get_content`)
        .then(res => {
          const data = res.data.body;
          setData(data);
          const content_data = data.content_data;
        //   console.log(content_data);   
        })
    }

    useEffect(() => {
        ContentList()
    }, []);


    const navigate = useNavigate();

    const viewFun = (type)=>{
        navigate(`/content/view/${type}`);
        return false;   
      } 
    

    const columns =
        [
  
            { title: 'Content Type', field: 'type'},
            { title: 'Complaint Category', render: rowData => <div>{rowData.content_data.replace(regex, '')}</div> },
        
        ]


    return (

        <>
            <div className="row">
                <div className="col-lg-12">
                <div className="card custom-card">
              <div className="card-body">
                    <div className="row align-items-center">
                        <div className="col-lg-4">
                        <input type="text" className="form-control" placeholder="Search Content Type.." style={{    height: "45px"}}></input>
                        {/* <TextField id="outlined-basic" fullWidth label="Search Match/league" variant="outlined" style={{ padding : " 11.5px 14px !important"}} /> */}
                        </div>
                        <div className="col-lg-4">
                        <Button type='button' variant="contained" className="mr-3 btn-pd btnBg">Search</Button>
                        </div>
                    </div>
                    </div>
                    </div>
                    <MaterialTable
                        title="Content Management"
                        columns={columns}
                        data={data}
                        actions={[
                            {
                                icon: 'edit',
                                iconProps: { style: { color: "#6259ca" } },
                                tooltip: 'View Detail',
                                onClick: (event, setData) => { viewFun(setData.type);}
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

export default TableContent