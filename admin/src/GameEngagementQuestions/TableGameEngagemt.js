import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Select from 'react-select';
import Button from '@mui/material/Button';
import ReactPaginate from "react-paginate";
import IconButton from '@mui/material/IconButton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Moment from 'moment';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Swal from 'sweetalert2';

export default function TableGameEngagemt(props) {

    const [pageCount, setpageCount] = useState('');
    const [guestUser, setGuest] = React.useState(0);
    const [data, setData] = useState([]);
    const [responce, setResponce] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const header = ({ 'token': `${token}` });
    const options = ({ headers: header });
    const limit = 10;
    const formsave = (e, page)=>{
        e.preventDefault();
          const data = new FormData(e.target);
         const Formvlaues = Object.fromEntries(data.entries());
        //  Formvlaues.guest_user = guestUser
         const formData = Formvlaues
           console.log('Formvlaues === ', Formvlaues);
            axios.post(`/web_api/geq_list`, formData, options)
           .then(res => {
              const responce = res.data.status
              setResponce(responce);
               const data = res.data.body;
                setData(data);
                const total = res.data.rows;
                const totalPage = (Math.ceil(total / limit));
                setpageCount(totalPage);
               
           })
          
     }


    const geqlist = async () => {
        const datadammy = {}
        await axios.post(`/web_api/geq_list`, datadammy, options)
            .then(res => {
                const data = res.data.body;
                const total = res.data.rows;
                const totalPage = (Math.ceil(total / limit));
                setpageCount(totalPage);
                setData(data);
                console.log(data);
                setValue("");
                setValue1("");
                setValue2("");
            })
    }
    useEffect(() => {
        geqlist()
    }, [])


    ///////////////pagenestion///////////////
    const fetchComments = async (page) => {
        const dataDummy = {page : page};
        // console.log(Fromvalue);
        axios.post(`/web_api/geq_list`, dataDummy, options)
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


// const detailFun = (id)=>{
//     navigate(`/poll/detail/${id}`)
//   return false;   
// } 


const editFun = (id, item)=>{
    navigate(`/geq/update/${id}` , { state: { item } })
  return false;   
}



/////////////////delete poll /////////////////
    const delPoll = (_id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {         
                  axios.delete(`/web_api/delete_geq/${_id}` )
                  .then(res => {
                      if (res.status) {
                          let data = res.data;
                          if (data.status) { 
                            Swal.fire(
                                'Deleted!',
                                 data.msg,
                                'success'
                              )
                              return geqlist();

                          } else {
                              toast.error('something went wrong please try again');
                          }
                      }
                      else {
                          toast.error('something went wrong please try again..');
                      }
      
                  })
            }
          })     
    }


    const [value, setValue] = useState("");
    const [value1, setValue1] = useState("");
    const [value2, setValue2] = useState("");

    const rewardsOptions = [
        { label: 'Automatic enrollment into a draw', value: 'Automatic enrollment into a draw' },
        { label: 'Free Game Points', value: 'Free Game Points' },
        { label: 'Free Prediction Cards', value: 'Free Prediction Cards' },
      ]
      
      const EventsOptions =
      [
        { label: "Red Card", value: "Red Card" },
        { label: "Goal", value: "Goal" },
        { label: "Penalty", value: "Penalty" },
        { label: "Corner", value: "Corner" },
        { label: "Foul etc", value: "Fouletc" },
      ]
  
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

  const [open, setOpen] = React.useState(false);
  const [itemdata, setItem] = React.useState([]);
  const handleClickOpen = (item) => {
    setOpen(true);
    console.log(item);
    setItem(item);
};

const handleClose = () => {
    setOpen(false);
};



