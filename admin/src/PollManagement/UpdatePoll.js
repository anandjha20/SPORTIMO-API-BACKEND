import React from "react";
import Header from "../Header";
import { Link } from "react-router-dom";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useState, useEffect } from "react";
import axios from "axios";
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import InputEmoji from 'react-input-emoji'
import { fabClasses } from "@mui/material";

export default function UpdatePoll() {



  const [showhide, setShowhide] = useState();
  const [showhide1, setShowhide1] = useState();
  const [npshow, setNpshow] = useState('');
  const [show, setShow] = useState('');

  const handleshowhide = (event) => {
    const getuser = event.target.value;
    setShowhide(getuser);
    if (getuser == 'Free') {
      document.querySelector("#amountDiv").classList.add('showAmount');
      document.querySelector("#reset-value").value = '0';
    }
    if (getuser == 'Paid') {
      document.querySelector("#amountDiv").classList.remove('showAmount');
      document.querySelector("#reset-value").value = datadetail.amount;
    }
    return false;
  }
  const handleshowhide1 = (event) => {
    const getuser = event.target.value;
    setShowhide1(getuser);
    if (getuser == 'Free') {
      document.querySelector("#reset-value").value = '0';
    }
  }

  // const [f_type, setF_type] = React.useState('Free');
  // const handleChangef_type = (event) => { setF_type(event.target.value); }

  // console.log('fee_type === ', showhide);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const [match, setMatch] = React.useState('')
  const [rewards, setRewards] = React.useState('');

  const handleChangerewards = (event) => {
    setRewards(event.target.value);
  };

  const handleChange = (event) => {
    setMatch(event.target.value);
  };

 
  /// poll type select value get section 
  const [p_type, setP_type] = React.useState( );
  const handleChangep_type = (event) => { 
    setP_type(event.target.value);
   }


  /// Fess type select value get section 
  const [f_type, setF_type] = React.useState('Free');
   const handleChangef_type = (event) => { setF_type(event.target.value); }


  const [notis, setNotis] = React.useState(0);
  const [innotis, setInnotis] = React.useState(0);
  const [reward, setReward] = React.useState(0);

  const notifun = () => {
    if (notis == 1) {
      setNotis(0);
      document.querySelector("#change-class").classList.remove('shwooptionIn');
    }
    if (notis == 0) {
      setNotis(1);
      document.querySelector("#change-class").classList.add('shwooptionIn');
    }
    return false;
  };


  const notifunapp = (event) => {
    if (innotis == 1) {
      setInnotis(0);
      document.querySelector("#change-class").classList.remove('shwooption');
    }
    if (innotis == 0) {
      setInnotis(1);
      document.querySelector("#change-class").classList.add('shwooption');
    }
    return false;
  };

  const rewardfun = (event) => {
    if (reward == 1) {
      setReward(0);
      document.querySelector("#rewards1").classList.remove('rewards');
    }
    if (reward == 0) {
      setReward(1);
      document.querySelector("#rewards1").classList.add('rewards');
    }
    return false;
  };


  // console.log(p_type);
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  let token = localStorage.getItem("token");
  let header = ({ 'token': `${token}` });
  let options1 = ({ headers: header });

  const myFormData = async (e) => {
    e.preventDefault();

    try {

      const data = new FormData(e.target);
      let Formvlaues = Object.fromEntries(data.entries());
      console.log("form data is == ", Formvlaues);
      // Formvlaues.fee_type = showhide;
      // Formvlaues.poll_type = p_type;
      Formvlaues.noti_status = notis;
      Formvlaues.players = plrArray;
      Formvlaues.match = matchLegue;
      Formvlaues.teams = teamArray;
      Formvlaues.leagues = leaguesArray;
      Formvlaues.sports = sportsArray;
      Formvlaues.noti_in_App_status = innotis;
      Formvlaues.time_duration = minute + ':' + second;
      Formvlaues.apperance_time = hminute + ':' + hsecond;

      let response = await axios.put(`/web_api/update_poll/${id}`, Formvlaues, options1);
      console.log('my fun call', response);
      if (response.status) {
        let data = response.data;
        if (data.status) {
          toast.success(data.msg);
        } else {
          toast.error('something went wrong please try again');
        }
      }
      else {
        toast.error('something went wrong please try again..');
      }

    } catch (err) { console.error(err); toast.error('some errror'); return false; }


  }
  

 ////////////////////multiple dropdown //////////////////////////////
 const [sport_lists, setSport_lists] = React.useState([]);
 const [league_lists, setLeague_lists] = React.useState([]);
 const [team_lists, setTeam_lists] = React.useState([]);
 const [player_lists, setPlayer_lists] = React.useState([]);

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
           toast.error('something went wrong please try again');
         }
       }
       else {
         toast.error('something went wrong please try again..');
       }
 
     } catch (err) { console.error(err); toast.error('some errror'); return false; }
 
 }
   useEffect(() => {
     get_data('/web_api/sport_list',setSport_lists);
     get_data('/web_api/league_list',setLeague_lists);
     get_data('/web_api/team_list',setTeam_lists);
     get_data('/web_api/player_list',setPlayer_lists);
     document.body.classList.add('bg-salmon');
   }, []);
 
 const sportOptions = (sport_lists.length >0) ? sport_lists.map((item)=>{
     return (
      { value: item._id, label: item.name });
 }) :[];
 
 const leagueOptions = (league_lists.length >0) ? league_lists.map((item)=>{
     return  { value: item._id, label: item.name };
 }) :[];
 
 const teamOptions = (team_lists.length >0) ? team_lists.map((item)=>{
     return  { value: item._id, label: item.name };
 }) :[];
 
 const playersOptions = (player_lists.length >0) ? player_lists.map((item)=>{
     return  { value: item._id, label: item.name };
 }) :[];
 
 const selectChange = (e,type)=>{
     console.log(e.currentTarget);
     alert(" ==jk==  "+type);
 }

 ///////select Player ///////////
 const [plrArray, setselectedOptions] = React.useState()
 const handleChangePlayer = (selectedOptions) => {
   const plrArray = [];
   selectedOptions.map(item =>  plrArray.push(item.value)
  );
  setselectedOptions(plrArray.join(','));
}

 ///////select Teams ///////////
 const [teamArray, setteamOptionsarry] = React.useState()
 const handleChangeTeam = (teamOptionsarry) => {
   const teamArray =[];
   teamOptionsarry.map(item =>  teamArray.push(item.value)
  );
  setteamOptionsarry(teamArray.join(','));
}

 ///////select Leagues ///////////
 const [leaguesArray, setleaguesOptionsarry] = React.useState()
 const handleChangeLeagues = (leaguesOptionsarry) => {
   const leaguesArray =[];
   leaguesOptionsarry.map(item =>  leaguesArray.push(item.value)
  );
  setleaguesOptionsarry(leaguesArray.join(','));
}

 ///////select Sports ///////////
 const [sportsArray, setsportsOptionsarry] = React.useState()
 const handleChangeSports = (SportsOptionsarry) => {
   const sportsArray = [];
   SportsOptionsarry.map(item =>  sportsArray.push(item.value)
  );
  setsportsOptionsarry(sportsArray.join(','));
}


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

