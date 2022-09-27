import React from "react";
import Header from "../Header";
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, useEffect } from "react";
import axios from "axios";
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddMatchCard() {

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
      dataToSend2.append('image', Formvlaues.image);
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

      let response = await axios.post('/web_api/prediction_card_add', dataToSend2,  options1);
      console.log('my fun call', response);
      if (response.status) {
        let data = response.data;
        if (data.status) {
          // navigate(`/poll`);
          // e.target.reset();
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
const [dataSelectType, setSelectType] = useState('')
const [number, setNumber] = useState("");
const selectCardType = (event) =>
{
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

  return (
    <>

      <Header />

      <div className="main-content side-content pt-0">
        <div className="container-fluid">
          <div className="inner-body">

            <div className="page-header">
              <div>
                <h2 className="main-content-title tx-24 mg-b-5">Add Match Card</h2>
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
                              <input type="text" className="form-control card-input"  name='name'  fullWidth  variant="filled" autoComplete="off" />
                            </div>

                         
                            <div className="col-lg-6 reletive mb-4">
                            <label className="title-col">Card Category </label>
                              <Select name="card_cat_id" className="card-select" menuPortalTarget={document.body}
                                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} options={cardTypeCategory} />
                            </div>

                     

                            <div className="col-lg-12 text-start">
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