const formresult = async (e)=>{
    e.preventDefault();
      const data = new FormData(e.target);
     const Formvlaues = Object.fromEntries(data.entries());
    //  let demodata={"match_id":"634a6b9df68bced78a4844e4"}
      console.log('Formvlaues === ', Formvlaues);
        await axios.post(`/web_api/geq_ans_update`,Formvlaues)
       .then(res => {
        if (res.status) {
            let data = res.data;
            if (data.status) { 
                toast.success(data.msg);
                setOpen(false);
                return geqlist();
                
            } else {
                toast.error(data.msg);
            }
        }
       })
      
  }
  

  useEffect(() => {
    SelectMatch();
  }, [])


    return (

        <>

        <ToastContainer position="top-right" />
            <div className="card custom-card">
                <div className="card-body">
                    <form onSubmit={(e)=>formsave(e)}>
                    <div className="row align-items-center">

                    <div className="col-lg-3 reletive mb-3">
                              <span className='react-select-title'>Match/League</span>
                              <Select labelId="hminute" onChange={setValue2} value={value2} name="match_id" id="hminute" menuPortalTarget={document.body}
                               styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }} options={matchOptions} />
                            </div>

                      <div className="col-lg-3 reletive mb-3">
                            <span className="react-select-title">Select Triggered Event</span>
                            <Select  name="event" onChange={setValue1} value={value1}
                                options={EventsOptions}
                                className="basic-multi-select"
                                classNamePrefix="select" />

                        </div>

                        <div className="col-lg-3 reletive mb-3">
                            <span className="react-select-title">Select Rewards Type</span>
                            <Select  onChange={setValue} value={value}
                                name='reward_type' options={rewardsOptions}
                                className="basic-multi-select"
                                classNamePrefix="select" />
                        </div>
                        

                        <div className="col-lg-3 mb-3 d-flex">
                            <Button type='submit' variant="contained" className="mr-3 btn-filter btnBg">Search</Button>
                            <Button type='reset' onClick={geqlist} className="mr-3 btn-dark btn-filter">Reset</Button>
                        </div>
                    </div>
                    </form>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-12">
                    <div className="table-card MuiPaper-root MuiPaper-elevation2 MuiPaper-rounded">
                        <h6 className="MuiTypography-root MuiTypography-h6 padd1rem">GEQ List</h6>
                        <table className="table ">
                            <thead>
                                <tr>
                                    <th scope="col">Match/league</th>
                                    <th scope="col">Triggered Event</th>
                                    <th scope="col">Rewards Type</th>
                                    <th scope="col">Rewards Coins</th>
                                    <th scope="col">Appearance Time</th>
                                    <th scope="col">Duration</th>
                                    <th>Result</th>
                                    <th scope="col" className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                  

                              {data == "" ? <>
                               <tr>
                               <td className="text-center" colSpan='9'> 
                                 <img src="/assets/images/nodatafound.png" alt='no image' width="350px" /> </td>
                               </tr>
                               </> : null}
                                {data.map((item) => {
                                    return (
                                        <tr key={item._id}>
                                            <td>{item.match_name}</td>
                                            <td>{item.event}</td>
                                            <td>{item.reward_type}</td>
                                            <td>{item.reward_quantity}</td>
                                            <td>{item.appearance_time}</td>
                                            <td>{item.duration}</td>
                                           <td>
                                             { item.result_disclosed == true ? <> <span>Result Disclosed</span></> : null}
                                            {item.result_disclosed == false ? <><Button  onClick={(e) => { handleClickOpen(item); }}  type='submit' className="mr-3 btn-pd btnBg">Disclose</Button></> : null }
                                            </td>
                                            {/* <td>{Moment(item.date).format("DD/MM/YYYY")}</td> */}
                                            <td className="text-end">
                                                <div className="d-flex justtify-content-end">
                                                    {/* <IconButton onClick={(e) => { detailFun(item._id); }} aria-label="delete"> <span className="material-symbols-outlined">
                                                        visibility </span>
                                                    </IconButton>
                                                     */}
                                                    <IconButton onClick={(e) => { editFun(item._id, item); }} aria-label="edit">
                                                        <span className="material-symbols-outlined">
                                                            edit </span>
                                                    </IconButton>
                                                    <IconButton onClick={(e) => { delPoll(item._id); }} aria-label="delete">
                                                        <span className="material-symbols-outlined">
                                                        Delete </span>
                                                    </IconButton>
                                                </div>
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
                </div>
                <div>
                </div>
            </div>

            <Dialog className="notifi-style" open={open} onClose={handleClose}>
                        <DialogTitle><i className="fal fa-paper-plane"></i> &nbsp;Result Disclose</DialogTitle>
                        <DialogContent>
                            <form onSubmit={(e)=>formresult(e)}>
                            <div className="col-lg-12 mt-2 mb-3 reletive mb-3">
                            <input type="hidden" value={itemdata._id} name="geq_id" />
                            <span className="react-select-title">Select Rewards Type</span>
                            <select className="form-control" name="correct_ans">
                                <option disabled>Please Select</option>
                                {itemdata.opt_1 !== "" ?  <><option value="opt_1">{itemdata.opt_1}</option></> : null}
                                {itemdata.opt_2 !== "" ?  <><option value="opt_2">{itemdata.opt_2}</option></> : null}
                                {itemdata.opt_3 !== "" ?  <><option value="opt_3">{itemdata.opt_3}</option></> : null}
                                {itemdata.opt_4 !== "" ?  <><option value="opt_4">{itemdata.opt_4}</option></> : null}
                                {itemdata.opt_5 !== "" ?  <><option value="opt_5">{itemdata.opt_5}</option></> : null}
{/*                                 
                                <option value="opt_2">{itemdata.opt_2}</option>
                                <option value="opt_3">{itemdata.opt_3}</option>
                                <option value="opt_4">{itemdata.opt_4}</option>
                                <option value="opt_5">{itemdata.opt_5}</option> */}
                            </select>
                        </div>
                            <DialogActions className="mb-0">
                            <Button className="mr-3" onClick={handleClose}>Cancel</Button>
                            <Button type="submit" variant="contained" className="mr-3 btn-pd btnBg">Submit</Button>
                             </DialogActions>
                            </form>
                        </DialogContent>
                      </Dialog>
           
        </>

    )
}