const rewardsOptions = [
          {value : 'coins' , label : 'Coins'},
          {value : 'Diamonds' , label : 'Diamonds'},
      ]
      
// const matchOptions = [
//                 {value : 'Bali' , label : 'Bali Utd vs Rans Nusantara'},
//                 {value : 'Persija' , label : 'Persija vs Persita'},
//                 {value : 'Dewa' , label : 'Dewa United vs Arema'},
//                 {value : 'demo' , label : 'Demo'},
//       ]


///////////////vender list api call////////////
const [matchname, setMatchs] = useState([]);
const SelectMatch = async () =>
  {
      axios.post(`/web_api/live_upcoming_match_list`)
      .then(res => {
        const match = res.data.body;
        setMatchs(match);
        console.log(match); 
      })
  }

const matchOptions = (matchname.length > 0) ? matchname.map((item) => {
  return { value: item.match_id, label: item.match_name };
}) : [];
useEffect(() => {
  SelectMatch();
}, [])



const [matchLegue, setMatchLegue] = React.useState('');
const handleMatchName = (event) => {
  const matchLegue = event.label
  console.log(matchLegue);
  setMatchLegue(matchLegue);
}
      
const hminuteOptions = [
                {value : '01' , label : '01'},
                {value : '02' , label : '02'},
                {value : '03' , label : '03'},
                {value : '04' , label : '04'},
                {value : '05' , label : '05'},
                {value : '06' , label : '06'},
                {value : '07' , label : '07'},
                {value : '08' , label : '08'},
                {value : '09' , label : '09'},
                {value : '10' , label : '10'},
                {value : '12' , label : '12'},
                {value : '13' , label : '13'},
                {value : '14' , label : '14'},
                {value : '15' , label : '15'},
                {value : '16' , label : '16'},
                {value : '17' , label : '17'},
                {value : '18' , label : '18'},
                {value : '19' , label : '19'},
                {value : '20' , label : '20'},
                {value : '21' , label : '21'},
                {value : '22' , label : '22'},
                {value : '23' , label : '23'},
                {value : '24' , label : '24'},
                {value : '25' , label : '25'},
                {value : '26' , label : '26'},
                {value : '27' , label : '27'},
                {value : '28' , label : '28'},
                {value : '29' , label : '29'},
                {value : '30' , label : '30'},
                {value : '31' , label : '31'},
                {value : '32' , label : '32'},
                {value : '33' , label : '33'},
                {value : '34' , label : '34'},
                {value : '35' , label : '35'},
                {value : '36' , label : '36'},
                {value : '37' , label : '37'},
                {value : '38' , label : '38'},
                {value : '39' , label : '39'},
                {value : '10' , label : '40'},
                {value : '41' , label : '41'},
                {value : '42' , label : '42'},
                {value : '43' , label : '43'},
                {value : '44' , label : '44'},
                {value : '45' , label : '45'},
                {value : '46' , label : '46'},
                {value : '47' , label : '47'},
                {value : '48' , label : '48'},
                {value : '49' , label : '49'},
                {value : '50' , label : '50'},
                {value : '51' , label : '51'},
                {value : '52' , label : '52'},
                {value : '53' , label : '53'},
                {value : '54' , label : '54'},
                {value : '55' , label : '55'},
                {value : '56' , label : '56'},
                {value : '57' , label : '57'},
                {value : '58' , label : '58'},
                {value : '59' , label : '59'},
                {value : '00' , label : '00'}, 
      ]
  
