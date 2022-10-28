import React from 'react';
import Select from 'react-select';

import { useState,useEffect } from "react";
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

              

export default function SelectTageting() {

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
        return  { value: item._id, label: item.name };
    }) :[];
    

    const leagueOptions = (league_lists.length >0) ? league_lists.map((item)=>{
        return  { value: item._id, label: item.league_name };
    }) :[];
    
    
    const teamOptions = (team_lists.length >0) ? team_lists.map((item)=>{
        return  { value: item._id, label: item.team_name };
    }) :[];
    
    
    
    const playersOptions = (player_lists.length >0) ? player_lists.map((item)=>{
        return  { value: item._id, label: item.team_name };
    }) :[];
    
    
    
    const selectChange = (e,type)=>{
        console.log(e.currentTarget);
        alert(" ==jk==  "+type);
    }


    const [catArray, setselectedOptions] = React.useState([]);

    const handleChangePlayer = (selectedOptions) => {
      const catArray = [];
      selectedOptions.map(item =>  catArray.push(item.value)
     );
    
     setselectedOptions(catArray.join(','));
     console.log(catArray.join(','));
  }
    

  

    return (
        <>





        <div className='row'>

            <div className="col-lg-6 reletive mb-4">
                <span className='react-select-title'>Select Sports</span>
                <Select isMulti
                    closeMenuOnSelect={false}
                    name="sports"
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
                    name="leagues" 
                    options={leagueOptions}
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
                    classNamePrefix="select" />
            </div>

            <div className="col-lg-6 reletive mb-4">
                <span className='react-select-title'>Select Players</span>
                <Select isMulti
                    closeMenuOnSelect={false}
                    name="players"  
                    options={playersOptions}
                    className="basic-multi-select"
                    classNamePrefix="select" 
                    onChange={handleChangePlayer}
                    />
            </div>

            
            </div>
        </>
    );
}
