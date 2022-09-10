import React from "react";
import MaterialTable from 'material-table';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


function TableGroups() {


    const navigate = useNavigate();

    const viewFun = ()=>{
        navigate(`/groups/chat`);
        return false;   
    }  
    
    const columns =
        [

            
            { title: 'Match/league', field: 'match'},
            { title: 'Date', field: 'date'},
            

        ]

    const data =
        [
            { date : "23/05/2022",  match: 'Bali Utd vs Rans Nusantara',  },
            { date : "23/05/2022",  match: 'Persija vs Persita', },
            
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
                                icon: 'sms',
                                iconProps: { style: { color: "#6259ca" } },
                                tooltip: 'Chat',
                                onClick: (event, rowData) => { viewFun(rowData._id ='idMq9Tp9Egn3ic1Fqd7Y');}
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