const hsecondOptions = [
                {value : '01' , label : '01'},
                {value : '02' , label : '02'},
                {value : '03' , label : '03'},
                {value : '04' , label : '04'},
                {value : '05' , label : '05'},
                {value : '06' , label : '06'},
                {value : '07' , label : '07'},
                {value : '08' , label : '08'},
                {value : '09' , label : '09'},
                {value : '10' , label : '10'},
                {value : '11' , label : '11'},
                {value : '12' , label : '12'},
                {value : '13' , label : '13'},
                {value : '14' , label : '14'},
                {value : '15' , label : '15'},
                {value : '16' , label : '16'},
                {value : '17' , label : '17'},
                {value : '18' , label : '18'},
                {value : '19' , label : '19'},
                {value : '20' , label : '20'},
                {value : '21' , label : '21'},
                {value : '22' , label : '22'},
                {value : '23' , label : '23'},
                {value : '24' , label : '24'},
                {value : '25' , label : '25'},
                {value : '26' , label : '26'},
                {value : '27' , label : '27'},
                {value : '28' , label : '28'},
                {value : '29' , label : '29'},
                {value : '30' , label : '30'},
                {value : '31' , label : '31'},
                {value : '32' , label : '32'},
                {value : '33' , label : '33'},
                {value : '34' , label : '34'},
                {value : '35' , label : '35'},
                {value : '36' , label : '36'},
                {value : '37' , label : '37'},
                {value : '38' , label : '38'},
                {value : '39' , label : '39'},
                {value : '10' , label : '40'},
                {value : '41' , label : '41'},
                {value : '42' , label : '42'},
                {value : '43' , label : '43'},
                {value : '44' , label : '44'},
                {value : '45' , label : '45'},
                {value : '46' , label : '46'},
                {value : '47' , label : '47'},
                {value : '48' , label : '48'},
                {value : '49' , label : '49'},
                {value : '50' , label : '50'},
                {value : '51' , label : '51'},
                {value : '52' , label : '52'},
                {value : '53' , label : '53'},
                {value : '54' , label : '54'},
                {value : '55' , label : '55'},
                {value : '56' , label : '56'},
                {value : '57' , label : '57'},
                {value : '58' , label : '58'},
                {value : '59' , label : '59'},
                {value : '00' , label : '00'}, 
      ]

