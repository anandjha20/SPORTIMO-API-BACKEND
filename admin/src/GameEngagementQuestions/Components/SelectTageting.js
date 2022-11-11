import React from 'react';
import Select from 'react-select';

import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

              
export default function SelectTageting() {
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
    
    
    
    
      useEffect(() => {
        get_data('/web_api/sport_list',setSport_lists);
        get_data('/web_api/league_list',setLeague_lists);
        get_data('/web_api/team_list',setTeam_lists);
        get_data('/web_api/player_list',setPlayer_lists);
        get_data('/web_api/country_list',setCountry_lists);


        // 👇 add class to body element
        document.body.classList.add('bg-salmon');
    
      }, []);
    
      

    const sportOptions = (sport_lists.length >0) ? sport_lists.map((item)=>{
        return  { value: item._id, label: item.name };
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
    
    
    const countryOptions = (country_lists.length >0) ? country_lists.map((item)=>{
        return  { value: item._id, label: item.name };
    }) :[];
    
    const selectChange = (e,type)=>{
        console.log(e.currentTarget);
        alert(" ==jk==  "+type);
    }
    

    return (
        <>

            <div className="col-lg-6 reletive mb-4">
                <span className='react-select-title'>Select Sports</span>
                <Select isMulti
                    closeMenuOnSelect={false}
                    name="targeted_sport"
                    //value={selected_soprt}
                  ///  onChange = {(e)=>selectChange( e,'sport')}
                

                    options={sportOptions}
                    className="basic-multi-select"
                    classNamePrefix="select" />
            </div>

            <div className="col-lg-6 reletive mb-4">
                <span className='react-select-title'>Select League</span>
                <Select isMulti
                    closeMenuOnSelect={false}
                    name="targeted_league" 
                    options={leagueOptions}
                    className="basic-multi-select"
                    classNamePrefix="select" />
            </div>

            <div className="col-lg-6 reletive mb-4">
                <span className='react-select-title'>Select Team</span>
                <Select isMulti
                    closeMenuOnSelect={false}
                    name="targeted_team"   
                    options={teamOptions}
                    className="basic-multi-select"
                    classNamePrefix="select" />
            </div>

            <div className="col-lg-6 reletive mb-4">
                <span className='react-select-title'>Select Players</span>
                <Select isMulti
                    closeMenuOnSelect={false}
                    name="targeted_player"  
                    options={playersOptions}
                    className="basic-multi-select"
                    classNamePrefix="select" />
            </div>

            <div className="col-lg-12  mb-4">
                <label className="title-col mb-2">Targeted Country</label>
             </div>
              <div className='reletive col-lg-12'>
                <span className='react-select-title'>Select Country</span>
                
                <Select isMulti
                    closeMenuOnSelect={false}
                    name="" 
                    options={countryOptions}
                    className="basic-multi-select"
                    classNamePrefix="select" />

                    <input type="hidden" name="targeted_country" value="india" />
            </div>

        </>
    );
}
