import React from "react";
import Header from "../Header";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import MaterialTable from 'material-table';
import axios from 'axios';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {useLocation} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Moment from 'moment';


export default function ViewUserPointsTransaction() {

    const { _id } = useParams();

    const location = useLocation();
    console.log(location.state.rowData);

    let token = localStorage.getItem("token");
    let header = ({ 'token': `${token}` });
    let options1 = ({ headers: header });

    const [data, setData] = useState([])

    const UserChatBlocked = async () => {
        const userID = { user : _id }
        await axios.post(`/web_api/user_point_details`, userID)
            .then(res => {
                const userData = res.data.body;
                setData(userData)
            })
    }
    useEffect(() => {
        UserChatBlocked()
    }, []);

    const columns =
    [
       
        { title: 'Date-Time', render : rowData => <>{Moment(rowData.date).format("DD-MM-YYYY HH:MM:SS")}</> },
        { title: 'Match/league', render : rowData => <>{rowData.match_id == null ? <><span className="addedBonus">Bonus points added</span></> : 
        <>{rowData.match_id.match_name}</> } </>},

        { title: 'Card Name', render : rowData => <>{rowData.card_id == null ? <>
        <span className="addedBonus">Bonus points added</span>
        </> : 
        <>{rowData.card_id.name}</> } </>},

        { title: 'Card Type', render : rowData => <>{rowData.card_id == null ? <><span className="addedBonus">Bonus points added</span></> : 
        <>{rowData.card_id.card_type}</> } </>},

        { title: 'Points', render : rowData => <>{rowData.points}</> },
        { title: 'Description', render : rowData => <>{rowData.description}</> },
        
       
    ]

    return(
        <>
         <Header />
            <div className="main-content side-content pt-0">
                <div className="container-fluid">
                    <div className="inner-body">

                        <div className="page-header">
                            <div>
                                <h2 className="main-content-title tx-24 mg-b-5 text-capitalize">{location.state.rowData.name} Points Details</h2>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/home">Home</Link>
                                    </li>

                                    <Link to="/leaderboard" className="breadcrumb-item active" aria-current="page">&nbsp;&nbsp;Leaderboard</Link>
                                    <li className="breadcrumb-item active" aria-current="page">&nbsp;&nbsp;User Points Details</li>
                                </ol>
                                 </div>
                                 <div className="d-flex">
                                <div className="justify-content-center">
                                <Link to="/leaderboard">
                                    <Button type='button' variant="contained" className="mr-3 btn-pd btnBg">
                                        <i className="fal fa-angle-double-left"></i>&nbsp; Back</Button>
                                </Link>
                                </div>
                            </div>
                            </div>

                            <div className="card custom-card">
                                <div className="card-body">
                           <div className="row">
                            
                            {/* <div className="flexItem">
                                <div className="imgItem">
                                {location.state.rowData.image !== '' ? <><img src={location.state.rowData.image}  /></> : 
                                <><img src="/assets/images/no-image.png"  /></> } 
                                </div>
                                <div className="itemInfo">
                                    <h5><span>User Name</span> : {location.state.rowData.name}</h5>
                                    <h5><span>Total Points </span> : {location.state.rowData.points}</h5>
                                </div>
                            </div> */}

                            <div className="col-lg-1" style={ {maxWidth: "10.33333%"}} >
                            <div className="imgItem">
                                {location.state.rowData.image !== '' ? <><img src={location.state.rowData.image}  /></> : 
                                <><img src="/assets/images/no-image.png"  /></> } 
                                </div>
                            </div>

                            <div className="col-lg-4">
                            <div className="mb-4">
                                <label className="title-col">User Name</label>
                                <input type="text" className="form-control text-capitalize" readOnly placeholder="Enter Points" 
                                  value={location.state.rowData.name} />
                             </div>
                             </div>
                            <div className="col-lg-4">
                                <label className="title-col">Total Points</label>
                                <input type="text" className="form-control" readOnly placeholder="Enter Points" 
                                  value={location.state.rowData.points} />
                             </div>


                            
                            </div>
                           </div>
                            </div>
                        </div>

                        <div className="row justify-content-center">
                            <div className="col-lg-12 table-responsive border border-bottom-0">
                                <MaterialTable
                                    title="Points List"
                                    columns={columns}
                                    data={data}
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
                    </div>
                </div>
        </>
    )

}