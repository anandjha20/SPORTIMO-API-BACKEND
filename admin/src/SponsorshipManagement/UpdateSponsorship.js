import React from "react";
import Header from "../Header";
import { Link } from "react-router-dom";
import FormControl from '@mui/material/FormControl';
import  { SelectChangeEvent } from '@mui/material/Select';
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
import Select from 'react-select';


export default function UpdateSponsorship() {


  const navigate = useNavigate();
  useEffect(() => {
    document.body.className = "main-body leftmenu sponer_list";
    return () => {
      document.body.className = "main-body leftmenu";
    }
  }, []);
 

  const { id } = useParams();
  const [datadetail, setDatadetail] = useState('')
  const [formDate, setFromdate] = useState('')
  const [toDate, setToDate] = useState('')
  const [dataImg, setDataImg] = useState('')
  const [sportsOpt, setSportsOpt] = useState('')
  const [LeaguesOpt, setLeaguesOpt] = useState('')
  const [TeamOpt, setTeamOpt] = useState('')
  const [countryOpt, setCountryOpt] = useState('')
  const [matchOpt, setMatchOpt] = useState('')




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

  ////////////////////multiple dropdown //////////////////////////////
  const [sport_lists, setSport_lists] = React.useState([]);
  const [league_lists, setLeague_lists] = React.useState([]);
  const [team_lists, setTeam_lists] = React.useState([]);
  const [country_lists, setCountry_lists] = React.useState([]);
  const [player_lists, setPlayer_lists] = React.useState([]);

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
  useEffect(async() => {
  await get_data('/web_api/sport_list', setSport_lists);
  await get_data('/web_api/league_list_dropDown', setLeague_lists);
  await get_data('/web_api/team_list_dropDown', setTeam_lists);
    // get_data('/web_api/player_list', setPlayer_lists);
    await get_data('/web_api/country_list', setCountry_lists);
    document.body.classList.add('bg-salmon');
  }, []);


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
        const match1 = [match];
        setMatch(match);
        setMatchOpt(match1)
        setAlignment(viewType);
        console.log(datadetail);
        const formDate = datadetail.Fdate.substring(0, 10);
        const toDate = datadetail.Ldate.substring(0, 10);

        const LeaguesOpt = datadetail.league;
        const TeamOpt = datadetail.team;
        const sportsOpt = datadetail.sports;
        const countryOpt = datadetail.country;

        setLeaguesOpt(LeaguesOpt);
        setTeamOpt(TeamOpt);
        setSportsOpt(sportsOpt);
        setCountryOpt(countryOpt);

        if (datadetail.skip_add == true) {
          const togglevalue = "skip";
          setAlignmentSkip(togglevalue);
        }
        if (datadetail.skip_add == false) {
          const togglevalue = "Noskip";
          setAlignmentSkip(togglevalue);
        }
        setFromdate(formDate);
        setToDate(toDate);
        console.log(formDate, toDate)

      })
  }
  useEffect(async () => {
    await SponsorshipDetail();
  }, []);



  const sportOptions = (sport_lists.length > 0) ? sport_lists.map((item) => {
    return { value: item._id, label: item.name };
  }) : [];

  const leagueOptions = (league_lists.length > 0) ? league_lists.map((item) => {
    return { value: item.season_id, label: item.original_name_sportimo };

  }) : [];
  const matchLeagueOptions = (league_lists.length > 0) ? league_lists.map((item) => {
    return { value: item.original_name_sportimo, label: item.original_name_sportimo };

  }) : [];

  const teamOptions = (team_lists.length > 0) ? team_lists.map((item) => {
    return { value: item.team_id, label: item.team_name };
  }) : [];

  const playersOptions = (player_lists.length > 0) ? player_lists.map((item) => {
    return { value: item._id, label: item.name };
  }) : [];

  const countryOptions = (country_lists.length > 0) ? country_lists.map((item) => {
    return { value: item._id, label: item.name };
  }) : [];


  const selectChange = (e, type) => {
    console.log(e.currentTarget);
    alert(" ==jk==  " + type);
  }
 
  const selectedleague = (LeaguesOpt.length > 0) ? LeaguesOpt.map((item) => {
    let result=leagueOptions.find(i=>i.value==item)

    return (
      result);
  }) : [];

  const selectedteam= (TeamOpt.length > 0) ? TeamOpt.map((item) => {
    let result=teamOptions.find(i=>i.value==item)

    return (
      result);
  }) : [];

  const selectedsport= (sportsOpt.length > 0) ? sportsOpt.map((item) => {
    let result=sportOptions.find(i=>i.label==item)

    return (
      result);
  }) : [];
  const [selectedMatch, setSelectedMatch] = React.useState([]);
  let selectedmatch=(matchOpt.length > 0)? matchOpt.map((item) => {
    let result=leagueOptions.find(i=>i.label==item)

    return (
      result);
  }) : [];
  const selectedcountry= (countryOpt.length > 0) ? countryOpt.map((item) => {
    let result=countryOptions.find(i=>i.label==item)

    return (
      result);
  }) : [];


  
  ///////select Player ///////////
  const [plrArray, setselectedOptions] = React.useState([])
  const handleChangePlayer = (selectedOptions) => {
    const plrArray = [];
    selectedOptions.map(item => plrArray.push(item.value)
    );
    setselectedOptions(plrArray);
  }

  ///////select Teams ///////////
  const [teamArray, setteamOptionsarry] = React.useState([])
  const handleChangeTeam = (teamOptionsarry) => {
    const teamArray = [];
    teamOptionsarry.map(item => teamArray.push(item.value)
    );
    setteamOptionsarry(teamArray);
  }
  ///////select country ///////////
  const [countryArray, setcountryOptionsarry] = React.useState([])
  const handleChangeCountry = (countryOptionsarry) => {
    const countryArray = [];
    countryOptionsarry.map(item => countryArray.push(item.label)
    );
    setcountryOptionsarry(countryArray);
  }

  ///////select Leagues ///////////
  const [leaguesArray, setleaguesOptionsarry] = React.useState([])
  const handleChangeLeagues = (leaguesOptionsarry) => {
    const leaguesArray = [];
    leaguesOptionsarry.map(item => leaguesArray.push(item.value)
    );
    setleaguesOptionsarry(leaguesArray);
  }

  ///////select Sports ///////////
  const [sportsArray, setsportsOptionsarry] = React.useState([])
  const handleChangeSports = (SportsOptionsarry) => {
    const sportsArray = [];
    SportsOptionsarry.map(item => sportsArray.push(item.label)
    );


    setsportsOptionsarry(sportsArray);
  }



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
      dataToSend2.append('image', Formvlaues.image);
      dataToSend2.append('match', Formvlaues.match);
      dataToSend2.append('view_type', Formvlaues.view_type);
      dataToSend2.append('skip_add', Formvlaues.skip_add);
      dataToSend2.append('league', JSON.stringify(leaguesArray));
      dataToSend2.append('country', JSON.stringify(countryArray));
      dataToSend2.append('sports', JSON.stringify(sportsArray));
      dataToSend2.append('team', JSON.stringify(teamArray));

      console.log("new values == ", dataToSend2);
      let token = localStorage.getItem("token");
      let header = ({ 'token': `${token}` });
      let options1 = ({ headers: header });

      let response = await axios.put(`/web_api/update_sponsor/${id}`, dataToSend2, options1);
      if (response.status) {

        let data = response.data;
        if (data.status) {
          navigate(`/sponsorship`);
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
                              <Select 
                                    closeMenuOnSelect={true}
                                    name="match"
                                    isClearable
                                    options={matchLeagueOptions}
                                    defaultInputValue={selectedmatch}
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

                              <div className="imagebox">
                                {dataImg.img !== '' ? <img src={dataImg.img || ''} alt="banner image" /> : <><img src='/assets/images/no-image.png' /></>}
                              </div>

                              <label className="title-col">File Upload</label>
                              <input type="file" name="image" className="form-control file-input" />
                            </div>
                            <div className="col-lg-12 mb-4">
                              <label className="title-col mb-3">Campaign  Date range</label>
                              <div className="row  mb-0">
                                <div className="col-lg-6">
                                  <label className="label-date">Start Date</label>
                                  <input className="form-control" defaultValue={formDate} id="sdate" name='Fdate' type="date"
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                  />

                                </div>
                                <div className="col-lg-6">
                                  <label className="label-date">End Date</label>
                                  <input className="form-control" id="edate" defaultValue={toDate} name='Ldate' label="End Date" type="date"
                                    InputLabelProps={{ shrink: true, }} />

                                </div>
                              </div>
                            </div>

                            <div className="col-lg-12 mb-4">
                              <label className="title-col mb-3">Sponsorship Targeting</label>
                              <div className="row">

                                <div className="col-lg-6 reletive mb-4">
                                  <span className='react-select-title'>Select Sports</span>
                                  <Select isMulti
                                    closeMenuOnSelect={false}
                                    name="sports"
                                    options={sportOptions}
                                    defaultValue={selectedsport.map((item)=>{
                                      return item;
                                    })}
                                    onChange={handleChangeSports}
                                    className="basic-multi-select"
                                    classNamePrefix="select" />
                                </div>

                                <div className="col-lg-6 reletive mb-4">
                                  <span className='react-select-title'>Select League</span>
                                  <Select isMulti
                                    closeMenuOnSelect={false}
                                    name="league"
                                    
                                    options={leagueOptions}
                                    onChange={handleChangeLeagues}
                                    defaultValue={selectedleague || 'select'}
                                    className="basic-multi-select"
                                    classNamePrefix="select" />
                                </div>

                                <div className="col-lg-6 reletive mb-4">
                                  <span className='react-select-title'>Select Team</span>
                                  <Select isMulti
                                    closeMenuOnSelect={false}
                                    name="team"
                                    options={teamOptions}
                                    defaultValue={selectedteam}
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
                                    defaultValue={selectedcountry}
                                    className="basic-multi-select"
                                    classNamePrefix="select" />
                                </div>



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


