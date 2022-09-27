import React from "react";
import Header from "../Header";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import MaterialTable from 'material-table';
import { useState, useEffect } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import "react-responsive-modal/styles.css";
import { useNavigate } from 'react-router-dom';

function TablePredictionCardList() {

    const token = localStorage.getItem("token");
    const header = ({ 'token': `${token}` });
    const options = ({ headers: header });

    const [data, setData] = useState([])
    const UserChatBlocked = async () => {
       const setdaata = {}
        await axios.post(`/web_api/prediction_card_list`, setdaata, options)
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
            { title: 'Card Icon', render : rowData => <><img src={rowData.image} alt="card icon" width="60px" /></> },
            { title: 'Card Name (English)', field: 'name' },
            { title: 'Card Name (Arabic)', field: 'name_ara' },
            { title: 'Card Type ', field: 'card_type' },
            { title: 'Time-Range ', field: 'time_range' },
            { title: 'Question (English)', field: 'qus' },
            // { title: 'Question (Arabic)', field: 'qus_ara' },
        ]

        const navigate = useNavigate();
        const viewFun = (_id, rowData) => {
            navigate(`/cards/update/${_id}` , {state:{rowData}});
            return false;
        }    

        
    return (
        <>
            <Header />
            <ToastContainer />
            <div className="main-content side-content pt-0">
                <div className="container-fluid">
                    <div className="inner-body">

                        <div className="page-header">
                            <div>
                                <h2 className="main-content-title tx-24 mg-b-5">Prediction Card</h2>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/home">Home</Link>
                                    </li>

                                    <li className="breadcrumb-item active" aria-current="page">&nbsp;&nbsp;Prediction Card</li>
                                </ol>
                            </div>
                            <div className="d-flex">
                                <div className="justify-content-center">
                                    <Link  to="/cards/create">
                                    <Button type='button' variant="contained" className="mr-3 btn-pd btnBg"><i className="fas fa-plus"></i>&nbsp;&nbsp; Add  Prediction Card</Button>
                                    </Link>
                                </div>
                            </div>

                        </div>

                                    <div className="row justify-content-center">
                            <div className="col-lg-12 table-responsive border border-bottom-0">
                                <MaterialTable
                                    title="Prediction Card"
                                    columns={columns}
                                    data={data}
                                    options={{
                                        search: true,
                                        actionsColumnIndex: -1,
                                        showFirstLastPageButtons: true,
                                        pageSize: 5,
                                        pageSizeOptions: [5, 20, 50]
                                    }}
                                    actions={[
                                        {
                                            icon: 'edit',
                                            iconProps: { style: { color: "#6259ca" } },
                                            tooltip: 'View Detail',
                                            onClick: (event, rowData) => { viewFun(rowData._id, rowData); }
                                        },
                                    ]}
                                />

                           
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default TablePredictionCardList;