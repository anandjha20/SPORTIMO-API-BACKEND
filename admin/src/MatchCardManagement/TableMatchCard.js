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
import Swal from 'sweetalert2' 
function TableMatchCard() {

    
    const token = localStorage.getItem("token");
    const header = ({ 'token': `${token}` });
    const options = ({ headers: header });

    const [data, setData] = useState([])
    const MatchcardList = async () => {
       const setdaata = {}
        await axios.post(`/web_api/match_card_list`, setdaata, options)
            .then(res => {
                 const userData = res.data.body;
                 setData(userData)
            })
    }
    useEffect(() => {
        MatchcardList()
    }, []);

    const columns =
        [
            // { title: 'Card Icon', render : rowData => <><img src={rowData.image} alt="card icon" width="60px" /></> },
            { title: 'Match/league', field: 'match_name' },
            { title: 'Card Name', render : rowData => <>{rowData.card_id.name}</> },
            { title: 'Card Type ', render : rowData => <>{rowData.card_id.card_type}</> },
            { title: 'Appearance Time', field: 'apperance_times' },
            { title: 'Time Duration', field: 'time_duration' },
            // { title: 'Question (Arabic)', field: 'qus_ara' },
        ]

        const navigate = useNavigate();

        const viewFun = (_id, rowData) => {
            navigate(`/matchcard/update/${_id}`, {state:{rowData}});
            return false;
        }    

        

  /////////////////delete api call /////////////////
  const deleteCategory = (_id) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {         
            axios.delete(`/web_api/match_card_delete/${_id}`)
            .then(res => {
                if (res.status) {
                    let data = res.data;
                    if (data.status) { 
                        Swal.fire(
                            'Deleted!',
                             data.msg,
                            'success'
                          )
                         return MatchcardList();
                    } else {
                        toast.error(data.msg);
                    }
                }
                else {
                    toast.error(data.msg);
                }
            })
        }
      })
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
                                <h2 className="main-content-title tx-24 mg-b-5">Match Card</h2>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/home">Home</Link>
                                    </li>

                                    <li className="breadcrumb-item active" aria-current="page">&nbsp;&nbsp;Match Card</li>
                                </ol>
                            </div>
                            <div className="d-flex">
                                <div className="justify-content-center">
                                    <Link  to="/matchcard/add">
                                    <Button type='button' variant="contained" className="mr-3 btn-pd btnBg"><i className="fas fa-plus"></i>&nbsp;&nbsp; Add  Match Card</Button>
                                    </Link>
                                </div>
                            </div>

                        </div>

                                    <div className="row justify-content-center">
                            <div className="col-lg-12 table-responsive border border-bottom-0">
                                <MaterialTable
                                    title="Match Card List"
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
                                            tooltip: 'Update',
                                            onClick: (event, rowData) => { viewFun(rowData._id, rowData); }
                                        },
                                        {
                                            icon: 'delete',
                                            iconProps: { style: { color: "#ff0000" } },
                                            tooltip: 'Delete',
                                            onClick: (event, setData) => { deleteCategory(setData._id); }
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

export default TableMatchCard;