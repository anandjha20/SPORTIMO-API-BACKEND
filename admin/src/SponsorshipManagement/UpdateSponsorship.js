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
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function UpdateSponsorship() {
  

  const navigate = useNavigate();
  useEffect(() => {
    document.body.className = "main-body leftmenu sponer_list";
    return () => {
      document.body.className = "main-body leftmenu";
    }
  }, []);
  const [alignment, setAlignment] = React.useState('');
  const [alignmentSkip, setAlignmentSkip] = React.useState('skip');
  const [skip_add, setSkip_add] = React.useState("1");
  const [view_type, setView_type] = React.useState("banner");
  const [imgpath, setImgPath] = React.useState('');


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

  const saveFormData = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData(e.target);
      let Formvlaues = Object.fromEntries(data.entries());

      Formvlaues.skip_add = skip_add;
      Formvlaues.view_type = view_type;
      // Formvlaues.image = imgpath;

      let dataToSend2 = new FormData();
      dataToSend2.append('Fdate', Formvlaues.Fdate);
      dataToSend2.append('Ldate', Formvlaues.Ldate);
      dataToSend2.append('country', Formvlaues.country);
      dataToSend2.append('image', Formvlaues.image);
      dataToSend2.append('league', Formvlaues.league);
      dataToSend2.append('match', Formvlaues.match);
      dataToSend2.append('players', Formvlaues.players);
      dataToSend2.append('skip_add', Formvlaues.skip_add);
      dataToSend2.append('sports', Formvlaues.sports);
      dataToSend2.append('team', Formvlaues.team);
      dataToSend2.append('view_type', Formvlaues.view_type);
      console.log("new values == ", dataToSend2);
      let token = localStorage.getItem("token");
      let header = ({ 'token': `${token}` });
      let options1 = ({ headers: header });

      let response = await axios.put(`/web_api/update_sponsor/${id}`,dataToSend2, options1);
      if (response.status) {

        let data = response.data;
        if (data.status) {
          //navigate(`/sponsorship`);
          toast.success(data.msg);
          SponsorshipDetail();
        } else {
          toast.error('something went wrong please try again');
        }
      }
      else {
        toast.error('something went wrong please try again..');
      }

    } catch (err) { console.error(err); toast.error('some errror'); return false; }



  }


  const { id } = useParams();
  const [datadetail, setDatadetail] = useState('')
  const [formDate, setFromdate] = useState('')
  const [toDate, setToDate] = useState('')
  const [dataImg, setDataImg] = useState('')


  const SponsorshipDetail = async () => {
    await axios.get(`/web_api/sponsor_detail/${id}`)
        .then(res => {
            const dataImg = res.data.body[0];
            const imgpath = dataImg.img;
            setDataImg(dataImg);
            setImgPath(imgpath);
            console.log(imgpath);
            const datadetail = res.data.body[0].allData;
            setDatadetail(datadetail);
            const viewType = datadetail.view_type;
            const match = datadetail.match;
            setMatch(match);
            setAlignment(viewType);
            console.log(datadetail);
            const formDate = datadetail.Fdate.substring(0, 10);
            const toDate = datadetail.Ldate.substring(0, 10);
            if(datadetail.skip_add == true)
            {
              const togglevalue = "skip";
              setAlignmentSkip(togglevalue);
            }
            if(datadetail.skip_add == false)
            {
              const togglevalue = "Noskip";
              setAlignmentSkip(togglevalue);
            }
            setFromdate(formDate);
            setToDate(toDate);
            console.log(formDate, toDate)
           
        })
}

  useEffect(() => {
      SponsorshipDetail();
  }, []);


  return (
    <>

      <Header />

      <div className="main-content side-content pt-0">
        <div className="container-fluid">
          <div className="inner-body">
            <div className="page-header">
              <div>
                <h2 className="main-content-title tx-24 mg-b-5">Update Sponsorship</h2>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/home">Home</Link>
                  </li>

                  <li className="breadcrumb-item active" aria-current="page">&nbsp;&nbsp;Sponsorship</li>
                </ol>
              </div>

              <div className="d-flex">
                <div className="justify-content-center">
                  <Link to="/sponsorship">
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

                        <form id="mdF" onSubmit={(e) => saveFormData(e)} encType="multipart/form-data" >
                          <div className="row">
                            <div className="col-lg-12 mb-4">
                              <label className="title-col mb-3">Match/league</label>
                              <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Match/league</InputLabel>
                                <Select labelId="demo-simple-select-label" id="demo-simple-select"
                                  MenuProps={MenuProps} name='match' value={match} label="Match/league" onChange={handleChange}>
                                  <MenuItem value="Bali">Bali Utd vs Rans Nusantara</MenuItem>
                                  <MenuItem value="Persija">Persija vs Persita	</MenuItem>
                                  <MenuItem value="Dewa">Dewa United vs Arema</MenuItem>
                                  <MenuItem value="Football">Football</MenuItem>
                                </Select>
                                {/* <FormHelperText>Without label</FormHelperText> */}
                              </FormControl>
                            </div>
                            <div className="col-lg-12">
                              <div className="row  mb-2 justify-space-between">

                                <div className="col-lg-4 mb-3">
                                  <label className="title-col mb-3">Skippable</label>
                                  <ToggleButtonGroup
                                    color="primary" name='Skippable' value={alignmentSkip} exclusive fullWidth onChange={handleChangeToggleSkip} >
                                    <ToggleButton onClick={(e) => setSkip_add(1)} value="skip">Yes</ToggleButton>
                                    <ToggleButton onClick={(e) => setSkip_add(0)} value="Noskip">No </ToggleButton>
                                  </ToggleButtonGroup>
                                </div>
                                <div className="col-lg-6 mb-3">
                                  <label className="title-col mb-3">SPONSORSHIP TYPE</label>
                                  <ToggleButtonGroup
                                    color="primary" name='spon_type' value={alignment} exclusive fullWidth onChange={handleChangeToggle} >
                                    <ToggleButton onClick={(e) => setView_type('banner')} value="banner">Banner (15sec)</ToggleButton>
                                    <ToggleButton onClick={(e) => setView_type('video')} value="video">Video (30sec)</ToggleButton>
                                  </ToggleButtonGroup>
                                </div>
                              </div>
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
                              
                              <div className="imagebox">
                               {dataImg.img !== '' ? <img src=  {dataImg.img || ''}  alt="banner image" /> : <><img src='/assets/images/no-image.png' /></>}
                              </div>

                              <label className="title-col">File Upload</label>
                              <input type="file" name="image" className="form-control file-input"/>
                            </div>
                            <div className="col-lg-12 mb-4">
                              <label className="title-col mb-3">Campaign  Date range</label>
                              <div className="row  mb-0">
                                <div className="col-lg-6">
                                  <label className="label-date">Start Date</label>
                                  <input className="form-control"  defaultValue={formDate} id="sdate" name='Fdate'  type="date"
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                  />

                                </div>
                                <div className="col-lg-6">
                                <label className="label-date">End Date</label>
                                  <input className="form-control" id="edate" defaultValue={toDate} name='Ldate'  label="End Date" type="date"
                                    InputLabelProps={{ shrink: true, }} />

                                </div>
                              </div>
                            </div>

                            <div className="col-lg-12 mb-4">
                              <label className="title-col mb-3">Sponsorship Targeting</label>
                              <div className="row">
                                <SelectTageting />
                              </div>
                            </div>


                            <div className="col-lg-12 text-end">
                              <Button type='submit' variant="contained" className="mr-3 btn-pd">Update</Button>
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


