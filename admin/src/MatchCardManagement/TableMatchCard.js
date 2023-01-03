import React from "react";
import Header from "../Header";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import MaterialTable from 'material-table';
import { useState, useEffect } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import Select from 'react-select'; 
import ReactPaginate from "react-paginate";
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
function TableMatchCard() {

    
    const token = localStorage.getItem("token");
    const header = ({ 'token': `${token}` });
    const options = ({ headers: header });

    const [value, setValue] = useState("");
    const [match_name, setMatch_name] = useState("");
    const [match_id, setMatch_id] = useState("");
    const [matchname, setMatch] = useState([]);
    const setMatchData = (item) => {
        let match_id=item.value;
        let match_name=item.label;
        setValue(item);
        setMatch_name(match_name);
        setMatch_id(match_id);
        
}

    const SelectMatch = async () =>
    {
        axios.post(`/web_api/live_upcoming_match_list`)
        .then(res => {
            const matchname = res.data.body;
            setMatch(matchname);
            console.log(matchname); 
        })
    }
    useEffect(() => {
        SelectMatch();
    }, []);

    const SelectMatchOption = (matchname.length > 0) ? matchname.map((item) => {
       return { value: item._id, label: item.match_name };
   }) : [];



    const [pageCount, setpageCount] = useState('');
    const [cardData, setCardData] = useState([]);
    const [teamA, setTeamA] = useState([]);
    const [teamB, setTeamB] = useState([]);
    const formsave = async (e)=>{
        e.preventDefault();
          const data = new FormData(e.target);
         const Formvlaues = Object.fromEntries(data.entries());
          let demodata={"match_id":"635cc5d0f1943a31ef50c4f2"}
            console.log('value === ', value);
            await axios.post(`/web_api/card_list_by_match/${match_id}`)
           .then(res => {
               const data1 = res.data.body;
               const team_a = res.data.team_data.team_a_name;
               const team_b = res.data.team_data.team_b_name;
               
               setTeamA(team_a)
               setTeamB(team_b)
               setCardData(data1);
           })
          
     }



    const [data, setData] = useState([])
    const MatchcardList = async () => {
       const setdaata = {}
        await axios.post(`/web_api/card_list_by_match/${match_id}`, setdaata, options)
            .then(res => {
                 const userData = res.data.body;
                 setCardData(userData)
            })
    }
    
    const columns =
        [
            // { title: 'Card Icon', render : rowData => <><img src={rowData.image} alt="card icon" width="60px" /></> },
            { title: 'Match/league', field: 'match_name' },
            { title: 'Card Name', render : rowData => <>{rowData.card_id.name}</> },
            { title: 'Card Type ', render : rowData => <>{rowData.card_id.card_type}</> },
            { title: 'Appearance Time', field: 'apperance_times' },
            { title: 'Time Duration', field: 'time_duration' },
            // { title: 'Question (Arabic)', field: 'qus_ara' },
        ]

        const navigate = useNavigate();

        const viewFun = (_id, rowData) => {
            navigate(`/matchcard/update/${_id}`, {state:{rowData}});
            return false;
        }    

        const [catViewAdd, setCatAdd] = useState([])
        const [openAdd, setOpenAdd] = useState(false);
        /////////////////view complaint detail/////////////////
    
        const onOpenModalAdd = (item) => {
                    setCatAdd(item)
                    setOpenAdd(true);
                
            }
        
        const onCloseModalAdd = () => setOpenAdd(false);    

    ///////////////// add match card/////////////////
    const saveFormDataAdd = async (e) => {
        e.preventDefault();
    
        try {
    
          const data = new FormData(e.target);
          let Formvlaues = Object.fromEntries(data.entries());
          let min=minute==''?"00":minute;
          let sec=second==''?"00":second
          let hmin=hminute==''?"00":hminute;
          let hsec=hsecond==''?"00":hsecond
          Formvlaues.time_duration = min + ':' + sec;
          Formvlaues.apperance_times = hmin + ':' + hsec;
          Formvlaues.match_name = match_name;
          console.log("form data is == ", Formvlaues);
          
          let token = localStorage.getItem("token");
          let header = ({ 'token': `${token}` });
          let options1 = ({ headers: header });
          let response = await axios.post('/web_api/match_card_add', Formvlaues, options1);
          console.log('my fun call', response);
          if (response.status) {
            let data = response.data;
            if (data.status) {
                setOpenAdd(false); 
                
                toast.success(data.msg);
                return MatchcardList();
            } else {
              toast.error(data.msg);
            }
          }
          else {
            toast.error(data.msg);
          }
    
        } catch (err) { console.error(err); toast.error('some errror'); return false; }
    
    
      }
    





  /////////////////delete api call /////////////////
  const deleteCategory = (_id) => {
    Swal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Remove it!'
      }).then((result) => {
        if (result.isConfirmed) {         
            axios.delete(`/web_api/match_card_delete/${_id}`)
            .then(res => {
                if (res.status) {
                    let data = res.data;
                    if (data.status) { 
                        Swal.fire(
                            'Removed!',
                             data.msg,
                            'success'
                          )
                         return MatchcardList();
                    } else {
                        toast.error(data.msg);
                    }
                }
                else {
                    toast.error(data.msg);
                }
            })
        }
      })
}

    ///////////////pagenestion///////////////
    const fetchComments = async (page) => {
        const senData = { page: page }
        // const cosole = Fromvalue;
        // console.log(Fromvalue);
        axios.post(`/web_api/poll_list`, senData,  options)
            .then(res => {
                const data = res.data.body;
                setData(data);
            })
        return data;
    };

    const handlePageClick = async (data) => {
        // console.log(data.selected);
        const page = data.selected + 1;
        const commentsFormServer = await fetchComments(page);
        setData(commentsFormServer);
    };

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
    
    
    const hminuteOptions = [
      { value: '00', label: '00' },
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
      { value: '60', label: '60' },
    
    
      { value: '61', label: '61' },
      { value: '62', label: '62' },
      { value: '63', label: '63' },
      { value: '64', label: '64' },
      { value: '65', label: '65' },
      { value: '66', label: '66' },
      { value: '67', label: '67' },
      { value: '68', label: '68' },
      { value: '69', label: '69' },
      { value: '70', label: '70' },
    
      
      { value: '71', label: '71' },
      { value: '72', label: '72' },
      { value: '73', label: '73' },
      { value: '74', label: '74' },
      { value: '75', label: '75' },
      { value: '76', label: '76' },
      { value: '77', label: '77' },
      { value: '78', label: '78' },
      { value: '79', label: '79' },
      { value: '80', label: '80' },
    
        
      { value: '81', label: '81' },
      { value: '82', label: '82' },
      { value: '83', label: '83' },
      { value: '84', label: '84' },
      { value: '85', label: '85' },
      { value: '86', label: '86' },
      { value: '87', label: '87' },
      { value: '88', label: '88' },
      { value: '89', label: '89' },
    
    
    ]
    
    const hsecondOptions = [
      { value: '00', label: '00' },
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
      
    ]
    
    const minuteOptions = [
      { value: '00', label: '00' },
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
      { value: '60', label: '60' },
    
    
      { value: '61', label: '61' },
      { value: '62', label: '62' },
      { value: '63', label: '63' },
      { value: '64', label: '64' },
      { value: '65', label: '65' },
      { value: '66', label: '66' },
      { value: '67', label: '67' },
      { value: '68', label: '68' },
      { value: '69', label: '69' },
      { value: '70', label: '70' },
    
      
      { value: '71', label: '71' },
      { value: '72', label: '72' },
      { value: '73', label: '73' },
      { value: '74', label: '74' },
      { value: '75', label: '75' },
      { value: '76', label: '76' },
      { value: '77', label: '77' },
      { value: '78', label: '78' },
      { value: '79', label: '79' },
      { value: '80', label: '80' },
    
        
      { value: '81', label: '81' },
      { value: '82', label: '82' },
      { value: '83', label: '83' },
      { value: '84', label: '84' },
      { value: '85', label: '85' },
      { value: '86', label: '86' },
      { value: '87', label: '87' },
      { value: '88', label: '88' },
      { value: '89', label: '89' },
    ]
    const secondOptions = [
      { value: '00', label: '00' },
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
    ]
    
    const [catView, setCat] = useState([])
    const [match_card_data, setmatch_card_data] = useState([])
    const [open, setOpen] = useState(false);
    /////////////////view complaint detail/////////////////

    const onOpenModal = (item) => {
                let match_card_data=item.match_card_data
                const hminute = match_card_data.apperance_times.substring(0, 2);
                const hsinute = match_card_data.apperance_times.slice(-2);
            
                const minute = match_card_data.time_duration.substring(0, 2);
                const second = match_card_data.time_duration.slice(-2);
            
                setHminute(hminute);
                setHSecond(hsinute);
                setMinute(minute);
                setSecond(second);
            
                setCat(item);
                setOpen(true);
                setmatch_card_data(match_card_data);
                console.log(match_card_data);
            
        }
    
    const onCloseModal = () => setOpen(false);    

