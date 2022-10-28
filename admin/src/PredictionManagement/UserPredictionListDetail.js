import React from "react";
import Header from "../Header";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import MaterialTable from 'material-table';
import { useState, useEffect } from "react";
import axios from 'axios';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import "react-responsive-modal/styles.css";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import {useLocation} from 'react-router-dom';
import TextField from '@mui/material/TextField';

function UserPredictionListDetail() {

    const location = useLocation();
    console.log(location.state._id);

    const {id} = useParams();

    const token = localStorage.getItem("token");
    const header = ({ 'token': `${token}` });
    const options = ({ headers: header });
    const [Fromvalue, setFromvalue] = React.useState('');
    const [pageCount, setpageCount] = useState('');
    
    const matchName = [
        { value: 'Match_name', label: 'Match List' },
    ]
    const limit = 10;
        
    const [value, setValue] = useState("");
	const [matchname, setMatch] = useState([]);

	const SelectMatch = async () =>
    {
        axios.post(`/web_api/past_match_list`)
        .then(res => {
            const matchname = res.data.body;
            setMatch(matchname);
            console.log(matchname); 
        })
    }

	const UserListDetail = async () =>
    {
        axios.post(`/web_api/user_prediction/${id}`)
        .then(res => {
            const data1 = res.data.body;
            setData(data1);
            setValue('')
        })
    }

    useEffect(() => {
        SelectMatch();
        UserListDetail();
    }, []);
    
    const SelectMatchOption = (matchname.length > 0) ? matchname.map((item) => {
        return { value: item._id, label: item.match_name };
    }) : [];
    
    const [data, setData] = useState([]);
    const formsave =async (e, page)=>{
        e.preventDefault();
          const data = new FormData(e.target);
         const Formvlaues = Object.fromEntries(data.entries());
        //  Formvlaues.guest_user = guestUser
         const formData = Formvlaues;
         console.log(Formvlaues)
         setFromvalue(formData);
        //  let demodata={"match_id":"634a6b9df68bced78a4844e4"}
           console.log('Formvlaues === ', Formvlaues);
            await axios.post(`/web_api/user_prediction/${id}`,formData)
           .then(res => {
               const data1 = res.data.body;
               setData(data1);
               
           })
          
     }
     console.log(data)
     const columns =
        [
            { title: 'Card Name', field: 'card_id.name' },
            { title: 'Card Type ', field: 'card_id.card_type' },
            // { title: 'User Name ', render : rowData => <><Button variant="text" style={{    color: "#72a9e0",
            //     textTransform: "capitalize"}}>{rowData.user_id.name}</Button> </> },
            { title: 'Question', field: 'card_id.qus' },
            { title: 'User Answer', field: 'user_option' },
            { title: 'Status', field: 'result' },
            { title: 'Date/Time', field: 'dateTime' },
            // { title: 'Question (Arabic)', field: 'qus_ara' },
        ]

   

    return (
        <>
            <Header />
            <ToastContainer />
           
            <div className="main-content side-content pt-0">
                <div className="container-fluid">
                    <div className="inner-body">

                        <div className="page-header">
                            <div>
                                <h2 className="main-content-title tx-24 mg-b-5">{location.state._id.user_id.name} Prediction List</h2>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/home">Home</Link>
                                    </li>

                                    <li className="breadcrumb-item active" aria-current="page">&nbsp;&nbsp;User Prediction List</li>
                                </ol>
                            </div>
                            {/* <div className="d-flex">
                                <div className="justify-content-center">
                                    <Link to="/cards/create">
                                        <Button type='button' variant="contained" className="mr-3 btn-pd btnBg"><i className="fas fa-plus"></i>&nbsp;&nbsp; Add  Prediction Card</Button>
                                    </Link>
                                </div>
                            </div> */}

                        </div>
                        <div className="card custom-card">
                <div className="card-body">
                    <form onSubmit={(e)=>formsave(e)}>
                    <div className="row align-items-center">
                        <div className="col-lg-3 reletive">
                            <span className="react-select-title">Match Name</span>
                            <Select  name='match_id' onChange={setValue} value={value}
                                options={SelectMatchOption}
                                className="basic-multi-select"
                                classNamePrefix="select" />

                        </div>
                        <div className="col-lg-3 ">
                            <TextField id="sdate" name='s_date' className="filter-input" label="Start Date" autoComplete="off" fullWidth type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />

                        </div>

                        <div className="col-lg-3">
                            <TextField id="edate" name='e_date' className="filter-input" label="End Date" autoComplete="off" fullWidth type="date"
                                InputLabelProps={{ shrink: true, }} />

                        </div>
                        <div className="col-lg-3 d-flex">
                            <Button type='submit' variant="contained" className="mr-3 btn-filter btnBg">Search</Button>
                            <Button type='reset' onClick={UserListDetail} className="mr-3 btn-dark btn-filter">Reset</Button>
                        </div>
                    </div>
                    </form>
                </div>
            </div>


                        <div className="row justify-content-center">
                            <div className="col-lg-12 table-responsive border border-bottom-0">
                                <MaterialTable
                                    title="User Prediction"
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
            </div>
        </>

    );
}

export default UserPredictionListDetail;