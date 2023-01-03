import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Select from 'react-select';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ReactPaginate from "react-paginate";
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Moment from 'moment';
import Swal from 'sweetalert2'

function TableListComponent(props) {

    const [open, setOpen] = React.useState(false);
    const [pageCount, setpageCount] = useState('');
    const [guestUser, setGuest] = React.useState(null);
    const [Fromvalue, setFromvalue] = React.useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleMeesage = () => {
        setOpen(false);
        toast.success('Message Sent Successfully');
    };

    const handleClose = () => {
        setOpen(false);
        
    };

    const [data, setData] = useState([])


    // const [guestUser, setGuest] = React.useState(0);

    const navigate = useNavigate();

    const guestfun = (event) => {
        if (guestUser == null) {
          setGuest('0');
        }
        if (guestUser == 0) {
          setGuest(null);
        }
        return false;
      };
  

    const customStyles = {
        container: (base, state) => ({
            ...base,
            zIndex: "999"
          })
    }

    const token = localStorage.getItem("token");
    const header = ({ 'token': `${token}` });
    const options = ({ headers: header });

    const limit = 10;
    
    const formsave = (e, page)=>{
        e.preventDefault();
          const data = new FormData(e.target);
         const Formvlaues = Object.fromEntries(data.entries());
         Formvlaues.disclosed_status = guestUser
         const formData = Formvlaues
         setFromvalue(formData);
           console.log('Formvlaues === ', Formvlaues);
            axios.post(`/web_api/poll_list`, formData, options)
           .then(res => {
               const data = res.data.body;
               setData(data);
               const total = res.data.rows;
               const totalPage = (Math.ceil(total / limit));
               setpageCount(totalPage);
           })
          
     }

    const polllist = async () => {
        const datadammy = {}
        await axios.post(`/web_api/poll_list`, datadammy, options)
            .then(res => {
                
                const invailid = res.data

                if(invailid.status == false)
                {
                    toast.error('something went wrong please try again');
                    navigate("/");
                    
                }

                else
                {
                const data = res.data.body;
                const total = res.data.rows;
                const totalPage = (Math.ceil(total / limit));
                setpageCount(totalPage);
                setData(data);
                console.log(data);
                setValue("");
                setValue1("");
                }
            })
    }
    useEffect(() => {
        polllist()
    }, [])


    ///////////////pagenestion///////////////
    const fetchComments = async (page) => {
        const senData = { guest_user : guestUser, page: page }
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


const detailFun = (id)=>{
    navigate(`/poll/detail/${id}`)
  return false;   
} 

const editFun = (id)=>{
    navigate(`/poll/update/${id}`)
  return false;   
}


const polltype = [
    { value: 'Public Poll', label: 'Public Poll' },
    { value: 'Private Poll', label: 'Private Poll' },
]
const pollfee = [
    { value: 'Free', label: 'Free' },
    { value: 'Paid', label: 'Paid' },
]


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
                
                  axios.delete(`/web_api/delete_poll/${_id}`)
                  .then(res => {
                      if (res.status) {
                          let data = res.data;
                          if (data.status) { 
                            Swal.fire(
                                'Deleted!',
                                 data.msg,
                                'success'
                              )
            
                              return polllist();
                              
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

/////////////////poll status api call ////////////////
    const disclosedPoll = (_id) =>
    { 
                const setDataForm = {disclosed_status : '1'}
                 axios.put(`/web_api/poll_result_disclosed/${_id}`, setDataForm, options)
                 .then(res => {
                    if (res.status) {
                        let data = res.data;
                        if (data.status) { 
                            toast.success(data.msg);
                            return polllist();
                        } else {
                            toast.error('something went wrong please try again');
                        }
                    }
                    else {
                        toast.error('something went wrong please try again..');
                    }
                })            
    }
      

    const [value, setValue] = useState("");
    const [value1, setValue1] = useState("");
    

    return (

        <>

<ToastContainer position="top-right" />
 

             
            <div className="card custom-card">
                <div className="card-body">
                    <form onSubmit={(e)=>formsave(e)}>
                    <div className="row align-items-center">
                    <div className="mb-3 col-lg-12 ml-2 guestcheck">
                                  <input type="checkbox"  name='disclosed_status' id="chck" onChange={(e) => guestfun(e)} />
                                  <label htmlFor="chck">Active Poll</label>
                                    {/* <FormControlLabel name='guest_user' onChange={(e) => guestfun(e)}  control={<Checkbox  />} label="Guest User"  /> */}
                                  </div>
                        <div className="col-lg-4 mb-3">
                            <TextField id="search" className="filter-input" name='match' label="Search Match/league" fullWidth type="text"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                        <div className="col-lg-4 reletive mb-3">
                            <span className="react-select-title">Poll Type</span>
                            <Select  name='poll_type' onChange={setValue} value={value}
                                options={polltype}
                                className="basic-multi-select"
                                classNamePrefix="select" />

                        </div>
                        <div className="col-lg-4 reletive mb-3">
                            <span className="react-select-title">Poll Fee</span>
                            <Select  name='fee_type' onChange={setValue1} value={value1}
                                options={pollfee}
                                className="basic-multi-select"
                                classNamePrefix="select" />

                        </div>
                        <div className="col-lg-4 mb-3">
                            <TextField id="sdate" name='s_date' className="filter-input" label="Start Date" fullWidth type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />

                        </div>

                        <div className="col-lg-4 mb-3">
                            <TextField id="edate" name='e_date' className="filter-input" label="End Date" fullWidth type="date"
                                InputLabelProps={{ shrink: true, }} />

                        </div>
                        <div className="col-lg-4 mb-3 d-flex">
                            <Button type='submit' variant="contained" className="mr-3 btn-filter btnBg">Search</Button>
                            <Button type='reset' onClick={polllist} className="mr-3 btn-dark btn-filter">Reset</Button>
                        </div>
                    </div>
                    </form>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-12">
                    <div className="table-card MuiPaper-root MuiPaper-elevation2 MuiPaper-rounded">
                        <h6 className="MuiTypography-root MuiTypography-h6 padd1rem">Poll List</h6>
                        <table className="table ">
                            <thead>
                                <tr>
                                    <th scope="col">Match/league</th>
                                    <th scope="col">Poll Type</th>
                                    <th scope="col">Poll Fee</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Appearance Time</th>
                                    <th scope="col">Duration</th>
                                    <th scope="col">Poll Result</th>
                                    <th scope="col">Date</th>
                                    <th scope="col" className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                              {data == '' ? <>
                               <tr>
                               <td className="text-center" colSpan='9'> 
                               <span>No polls available!</span> </td>
                               </tr>
                               </> : null}
                                {data.map((item) => {
                                    return (
                                        <tr key={item._id}>
                                            <td>{item.match}</td>
                                            <td>{item.poll_type}</td>
                                            <td>{item.fee_type}</td>
                                            <td>{item.amount}</td>
                                            <td>{item.apperance_time}</td>
                                            <td>{item.time_duration}</td>
                                            <td>
                                            {/* {item.result_type == "Undisclosed" && item.disclosed_status == "1" ? <> <span>Poll Result Disclosed</span></> : null} */}
                                            {item.result_type == "Undisclosed" && item.disclosed_status == "0" ? <><Button onClick={() => { disclosedPoll(item._id);}}  type='submit' className="mr-3 btn-pd btnBg">Disclose</Button></> : <><span>Result Disclosed</span></> }
                                            </td>
                                            <td>{Moment(item.date).format("DD/MM/YYYY")}</td>
                                            <td className="text-end">
                                                <div className="d-flex justtify-content-end">
                                                    <IconButton onClick={(e) => { detailFun(item._id); }} aria-label="delete"> <span className="material-symbols-outlined">
                                                        visibility </span>
                                                    </IconButton>
                                                    <IconButton onClick={(e) => { editFun(item._id); }} aria-label="edit">
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
           
        </>

    )
}

export default TableListComponent