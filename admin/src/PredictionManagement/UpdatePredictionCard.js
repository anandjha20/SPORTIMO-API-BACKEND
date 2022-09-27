import React from "react";
import Header from "../Header";
import { Link, useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";
import axios from "axios";
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputEmoji from 'react-input-emoji'
import {useLocation} from 'react-router-dom';
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";



export default function UpdatePredictionCard() {


 const navigate = useNavigate();
 
 const location = useLocation();
 console.log("sunilganwaen");
 console.log(location.state.rowData);

 ///////////////emoji input value get


  const {_id} = useParams();

  let token = localStorage.getItem("token");
  let header = ({ 'token': `${token}` });
  let options1 = ({ headers: header });

  const myFormData = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData(e.target);
      let Formvlaues = Object.fromEntries(data.entries());
      console.log("form data is == ", Formvlaues);

      let dataToSend2 = new FormData();
      dataToSend2.append('name', Formvlaues.name);
      dataToSend2.append('name_ara', Formvlaues.name_ara);
      dataToSend2.append('image', Formvlaues.image);
      dataToSend2.append('card_type', Formvlaues.card_type);
      dataToSend2.append('card_cat_id', Formvlaues.card_cat_id);
      dataToSend2.append('qus', Formvlaues.qus);
      dataToSend2.append('qus_ara', Formvlaues.qus_ara);
      dataToSend2.append('card_color', Formvlaues.card_color);
      dataToSend2.append('ops_1', Formvlaues.ops_1);
      dataToSend2.append('ops_1_ara', Formvlaues.ops_1_ara);
      dataToSend2.append('ops_2', Formvlaues.ops_2);
      dataToSend2.append('ops_2_ara', Formvlaues.ops_2_ara);
      dataToSend2.append('ops_3', Formvlaues.ops_3);
      dataToSend2.append('ops_3_ara', Formvlaues.ops_3_ara);
      dataToSend2.append('ops_4', Formvlaues.ops_4);
      dataToSend2.append('ops_4_ara', Formvlaues.ops_4_ara);

      let response = await axios.put(`/web_api/prediction_card_update/${_id}`, dataToSend2, options1);
      console.log('my fun call', response);
      if (response.status) {
        let data = response.data;
        if (data.status) {
           navigate(`/cards`);
          //e.target.reset();
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

	///////////////vender list api call////////////
	const [CardCate, setCard] = useState([]);

	const CardCategory = async () =>
    {
        axios.get(`/web_api/get_prediction_card_Cat_list`)
        .then(res => {
          const CardCate = res.data.body;
          setCard(CardCate);
          console.log(CardCate); 
        })
    }

 
  const cardTypeCategory = (CardCate.length > 0) ? CardCate.map((item) => {
    return { value: item._id, label: item.name };
  }) : [];

  useEffect(() => {
    CardCategory();
}, [])


  const cardTypeOptions = [
    { value: 'Game-based', label: 'Game-based' },
    { value: 'Event-based', label: 'Event-based' },
    { value: 'Time-based', label: 'Time-based' },
    { value: 'Time-Decay', label: 'Time-Decay' },
  ]

/////////time-range open ///////////////
const [dataSelectType, setSelectType] = useState(location.state.rowData.card_type)
const [number, setNumber] = useState("");
const selectCardType = (event) =>
{

    // const timedata = location.state.rowData.card_type
    const dataSelect = event.value
    if(dataSelect == "Time-Decay")
    {
       setSelectType("Time-Decay")
    }  
    else{
        setSelectType("")
    } 
   
}

const checkInput = (e) => {
  const onlyDigits = e.target.value.replace(/\D/g, "");
  setNumber(onlyDigits);
};



const catNameSelect = location.state.rowData.card_cat_id
console.log(catNameSelect);

const [selectedOption,  setSelectedOption] = useState(catNameSelect);
const handleTypeSelect = e => {
    setSelectedOption(e.value);
  };

  return (
    <>

      <Header />

      

      <div className="main-content side-content pt-0">
        <div className="container-fluid">
          <div className="inner-body">

            <div className="page-header">
              <div>
                <h2 className="main-content-title tx-24 mg-b-5">Update Prediction Card</h2>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/home">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">&nbsp;&nbsp;Prediction Card</li>
                </ol>
              </div>
              <div className="d-flex">
                <div className="justify-content-center">
                  <Link to="/cards" className="btn-link">
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
                            
                            <div className="col-lg-6 reletive mb-4">
                            <label className="title-col">Card Name <span className="text-blue">(English)</span></label>
                              <input type="text" defaultValue={location.state.rowData.name} className="form-control card-input"  name='name'  fullWidth  variant="filled" autoComplete="off" />
                            </div>

                            <div className="col-lg-6 reletive mb-4">
                            <label className="title-col">Card Name <span className="text-blue">(Arabic)</span></label>
                              <input type="text" defaultValue={location.state.rowData.name_ara} className="form-control card-input"  name='name_ara'  fullWidth  variant="filled" autoComplete="off" />
                            </div>

                            <div className="col-lg-6 reletive mb-4">
                            <label className="title-col">Card Type </label>
                              <Select name="card_type" className="card-select" 
                              defaultValue={{ label : location.state.rowData.card_type, value: location.state.rowData.card_type }}
                              menuPortalTarget={document.body} onChange={selectCardType}
                                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} options={cardTypeOptions} />
                            </div>

                            {dataSelectType !== "" ? <>
                            <div className="col-lg-6 reletive mb-4">
                            <label className="title-col">Time-Range</label>
                              <input type="text" onChange={(e) => checkInput(e)} value={number}
                               maxLength="2" 
                               name="time_range" className="form-control card-input"  autoComplete="off" />
                            </div>
                            </> : null}


                            <div className="col-lg-6 reletive mb-4">
                            <label className="title-col">Card Category </label>
                            <Select name="card_cat_id" className="card-select" menuPortalTarget={document.body} 
                                onChange={handleTypeSelect}
                                 options={cardTypeCategory}
                                 value={cardTypeCategory.filter(function(option) {
                                    return option.value === selectedOption;
                                  })}
                                  styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} 
                                />
                            </div>
                            <div className="col-lg-12 reletive">
                            <img src={location.state.rowData.image} className="cardImgage" />
                            </div>
                            
                            <div className="col-lg-6 reletive mb-4">
                            <label className="title-col">Upload Icon</label>
                            <input className="form-control"  name='image' type="file" fullWidth  autoComplete="off" />
                            </div>

                            <div className="col-lg-6 reletive mb-4">
                            <label className="title-col">Card Color </label>
                            <input className="form-control"  name='card_color' type="color" fullWidth  autoComplete="off" defaultValue={location.state.rowData.card_color} />
                            </div>
                            


                          


                            <div className="col-lg-12 mb-4">
                              <label className="title-col">Question <span className="text-blue">(English)</span></label>
                              <TextField  name='qus'  defaultValue={location.state.rowData.qus} label="Enter Question" multiline rows={4} fullWidth  variant="filled" autoComplete="off" />

                            </div>

                             {/* ///////Arbic////////// */}
                            <div className="col-lg-12 mb-4">
                              <label className="title-col">Question <span className="text-blue">(Arabic)</span></label>
                              <TextField  name='qus_ara'  defaultValue={location.state.rowData.qus_ara} label="Enter Question" multiline rows={4} fullWidth  variant="filled" autoComplete="off" />
                            </div>


                            <div className="col-lg-6 mb-4">
                              <label className="title-col mb-0">Answer 1 <span className="text-blue">(English)</span></label>
                              <input type='text' autoComplete="off" defaultValue={location.state.rowData.ops_1}  name='ops_1' placeholder="Enter Answer" className="card-control form-control"/>
                            </div>
                            

                            <div className="col-lg-6 mb-4">
                              <label className="title-col mb-0">Answer 1 <span className="text-blue">(Arabic)</span></label>
                              <input type='text' autoComplete="off" defaultValue={location.state.rowData.ops_1_ara}  name='ops_1_ara' placeholder="Enter Answer" className="card-control form-control"/>
                            </div>

                            <div className="col-lg-6 mb-4">
                              <label className="title-col mb-0">Answer 2 <span className="text-blue">(English)</span></label>
                              <input type='text' autoComplete="off" defaultValue={location.state.rowData.ops_2}  name='ops_2' placeholder="Enter Answer" className="card-control form-control"/>
                            </div>


                            <div className="col-lg-6 mb-4">
                              <label className="title-col mb-0">Answer 2 <span className="text-blue">(Arabic)</span></label>
                              <input type='text' autoComplete="off" defaultValue={location.state.rowData.ops_2_ara}  name='ops_2_ara' placeholder="Enter Answer" className="card-control form-control"/>
                            </div>

                               <div className="col-lg-6 mb-4">
                                <label className="title-col mb-0">Answer 3 <span className="text-blue">(English)</span></label>
                                <input type='text' autoComplete="off" defaultValue={location.state.rowData.ops_3}  name='ops_3' placeholder="Enter Answer" className="card-control form-control"/>
                          
                               </div>

                               <div className="col-lg-6 mb-4">
                                <label className="title-col mb-0">Answer 3 <span className="text-blue">(Arabic)</span></label>
                                <input type='text' autoComplete="off" defaultValue={location.state.rowData.ops_3_ara}  name='ops_3_ara' placeholder="Enter Answer" className="card-control form-control"/>
                          
                               </div>

                               <div className="col-lg-6 mb-4">
                                <label className="title-col mb-0">Answer 4 <span className="text-blue">(English)</span></label>
                                <input type='text' autoComplete="off" defaultValue={location.state.rowData.ops_4}  name='ops_4' placeholder="Enter Answer" className="card-control form-control"/>
                          
                               </div>                       
                               

                               <div className="col-lg-6 mb-4">
                                <label className="title-col mb-0">Answer 4 <span className="text-blue">(Arabic)</span></label>
                                <input type='text' autoComplete="off" defaultValue={location.state.rowData.ops_4_ara}  name='ops_4_ara' placeholder="Enter Answer" className="card-control form-control"/>
                          
                               </div>


                            <div className="col-lg-12 text-start">
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
          </div>

        </div>

      </div>
      <ToastContainer position="top-right" />
    </>
  )
}


