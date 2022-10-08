import React from "react";
import MaterialTable from 'material-table';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


function TableGameEngagemt() {


    const navigate = useNavigate();

    const viewFun = (match)=>{
        navigate(`/geq/detail`);
        return false;   
    }  
    
    const columns =
        [

            
            { title: 'Match/league', field: 'match'},
            { title: 'Date', field: 'date'},
            { title: 'Game Engagement Questions', field: 'questions' },
            

        ]

    const data =
        [
            { date : "23/05/2022", questions: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',  match: 'Bali Utd vs Rans Nusantara'},
            { date : "23/05/2022", questions: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',  match: 'Persija vs Persita', },
            
        ]


    return (

        <>

            <div className="row">
                <div className="col-lg-12">
                <div className="card custom-card">
              <div className="card-body">
                    <div className="row align-items-center">
                        <div className="col-lg-4">
                        <input type="text" className="form-control" placeholder="Search Match/league" style={{height: "45px"}}></input>
                        {/* <TextField id="outlined-basic" fullWidth label="Search Match/league" variant="outlined" style={{ padding : " 11.5px 14px !important"}} /> */}
                        </div>
                        <div className="col-lg-4">
                        <Button type='button' variant="contained" className="mr-3 btn-pd btnBg">Search</Button>
                        </div>
                    </div>
                    </div>
                    </div>
                    <MaterialTable
                        title="Game Engagement Questions"
                        columns={columns}
                        data={data}
                        actions={[
                            {
                                icon: 'visibility',
                                iconProps: { style: { color: "#6259ca" } },
                                tooltip: 'View Detail',
                                onClick: (event, setData) => { viewFun(setData.match);}
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

export default TableGameEngagemt