import React from "react";
import Header from "../Header";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import MaterialTable from 'material-table';
import { useState, useEffect } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import "react-responsive-modal/styles.css";
import TextField from '@mui/material/TextField';
import Select from 'react-select';

function Leaderboard() { 

    const [CatList, setDataCat] = useState([]);

    let token = localStorage.getItem("token");
    let header = ({ 'token': `${token}` });
    let options1 = ({ headers: header });

    const formsave = (e, page) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const Formvlaues = Object.fromEntries(data.entries());
        console.log(Formvlaues);
        axios.post(`/api/leaderboard`, Formvlaues, options1)
            .then(res => {
                const data = res.data.data;
                setData(data);
            })
    }


    const [data, setData] = useState([])
    
    const UserChatBlocked = async () => {
        await axios.post(`/api/leaderboard`)
            .then(res => {
                 const userData = res.data.data;
                 setData(userData)
            })
    }
    useEffect(() => {
        UserChatBlocked()
    }, []);



    const columns =
        [
            { title: 'User Name', field: 'name' },
            { title: 'User Points', field: 'points' },
        ]


// live upcoming api
  const LiveUpcomingMatchList = async () =>
        {
            const setGet = {}
            axios.post(`/web_api/live_upcoming_match_list`, setGet, options1)
            .then(res => {
            const CatList = res.data.body;
            setDataCat(CatList);
            console.log(CatList); 
            })
        }

        const category_type = (CatList.length >0) ? CatList.map((item)=>{
            return { value: item._id, label: item.match_name };
        }) :[];

    useEffect(() => {
        LiveUpcomingMatchList();
    }, [])


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
                                <span className="react-select-title">Select Reason Type</span>
                                <Select  name='match_id'
                                options={category_type}
                                className="basic-multi-select"
                                classNamePrefix="select" />

                            </div>
                           
                            <div className="col-lg-3 mb-3 d-flex p-0" style={{ maxWidth : "18%"}}>
                                <Button type='submit' variant="contained" className="mr-3 btn-filter btnBg">Search</Button>
                                <Button type='reset' onClick={UserChatBlocked} className="mr-3 btn-dark btn-filter">Reset</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
                     
                                    <div className="row justify-content-center">
                            <div className="col-lg-12 table-responsive border border-bottom-0">
                                {/* <h5 className="text-white ml-3">Leaderboard</h5> */}
                                {/* <table className="table w-100">
                                    <thead>
                                        <tr>
                                            <th scope="col" style={{ background: "#3d454c", borderRadius : "10px 0px 0px 0px"}}>User Name</th>
                                            <th scope="col" className="text-end" style={{ background: "#3d454c",  borderRadius: "0px 10px 0px 0px"}}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {statusTrue == false ? <>
                                               <tr>
                                                      <td className="text-center w-100">
                                                     <img src="/assets/images/nodatafound.png" alt='no image' width="250px" /> </td>
                                              </tr>
                                            </> : null }
                                        {statusTrue == true ? <>
                                        {data.map((item, index) => {
                                            if (item.name !== '') {
                                                return (
                                                    <tr key={index}>
                                                        <td>{item.name}</td>
                                                        <td className="text-end"><Button onClick={() => { UnblockedUser(item._id); }} type='submit' className="mr-3 mt-2 mb-2 btn-pd btnBg">Unblock</Button></td>
                                                    </tr>
                                                );
                                            }
                                        })}
                                        </>
                                        : null }
                                        
                                   
                                       
                                       
                                    </tbody>
                                </table> */}


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
            </div>
        </>

    );
}

export default Leaderboard;