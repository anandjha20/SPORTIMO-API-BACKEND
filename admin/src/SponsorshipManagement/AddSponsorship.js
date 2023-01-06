import React from "react";
import Header from "../Header";
import { Link } from "react-router-dom";
import FormControl from '@mui/material/FormControl';
import { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TextField from '@mui/material/TextField';
import SelectTageting from "./Components/SelectTageting";
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';



export default function AddSponsorship() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/");
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



  ////////////////////multiple dropdown //////////////////////////////
//  const [sport_lists, setSport_lists] = React.useState([]);
  const [league_lists, setLeague_lists] = React.useState([]);
  // const [team_lists, setTeam_lists] = React.useState([]);
  // const [country_lists, setCountry_lists] = React.useState([]);
  // const [player_lists, setPlayer_lists] = React.useState([]);

  const get_data = async (url, setval) => {
    try {
      let sendData = {};
      let token = localStorage.getItem("token");
      let header = ({ 'token': `${token}` });
      let options1 = ({ headers: header });
      //   let options1 = { headers: { "Content-type": "application/json","token": localStorage.getItem('token') } };
      let response = await axios.get(url, options1, sendData);

      if (response.status) {

        let data = response.data;

        if (data.status) {
          setval(data.body);
          // toast.success(data.msg);
        } else {
          toast.error('something went wrong please try again');
        }
      }
      else {
        toast.error('something went wrong please try again..');
      }

    } catch (err) { console.error(err); toast.error('some errror'); return false; }

  }
  useEffect(() => {
  //  get_data('/web_api/sport_list', setSport_lists);
    get_data('/web_api/league_list_dropDown', setLeague_lists);
  //  get_data('/web_api/team_list_dropDown', setTeam_lists);
  //  get_data('/web_api/player_list', setPlayer_lists);
  //  get_data('/web_api/country_list', setCountry_lists);
    document.body.classList.add('bg-salmon');
  }, []);

  // const sportOptions = (sport_lists.length > 0) ? sport_lists.map((item) => {
  //   return { value: item._id, label: item.name };
  // }) : [];

  // const leagueOptions = (league_lists.length > 0) ? league_lists.map((item) => {
  //   return { value: item.season_id, label: item.original_name_sportimo };

  // }) : [];

  let matchLeagueOptionsArr=[{ value: 0, label: "All" }]
  const matchLeagueOptions = (league_lists.length > 0) ? league_lists.map((item) => {
    matchLeagueOptionsArr.push({ value: item.season_id, label: item.original_name_sportimo })
    return { value: item.season_id, label: item.original_name_sportimo };

  }) : [];

  // const teamOptions = (team_lists.length > 0) ? team_lists.map((item) => {
  //   return { value: item.team_id, label: item.team_name };
  // }) : [];

  // const playersOptions = (player_lists.length > 0) ? player_lists.map((item) => {
  //   return { value: item._id, label: item.name };
  // }) : [];

  // const countryOptions = (country_lists.length > 0) ? country_lists.map((item) => {
  //   return { value: item._id, label: item.name };
  // }) : [];


  // const selectChange = (e, type) => {
  //   console.log(e.currentTarget);
  //   alert(" ==jk==  " + type);
  // }

  ///////select Player ///////////
  // const [plrArray, setselectedOptions] = React.useState([])
  // const handleChangePlayer = (selectedOptions) => {
  //   const plrArray = [];
  //   selectedOptions.map(item => plrArray.push(item.value)
  //   );
  //   setselectedOptions(plrArray);
  // }

  ///////select Teams ///////////
  // const [teamArray, setteamOptionsarry] = React.useState([])
  // const handleChangeTeam = (teamOptionsarry) => {
  //   const teamArray = [];
  //   teamOptionsarry.map(item => teamArray.push(item.value)
  //   );
  //   setteamOptionsarry(teamArray);
  // }
  ///////select country ///////////
  // const [countryArray, setcountryOptionsarry] = React.useState([])
  // const handleChangeCountry = (countryOptionsarry) => {
  //   const countryArray = [];
  //   countryOptionsarry.map(item => countryArray.push(item.label)
  //   );
  //   setcountryOptionsarry(countryArray);
  // }

  ///////select Leagues ///////////
  // const [leaguesArray, setleaguesOptionsarry] = React.useState([])
  // const handleChangeLeagues = (leaguesOptionsarry) => {
  //   const leaguesArray = [];
  //   leaguesOptionsarry.map(item => leaguesArray.push(item.value)
  //   );
  //   setleaguesOptionsarry(leaguesArray);
  // }

  ///////select Leagues ///////////
  const [leagueId, setMatchleagueId] = React.useState()
  const [leagueName, setMatchleagueName] = React.useState()
  const handleChangeMatchLeagues = (leaguesOptionsarry) => {
    let league_id=leaguesOptionsarry.value;
    let league_name=leaguesOptionsarry.label;
    console.log({league_id,league_name})
    setMatchleagueId(league_id);
    setMatchleagueName(league_name);
  }


  ///////select Sports ///////////
  // const [sportsArray, setsportsOptionsarry] = React.useState([])
  // const handleChangeSports = (SportsOptionsarry) => {
  //   const sportsArray = [];
  //   SportsOptionsarry.map(item => sportsArray.push(item.label)
  //   );


  //   setsportsOptionsarry(sportsArray);
  // }





  ////////////////////////////////////////////////////////////////////

  const saveFormData = async (e) => {
    e.preventDefault();

    try {
      
      const data = new FormData(e.target);
      let Formvlaues = Object.fromEntries(data.entries());


      Formvlaues.skip_add = skip_add;
      Formvlaues.view_type = view_type;
      // Formvlaues.league = leaguesArray;
      // Formvlaues.sports = sportsArray;
      // Formvlaues.country = countryArray;
      // Formvlaues.team = teamArray;
      

      let dataToSend2 = new FormData();
      dataToSend2.append('Fdate', Formvlaues.Fdate);
      dataToSend2.append('Ldate', Formvlaues.Ldate);
      dataToSend2.append('image', Formvlaues.image);
      dataToSend2.append('match', leagueName);
      dataToSend2.append('view_type', Formvlaues.view_type);
      dataToSend2.append('skip_add', Formvlaues.skip_add);
      dataToSend2.append('league_name', leagueName);
      dataToSend2.append('league_id', leagueId);
      // dataToSend2.append('league', JSON.stringify(leaguesArray));
      // dataToSend2.append('country', JSON.stringify(countryArray));
      // dataToSend2.append('sports', JSON.stringify(sportsArray));
      // dataToSend2.append('team', JSON.stringify(teamArray));

   
   console.log(dataToSend2)
      let token = localStorage.getItem("token");
      let header = ({ 'token': `${token}` });
     // let options1 = ({ headers: header });
     let options1 = { headers: { headers: { 'Content-Type': 'multipart/form-data' }, "token": localStorage.getItem('token') } };
      let response = await axios.post('/web_api/add_sponsor', dataToSend2, options1);
      if (response.status) {
        let data = response.data;
        if (data.status) {
          navigate(`/sponsorship`);
          toast.success(data.msg);
        } else {
          toast.error('Please fill all necessary fields');
        }
      }
      else {
        toast.error('Please fill all necessary fields');
      }

    } catch (err) { console.error(err); toast.error('some errror'); return false; }
  }




  return (
    <>

      <Header />

      <div className="main-content side-content pt-0">
        <div className="container-fluid">
          <div className="inner-body">
            <div className="page-header">
              <div>
                <h2 className="main-content-title tx-24 mg-b-5">Add Sponsorship</h2>
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

                        <form id="mdF" onSubmit={(e) => saveFormData(e)} enctype="multipart/form-data" >
                          <div className="row">



                            <div className="col-lg-12 mb-4">
                              <label className="title-col mb-3">Match/league</label>
                              <Select 
                                    closeMenuOnSelect={true}
                                    name="match"
                                    options={matchLeagueOptionsArr}
                                    onChange={handleChangeMatchLeagues}
                                    className="basic-multi-select"
                                    classNamePrefix="select" />
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
                              <label className="title-col">File Upload</label>
                              <input type="file" name='image' className="form-control file-input" />
                            </div>


                            <div className="col-lg-12 mb-4">
                              <label className="title-col mb-3">Campaign  Date range</label>
                              <div className="row  mb-0">
                                <div className="col-lg-6">
                                  <TextField id="sdate" name='Fdate' label="Start Date" fullWidth type="date"
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                  />

                                </div>
                                <div className="col-lg-6">
                                  <TextField id="edate" name='Ldate' label="End Date" fullWidth type="date"
                                    InputLabelProps={{ shrink: true, }} />

                                </div>
                              </div>
                            </div>

                            {/* <div className="col-lg-12 mb-4">
                              <label className="title-col mb-3">Sponsorship Targeting</label>
                              <div className="row">

                                <div className="col-lg-6 reletive mb-4">
                                  <span className='react-select-title'>Select Sports</span>
                                  <Select isMulti
                                    closeMenuOnSelect={false}
                                    name="sports"
                                    options={sportOptions}
                                    onChange={handleChangeSports}
                                    className="basic-multi-select"
                                    classNamePrefix="select" />
                                </div>

                                <div className="col-lg-6 reletive mb-4">
                                  <span className='react-select-title'>Select League</span>
                                  <Select isMulti
                                    closeMenuOnSelect={false}
                                    name="leagues"
                                    options={leagueOptions}
                                    onChange={handleChangeLeagues}
                                    className="basic-multi-select"
                                    classNamePrefix="select" />
                                </div>

                                <div className="col-lg-6 reletive mb-4">
                                  <span className='react-select-title'>Select Team</span>
                                  <Select isMulti
                                    closeMenuOnSelect={false}
                                    name="teams"
                                    options={teamOptions}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    onChange={handleChangeTeam}
                                  />
                                </div>

               
                                <div className="col-lg-12  mb-4">
                                  <label className="title-col mb-2">Targeted Country</label>
                                </div>
                                <div className='reletive col-lg-12'>
                                  <span className='react-select-title'>Select Country</span>

                                  <Select isMulti
                                    closeMenuOnSelect={false}
                                    name="country"
                                    options={countryOptions}
                                    onChange={handleChangeCountry}
                                    className="basic-multi-select"
                                    classNamePrefix="select" />
                                </div>



                              </div>
                            </div> */}

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


