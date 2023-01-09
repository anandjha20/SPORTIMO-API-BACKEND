import React from "react";
import Header from "../Header";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select, { selectClasses } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useForm from "../useForm";
import NativeSelect from '@mui/material/NativeSelect';


function ViewFaqDetail() {

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const [match, setMatch] = React.useState('');

  console.log(match + "sunil");

  const stateSchema = {
    answer: { error: "" },
  };

  const stateValidatorSchema = {
    answer: {
      required: true,
      validator: {
        func: value => /^[a-zA-Z]+$/.test(),
        error: "Invalid first name format."
      }
    },
    question: {
      required: true,
      validator: {
        func: value => /^[a-zA-Z]+$/.test(),
        error: "Invalid first name format."
      }
    }
  };


  const {
    values,
    errors,
    dirty,
    handleOnChange,
    disable,
  } = useForm(stateSchema, stateValidatorSchema);


  //////////////////////APi Call

  const navigate = useNavigate();

  const [data, setData] = useState([])
  const [Idselect, setIdselect] = useState()
  const [Catname, setCatname] = useState()



  const { _id } = useParams();

  const userDetails = async () => {
    const result = await axios.get(`/web_api/faq_list/${_id}`, options1);
    const data = result.data.body[0];
    const Idselect = data.faq_cat_id._id;
    const match = data.faq_cat_id._id;
    setData(data);
    setIdselect(Idselect);

    setMatch(match);
    console.log({match});
  }


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


  ///////////////////// category list api call \\\\\\\\\\\\\\\\\\\

  const [catList, setCatList] = useState([''])

  let token = localStorage.getItem("token");
  let header = ({ 'token': `${token}` });
  let options1 = ({ headers: header });



  const FaqList = async () => {
    await axios.get(`/web_api/faq_cat_list`, options1)
      .then(res => {
        const userData = res.data.body;
        const catList = userData
        setCatList(catList);
        console.log(catList);
      })
  }
  useEffect(() => {
    FaqList()
    userDetails();
  }, [])




  useEffect(() => {
    document.body.className = "main-body leftmenu faq_list";
    return () => {
      document.body.className = "main-body leftmenu";
    }
  }, []);


  ////////////////////////////////////////////////////////////////////

  const saveFormData = async (e) => {
    e.preventDefault();
    try {

     
      let question = (e.target.elements.question !== 'undefined') ? e.target.elements.question.value : '';
      let answer = (e.target.elements.answer !== 'undefined') ? e.target.elements.answer.value : '';
      let question_ara = (e.target.elements.question_ara !== 'undefined') ? e.target.elements.question_ara.value : '';
      let answer_ara = (e.target.elements.answer_ara !== 'undefined') ? e.target.elements.answer_ara.value : '';
      let question_fr = (e.target.elements.question_fr !== 'undefined') ? e.target.elements.question_fr.value : '';
      let answer_fr = (e.target.elements.answer_fr !== 'undefined') ? e.target.elements.answer_fr.value : '';

      let id = (e.target.elements.id !== 'undefined') ? e.target.elements.id.value : '';

     
       let cat_id = (e.target.elements.cat_id !== 'undefined') ? e.target.elements.cat_id.value : '';
     
      let dataToSend2 = {
        "cat_id" : cat_id,
        "question": question,
        "answer": answer,
        "question_ara": question_ara,
        "answer_ara": answer_ara,
        "question_fr": question_fr,
        "answer_fr": answer_fr,
        "id": id,
      }

      console.log(dataToSend2)

      console.log("new values == ", dataToSend2);
      axios.put(`/web_api/update_faq`, dataToSend2, options1)
        .then(response => {
          if (response.status) {

            let data = response.data;

            console.log(data.msg)

            if (data.status) {

              

               navigate("/faq");
               toast.success(data.msg);

            } else {
              toast.error('something went wrong please try again');
            }
          }
          else {
            toast.error('something went wrong please try again..');
          }

        })
        .catch(error => {
          console.log(this.state);
          toast.error(data.msg);
        })


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
                <h2 className="main-content-title tx-24 mg-b-5">Update Faq  </h2>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/home">Home</Link>
                  </li>

                  <li className="breadcrumb-item active" aria-current="page">&nbsp;&nbsp;Faq Management</li>
                </ol>
              </div>

              <div className="d-flex">
                <div className="justify-content-center">
                  <Link to="/faq">
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

                        <form onSubmit={(e) => saveFormData(e)} enctype="multipart/form-data">
                          <div className="row">

                            <div className="col-lg-12 mb-3">
                              <label className="title-col mb-3">CATEGORY</label>

                              <input type="hidden" name='id' defaultValue={data._id || ''} />
                             
                              {/* <NativeSelect  defaultValue={Idselect} inputProps={{   name: 'age',    id: 'uncontrolled-native',  }}  > 
 
                               {catList.map((daTa) => {
                                    return (
                                       <option value={Idselect}>{daTa.cat_name}</option> );
                                         })}
                                         
                                         <option value={5}>test</option>

                              </NativeSelect> */}

                              {/* <TextField id="filled-basic"  name='cat_id'  multiline rows={2} className="update-input" fullWidth
                           defaultValue={Idselect || '' } variant="filled" /> */}


                              <Select labelId="demo-simple-select-label" id="demo-simple-select" fullWidth name="cat_id"
                                MenuProps={MenuProps} value={match} label="Match/league" onChange={handleChange}>
                                {catList.map((daTa) => {
                                  return (
                                    <MenuItem value={daTa._id}>{daTa.cat_name}</MenuItem>);
                                })}
                              </Select>

                              {/* <NativeSelect className="form-control" name='cat_id' defaultValue={Idselect}>
                                <option value={Idselect} disabled selected>{Catname}</option>
                                {catList.map((daTa) => {
                                  return (
                                    <option value={daTa._id}>{daTa.cat_name}</option>
                                  );

                                })}
                              </NativeSelect> */}

                            </div>



                            <div className="col-lg-12 mb-4">
                              <label className="title-col">Question <span className="text-blue">(English)</span></label>
                              <TextField onChange={handleOnChange} id="filled-multiline-static" name='question' className="update-input" multiline rows={3} fullWidth defaultValue={data.question || ''} variant="filled" />
                              {errors.question && dirty.question && (
                                <p className="error">{errors.question}</p>
                              )}
                            </div>


                            <div className="col-lg-12 mb-4">
                              <label className="title-col">Answer <span className="text-blue">(English)</span></label>
                              <TextField onChange={handleOnChange} id="filled-multiline-static" name='answer' className="update-input"
                                multiline rows={3} fullWidth defaultValue={data.answer || ''} variant="filled" />
                              {errors.answer && dirty.answer && (
                                <p className="error">{errors.answer}</p>
                              )}
                            </div>

                             {/* ///////////Arabic////////// */}
                             <div className="col-lg-12 mb-4">
                               <label className="title-col">Question <span className="text-blue">(Arabic)</span> </label>
                               <TextField id="filled-multiline-static" defaultValue={data.question_ara || ''} className="update-input" multiline rows={3} fullWidth name='question_ara' variant="filled" />
                              </div>

                                <div className="col-lg-12 mb-4">
                               <label className="title-col">Answer <span className="text-blue">(Arabic)</span> </label>
                                 <TextField id="filled-multiline-static" defaultValue={data.answer_ara || ''} className="update-input" multiline rows={3} fullWidth name='answer_ara' variant="filled" />
                                </div>

                              {/* ///////////French////////// */}
                              <div className="col-lg-12 mb-4">
                               <label className="title-col">Question <span className="text-blue">(French)</span> </label>
                               <TextField id="filled-multiline-static" defaultValue={data.question_fr || ''} className="update-input" multiline rows={3} fullWidth name='question_fr' variant="filled" />
                              </div>

                                <div className="col-lg-12 mb-4">
                               <label className="title-col">Answer <span className="text-blue">(French)</span> </label>
                                 <TextField id="filled-multiline-static" defaultValue={data.answer_fr || ''} className="update-input" multiline rows={3} fullWidth name='answer_fr' variant="filled" />
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

export default ViewFaqDetail;
