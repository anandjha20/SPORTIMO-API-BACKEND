import React from "react";
import Header from "../Header";
import { Link } from "react-router-dom";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";
import axios from "axios";
import Select from 'react-select';
// import Map from "./Map";
import SelectTageting from "./Components/SelectTageting";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';



function GameEngagementQuestions() {
  const navigate = useNavigate();
  const [sport_lists, setSport_lists] = React.useState([]);
  const [league_lists, setLeague_lists] = React.useState([]);
  const [team_lists, setTeam_lists] = React.useState([]);
  const [player_lists, setPlayer_lists] = React.useState([]);
  const [country_lists, setCountry_lists] = React.useState([]);

  const get_data = async(url,setval) =>{
      try {
        let sendData = {}; 
        let token = localStorage.getItem("token");
        let header = ({ 'token': `${token}` });
        let options1 = ({ headers: header });
      //   let options1 = { headers: { "Content-type": "application/json","token": localStorage.getItem('token') } };
        let response = await axios.get( url, options1, sendData );
  
        if (response.status) {
  
          let data = response.data;
  
          if (data.status) {
              setval(data.body);
           // toast.success(data.msg);
          } else {
            navigate("/");
            toast.error(data.msg);
          }
        }
        else {
          toast.error('something went wrong please try again..');
        }
  
  
      } catch (err) { console.error(err); toast.error('some errror'); return false; }
  
  }
  
  
  
  
    useEffect(async () => {
      let d1=await get_data('/web_api/sport_list',setSport_lists);
      let d2=await get_data('/web_api/league_list_dropDown',setLeague_lists);
      let d3=await get_data('/web_api/team_list_dropDown',setTeam_lists);
      let d4=await get_data('/web_api/country_list',setCountry_lists);


      // 👇 add class to body element
      document.body.classList.add('bg-salmon');
  
    }, []);
  
    

  const sportOptions = (sport_lists.length >0) ? sport_lists.map((item)=>{
      return  { value: item._id, label: item.name };
      
  }) :[];
  

  const leagueOptions = (league_lists.length >0) ? league_lists.map((item)=>{
      return  { value: item.season_id, label: item.original_name };
  }) :[];
  
  
  const teamOptions = (team_lists.length >0) ? team_lists.map((item)=>{
      return  { value: item.team_id, label: item.team_name };
  }) :[];
  
  
  
  const playersOptions = (player_lists.length >0) ? player_lists.map((item)=>{
      return  { value: item._id, label: item.name };
  }) :[];
  
  
  const countryOptions = (country_lists.length >0) ? country_lists.map((item)=>{
      return  { value: item._id, label: item.name };
  }) :[];
  
  const selectChange = (e,type)=>{
      console.log(e.currentTarget);
      alert(" ==jk==  "+type);
  }

  ///////select country ///////////
  const [countryArray, setselectedOptions] = React.useState([])
  const handleChangeCountry = (selectedOptions) => {
    const countryArray = [];
    selectedOptions.map(item => countryArray.push(item.label)
    );
    setselectedOptions(countryArray);
  }

  ///////select Teams ///////////
  const [teamArray, setteamOptionsarry] = React.useState([])
  const handleChangeTeam = (teamOptionsarry) => {
    const teamArray = [];
    teamOptionsarry.map(item => teamArray.push(item.value)
    );
    setteamOptionsarry(teamArray);
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






  useEffect(() => {
    // 👇 add class to body element
    document.body.classList.add('bg-salmon');

  }, []);

  const [showhide, setShowhide] = useState('');
  const [show, setShow] = useState('');

  const handleshowhide = (event) => {
    const getuser = event.target.value;
    setShowhide(getuser);
  }



  ///////////////vender list api call////////////
  const [matchname, setMatchs] = useState([]);
  const SelectMatch = async () => {
    axios.post(`/web_api/live_upcoming_match_list`)
      .then(res => {
        const match = res.data.body;
        setMatchs(match);
        console.log(match);
      })
  }

  const matchOptions = (matchname.length > 0) ? matchname.map((item) => {
    return { value: item._id, label: item.match_name };
  }) : [];
  useEffect(() => {
    SelectMatch();
  }, [])

  const EventsOptions =
    [
      { label: "Red Card", value: "RedCard" },
      { label: "Goal", value: "Goal" },
      { label: "Penalty", value: "Penalty" },
      { label: "Corner", value: "Corner" },
      { label: "Foul etc", value: "Fouletc" },
    ]

  const [matchLegue, setMatchLegue] = React.useState('');
  const handleMatchName = (event) => {
    const matchLegue = event.label
    console.log(matchLegue);
    setMatchLegue(matchLegue);
  }

  /////////time manage ////////////////
  const [minute, setMinute] = React.useState('');
  const handleChangeMinute = (event) => {
    const minute = event.value
    setMinute(minute)
  }
  const [second, setSecond] = React.useState('');
  const handleChangeSecond = (event) => {
    const second = event.value
    setSecond(second)
  }
  const [hminute, setHminute] = React.useState('');
  const handleChangeHminute = (event) => {
    const hminute = event.value
    setHminute(hminute)
  }
  const [hsecond, setHSecond] = React.useState('');
  const handleChangeHSecond = (event) => {
    const hsecond = event.value
    setHSecond(hsecond)
  }
  ///////////option add//////////

  const hminuteOptions = [
    { value: '01', label: '01' },
    { value: '02', label: '02' },
    { value: '03', label: '03' },
    { value: '04', label: '04' },
    { value: '05', label: '05' },
    { value: '06', label: '06' },
    { value: '07', label: '07' },
    { value: '08', label: '08' },
    { value: '09', label: '09' },
    { value: '10', label: '10' },

    { value: '11', label: '11' },
    { value: '12', label: '12' },
    { value: '13', label: '13' },
    { value: '14', label: '14' },
    { value: '15', label: '15' },
    { value: '16', label: '16' },
    { value: '17', label: '17' },
    { value: '18', label: '18' },
    { value: '19', label: '19' },
    { value: '20', label: '20' },

    { value: '21', label: '21' },
    { value: '22', label: '22' },
    { value: '23', label: '23' },
    { value: '24', label: '24' },
    { value: '25', label: '25' },
    { value: '26', label: '26' },
    { value: '27', label: '27' },
    { value: '28', label: '28' },
    { value: '29', label: '29' },
    { value: '30', label: '30' },

    { value: '31', label: '31' },
    { value: '32', label: '32' },
    { value: '33', label: '33' },
    { value: '34', label: '34' },
    { value: '35', label: '35' },
    { value: '36', label: '36' },
    { value: '37', label: '37' },
    { value: '38', label: '38' },
    { value: '39', label: '39' },
    { value: '40', label: '40' },

    { value: '41', label: '41' },
    { value: '42', label: '42' },
    { value: '43', label: '43' },
    { value: '44', label: '44' },
    { value: '45', label: '45' },
    { value: '46', label: '46' },
    { value: '47', label: '47' },
    { value: '48', label: '48' },
    { value: '49', label: '49' },
    { value: '50', label: '50' },

    { value: '51', label: '51' },
    { value: '52', label: '52' },
    { value: '53', label: '53' },
    { value: '54', label: '54' },
    { value: '55', label: '55' },
    { value: '56', label: '56' },
    { value: '57', label: '57' },
    { value: '58', label: '58' },
    { value: '59', label: '59' },
    { value: '00', label: '00' },
  ]

  const hsecondOptions = [
    { value: '01', label: '01' },
    { value: '02', label: '02' },
    { value: '03', label: '03' },
    { value: '04', label: '04' },
    { value: '05', label: '05' },
    { value: '06', label: '06' },
    { value: '07', label: '07' },
    { value: '08', label: '08' },
    { value: '09', label: '09' },
    { value: '10', label: '10' },

    { value: '11', label: '11' },
    { value: '12', label: '12' },
    { value: '13', label: '13' },
    { value: '14', label: '14' },
    { value: '15', label: '15' },
    { value: '16', label: '16' },
    { value: '17', label: '17' },
    { value: '18', label: '18' },
    { value: '19', label: '19' },
    { value: '20', label: '20' },

    { value: '21', label: '21' },
    { value: '22', label: '22' },
    { value: '23', label: '23' },
    { value: '24', label: '24' },
    { value: '25', label: '25' },
    { value: '26', label: '26' },
    { value: '27', label: '27' },
    { value: '28', label: '28' },
    { value: '29', label: '29' },
    { value: '30', label: '30' },

    { value: '31', label: '31' },
    { value: '32', label: '32' },
    { value: '33', label: '33' },
    { value: '34', label: '34' },
    { value: '35', label: '35' },
    { value: '36', label: '36' },
    { value: '37', label: '37' },
    { value: '38', label: '38' },
    { value: '39', label: '39' },
    { value: '40', label: '40' },

    { value: '41', label: '41' },
    { value: '42', label: '42' },
    { value: '43', label: '43' },
    { value: '44', label: '44' },
    { value: '45', label: '45' },
    { value: '46', label: '46' },
    { value: '47', label: '47' },
    { value: '48', label: '48' },
    { value: '49', label: '49' },
    { value: '50', label: '50' },

    { value: '51', label: '51' },
    { value: '52', label: '52' },
    { value: '53', label: '53' },
    { value: '54', label: '54' },
    { value: '55', label: '55' },
    { value: '56', label: '56' },
    { value: '57', label: '57' },
    { value: '58', label: '58' },
    { value: '59', label: '59' },
    { value: '00', label: '00' },
  ]

  const minuteOptions = [
    { value: '01', label: '01' },
    { value: '02', label: '02' },
    { value: '03', label: '03' },
    { value: '04', label: '04' },
    { value: '05', label: '05' },
    { value: '06', label: '06' },
    { value: '07', label: '07' },
    { value: '08', label: '08' },
    { value: '09', label: '09' },
    { value: '10', label: '10' },

    { value: '11', label: '11' },
    { value: '12', label: '12' },
    { value: '13', label: '13' },
    { value: '14', label: '14' },
    { value: '15', label: '15' },
    { value: '16', label: '16' },
    { value: '17', label: '17' },
    { value: '18', label: '18' },
    { value: '19', label: '19' },
    { value: '20', label: '20' },

    { value: '21', label: '21' },
    { value: '22', label: '22' },
    { value: '23', label: '23' },
    { value: '24', label: '24' },
    { value: '25', label: '25' },
    { value: '26', label: '26' },
    { value: '27', label: '27' },
    { value: '28', label: '28' },
    { value: '29', label: '29' },
    { value: '30', label: '30' },

    { value: '31', label: '31' },
    { value: '32', label: '32' },
    { value: '33', label: '33' },
    { value: '34', label: '34' },
    { value: '35', label: '35' },
    { value: '36', label: '36' },
    { value: '37', label: '37' },
    { value: '38', label: '38' },
    { value: '39', label: '39' },
    { value: '40', label: '40' },

    { value: '41', label: '41' },
    { value: '42', label: '42' },
    { value: '43', label: '43' },
    { value: '44', label: '44' },
    { value: '45', label: '45' },
    { value: '46', label: '46' },
    { value: '47', label: '47' },
    { value: '48', label: '48' },
    { value: '49', label: '49' },
    { value: '50', label: '50' },

    { value: '51', label: '51' },
    { value: '52', label: '52' },
    { value: '53', label: '53' },
    { value: '54', label: '54' },
    { value: '55', label: '55' },
    { value: '56', label: '56' },
    { value: '57', label: '57' },
    { value: '58', label: '58' },
    { value: '59', label: '59' },
    { value: '00', label: '00' },
  ]
  const secondOptions = [
    { value: '01', label: '01' },
    { value: '02', label: '02' },
    { value: '03', label: '03' },
    { value: '04', label: '04' },
    { value: '05', label: '05' },
    { value: '06', label: '06' },
    { value: '07', label: '07' },
    { value: '08', label: '08' },
    { value: '09', label: '09' },
    { value: '10', label: '10' },

    { value: '11', label: '11' },
    { value: '12', label: '12' },
    { value: '13', label: '13' },
    { value: '14', label: '14' },
    { value: '15', label: '15' },
    { value: '16', label: '16' },
    { value: '17', label: '17' },
    { value: '18', label: '18' },
    { value: '19', label: '19' },
    { value: '20', label: '20' },

    { value: '21', label: '21' },
    { value: '22', label: '22' },
    { value: '23', label: '23' },
    { value: '24', label: '24' },
    { value: '25', label: '25' },
    { value: '26', label: '26' },
    { value: '27', label: '27' },
    { value: '28', label: '28' },
    { value: '29', label: '29' },
    { value: '30', label: '30' },

    { value: '31', label: '31' },
    { value: '32', label: '32' },
    { value: '33', label: '33' },
    { value: '34', label: '34' },
    { value: '35', label: '35' },
    { value: '36', label: '36' },
    { value: '37', label: '37' },
    { value: '38', label: '38' },
    { value: '39', label: '39' },
    { value: '40', label: '40' },

    { value: '41', label: '41' },
    { value: '42', label: '42' },
    { value: '43', label: '43' },
    { value: '44', label: '44' },
    { value: '45', label: '45' },
    { value: '46', label: '46' },
    { value: '47', label: '47' },
    { value: '48', label: '48' },
    { value: '49', label: '49' },
    { value: '50', label: '50' },

    { value: '51', label: '51' },
    { value: '52', label: '52' },
    { value: '53', label: '53' },
    { value: '54', label: '54' },
    { value: '55', label: '55' },
    { value: '56', label: '56' },
    { value: '57', label: '57' },
    { value: '58', label: '58' },
    { value: '59', label: '59' },
    { value: '00', label: '00' },
  ]


  const rewardsOptions = [
    { label: 'Automatic enrollment into a draw', value: 'Automatic_enrollment_into' },
    { label: 'Free Game Points', value: 'Free_Game_Points' },
    { label: 'Free Prediction Cards', value: 'Free_Prediction_Cards' },
  ]
  const rewardsConditionOptions = [
    { label: 'For Participating', value: 'For_Participating' },
    { label: 'For giving all correct answers ', value: 'For_giving_all_correct_answers ' },
  ]


  ///////add Geq//////////

  const myFormData = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData(e.target);
      let Formvlaues = Object.fromEntries(data.entries());
      

      Formvlaues.match_name = matchLegue;
      Formvlaues.duration = minute + ':' + second;
      Formvlaues.appearance_time = hminute + ':' + hsecond;
      Formvlaues.targeted_league = leaguesArray;
      Formvlaues.targeted_sport = sportsArray;
      Formvlaues.targeted_team = teamArray;
      Formvlaues.targeted_country = countryArray;
      console.log(Formvlaues)
      let token = localStorage.getItem("token");
      let header = ({ 'token': `${token}` });
      let options1 = ({ headers: header });
      let response = await axios.post('/web_api/add_geq', Formvlaues, options1);
      console.log('my fun call', response);
      if (response.status) {
        let data = response.data;
        if (data.status) {
          // navigate(`/poll`);
          toast.success(data.msg);
        } else {
          toast.error('Please fill all fields before Submit');
        }
      }
      else {
        toast.error('Please fill all fields before Submit');
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
                <h2 className="main-content-title tx-24 mg-b-5">Add GEQ</h2>

                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/home">Home</Link>
                  </li>

                  <li className="breadcrumb-item active" aria-current="page">&nbsp;&nbsp;Game Engagement Questions</li>
                </ol>
              </div>

              <div className="d-flex">
                <div className="justify-content-center">
                  <Link to="/geq">
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

                        <form onSubmit={(e) => myFormData(e)}>
                          <div className="row">
                            {/* <Map /> */}

                            <div className="col-lg-6 mb-4">
                              <label className="title-col">Match/League</label>
                              {/* <span className='react-select-title'>Match/League</span> */}
                              <Select labelId="hminute" name="match_id" id="hminute" menuPortalTarget={document.body}
                                onChange={handleMatchName}
                                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} options={matchOptions} />
                                
                            </div>

                            <div className="col-lg-6 mb-4">
                              <label className="title-col">Triggered Event</label>
                              {/* <span className='react-select-title'>Triggered Events</span> */}
                              <Select labelId="hminute" name="event" id="hminute" menuPortalTarget={document.body}
                                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} options={EventsOptions} />
                            </div>



                            <div className="col-lg-6 mb-4">
                              <label className="title-col mb-3">Appearance Time</label>
                              <div className="row">

                                <div className="col-lg-6 reletive mb-4">
                                  <span className='react-select-title'>Minute</span>
                                  <Select labelId="hminute" menuPortalTarget={document.body}
                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} id="hminute" onChange={handleChangeHminute} options={hminuteOptions} />
                                </div>
                                <div className="col-lg-6 reletive mb-4">
                                  <span className='react-select-title'>Second</span>
                                  <Select labelId="hminute" menuPortalTarget={document.body}
                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} id="hminute" onChange={handleChangeHSecond} options={hsecondOptions} />
                                </div>


                              </div>
                            </div>

                            <div className="col-lg-6 mb-4">
                              <label className="title-col mb-3">Duration</label>
                              <div className="row">

                                <div className="col-lg-6 reletive">
                                  <span className='react-select-title'>Minute</span>
                                  <Select menuPortalTarget={document.body}
                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} labelId="hminute" id="hminute" onChange={handleChangeMinute} options={minuteOptions} />
                                </div>
                                <div className="col-lg-6 reletive">
                                  <span className='react-select-title'>Second</span>
                                  <Select menuPortalTarget={document.body}
                                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} labelId="hminute" id="hminute" onChange={handleChangeSecond} options={secondOptions} />
                                </div>


                              </div>
                            </div>



                      
                            <div className="col-lg-6 reletive">
                            <label className="title-col mb-2"> Rewards Type</label>
                              <Select styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} labelId="rewards" id="rewards" name='reward_type' options={rewardsOptions} />
                            </div>
                           

                            <div className="col-lg-6 mb-4">
                            <label className="title-col mb-2">Enter Rewards</label>
                              <TextField id="filled-basic" type="number" name='reward_quantity' fullWidth label="Enter Rewards" variant="filled" autoComplete="off" />

                            </div>

                            <div className="col-lg-12 reletive mb-4">
                            <label className="title-col mb-2">Rewards Condition</label>
                              <Select styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} labelId="rewards" id="rewards" name='reward_condition' options={rewardsConditionOptions} />
                            </div>

                            <div className="col-lg-12 mb-4">
                              <label className="title-col">Question <span className="text-blue">(English)</span></label>
                              <TextField name='qus' label="Enter Question" multiline rows={4} fullWidth defaultValue="" variant="filled" autoComplete="off" />

                            </div>

                            {/* ///////Arbic////////// */}
                            <div className="col-lg-12 mb-4">
                              <label className="title-col">Question <span className="text-blue">(Arabic)</span></label>
                              <TextField name='qus_ara' label="Enter Question" multiline rows={4} fullWidth defaultValue="" variant="filled" autoComplete="off" />
                            </div>


                            {/* ///////French////////// */}
                            <div className="col-lg-12 mb-4">
                              <label className="title-col">Question <span className="text-blue">(French)</span></label>
                              <TextField name='qus_fr' label="Enter Question" multiline rows={4} fullWidth defaultValue="" variant="filled" autoComplete="off" />
                            </div>


                            <div className="col-lg-4 mb-4">
                              <label className="title-col mb-0">Answer 1 <span className="text-blue">(English)</span></label>
                              <input type='text' autoComplete="off" name='opt_1' placeholder="Enter Answer" className="card-control form-control" />
                            </div>


                            <div className="col-lg-4 mb-4">
                              <label className="title-col mb-0">Answer 1 <span className="text-blue">(Arabic)</span></label>
                              <input type='text' autoComplete="off" name='opt_1_ara' placeholder="Enter Answer" className="card-control form-control" />
                            </div>

                            <div className="col-lg-4 mb-4">
                              <label className="title-col mb-0">Answer 1 <span className="text-blue">(French)</span></label>
                              <input type='text' autoComplete="off" name='opt_1_fr' placeholder="Enter Answer" className="card-control form-control" />
                            </div>
                          

                            <div className="col-lg-4 mb-4">
                              <label className="title-col mb-0">Answer 2 <span className="text-blue">(English)</span></label>
                              <input type='text' autoComplete="off" name='opt_2' placeholder="Enter Answer" className="card-control form-control" />
                            </div>


                            <div className="col-lg-4 mb-4">
                              <label className="title-col mb-0">Answer 2 <span className="text-blue">(Arabic)</span></label>
                              <input type='text' autoComplete="off" name='opt_2_ara' placeholder="Enter Answer" className="card-control form-control" />
                            </div>
                            <div className="col-lg-4 mb-4">
                              <label className="title-col mb-0">Answer 2 <span className="text-blue">(French)</span></label>
                              <input type='text' autoComplete="off" name='opt_2_fr' placeholder="Enter Answer" className="card-control form-control" />
                            </div>
                           
                            <div className="col-lg-12">

                              {
                                show ? <div className="row">


                                  <div className="col-lg-4 mb-4">
                                    <label className="title-col mb-0">Answer 3 <span className="text-blue">(English)</span></label>
                                    <input type='text' autoComplete="off" name='opt_3' placeholder="Enter Answer" className="card-control form-control" />

                                  </div>

                                  <div className="col-lg-4 mb-4">
                                    <label className="title-col mb-0">Answer 3 <span className="text-blue">(Arabic)</span></label>
                                    <input type='text' autoComplete="off" name='opt_3_ara' placeholder="Enter Answer" className="card-control form-control" />

                                  </div>

                                 
                                  <div className="col-lg-4 mb-4">
                                    <label className="title-col mb-0">Answer 3 <span className="text-blue">(French)</span></label>
                                    <input type='text' autoComplete="off" name='opt_3_fr' placeholder="Enter Answer" className="card-control form-control" />

                                  </div>

                                 
                                  <div className="col-lg-4 mb-4">
                                    <label className="title-col mb-0">Answer 4 <span className="text-blue">(English)</span></label>
                                    <input type='text' autoComplete="off" name='opt_4' placeholder="Enter Answer" className="card-control form-control" />
                                  </div>


                                  <div className="col-lg-4 mb-4">
                                    <label className="title-col mb-0">Answer 4 <span className="text-blue">(Arabic)</span></label>
                                    <input type='text' autoComplete="off" name='opt_4_ara' placeholder="Enter Answer" className="card-control form-control" />

                                  </div>

                                  <div className="col-lg-4 mb-4">
                                    <label className="title-col mb-0">Answer 4 <span className="text-blue">(French)</span></label>
                                    <input type='text' autoComplete="off" name='opt_4_fr' placeholder="Enter Answer" className="card-control form-control" />

                                  </div>
                                  <div className="col-lg-4 mb-4">
                                    <label className="title-col mb-0">Answer 5 <span className="text-blue">(English)</span></label>
                                    <input type='text' autoComplete="off" name='opt_5' placeholder="Enter Answer" className="card-control form-control" />
                                  </div>


                                  <div className="col-lg-4 mb-4">
                                    <label className="title-col mb-0">Answer 5 <span className="text-blue">(Arabic)</span></label>
                                    <input type='text' autoComplete="off" name='opt_5_ara' placeholder="Enter Answer" className="card-control form-control" />

                                  </div>

                                  <div className="col-lg-4 mb-4">
                                    <label className="title-col mb-0">Answer 5 <span className="text-blue">(French)</span></label>
                                    <input type='text' autoComplete="off" name='opt_5_fr' placeholder="Enter Answer" className="card-control form-control" />

                                  </div>
                                </div> : <><div>
                                  <input type="hidden" name="ops_3" />
                                  <input type="hidden" name="ops_4" />
                                  <input type="hidden" name="ops_5" />
                                  <input type="hidden" name="ops_3_ara" />
                                  <input type="hidden" name="ops_4_ara" />
                                  <input type="hidden" name="ops_5_ara" />
                                  <input type="hidden" name="ops_3_fr" />
                                  <input type="hidden" name="ops_4_fr" />
                                  <input type="hidden" name="ops_5_fr" />
                                </div></>
                              }
                            </div>
                            <div className="col-lg-12 text-end">
                              <Button variant="contained" onClick={(ButtonText) => setShow(!show)} className="buttonStyle">
                                {
                                  !show ? <span>
                                    <Button variant="contained" style={{ float: "right" }}> Show More  </Button></span> :
                                    <span><Button variant="contained" style={{ float: "right", backgroundColor: "#ff4e17b3" }}>Show Less</Button></span>
                                }
                              </Button>
                            </div>


                            <div className="col-lg-12 mb-4">
                              <label className="title-col mb-3">Sponsorship Targeting</label>
                              <div className="row">

                              <div className="col-lg-6 reletive mb-4">
                <span className='react-select-title'>Select Sports</span>
                <Select isMulti
                    closeMenuOnSelect={false}
                    name="targeted_sport"
                    //value={selected_soprt}
                  ///  onChange = {(e)=>selectChange( e,'sport')}
                

                    options={sportOptions}
                    onChange={handleChangeSports}
                    className="basic-multi-select"
                    classNamePrefix="select" />
            </div>

            <div className="col-lg-6 reletive mb-4">
                <span className='react-select-title'>Select League</span>
                <Select isMulti
                    closeMenuOnSelect={false}
                    name="targeted_league" 
                    options={leagueOptions}
                    onChange={handleChangeLeagues}
                    className="basic-multi-select"
                    classNamePrefix="select" />
            </div>

            <div className="col-lg-6 reletive mb-4">
                <span className='react-select-title'>Select Team</span>
                <Select isMulti
                    closeMenuOnSelect={false}
                    name="targeted_team"   
                    options={teamOptions}
                    onChange={handleChangeTeam}

                    className="basic-multi-select"
                    classNamePrefix="select" />
            </div>

            {/* <div className="col-lg-6 reletive mb-4">
                <span className='react-select-title'>Select Players</span>
                <Select isMulti
                    closeMenuOnSelect={false}
                    name="targeted_player"  
                    options={playersOptions}
                    className="basic-multi-select"
                    classNamePrefix="select" />
            </div> */}

            <div className="col-lg-12  mb-4">
                <label className="title-col mb-2">Targeted Country</label>
             </div>
              <div className='reletive col-lg-12'>
                <span className='react-select-title'>Select Country</span>
                
                <Select isMulti
                    closeMenuOnSelect={false}
                    name="" 
                    options={countryOptions}
                    onChange={handleChangeCountry}
                    className="basic-multi-select"
                    classNamePrefix="select" />

                    <input type="hidden" name="targeted_country" value="india" />
            </div>



                              </div>
                            </div>


                            <div className="col-lg-12 text-end mt-5">
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

export default GameEngagementQuestions;