const minuteOptions = [
                {value : '01' , label : '01'},
                {value : '02' , label : '02'},
                {value : '03' , label : '03'},
                {value : '04' , label : '04'},
                {value : '05' , label : '05'},
                {value : '06' , label : '06'},
                {value : '07' , label : '07'},
                {value : '08' , label : '08'},
                {value : '09' , label : '09'},
                {value : '10' , label : '10'},
                {value : '11' , label : '11'},
                {value : '12' , label : '12'},
                {value : '13' , label : '13'},
                {value : '14' , label : '14'},
                {value : '15' , label : '15'},
                {value : '16' , label : '16'},
                {value : '17' , label : '17'},
                {value : '18' , label : '18'},
                {value : '19' , label : '19'},
                {value : '20' , label : '20'},
                {value : '21' , label : '21'},
                {value : '22' , label : '22'},
                {value : '23' , label : '23'},
                {value : '24' , label : '24'},
                {value : '25' , label : '25'},
                {value : '26' , label : '26'},
                {value : '27' , label : '27'},
                {value : '28' , label : '28'},
                {value : '29' , label : '29'},
                {value : '30' , label : '30'},
                {value : '31' , label : '31'},
                {value : '32' , label : '32'},
                {value : '33' , label : '33'},
                {value : '34' , label : '34'},
                {value : '35' , label : '35'},
                {value : '36' , label : '36'},
                {value : '37' , label : '37'},
                {value : '38' , label : '38'},
                {value : '39' , label : '39'},
                {value : '10' , label : '40'},
                {value : '41' , label : '41'},
                {value : '42' , label : '42'},
                {value : '43' , label : '43'},
                {value : '44' , label : '44'},
                {value : '45' , label : '45'},
                {value : '46' , label : '46'},
                {value : '47' , label : '47'},
                {value : '48' , label : '48'},
                {value : '49' , label : '49'},
                {value : '50' , label : '50'},
                {value : '51' , label : '51'},
                {value : '52' , label : '52'},
                {value : '53' , label : '53'},
                {value : '54' , label : '54'},
                {value : '55' , label : '55'},
                {value : '56' , label : '56'},
                {value : '57' , label : '57'},
                {value : '58' , label : '58'},
                {value : '59' , label : '59'},
                {value : '00' , label : '00'},  
      ]
const secondOptions = [
                {value : '01' , label : '01'},
                {value : '02' , label : '02'},
                {value : '03' , label : '03'},
                {value : '04' , label : '04'},
                {value : '05' , label : '05'},
                {value : '06' , label : '06'},
                {value : '07' , label : '07'},
                {value : '08' , label : '08'},
                {value : '09' , label : '09'},
                {value : '10' , label : '10'},
                {value : '11' , label : '11'},
                {value : '12' , label : '12'},
                {value : '13' , label : '13'},
                {value : '14' , label : '14'},
                {value : '15' , label : '15'},
                {value : '16' , label : '16'},
                {value : '17' , label : '17'},
                {value : '18' , label : '18'},
                {value : '19' , label : '19'},
                {value : '20' , label : '20'},
                {value : '21' , label : '21'},
                {value : '22' , label : '22'},
                {value : '23' , label : '23'},
                {value : '24' , label : '24'},
                {value : '25' , label : '25'},
                {value : '26' , label : '26'},
                {value : '27' , label : '27'},
                {value : '28' , label : '28'},
                {value : '29' , label : '29'},
                {value : '30' , label : '30'},
                {value : '31' , label : '31'},
                {value : '32' , label : '32'},
                {value : '33' , label : '33'},
                {value : '34' , label : '34'},
                {value : '35' , label : '35'},
                {value : '36' , label : '36'},
                {value : '37' , label : '37'},
                {value : '38' , label : '38'},
                {value : '39' , label : '39'},
                {value : '10' , label : '40'},
                {value : '41' , label : '41'},
                {value : '42' , label : '42'},
                {value : '43' , label : '43'},
                {value : '44' , label : '44'},
                {value : '45' , label : '45'},
                {value : '46' , label : '46'},
                {value : '47' , label : '47'},
                {value : '48' , label : '48'},
                {value : '49' , label : '49'},
                {value : '50' , label : '50'},
                {value : '51' , label : '51'},
                {value : '52' , label : '52'},
                {value : '53' , label : '53'},
                {value : '54' , label : '54'},
                {value : '55' , label : '55'},
                {value : '56' , label : '56'},
                {value : '57' , label : '57'},
                {value : '58' , label : '58'},
                {value : '59' , label : '59'},
                {value : '00' , label : '00'}, 
      ]
      
  const { id } = useParams();   
  const [datadetail, setDataDetail] = useState('')
  const [polltypeSet, setPollyupe] = useState('')
  const [sportsOpt, setSportsOpt] = useState('')
   


