import React from "react";
import Header from "../Header";
import { Link } from "react-router-dom";
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";
import SelectTageting from "./Components/SelectTageting";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function AddTakeoverScreen() {
  const navigate = useNavigate();
  useEffect(() => {
     if(!localStorage.getItem("token")) navigate("/");
    document.body.className = "main-body leftmenu sponer_list";
    return () => {
      document.body.className = "main-body leftmenu";
    }
  }, []);
  const [alignment, setAlignment] = React.useState("banner");
  const [alignmentSkip, setAlignmentSkip] = React.useState("skip");
  const [skip_add, setSkip_add] = React.useState("1");
  const [view_type, setView_type] = React.useState("banner");

  const handleChangeToggle = (event) => {
    setAlignment(event.target.value);
  };

  const handleChangeToggleSkip = (event) => {
    setAlignmentSkip(event.target.value);
  };


  const [showhide, setShowhide] = useState('');
  const [show, setShow] = useState('');


  const handleshowhide = (event) => {
    const getuser = event.target.value;
    setShowhide(getuser);
  }

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const [match, setMatch] = React.useState('');

  const handleChange = (event) => {
    setMatch(event.target.value);
  };

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  ////////////////////////////////////////////////////////////////////

  // const saveFormData = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const data = new FormData(e.target);
  //     let Formvlaues = Object.fromEntries(data.entries());

  //     console.log({Formvlaues});
  //     // let dataToSend2 = new FormData();
  //     // dataToSend2.append('image', Formvlaues.image);
  //     // dataToSend2.append('skip', skip_add);
  //     // dataToSend2.append('skip_time', Formvlaues.skip_time);
  //     // dataToSend2.append('view_type', view_type);


  //   //  console.log("new values == ", dataToSend2);
  //     let token = localStorage.getItem("token");
  //     let header = ({ 'token': `${token}` });
  //     let options1 = ({ headers: header });
  //     //let options1 = { headers: { headers: { 'Content-Type': 'multipart/form-data' }, "token": localStorage.getItem('token') } };
  //     let response = await axios.post('/web_api/takeover_screen_add',Formvlaues, options1);
  //     if (response.status) {
  //       let data = response.data;
  //       if (data.status) {
  //         navigate(`/takeover-screen`);
  //         toast.success(data.msg);
  //       } else {
  //         toast.error('Please fill all necessary fields');
  //       }
  //     }
  //     else {
  //       toast.error('Please fill all necessary fields');
  //     }

  //   } catch (err) { console.error(err); toast.error('some errror'); return false; }
  // }

///////////////// Update complaint category /////////////////
let token = localStorage.getItem("token");
    let header = ({ 'token': `${token}` });
    let options1 = ({ headers: header });
const saveFormData = async (e)  => {
      e.preventDefault();
      const data = new FormData(e.target);
      const Formvlaues = Object.fromEntries(data.entries());

      let dataToSend2 = new FormData();
       dataToSend2.append('image', Formvlaues.image);
       dataToSend2.append('skip', skip_add);
       dataToSend2.append('skip_time', Formvlaues.skip_time);
       dataToSend2.append('view_type', view_type);

       console.log("new values == ", dataToSend2);
          axios.post(`/web_api/takeover_screen_add`, dataToSend2, options1)
              .then(res => {
                  if (res.status) {

                      let data = res.data;
                      if (data.status) {
                        navigate(`/takeover-screen`);
                        toast.success(data.msg);
                      } else {
                        toast.error('Please fill all necessary fields');
                      }
                  }
                  else {
                      toast.error(data.msg);
                  }
              })
              .catch(error => {
                  console.log(this.state);
              })
  }


  return (
    <>

      <Header />

      <div className="main-content side-content pt-0">
        <div className="container-fluid">
          <div className="inner-body">
            <div className="page-header">
              <div>
                <h2 className="main-content-title tx-24 mg-b-5">Add Takeover Screen</h2>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/home">Home</Link>
                  </li>

                  <li className="breadcrumb-item active" aria-current="page">&nbsp;&nbsp;Takeover Screen</li>
                </ol>
              </div>

              <div className="d-flex">
                <div className="justify-content-center">
                  <Link to="/takeover-screen">
                    <Button type='button' variant="contained" className="mr-3 btn-pd btnBg"><i className="fal fa-angle-double-left"></i>&nbsp; Back</Button>
                  </Link>
                </div>
              </div>

            </div>
            <div className="row justify-content-center">
              <div className="col-lg-12 table-responsive border border-bottom-0">
                <div className="card custom-card">
                  <div className="card-body">
                    <div className="row justify-content-center">
                      <div className="col-lg-8">

                        <form id="mdF" onSubmit={(e) => saveFormData(e)} enctype="multipart/form-data" >
                          <div className="row">



                          
                            <div className="col-lg-12">
                              <div className="row  mb-2 justify-space-between">

                                <div className="col-lg-6 mb-3">
                                  <label className="title-col mb-3">Skippable</label>
                                  <ToggleButtonGroup
                                    color="primary" name='Skippable' value={alignmentSkip} exclusive fullWidth onChange={handleChangeToggleSkip} >
                                    <ToggleButton onClick={(e) => setSkip_add(1)} value="skip">Yes</ToggleButton>
                                    <ToggleButton onClick={(e) => setSkip_add(0)} value="Noskip">No </ToggleButton>
                                  </ToggleButtonGroup>
                                </div>
                                <div className="col-lg-6 mb-3">
                              <label className="title-col  mb-3">Time Limit For Skip (in seconds)</label>
                              <input type="text" name='skip_time' className="form-control file-input" />
                               </div>

                              </div>
                            </div>

                            <div className="col-lg-6 mb-3">
                                  <label className="title-col mb-3">Screen Type</label>
                                  <ToggleButtonGroup
                                    color="primary" name='spon_type' value={alignment} exclusive fullWidth onChange={handleChangeToggle} >
                                    <ToggleButton onClick={(e) => setView_type('banner')} value="banner">Banner </ToggleButton>
                                    <ToggleButton onClick={(e) => setView_type('video')} value="video">Video </ToggleButton>
                                  </ToggleButtonGroup>
                                </div>
                              
                            {/* <div className="col-lg-9 mb-2">
                              <label className="title-col">Sponsorship Type</label>
                              <FormControl className="w-100">
                                <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="banner" name="radio-buttons-group">
                                  <div className="row  mb-0">
                                    <div className="col-lg-6" style={{ maxWidth: "40%" }}>
                                      <FormControlLabel value="banner" control={<Radio />} label="Banner (15sec)" />
                                    </div>
                                    <div className="col-lg-6 text-end">
                                      <FormControlLabel value="video" control={<Radio />} label="Video (30sec)" />
                                    </div>
                                  </div>
                                </RadioGroup>
                              </FormControl>
                            </div> */}
                            
                            <div className="col-lg-12 mb-4">
                              <label className="title-col">File Upload</label>
                              <input type="file" name='image' className="form-control file-input" />
                            </div>


                         
                          

                            <div className="col-lg-12 text-end">
                              <Button type='submit' variant="contained" className="mr-3 btn-pd">Submit</Button>
                              <Button type='reset' variant="contained" className="btn btn-dark btn-pd">Reset</Button>
                            </div>




                          </div>
                        </form>
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
        <ToastContainer position="top-right" />
      </div>
    </>
  )
}


