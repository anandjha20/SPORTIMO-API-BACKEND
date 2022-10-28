import React from "react";
import Header from "../Header";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import MaterialTable from 'material-table';
import { useState, useEffect } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import "react-responsive-modal/styles.css";
import Select from 'react-select';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ReactPaginate from "react-paginate";
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useNavigate } from 'react-router-dom';
import Moment from 'moment';

function Leaderboard() {

    const [CatList, setDataCat] = useState([]);

    let token = localStorage.getItem("token");
    let header = ({ 'token': `${token}` });
    let options1 = ({ headers: header });


    const [weekly, setWeekliy] = useState(); 
    const [currentdate,setCurrent] = useState(); 
    const [monthlydate,setMonthly] = useState(); 

    const handelDate = () =>{

        ///////current date//////////
        const curr = new Date();
        const currentdate = Moment(curr).format("YYYY-MM-DD");
        // console.log("CurrentDate" + currentdate);
        setCurrent(currentdate); 

        /////week date//////////
        const firstday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 1 ));
        const lastday = new Date(curr.setDate(curr.getDate() - curr.getDay()+6));
        const startweek = Moment(firstday).format("YYYY-MM-DD");
        const endweek =   Moment(lastday).format("YYYY-MM-DD");
        const weekDate = startweek + endweek;
        // console.log("WeeklyDate" + weekDate);
        setWeekliy(weekDate); 

        ///////////////// month//////////
     
        const month = new Date(curr.getFullYear(), curr.getMonth(), 1);
        const lastmonth = new Date(curr.getFullYear(), curr.getMonth() + 1, 0);

        const monthstart = Moment(month).format("YYYY-MM-DD");
         const endmonth =   Moment(lastmonth).format("YYYY-MM-DD");

        const monthly = monthstart + endmonth;
        // console.log("MonthDate" + "---" + monthly);
        setMonthly(monthly); 
      
    }


    const filterMonthly = 
    [
        {label : "Overall (all time)", value : "all"},
        {label : "Daily", value : "daily"},
        {label : "Weekly ", value : "weekly"},
        {label : "Monthly ", value : "monthly"},
    ]

    useEffect(() => {
        handelDate();
    }, [])


    const [formdate, setWeeklyDate] = useState();
    const [enddate, setWeeklyEndDate] = useState();

    const handleonchangeDate = (e) =>
    {
        const getdateValue = e.value;
        console.log(getdateValue);

       if(getdateValue == "weekly")
       {
        setWeeklyDate(weekly.substring(0, 10));
        setWeeklyEndDate(weekly.slice(-10));
       }
       if(getdateValue == "monthly")
       {
        setWeeklyDate(monthlydate.substring(0, 10));
        setWeeklyEndDate(monthlydate.slice(-10));
       }
       if(getdateValue == "daily")
       {
        setWeeklyDate(currentdate);
        setWeeklyEndDate(currentdate);
       }
    }

    
    const formsave = (e, page) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const Formvlaues = Object.fromEntries(data.entries());

        Formvlaues.form_date = formdate;
        Formvlaues.to_date = enddate;
       
        console.log(Formvlaues);
        axios.post(`/api/leaderboard`, Formvlaues, options1)
            .then(res => {
                const data = res.data.data;
                setData(data);
            })
    }




    const [data, setData] = useState([])

    const LeaderboardList = async () => {
        await axios.post(`/api/leaderboard`)
            .then(res => {
                const userData = res.data.data;
                setData(userData)
            })
    }
    useEffect(() => {
        LeaderboardList()
    }, []);


    const [itemModal, setModaldata] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const viewfun = async (rowData) => {
        const modaData = rowData;
        setModaldata(modaData);
        console.log(modaData);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const navigate = useNavigate();
    const editFun = (_id, rowData)=>{
        navigate(`/leaderboard/user-points/${_id}` , { state: { rowData } })
      return false;   
    }   

        const columns =
        [
            { title: 'User Image', render : rowData => <><div className="imageSet">
                {rowData.image !== '' ? <><img src={rowData.image}  /></> : <><img src="/assets/images/no-image.png"  /></> }
                </div> </> },
            { title: 'User Name', field: 'name' },
            { title: 'User Points', render: rowData => <><Button onClick={(e) => { editFun(rowData._id, rowData); }} variant="contained"  className="btnpoints">{rowData.points}</Button></> },
            {
                title: 'Action', render: rowData => <>
                    <Button type='submit' variant="contained" onClick={(e) => { viewfun(rowData, rowData._id); }} className="mr-3 btn-filter pd511 btnBg">Award Game Points</Button></>
            },
        ]


    // live upcoming api
    const LiveUpcomingMatchList = async () => {
        const setGet = {}
        axios.post(`/web_api/past_match_list`, setGet, options1)
            .then(res => {
                const CatList = res.data.body;
                setDataCat(CatList);
                console.log(CatList);
            })
    }

    const category_type = (CatList.length > 0) ? CatList.map((item) => {
        return { value: item._id, label: item.match_name };
    }) : [];

    useEffect(() => {
        LiveUpcomingMatchList();
    }, [])

    ///////bonus points add api call/////////
    const HnadelBonusPoints = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const Formvlaues = Object.fromEntries(data.entries());
        console.log(Formvlaues);
        axios.post(`/web_api/bonus_points`, Formvlaues, options1)
            .then(res => {
                if (res.status) {
                     let data = res.data;
                        toast.success("Bonus points added successfully");
                        setOpen(false);
                        return LeaderboardList();
                       
                        
                    }
                  else {
                      toast.error('Please fill all fields before Submit');
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
                                <h2 className="main-content-title tx-24 mg-b-5">Leaderboard</h2>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/home">Home</Link>
                                    </li>

                                    <li className="breadcrumb-item active" aria-current="page">&nbsp;&nbsp;Leaderboard</li>
                                </ol>
                            </div>


                        </div>

                        <div className="card custom-card">
                            <div className="card-body">
                                <form onSubmit={(e) => formsave(e)}>
                                    <div className="row align-items-center">
                                        <div className="col-lg-3 reletive mb-3">
                                            <span className="react-select-title">Match/league</span>
                                            <Select name='match_id' 
                                                options={category_type}
                                                className="basic-multi-select"
                                                classNamePrefix="select" />

                                        
                                        </div>
                                        <div className="col-lg-3 reletive mb-3">
                                            <span className="react-select-title">Date-Range</span>
                                            <Select onChange={(e) => handleonchangeDate(e)}
                                                options={filterMonthly}
                                                className="basic-multi-select"
                                                classNamePrefix="select" />
                                        
                                        </div>

                                        <div className="col-lg-3 mb-3 d-flex p-0" style={{ maxWidth: "18%" }}>
                                            <Button type='submit' variant="contained" className="mr-3 btn-filter btnBg">Search</Button>
                                            <Button type='reset'  className="mr-3 btn-dark btn-filter">Reset</Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="row justify-content-center">
                            <div className="col-lg-12 table-responsive border border-bottom-0">
                                <MaterialTable
                                    title="Leaderboard"
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
                <Dialog className="notifi-style" open={open} onClose={handleClose}>
                    <DialogTitle><i className="fad fa-gamepad-alt"></i> &nbsp;Awarded Game Points</DialogTitle>
                    <form onSubmit={(e) => HnadelBonusPoints(e)}>
                        <DialogContent>
                            <div className="mb-4">
                                <label className="title-col">Enter Points </label>
                                <input type="number" className="form-control" required placeholder="Enter Points" name="points" defaultValue="credit" />
                            </div>
                            <div className="p-0">
                                <label className="title-col">Enter Description </label>
                                <TextField id="filled-multiline-static" name='description' required className="paddingText"
                                    multiline rows={4} fullWidth defaultValue="" variant="filled" autoComplete="off" />
                            </div>

                            <input type="hidden" name="type" defaultValue="credit" />
                            <input type="hidden" name="user_id" defaultValue={itemModal._id} />
                          

                        </DialogContent>
                        <DialogActions className="mb-2">
                            <Button className="mr-3" onClick={handleClose}>Cancel</Button>
                            <Button type="submit" variant="contained" className="mr-3 btn-pd btnBg">Send</Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>



        </>

    );
}

export default Leaderboard;