///////////////emoji input value get
const [answerOne, setAnswerOne] = useState("answerOne");
const [answerTwo, setAnswerTwo] = useState('');
const [answerThree, setAnswerThree] = useState('');
const [answerFour, setAnswerFour] = useState('');
const [answerFive, setAnswerFive] = useState('');

/////////////// emoji input value get

const polldetail = async () =>
      {
          const sendatds = {data1 : "data1"}
          await axios.post(`/web_api/poll_list/${id}`, sendatds, options1)
          .then(res => {
            const datadetail = res.data.body[0];
            const polltypeSet = res.data.body[0].poll_type;
            const matchname = res.data.body[0].match;
            const hminute = res.data.body[0].apperance_time.substring(0, 2);
            const hsinute = res.data.body[0].apperance_time.slice(-2);

            const minute = res.data.body[0].time_duration.substring(0, 2);
            const second = res.data.body[0].time_duration.slice(-2);

            const sportsArrayOp = datadetail.sports;
            const answerOne = datadetail.ops_1;
            const sportsOpt = sportsArrayOp.split(',');


            setMatchLegue(matchname)
            // if(res.status)
            // {
            //   setAnswerOne(answerOne);
            // console.log(answerOne)
            // }

            setSportsOpt(sportsOpt);
            console.log(sportsOpt);

            setDataDetail(datadetail);
            setPollyupe(polltypeSet);
            
            setHminute(hminute);
            setHSecond(hsinute);
            setMinute(minute);
            setSecond(second);
            

            //console.log(Object.JSON.parse(sportsArrayOp))
            // console.log(mtime)
            // console.log(stime)
            // console.log(minute)
            // console.log(second)
            console.log(datadetail); 
          })
      }
  
      useEffect(() => {
             polldetail();
        }, []);
       

 /////////////////// Poll Detail Api Call ///////////////////////////////////////

  return (
    <>

      <Header />

      <div className="main-content side-content pt-0">
        <div className="container-fluid">
          <div className="inner-body">

            <div className="page-header">
              <div>
                <h2 className="main-content-title tx-24 mg-b-5">Update Poll</h2>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/home">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">&nbsp;&nbsp;Poll Management</li>
                </ol>
              </div>
              <div className="d-flex">
                <div className="justify-content-center">
                  <Link to="/poll" className="btn-link">
                    <i className="fal fa-angle-double-left"></i>&nbsp; Back
                  </Link>
                </div>
              </div>
            </div>

            
            {(datadetail) ?
            <div className="row justify-content-center">
              <div className="col-lg-12 table-responsive border border-bottom-0">
                <div className="card custom-card">
                  <div className="card-body">
                    <div className="row justify-content-center">
                      <div className="col-lg-8">
                        <form onSubmit={(e) => myFormData(e)}>
                          <div className="row">
                            <div className="col-lg-12">
                              <label className="title-col">Poll Type</label>
                             
                              <FormControl className="w-100">
                                {/* <FormLabel id="demo-radio-buttons-group-label">Create Poll</FormLabel> */}
                                <RadioGroup aria-labelledby="demo-radio-buttons-group-label" name="poll_type"  defaultValue={datadetail.poll_type} >
                                  <div className="row  mb-0">
                                    <div className="col-lg-3" style={{ maxWidth: "23%" }}>
                                      <FormControlLabel value="Public Poll"   control={<Radio />} label="Public Poll" onChange={(e) => (handleChangep_type(e))}  />
                                    </div>
                                    <div className="col-lg-3 text-end">
                                      <FormControlLabel value="Private Poll"  control={<Radio />} label="Private Poll" onChange={(e) => (handleChangep_type(e))}  />
                                    </div>
                                  </div>
                                </RadioGroup>
                              </FormControl>
                            </div>

                            <div className="col-lg-12 reletive mb-4">
                                <span className='react-select-title'>Match/League</span>
                                  <Select labelId="hminute" name="match_id" id="hminute" 
                                  defaultValue={{ label : datadetail.match, value: datadetail.match_id }}
                                  menuPortalTarget={document.body}
                                  onChange={handleMatchName}
                                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} options={matchOptions} />
                              </div>

                            <div className="col-lg-12 mb-2">
                              <label className="title-col">Poll Fee</label>
                              
                              {datadetail.fee_type == 'Paid' ?  
                              <>
                              <FormControl className="w-100">
                                <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue={datadetail.fee_type} name="fee_type">
                                  <div className="row  mb-2">
                                    <div className="col-lg-3" style={{ maxWidth: "21%" }}>
                                      <FormControlLabel value="Free"  control={<Radio />} label="Free"  onChange={(e) => (handleshowhide(e))} />
                                    </div>
                                    <div className="col-lg-3 text-end">
                                      <FormControlLabel value="Paid"  control={<Radio />} label="Paid" onChange={(e) => (handleshowhide(e))} />
                                    </div>
                                  </div>
                                </RadioGroup>
                              </FormControl>
                              
                                <div className="col-lg-12 p-0 mb-4" id="amountDiv">
                                    <FormControl fullWidth>
                                      <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                                      <OutlinedInput  id='reset-value' defaultValue={datadetail.amount} name='amount' startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                        label="Amount"
                                      />
                                    </FormControl>
                                  </div>
                               </>  : null  }

                               {datadetail.fee_type == 'Free' ? <>
                               <FormControl className="w-100">
                                <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue={datadetail.fee_type} name="fee_type">
                                  <div className="row  mb-2">
                                    <div className="col-lg-3" style={{ maxWidth: "21%" }}>
                                      <FormControlLabel value="Free"  control={<Radio />} label="Free"  onChange={(e) => (handleshowhide1(e))} />
                                    </div>
                                    <div className="col-lg-3 text-end">
                                      <FormControlLabel value="Paid"  control={<Radio />}  label="Paid" onChange={(e) => (handleshowhide1(e))} />
                                    </div>
                                  </div>
                                </RadioGroup>
                              </FormControl>
                              {
                                showhide1 === 'Paid' && (
                                  <div className="col-lg-12 p-0 mb-4" id="amountDiv">
                                    <FormControl fullWidth>
                                      <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                                      <OutlinedInput  id='reset-value' defaultValue="" name='amount' startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                        label="Amount"
                                      />
                                    </FormControl>
                                  </div>
                                 )}
                            
                               </> : null  }
                             

                            </div>


                            

                            <div className="col-lg-12 mb-2">
                              <label className="title-col">Result Type</label>
                              <FormControl className="w-100">
                                <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue={datadetail.result_type} name="result_type">
                                  <div className="row  mb-2">
                                    <div className="col-lg-3" style={{ maxWidth: "21%" }}>
                                      <FormControlLabel value="Disclosed" control={<Radio />} label="Disclosed" />
                                    </div>
                                    <div className="col-lg-3 text-end">
                                      <FormControlLabel value="Undisclosed" control={<Radio />} label="Undisclosed" />
                                    </div>
                                  </div>
                                </RadioGroup>
                              </FormControl>
                            </div>



                            <div className="col-lg-6 mb-4">
                              <label className="title-col mb-3">Appearance Time</label>
                              <div className="row">

                              <div className="col-lg-6 reletive mb-4">
                                <span className='react-select-title'>Minute</span>
                               <Select  defaultValue={{ label : datadetail.apperance_time.substring(0, 2), value: datadetail.apperance_time.substring(0, 2) }}
                                labelId="hminute" menuPortalTarget={document.body}
                                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}  id="hminute" 
                                onChange={handleChangeHminute} 
                                options={hminuteOptions} />

                              </div>
                              <div className="col-lg-6 reletive mb-4">
                                <span className='react-select-title'>Second</span>
                                <Select labelId="hminute" menuPortalTarget={document.body}
                                  defaultValue={{ label : datadetail.apperance_time.slice(-2), value: datadetail.apperance_time.slice(-2) }}
                                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} id="hminute" onChange={handleChangeHSecond}  options={hsecondOptions} />
                              </div>


                              </div>
                            </div>

                            <div className="col-lg-6 mb-4">
                              <label className="title-col mb-3">Duration</label>
                              <div className="row">

                              <div className="col-lg-6 reletive mb-4">
                                <span className='react-select-title'>Minute</span>
                                  <Select  
                                   defaultValue={{ label : datadetail.time_duration.substring(0, 2), value: datadetail.time_duration.substring(0, 2) }}
                                   menuPortalTarget={document.body}
                                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} labelId="hminute" id="hminute" 
                                onChange={handleChangeMinute} options={minuteOptions} />
                              </div>
                              <div className="col-lg-6 reletive mb-4">
                                <span className='react-select-title'>Second</span>
                                  <Select  menuPortalTarget={document.body}
                                  defaultValue={{ label : datadetail.time_duration.slice(-2), value: datadetail.time_duration.slice(-2) }}
                                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} labelId="hminute"  id="hminute" onChange={handleChangeSecond} options={secondOptions} />
                              </div>


                              </div>
                            </div>


                            <div className="col-lg-12 mb-3">
                              <label className="title-col mb-3">Send Notification</label>
                              <div className="row">
                             
                                <div className="col-lg-4">
                                  <FormGroup>
                                  { datadetail.noti_status == true ? <>
                                  <FormControlLabel name='noti_status'  onChange={(e) => notifun(e)}   control={<Checkbox defaultChecked /> } label="Push Notification" />
                                  </> : null }
                                  { datadetail.noti_status == false ? <>
                                  <FormControlLabel name='noti_status'  onChange={(e) => notifun(e)}   control={<Checkbox  /> } label="Push Notification" />
                                  </> : null }
                                  </FormGroup>

                                </div>
                                <div className="col-lg-4">
                                  <FormGroup>
                                  { datadetail.noti_in_App_status == true ? <>
                                    <FormControlLabel name='noti_in_App_status' onChange={(e) => notifunapp(e)} control={<Checkbox defaultChecked/>} label="In-App Notification" />
                                    </> : null }
                                    { datadetail.noti_in_App_status == false ? <>
                                    <FormControlLabel name='noti_in_App_status' onChange={(e) => notifunapp(e)} control={<Checkbox />} label="In-App Notification" />
                                    </> : null }
                                  </FormGroup>

                                </div>
                              </div>
                            </div>

                               

                            {/* <div className="col-lg-12 dnone" id="change-class"> */}
                            <div className="col-lg-12" id="change-class">
                              <div className="row">
                              <div className="col-lg-6 reletive mb-4">
                                <span className='react-select-title'>Select Sports</span>
                                <Select isMulti
                                    closeMenuOnSelect={false}
                                    // defaultValue = { sportsOpt.map((item) => {
                                    //   return (
                                    //    { value: sportsOpt, label: sportsOpt });
                                    //   }) }
                                    // defaultValue={userTechsForSelect[0]}
                                    name="sports"
                                    options={sportOptions}
                                    onChange={handleChangeSports}
                                    className="basic-multi-select"
                                    classNamePrefix="select" />
                            </div>

                       
                            <div className="col-lg-6 reletive mb-4">
                                <span className='react-select-title'>Select Leagues</span>
                                <Select isMulti
                                    closeMenuOnSelect={false}
                                    name="leagues" 
                                    options={leagueOptions}
                                    onChange={handleChangeLeagues}
                                    defaultValue={{ value: datadetail.sports}}
                                    className="basic-multi-select"
                                    classNamePrefix="select" />
                            </div>

                            <div className="col-lg-6 reletive mb-4">
                                <span className='react-select-title'>Select Teams</span>
                                <Select isMulti
                                    closeMenuOnSelect={false}
                                    name="teams"   
                                    options={teamOptions}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    defaultValue={{ value: team_lists._id, label: team_lists.name }}
                                    onChange={handleChangeTeam}
                                    />
                            </div>

                            <div className="col-lg-6 reletive mb-4">
                                <span className='react-select-title'>Select Players</span>
                                <Select isMulti
                                    closeMenuOnSelect={false}
                                    name="players"  
                                    defaultValue={{ value: player_lists._id, label: player_lists.name }}
                                    options={playersOptions}
                                    className="basic-multi-select"
                                    classNamePrefix="select" 
                                    onChange={handleChangePlayer}
                                    />
                            </div>
                              </div>
                            </div>



                            <div className="col-lg-12 mb-4">
                              <label className="title-col">Question <span className="text-blue">(English)</span></label>
                              <TextField id="filled-multiline-static" name='qus' label="Enter Question" multiline rows={4} fullWidth defaultValue={datadetail.qus} variant="filled" autoComplete="off" />
                            </div>

                            

                            <div className="col-lg-6 mb-4">
                            <label className="title-col">Answer 1 <span className="text-blue">(English)</span></label>
                              <TextField id="filled-basic" name='ops_1' fullWidth  defaultValue={datadetail.ops_1} label="Answer 1" variant="filled" autoComplete="off" />
                            </div>

                            <div className="col-lg-6 mb-4">
                            <label className="title-col">Answer 2 <span className="text-blue">(English)</span></label>
                              <TextField id="filled-basic1" name='ops_2' fullWidth  defaultValue={datadetail.ops_2} label="Answer 2" variant="filled" autoComplete="off" />
                            </div>

                            <div className="col-lg-6 mb-4">
                            <label className="title-col">Answer 3 <span className="text-blue">(English)</span></label>
                                    <TextField id="filled-basic1" name='ops_3' fullWidth label="Answer 3"  defaultValue={datadetail.ops_3} variant="filled" autoComplete="off" />
                                  </div>
                                  <div className="col-lg-6 mb-4">
                                  <label className="title-col">Answer 4 <span className="text-blue">(English)</span></label>
                                    <TextField id="filled-basic1" name='ops_4' fullWidth label="Answer 4"  defaultValue={datadetail.ops_4} variant="filled" autoComplete="off" />
                                  </div>
                                  <div className="col-lg-6 mb-4">
                                  <label className="title-col">Answer 5 <span className="text-blue">(English)</span></label>
                                    <TextField id="filled-basic1" name='ops_5' fullWidth label="Answer 5"  defaultValue={datadetail.ops_5} variant="filled" autoComplete="off" />
                                  </div>
                                  <div className="col-lg-6 mb-4"></div>

                                   {/* ////////////Arabic/////////// */}

                                   <div className="col-lg-12 mb-4">
                                 <label className="title-col">Question <span className="text-blue">(Arabic)</span></label>
                                    <TextField id="filled-multiline-static" defaultValue={datadetail.qus_ara} name='qus_ara' label="Enter Question" multiline rows={4} fullWidth  variant="filled" autoComplete="off" />
                                 </div>


                                  <div className="col-lg-6 mb-4">
                                  <label className="title-col">Answer 1 <span className="text-blue">(Arabic)</span></label>
                                  <TextField id="filled-basic" name='ops_1_ara' defaultValue={datadetail.ops_1_ara} fullWidth  label="Answer 1" variant="filled" autoComplete="off" />
                                </div>

                                <div className="col-lg-6 mb-4">
                                <label className="title-col">Answer 2 <span className="text-blue">(Arabic)</span></label>
                                  <TextField id="filled-basic1" name='ops_2_ara' defaultValue={datadetail.ops_2_ara} fullWidth   label="Answer 2" variant="filled" autoComplete="off" />
                                </div>

                                <div className="col-lg-6 mb-4">
                                <label className="title-col">Answer 3 <span className="text-blue">(Arabic)</span></label>
                                    <TextField id="filled-basic1" name='ops_3_ara'  defaultValue={datadetail.ops_3_ara} fullWidth label="Answer 3"   variant="filled" autoComplete="off" />
                                  </div>
                                  <div className="col-lg-6 mb-4">
                                  <label className="title-col">Answer 4 <span className="text-blue">(Arabic)</span></label>
                                    <TextField id="filled-basic1" name='ops_4_ara' defaultValue={datadetail.ops_4_ara} fullWidth label="Answer 4"   variant="filled" autoComplete="off" />
                                  </div>
                                  <div className="col-lg-6 mb-4">
                                  <label className="title-col">Answer 5 <span className="text-blue">(Arabic)</span></label>
                                    <TextField id="filled-basic1" name='ops_5_ara' defaultValue={datadetail.ops_5_ara} fullWidth label="Answer 5"  variant="filled" autoComplete="off" />
                                  </div>



                            <div className="col-lg-12 mb-4">
                                   <FormGroup className="mb-3">
                                    <FormControlLabel name=''  onChange={(e) => rewardfun(e)} control={<Checkbox />} label="Rewards" />
                                  </FormGroup>

                                 
                            
                             <div className="row" id="rewards1">
                          
                                  <div className="col-lg-6 reletive mt-2">
                                <span className='react-select-title'>Select Rewards Type</span>
                                  <Select labelId="rewards"  id="rewards" defaultValue={{ label : datadetail.reward_type, value: datadetail.reward_type }} name='reward_type'  options={rewardsOptions} />
                              </div>

                              <div className="col-lg-6 mb-4">
                              <TextField id="filled-basic" name='reward_quantity'  defaultValue={datadetail.reward_quantity} fullWidth label="Enter Rewards" variant="filled" autoComplete="off" />
                            </div>
                             </div>

                            </div>

                            <div className="col-lg-12 text-end">
                              <Button type='submit' className="mr-3 btn-pd btnBg">Update</Button>
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
            : ''}
          </div>

        </div>

      </div>
      <ToastContainer position="top-right" />
    </>
  )
}