///////////////// Update match card/////////////////
const saveFormData = async (e) => {
    e.preventDefault();

    try {

      const data = new FormData(e.target);
      let Formvlaues = Object.fromEntries(data.entries());
      console.log("form data is == ", Formvlaues);
      let min=minute==''?"00":minute;
      let sec=second==''?"00":second
      let hmin=hminute==''?"00":hminute;
      let hsec=hsecond==''?"00":hsecond
      Formvlaues.time_duration = min + ':' + sec;
      Formvlaues.apperance_times = hmin + ':' + hsec;
        
      let token = localStorage.getItem("token");
      let header = ({ 'token': `${token}` });
      let options1 = ({ headers: header });
      let response = await axios.put(`/web_api/match_card_update/${match_card_data._id}`, Formvlaues, options1);
      console.log('my fun call', response);
      if (response.status) {
        let data = response.data;
        if (data.status) {
           
          toast.success(data.msg);
          setHminute('');
          setHSecond('');
          setMinute('');
          setSecond('');
          setOpen(false);
      console.log({minute,second,hminute,hsecond})

          return MatchcardList();
        } else {
          toast.error(data.msg);
        }
      }
      else {
        toast.error(data.msg);
      }

    } catch (err) { console.error(err); toast.error('some errror'); return false; }

    }


    return (
        <>
            <Header />
            <ToastContainer />
            <div className="main-content side-content pt-0">
                <div className="container-fluid">
                    <div className="inner-body">

                        <div className="page-header">
                            <div>
                                <h2 className="main-content-title tx-24 mg-b-5">Match Card</h2>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/home">Home</Link>
                                    </li>

                                    <li className="breadcrumb-item active" aria-current="page">&nbsp;&nbsp;Match Card</li>
                                </ol>
                            </div>
                            
                        </div>
                        <div className="card custom-card">
                            <div className="card-body">
                                <form onSubmit={(e)=>formsave(e)}>
                                <div className="row align-items-center">
                                    <div className="col-lg-4 reletive mb-3">
                                        <span className="react-select-title">Match Name</span>
                                        <Select  name='match_id' onChange={setMatchData} 
                                            options={SelectMatchOption}
                                            className="basic-multi-select"
                                            classNamePrefix="select" />

                                    </div>
                                    <div className="col-lg-4 mb-3 d-flex">
                                        <Button type='submit' variant="contained" className="mr-3 btn-filter btnBg">Search</Button>
                                        
                                    </div>
                                </div>
                                </form>
                            </div>
                        </div>


                        <div className="row">
                <div className="col-lg-12">
                    <div className="table-card MuiPaper-root MuiPaper-elevation2 MuiPaper-rounded">
                        <h6 className="MuiTypography-root MuiTypography-h6 padd1rem">Prediction Card List</h6>
                        <table className="table ">
                            <thead>
                                <tr>
                                    <th scope="col">Card Name</th>
                                    <th scope="col">Card Type</th>
                                    <th scope="col">Question</th>
                                    <th scope="col">Appearance Time</th>
                                    <th scope="col">Duration</th>
                                    <th scope="col">&nbsp;&nbsp;&nbsp;&nbsp;Status</th>
                                    <th scope="col" className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                              {cardData == '' ? <>
                               <tr>
                               <td className="text-center" colSpan='9'> 
                               <span>No Cards available!</span> </td>
                               </tr>
                               </> : null}
                                {cardData.map((item) => {
                                    return (
                                        <tr key={item._id}>
                                            <td>{item.name}</td>
                                            <td>{item.card_type}</td>
                                            <td>{item.qus}</td>
                                            <td>{item.match_card_data==null?null:item.match_card_data.apperance_times}</td>
                                            <td>{item.match_card_data==null?null:item.match_card_data.time_duration}</td>
                                            <td className="text-center">{item.match_card_data==null?    <>
                                                <Button onClick={() => { onOpenModalAdd(item)}} className="mr-3 btn-pd btnBg">&nbsp;&nbsp;Add&nbsp;</Button>
                                               </>
                                            :
                                               <>
                                               <Button onClick={() => {deleteCategory(item.match_card_data._id) }} className="mr-3 btn-pd deactive text-white">Remove</Button>
                                               </>}
                                            </td>
                                            <td className="text-end">{item.match_card_data==null?<><div className="d-flex justtify-content-end">
                                                    <IconButton disabled onClick={(e) => { onOpenModal(item._id); }} aria-label="edit">
                                                        <span className="material-symbols-outlined">
                                                            edit </span>
                                                    </IconButton>
                                                </div></>:
                                                <div className="d-flex justtify-content-end">
                                                    <IconButton onClick={(e) => { onOpenModal(item) }} aria-label="edit">
                                                        <span className="material-symbols-outlined">
                                                            edit </span>
                                                    </IconButton>
                                                </div>}
                                            </td>
                                        </tr>
                                    );


                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-lg-12 mt-2 text-end">
                        <ReactPaginate
                            previousLabel={"previous"}
                            nextLabel={"next"}
                            breakLabel={"..."}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={3}
                            onPageChange={handlePageClick}
                            containerClassName={"pagination justify-content-end"}
                            pageClassName={"page-item"}
                            pageLinkClassName={"page-link"}
                            previousClassName={"page-item"}
                            previousLinkClassName={"page-link"}
                            nextClassName={"page-item"}
                            nextLinkClassName={"page-link"}
                            breakClassName={"page-item"}
                            breakLinkClassName={"page-link"}
                            activeClassName={"active"}
                        />
                    </div>

                    <Modal open={open} onClose={onCloseModal} center>
                    <h2 className="mb-4 text-white">Match Card Update</h2>
                                                
                                                <div className="mx-500">
                                                    <form className="mt-3 w-100" onSubmit={(e) => saveFormData(e)}>
                                                    <div className="row">
                                                        
                                                        <div className="col-lg-12 mb-3">
                                                        <label className="title-col mb-0">Question </label>
                                                        <input disabled type='text' autoComplete="off" defaultValue={catView.qus}  placeholder="Enter Point" className=" form-control" />
                                                        </div>

                                                        <div className="col-lg-6 mb-3">
                                                        <label className="title-col mb-0">Option 1 </label>
                                                        <input disabled type='text' autoComplete="off" defaultValue={catView.ops_1=="Team A"?teamA:catView.ops_1=="Team B"?teamB:catView.ops_1}  placeholder="Enter Point" className=" form-control" />
                                                        </div>

                                                        <div className="col-lg-6 mb-3">
                                                        <label className="title-col mb-0">Points For Option 1 </label>
                                                        <input type='number' autoComplete="off" defaultValue={match_card_data.point_1} name="point_1"  placeholder="Enter Point" className=" form-control" />
                                                        </div>

                                                        <div className="col-lg-6 mb-3">
                                                        <label className="title-col mb-0">Option 2 </label>
                                                        <input disabled type='text' autoComplete="off" defaultValue={catView.ops_2=="Team A"?teamA:catView.ops_2=="Team B"?teamB:catView.ops_2}  placeholder="Enter Point" className=" form-control" />
                                                        </div>

                                                        <div className="col-lg-6 mb-3">
                                                        <label className="title-col mb-0">Points For Option 2</label>
                                                        <input type='number' autoComplete="off" defaultValue={match_card_data.point_2} name="point_2"  placeholder="Enter Point" className=" form-control" />
                                                        </div>
                                                        {catView.ops_3!=""?<>
                                                        <div className="col-lg-6 mb-3">
                                                        <label className="title-col mb-0">Option 3 </label>
                                                        <input disabled type='text' autoComplete="off" defaultValue={catView.ops_3=="Team A"?teamA:catView.ops_3=="Team B"?teamB:catView.ops_3}  placeholder="Enter Point" className=" form-control" />
                                                        </div>
                                                        <div className="col-lg-6 mb-3">
                                                        <label className="title-col mb-0">Points For Option 3</label>
                                                        <input type='number' autoComplete="off" defaultValue={match_card_data.point_3} name="point_3"  placeholder="Enter Point" className=" form-control" />
                                                        </div></>:null}
                                                        {catView.ops_4!=""?<>
                                                        <div className="col-lg-6 mb-3">
                                                        <label className="title-col mb-0">Option 4 </label>
                                                        <input disabled type='text' autoComplete="off" defaultValue={catView.ops_4=="Team A"?teamA:catView.ops_4=="Team B"?teamB:catView.ops_4}   placeholder="Enter Point" className=" form-control" />
                                                        </div>
                                                        <div className="col-lg-6 mb-3">
                                                        <label className="title-col mb-0">Points For Option 4</label>
                                                        <input type='number' autoComplete="off" defaultValue={match_card_data.point_4} name="point_4"  placeholder="Enter Point" className=" form-control" />
                                                        </div></>:null}

                                                    
                                                        <div className="col-lg-12 mb-0">
                                                        <label className="title-col mb-2">Appearance Time</label>
                                                        <div className="row">

                                                            <div className="col-lg-6 reletive mb-3">
                                                            <span className='title-col'>Minute</span>
                                                            <Select labelId="hminute" className="card-select" menuPortalTarget={document.body}
                                                              defaultValue={{ label : match_card_data.apperance_times==undefined?null:match_card_data.apperance_times.substring(0, 2), value: match_card_data.apperance_times==undefined?null:match_card_data.apperance_times.substring(0, 2) }}
                                                              styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} id="hminute" onChange={handleChangeHminute} options={hminuteOptions} />
                                                            </div>
                                                            <div className="col-lg-6 reletive mb-3">
                                                            <span className='title-col'>Second</span>
                                                            <Select labelId="hminute" className="card-select" menuPortalTarget={document.body}
                                                              defaultValue={{ label : match_card_data.apperance_times==undefined?null:match_card_data.apperance_times.slice(-2), value: match_card_data.apperance_times==undefined?null:match_card_data.apperance_times.slice(-2) }}
                                                              styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} id="hminute" onChange={handleChangeHSecond} options={hsecondOptions} />
                                                            </div>

                                                        </div>
                                                        </div>

                                                        <div className="col-lg-12 mb-3">
                                                        <label className="title-col mb-2"> Time-Duration</label>
                                                        <div className="row">

                                                            <div className="col-lg-6 reletive mb-3">
                                                            <span className='title-col'>Minute</span>
                                                            <Select menuPortalTarget={document.body} className="card-select"
                                                              defaultValue={{ label : match_card_data.time_duration==undefined?null:match_card_data.time_duration.substring(0, 2), value: match_card_data.time_duration==undefined?null:match_card_data.time_duration.substring(0, 2) }}
                                                              styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} labelId="hminute" id="hminute" onChange={handleChangeMinute} options={minuteOptions} />
                                                            </div>
                                                            <div className="col-lg-6 reletive mb-3">
                                                            <span className='title-col'>Second</span>
                                                            <Select menuPortalTarget={document.body} className="card-select"
                                                              defaultValue={{ label : match_card_data.time_duration==undefined?null:match_card_data.time_duration.slice(-2), value: match_card_data.time_duration==undefined?null:match_card_data.time_duration.slice(-2) }}
                                                              styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} labelId="hminute" id="hminute" onChange={handleChangeSecond} options={secondOptions} />
                                                            </div>


                                                        </div>
                                                        </div>





                                                        <div className="col-lg-6 ">
                                                        <input type='text' hidden autoComplete="off" defaultValue={match_id} name="match_id"  placeholder="Enter Point" className="card-control form-control" />
                                                        </div>

                                                        <div className="col-lg-6 ">
                                                        <input type='text' hidden autoComplete="off" defaultValue={catViewAdd._id} name="card_id"  placeholder="Enter Point" className="card-control form-control" />
                                                        </div>

                                                    
                                                

                                                        <div className="col-lg-12 text-start">
                                                        <Button type='submit' className="mr-3 btn-pd btnBg">Submit</Button>
                                                        <Button type='reset' variant="contained" className="btn btn-dark btn-pd">Reset</Button>
                                                        </div>

                                                    </div>
                                                    </form>
                                                </div>
                            </Modal>

                            <Modal open={openAdd} onClose={onCloseModalAdd} center>
                                                <h2 className="mb-4 text-white">Add Match Card</h2>
                                                
                                                <div className="mx-500">
                                                    <form className="mt-3 w-100" onSubmit={(e) => saveFormDataAdd(e)}>
                                                    <div className="row">
                                                        
                                                        
                                                    <div className="col-lg-12 mb-3">
                                                        <label className="title-col mb-0">Question </label>
                                                        <input disabled type='text' autoComplete="off" defaultValue={catViewAdd.qus}  placeholder="Enter Point" className=" form-control" />
                                                        </div>

                                                        <div className="col-lg-6 mb-3">
                                                        <label className="title-col mb-0">Option 1 </label>
                                                        <input disabled type='text' autoComplete="off" defaultValue={catViewAdd.ops_1=="Team A"?teamA:catViewAdd.ops_1=="Team B"?teamB:catViewAdd.ops_1}  placeholder="Enter Point" className=" form-control" />
                                                        </div>

                                                        <div className="col-lg-6 mb-3">
                                                        <label className="title-col mb-0">Points For Option 1 </label>
                                                        <input type='number' autoComplete="off" defaultValue={catViewAdd.point_1} name="point_1"  placeholder="Enter Point" className=" form-control" />
                                                        </div>

                                                        <div className="col-lg-6 mb-3">
                                                        <label className="title-col mb-0">Option 2 </label>
                                                        <input disabled type='text' autoComplete="off" defaultValue={catViewAdd.ops_2=="Team A"?teamA:catViewAdd.ops_2=="Team B"?teamB:catViewAdd.ops_2}  placeholder="Enter Point" className=" form-control" />
                                                        </div>

                                                        <div className="col-lg-6 mb-3">
                                                        <label className="title-col mb-0">Points For Option 2</label>
                                                        <input type='number' autoComplete="off" defaultValue={catViewAdd.point_2} name="point_2"  placeholder="Enter Point" className=" form-control" />
                                                        </div>
                                                        {catViewAdd.ops_3!=""?<>
                                                        <div className="col-lg-6 mb-3">
                                                        <label className="title-col mb-0">Option 3 </label>
                                                        <input disabled type='text' autoComplete="off" defaultValue={catViewAdd.ops_3=="Team A"?teamA:catViewAdd.ops_3=="Team B"?teamB:catViewAdd.ops_3}  placeholder="Enter Point" className=" form-control" />
                                                        </div>
                                                        <div className="col-lg-6 mb-3">
                                                        <label className="title-col mb-0">Points For Option 3</label>
                                                        <input type='number' autoComplete="off" defaultValue={catViewAdd.point_3} name="point_3"  placeholder="Enter Point" className=" form-control" />
                                                        </div></>:null}
                                                        {catViewAdd.ops_4!=""?<>
                                                        <div className="col-lg-6 mb-3">
                                                        <label className="title-col mb-0">Option 4 </label>
                                                        <input disabled type='text' autoComplete="off" defaultValue={catViewAdd.ops_4=="Team A"?teamA:catViewAdd.ops_4=="Team B"?teamB:catViewAdd.ops_4}   placeholder="Enter Point" className=" form-control" />
                                                        </div>
                                                        <div className="col-lg-6 mb-3">
                                                        <label className="title-col mb-0">Points For Option 4</label>
                                                        <input type='number' autoComplete="off" defaultValue={catViewAdd.point_4} name="point_4"  placeholder="Enter Point" className=" form-control" />
                                                        </div></>:null}

                                                    
                                                        <div className="col-lg-12 mb-0">
                                                        <label className="title-col mb-3">Appearance Time</label>
                                                        <div className="row">

                                                            <div className="col-lg-6 reletive mb-3">
                                                            <span className='title-col'>Minute</span>
                                                            <Select labelId="hminute" className="card-select" menuPortalTarget={document.body}
                                                                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} id="hminute" onChange={handleChangeHminute} options={hminuteOptions} />
                                                            </div>
                                                            <div className="col-lg-6 reletive mb-3">
                                                            <span className='title-col'>Second</span>
                                                            <Select labelId="hminute" className="card-select" menuPortalTarget={document.body}
                                                                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} id="hminute" onChange={handleChangeHSecond} options={hsecondOptions} />
                                                            </div>

                                                        </div>
                                                        </div>

                                                        <div className="col-lg-12 mb-2">
                                                        <label className="title-col mb-3"> Time-Duration</label>
                                                        <div className="row">

                                                            <div className="col-lg-6 reletive mb-3">
                                                            <span className='title-col'>Minute</span>
                                                            <Select menuPortalTarget={document.body} className="card-select"
                                                                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} labelId="hminute" id="hminute" onChange={handleChangeMinute} options={minuteOptions} />
                                                            </div>
                                                            <div className="col-lg-6 reletive mb-3">
                                                            <span className='title-col'>Second</span>
                                                            <Select menuPortalTarget={document.body} className="card-select"
                                                                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} labelId="hminute" id="hminute" onChange={handleChangeSecond} options={secondOptions} />
                                                            </div>


                                                        </div>
                                                        </div>
                                                        
                                                        <div className="col-lg-6 ">
                                                        <input type='text' hidden autoComplete="off" defaultValue={match_id} name="match_id"  placeholder="Enter Point" className="card-control form-control" />
                                                        </div>

                                                        <div className="col-lg-6 ">
                                                        <input type='text' hidden autoComplete="off" defaultValue={catViewAdd._id} name="card_id"  placeholder="Enter Point" className="card-control form-control" />
                                                        </div>

                                                    
                                                

                                                        <div className="col-lg-12 text-start">
                                                        <Button type='submit' className="mr-3 btn-pd btnBg">Submit</Button>
                                                        <Button type='reset' variant="contained" className="btn btn-dark btn-pd">Reset</Button>
                                                        </div>

                                                    </div>
                                                    </form>
                                                </div>
                            </Modal>

                </div>
                <div>
                </div>
            </div>
        </div>
                </div>
            </div>
        </>

    );
}

export default TableMatchCard;