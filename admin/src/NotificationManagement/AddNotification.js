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
import { useNavigate } from 'react-router-dom';
import InputEmoji from 'react-input-emoji'

export default function AddNotification(props) {



    const [notis, setNotis] = React.useState(0);
    const [innotis, setInnotis] = React.useState(0);
    const [reward, setReward] = React.useState(0);

    const notifun = (event) => {
        if (notis == 1) {
            setNotis(0);
        }
        if (notis == 0) {
            setNotis(1);
        }
        return false;
    };

    const notifunapp = (event) => {
        if (innotis == 1) {
            setInnotis(0);
        }
        if (innotis == 0) {
            setInnotis(1);
        }
        return false;
    };



    const myFormData = async (e) => {
        e.preventDefault();

        try {

            const data = new FormData(e.target);
            let Formvlaues = Object.fromEntries(data.entries());
            console.log("form data is == ", Formvlaues);

            Formvlaues.type_status = notis;

            Formvlaues.country = countryArray;

            Formvlaues.leagues = leaguesArray;
            Formvlaues.sports = sportsArray;
            Formvlaues.teams = teamArray;
            
            
            let token = localStorage.getItem("token");
            let header = ({ 'token': `${token}` });
            let options1 = ({ headers: header });
            let response = await axios.post('/web_api/addNotification', Formvlaues, options1);
            
            if (response.status) {
                let data = response.data;
                if (data.status) {
                    // navigate(`/poll`);
                    toast.success(data.msg);
                    e.target.reset();

            
                } else {
                    toast.error(data.msg);
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
    useEffect(() => {
        get_data('/web_api/sport_list', setSport_lists);
        get_data('/web_api/league_list_dropDown', setLeague_lists);
        get_data('/web_api/team_list_dropDown', setTeam_lists);
        get_data('/web_api/country_list', setCountry_lists);
        document.body.classList.add('bg-salmon');
    }, []);

    const sportOptions = (sport_lists.length > 0) ? sport_lists.map((item) => {
        return { value: item._id, label: item.name };
    }) : [];

    const leagueOptions = (league_lists.length > 0) ? league_lists.map((item) => {
        return { value: item.season_id, label: item.original_name_sportimo };
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

    ///////select Player ///////////
    const [plrArray, setselectedOptions] = React.useState()
    const handleChangePlayer = (selectedOptions) => {
        const plrArray = [];
        selectedOptions.map(item => plrArray.push(item.label)
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

    ///////select Leagues ///////////
    const [leaguesArray, setleaguesOptionsarry] = React.useState([])
    const handleChangeLeagues = (leaguesOptionsarry) => {
        console.log(leaguesOptionsarry)
        const leaguesArray = [];
        leaguesOptionsarry.map(item => leaguesArray.push(item.value)
        );
        setleaguesOptionsarry(leaguesArray);
    }

    ///////select Sports ///////////
    const [sportsArray, setsportsOptionsarry] = React.useState()
    const handleChangeSports = (SportsOptionsarry) => {
        const sportsArray = [];
        SportsOptionsarry.map(item => sportsArray.push(item.label)
        );
        setsportsOptionsarry(sportsArray);
    }

    ///////select countryArray ///////////
    const [countryArray, setCountry] = React.useState([])
    const handleChangeCountry = (CountryOptionsarry) => {
        const countryArray = [];
        CountryOptionsarry.map(item => countryArray.push(item.label)
        );
        setCountry(countryArray);
    }




    return (
        <>

            <Header />

            <div className="main-content side-content pt-0">
                <div className="container-fluid">
                    <div className="inner-body">

                        <div className="page-header">
                            <div>
                                <h2 className="main-content-title tx-24 mg-b-5">Add Notification </h2>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/home">Home</Link>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">&nbsp;&nbsp;Notification Management</li>
                                </ol>
                            </div>
                            <div className="d-flex">
                                <div className="justify-content-center">
                                    <Link to="/notification" className="btn-link">
                                        <i className="fal fa-angle-double-left"></i>&nbsp; Back
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
                                                        <div className="col-lg-12 mb-4">
                                                            <label className="title-col">Title <span className="text-blue">(English)</span></label>
                                                            <TextField id="filled-multiline-static" name='title' label="Enter Title" multiline rows={1} fullWidth defaultValue="" variant="filled" autoComplete="off" />

                                                        </div>
                                                      
                                                        <div className="col-lg-12 mb-4">
                                                            <label className="title-col">Message <span className="text-blue">(English)</span></label>
                                                            <TextField id="filled-multiline-static" name='message' label="Enter Message" multiline rows={4} fullWidth defaultValue="" variant="filled" autoComplete="off" />

                                                        </div>

                                                        {/* ////////add message Arabic////////////// */}
                                                        <div className="col-lg-12 mb-4">
                                                            <label className="title-col">Title <span className="text-blue">(Arabic)</span></label>
                                                            <TextField id="filled-multiline-static" name='title_ara' label="Enter Title" multiline rows={1} fullWidth defaultValue="" variant="filled" autoComplete="off" />

                                                        </div>
                                                        <div className="col-lg-12 mb-4">
                                                            <label className="title-col">Message <span className="text-blue">(Arabic)</span></label>
                                                            <TextField id="filled-multiline-static" name='message_ara' label="Enter Message" multiline rows={4} fullWidth defaultValue="" variant="filled" autoComplete="off" />

                                                        </div>
                                                        {/* ////////add message french////////////// */}
                                                        <div className="col-lg-12 mb-4">
                                                            <label className="title-col">Title <span className="text-blue">(French)</span></label>
                                                            <TextField id="filled-multiline-static" name='title_fr' label="Enter Title" multiline rows={1} fullWidth defaultValue="" variant="filled" autoComplete="off" />

                                                        </div>
                                                        <div className="col-lg-12 mb-4">
                                                            <label className="title-col">Message <span className="text-blue">(French)</span></label>
                                                            <TextField id="filled-multiline-static" name='message_fr' label="Enter Message" multiline rows={4} fullWidth defaultValue="" variant="filled" autoComplete="off" />

                                                        </div>
                                                        <div className="col-lg-12 mb-3">
                                                            <label className="title-col mb-3">Send Notification</label>
                                                            <div className="row">

                                                                <div className="col-lg-4">
                                                                    <FormGroup>
                                                                        <FormControlLabel name='type_status' onChange={(e) => notifun(e)} control={<Checkbox />} label="Push Notification" />
                                                                    </FormGroup>

                                                                </div>
                                                                <div className="col-lg-4">
                                                                    <FormGroup>
                                                                        <FormControlLabel onChange={(e) => notifunapp(e)} control={<Checkbox />} label="In-App Notification" />
                                                                    </FormGroup>

                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-lg-12">
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

                                                                {/* <div className="col-lg-6 reletive mb-4">
                                                                    <span className='react-select-title'>Select Players</span>
                                                                    <Select isMulti
                                                                        closeMenuOnSelect={false}
                                                                        name="players"
                                                                        options={playersOptions}
                                                                        className="basic-multi-select"
                                                                        classNamePrefix="select"
                                                                        onChange={handleChangePlayer}
                                                                    />
                                                                </div> */}
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-12  mb-3">
                                                            <label className="title-col mb-1">Targeted Country</label>
                                                        </div>
                                                        <div className='reletive col-lg-12 mb-4'>
                                                            <span className='react-select-title'>Select Country</span>
                                                            <Select isMulti
                                                                closeMenuOnSelect={false}
                                                                name="country"
                                                                onChange={handleChangeCountry}
                                                                options={countryOptions}
                                                                className="basic-multi-select"
                                                                classNamePrefix="select" />
                                                        </div>


                                                        <div className="col-lg-12 text-end">
                                                            <Button type='submit' className="mr-3 btn-pd btnBg">Submit</Button>
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

            </div>
            <ToastContainer position="top-right" />
        </>
    )
}


