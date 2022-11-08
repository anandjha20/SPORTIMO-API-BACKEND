import React from 'react'
import Header from "../Header";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from "react";
import axios from 'axios';
import Select from 'react-select';


function UserAnalyticsMangement() {



  const [country_lists, setCountry_lists] = React.useState([]);
  const navigate = useNavigate();
  const get_data = async(url,setval) =>{
    try {
        let sendData = {}; 
        let token = localStorage.getItem("token");
        let header = ({ 'token': `${token}` });
        let options1 = ({ headers: header });
       //let options1 = { headers: { "Content-type": "application/json","token": localStorage.getItem('token') } };
        let response = await axios.get( url, options1, sendData );
        if (response.status) {
          let data = response.data;
          if (data.status) {
              setval(data.body);
           // toast.success(data.msg);
          } else {
            toast.error(data.mgs);
            navigate("/");
          }
        }
        else {
          toast.error('something went wrong please try again..');
        }

      } catch (err) { console.error(err); toast.error('some errror'); return false; }
  
  }
  
  useEffect(() => {
      get_data('/web_api/country_list',setCountry_lists);
  }, []);


  const countryOptions = (country_lists.length >0) ? country_lists.map((item)=>{
    return  { value: item.name, label: item.name };
}) :[];


// const languageOptions = [
//   {value  :"English", label : "English"},
//   {value : "Arabic", label : "Arabic"},
// ]

// const usersOptions = [
//   {value  :"real", label : "Real Users"},
//   {value : "guest", label : "Guest Users"},
// ]
    const [Selectvalue, SetSelectvalue] = useState('');
    const [data ,setData] =useState([]) 
    const userlist = async () => {
      await axios.post(`/web_api/all_user_analytics`)
      .then(resp =>{
        const data = resp.data.body
        setData(data);
        SetSelectvalue('');
        console.log(data)
      })
    }
 useEffect(() => {
   userlist();
 }, [])

 useEffect(() => {
  document.body.className = "main-body leftmenu analytics";
  return () => {
      document.body.className = "main-body leftmenu";
  }
}, []);
 


const formsave = async (e)=>{
  e.preventDefault();
    const data = new FormData(e.target);
   const Formvlaues = Object.fromEntries(data.entries());
  //  let demodata={"match_id":"634a6b9df68bced78a4844e4"}
  //    console.log('Formvlaues === ', Formvlaues);
      await axios.post(`/web_api/all_user_analytics`,Formvlaues)
     .then(res => {
         const data = res.data.body;
         setData(data);
     })
    
}

  return (
    <div><Header />
    <div className="main-content side-content pt-0">
        <div className="container-fluid">
          <div className="inner-body">

            <div className="page-header">
              <div>
                <h2 className="main-content-title tx-24 mg-b-5">User Analytics</h2>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/home">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">&nbsp;&nbsp;Support Analytics</li>
                </ol>
              </div>

              {/* <div className="d-flex">
                <div className="justify-content-center">
                  <Link to="/home" className="btn-link">
                    <i className="fal fa-angle-double-left"></i>&nbsp; Back
                  </Link>
                </div>
              </div> */}
              
            </div>

            <div className="card custom-card">
                            <div className="card-body">
                                <form onSubmit={(e)=>formsave(e)}>
                                <div className="row align-items-center">
                                    <div className="col-lg-3 reletive mb-3">
                                    <span className='react-select-title'>Select Country</span>
                                    <Select 
                                      name="country" 
                                      onChange={SetSelectvalue} value={Selectvalue}
                                      options={countryOptions}
                                      className="basic-multi-select"
                                      classNamePrefix="select" />
                                    {/* <TextField id="search" name='name' className="filter-input" label="Search User" autoComplete="off" fullWidth type="text"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        /> */}
                                    </div>
                                    {/* <div className="col-lg-3 reletive mb-3">
                                    <span className='react-select-title'>Select Language</span>
                                    <Select 
                                    name="language" 
                                    options={languageOptions}
                                    className="basic-multi-select"
                                    classNamePrefix="select" />
                                  </div>
                                    <div className="col-lg-3 reletive mb-3">
                                    <span className='react-select-title'>Select User Type</span>
                                    <Select 
                                    name="user_type" 
                                    options={usersOptions}
                                    className="basic-multi-select"
                                    classNamePrefix="select" />
                                  </div> */}

                                  <div className="col-lg-3  mb-3">
                                <TextField id="sdate" name='s_date' className="filter-input" label="Start Date" autoComplete="off" fullWidth type="date"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />

                        </div>

                        <div className="col-lg-3 mb-3">
                            <TextField id="edate" name='e_date' className="filter-input" label="End Date" autoComplete="off" fullWidth type="date"
                                InputLabelProps={{ shrink: true, }} />

                        </div>

                                  {/* <div className="col-lg-3  mb-3">
                            <TextField id="sdate" name='log_s_date' className="filter-input" label="Login Start Date" autoComplete="off" fullWidth type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />

                        </div>

                        <div className="col-lg-3 mb-3">
                            <TextField id="edate" name='log_e_date' className="filter-input" label="Login End Date" autoComplete="off" fullWidth type="date"
                                InputLabelProps={{ shrink: true, }} />

                        </div> */}

                            <div className="col-lg-3 mb-3 d-flex">
                                        <Button type='submit' variant="contained" className="mr-3 btn-filter btnBg">Search</Button>
                                        <Button type='reset' onClick={userlist} className="mr-3 btn-dark btn-filter">Reset</Button>
                                    </div>
                                </div>
                                </form>
                            </div>
                        </div>

            <div className="row justify-content-center">
              <div className="col-lg-12 table-responsive border border-bottom-0">
                <div className="card custom-card">
                  <div className="card-body">
                    <div className="row justify-content-center">
                      <div className="col-lg-12">
                          <div className="row">
                            <div className="col-lg-4 reletive mb-4">
                            <label className="title-col">Total Users</label>
                              <input type="text" className="form-control card-input"   readOnly defaultValue={data.total_user}  fullWidth  variant="filled" autoComplete="off" />
                            </div>
                            <div className="col-lg-4 reletive mb-4">
                            <label className="title-col">Registered Users</label>
                              <input type="text" className="form-control card-input" readOnly  defaultValue={data.total_registered_user} fullWidth  variant="filled" autoComplete="off" />
                            </div>

                            <div className="col-lg-4 reletive mb-4">
                            <label className="title-col">Un-registered Users</label>
                              <input type="text" className="form-control card-input" readOnly defaultValue={data.total_unregistered_user}  fullWidth  variant="filled" autoComplete="off" />
                            </div>   
                            <div className="col-lg-4 reletive mb-4">
                            <label className="title-col">Mobile Users</label>
                              <input type="text" className="form-control card-input" readOnly defaultValue={data.mobile_user}  fullWidth  variant="filled" autoComplete="off" />
                            </div>   
                            <div className="col-lg-4 reletive mb-4">
                            <label className="title-col">Email Users</label>
                              <input type="text" className="form-control card-input" readOnly defaultValue={data.email_user}  fullWidth  variant="filled" autoComplete="off" />
                            </div>  

                            <div className="col-lg-4 reletive mb-4">
                            <label className="title-col">Google Users</label>
                              <input type="text" className="form-control card-input" readOnly  defaultValue={data.google_user}  fullWidth  variant="filled" autoComplete="off" />
                            </div>   
                            <div className="col-lg-4 reletive mb-4">
                            <label className="title-col">Apple Users</label>
                              <input type="text" className="form-control card-input" readOnly defaultValue={data.apple_user}  fullWidth  variant="filled" autoComplete="off" />
                            </div>   
                            <div className="col-lg-4 reletive mb-4">
                            <label className="title-col">Guest Users</label>
                              <input type="text" className="form-control card-input"  defaultValue={data.guest_user}  fullWidth  variant="filled" autoComplete="off" />
                            </div> 
                              
                            <div className="col-lg-4 reletive mb-4">
                            <label className="title-col">English Language Users</label>
                              <input type="text" className="form-control card-input" readOnly defaultValue={data.english_language_user}  fullWidth  variant="filled" autoComplete="off" />
                            </div>   

                            <div className="col-lg-4 reletive mb-4">
                            <label className="title-col">Arabic Language Users</label>
                              <input type="text" className="form-control card-input" readOnly defaultValue={data.arabic_language_user}  fullWidth  variant="filled" autoComplete="off" />
                            </div>   

                            <div className="col-lg-4 reletive mb-4">
                            <label className="title-col">Login Users</label>
                              <input type="text" className="form-control card-input" readOnly defaultValue={data.total_login}  fullWidth  variant="filled" autoComplete="off" />
                            </div>   

                             
                          </div>                       
                      </div>
                    </div>
                  </div>
                  <div className="card-footer mb-1">

                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
      <ToastContainer position="top-right" />
    </div>
  )
}

export default UserAnalyticsMangement