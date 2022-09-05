import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Moment from 'moment';
import axios from "axios";
import Select from 'react-select';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ReactPaginate from "react-paginate";
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

function UserListTable(props) {

    const [open, setOpen] = React.useState(false);
    const [pageCount, setpageCount] = useState('');
    const [guestUser, setGuest] = React.useState(0);
    const [Fromvalue, setFromvalue] = React.useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [data, setData] = useState([])

    const date = Moment().format("MMM Do YY");
    const navigate = useNavigate();

    const viewFun = (_id) => {
        navigate(`/user/detail/${_id}`);
        return false;
    }


    const guestfun = (event) => {
        if (guestUser == 1) {
          setGuest(0);
        }
        if (guestUser == 0) {
          setGuest(1);
        }
        return false;
      };
  
   
     const countryOptions = [
        { value: 'India', label: 'india' },
        { value: 'Afghanistan', label: 'Afghanistan' },
        { value: 'slbania', label: 'Albania'  },
    ]

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
         Formvlaues.guest_user = guestUser
         const formData = Formvlaues
         setFromvalue(formData);
           console.log('Formvlaues === ', Formvlaues);
            axios.post(`/web_api/user_list`, formData, options)
           .then(res => {
               const data = res.data.body;
               setData(data);
               const total = res.data.rows;
               const totalPage = (Math.ceil(total / limit));
               setpageCount(totalPage);
           })
          
     }

    const userlist = async () => {
        await axios.post(`/web_api/user_list` , options)
            .then(res => {
                const data = res.data.body;
                const total = res.data.rows;
                const totalPage = (Math.ceil(total / limit));
                setpageCount(totalPage);
                setData(data);
                console.log(data);
            })
    }
    useEffect(() => {
        userlist()
    }, [])


    ///////////////pagenestion///////////////
    const fetchComments = async (page) => {
        const senData = { guest_user : guestUser, page: page }
        // const cosole = Fromvalue;
        // console.log(Fromvalue);
        axios.post(`/web_api/user_list`, senData,  options)
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

    return (

        <>


<div className="card custom-card">
                <div className="card-body">
                    <form onSubmit={(e)=>formsave(e)}>
                    <div className="row align-items-center">
                        <div className="col-lg-12">
                                 <FormGroup className="mb-3 ml-2 inputheckbox">
                                    <FormControlLabel name='guest_user' onChange={(e) => guestfun(e)}  control={<Checkbox />} label="Guest User" />
                                  </FormGroup>
                        </div>
                        <div className="col-lg-3 ">
                        <TextField id="search" name='name' className="filter-input" label="Search User" autoComplete="off" fullWidth type="text"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                      
                       
                        <div className="col-lg-3 ">
                            <TextField id="mobile" name='mobile' className="filter-input" label="Mobile Number"  autoComplete="off" fullWidth type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>

                        <div className="col-lg-3">
                            <TextField id="email"  name='email' className="filter-input" label="Email Address" autoComplete="off" fullWidth type="email"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>

                        <div className="col-lg-3 reletive">
                            <span className="react-select-title">Select Country</span>
                            <Select   name = 'country'
                                options={countryOptions}
                                isSearchable
                                placeholder="Search.."
                                isSelected="slbania"
                                menuPortalTarget={document.body}
                                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                className="basic-multi-select"
                                classNamePrefix="select" />

                        </div>
                       
                        <div className="col-lg-3  mt-4">
                            <TextField id="sdate" name='s_date' className="filter-input" label="Start Date" autoComplete="off" fullWidth type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />

                        </div>

                        <div className="col-lg-3 mt-4">
                            <TextField id="edate" name='e_date' className="filter-input" label="End Date" autoComplete="off" fullWidth type="date"
                                InputLabelProps={{ shrink: true, }} />

                        </div>
                        <div className="col-lg-3 mt-4 d-flex">
                            <Button type='submit' variant="contained" className="mr-3 btn-filter btnBg">Search</Button>
                            <Button type='reset' onClick={userlist} className="mr-3 btn-dark btn-filter">Reset</Button>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <div className="table-card MuiPaper-root MuiPaper-elevation2 MuiPaper-rounded">
                        <h6 className="MuiTypography-root MuiTypography-h6 padd1rem">User Management</h6>
                        <table className="table ">
                            <thead>
                                <tr>
                                    <th scope="col">User Name</th>
                                    <th scope="col">Unique Name</th>
                                    <th scope="col">Mobile No.</th>
                                    <th scope="col">Email Address</th>
                                    <th scope="col">Date Of Birth</th>
                                    <th scope="col">User language</th>
                                    <th scope="col">Country</th>
                                    <th scope="col">Gender</th>
                                    <th scope="col" className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                              {data == '' ? <>
                               <tr>
                               <td className="text-center" colspan='9'> 
                                 <img src="/assets/images/nodatafound.png" alt='no image' width="350px" /> </td>
                               </tr>
                               </> : null}
                                {data.map((item) => {
                                    return (
                                        <tr key={item._id}>
                                            <td>{item.name}</td>
                                            <td>{item.u_name}</td>
                                            <td>{item.mobile}</td>
                                            <td>{item.email}</td>
                                            <td>{item.date}</td>
                                            <td>{item.user_language}</td>
                                            <td>{item.country}</td>
                                            <td>{item.gender}</td>
                                            <td className="text-end">
                                                <div className="d-flex justtify-content-end">
                                                    <IconButton onClick={(e) => { viewFun(item._id); }} aria-label="delete"> <span className="material-symbols-outlined">
                                                        visibility </span>
                                                    </IconButton>
                                                    <IconButton onClick={(e) => { handleClickOpen(item._id); }} aria-label="delete">
                                                        <span className="material-symbols-outlined">
                                                            notifications_active </span>
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

                    <Dialog className="notifi-style" open={open} onClose={handleClose}>
                        <DialogTitle><i className="fal fa-paper-plane"></i> &nbsp;Send Notification</DialogTitle>
                        <DialogContent>
                            {/* <DialogContentText>
                            To subscribe to this website, please enter your email address here. We
                            will send updates occasionally.
                        </DialogContentText> */}
                            <TextField multiline rows={3}
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Enter Message"
                                type="text"
                                fullWidth
                                variant="standard"
                            />
                        </DialogContent>
                        <DialogActions className="mb-2">
                            <Button className="mr-3" onClick={handleClose}>Cancel</Button>
                            <Button variant="contained" className="mr-3 btn-pd btnBg" onClick={handleClose}>Send</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        </>

    )
}

export default UserListTable