import React from "react";
import MaterialTable from 'material-table';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Select from 'react-select';
import Moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function TableLIstNotification() {



    const [data, setData] = useState([]);
    const [pageCount, setpageCount] = useState('');
    const [value, setValue] = useState("");
    const [value1, setValue1] = useState("");
    const [value2, setValue2] = useState('');
    

    let token = localStorage.getItem("token");
    let header = ({ 'token': `${token}` });
    let options1 = ({ headers: header });

    const limit = 10;
    const NotificationList = async () => {
        let formData = {};
        let token = localStorage.getItem("token");
        let header = ({ 'token': `${token}` });
        let options1 = ({ headers: header });
        await axios.post(`/web_api/notification_list`, formData, options1)
            .then(res => {
                const data = res.data.body;
                const total = res.data.rows;
                const totalPage = (Math.ceil(total / limit));
                setpageCount(totalPage)
                setData(data);
                console.log(data);
                setValue("");
                setValue1("");
                setValue2("");
            })
    }
    const [notiItem, setItemView] = useState('');
    const [open, setOpen] = React.useState(false);
    const viewfun = async (_id, item) => {

        setItemView(item)
        setOpen(true);
        console.warn(_id);
        console.warn(item);
    }

    const handleClose = () => {
        setOpen(false);
    };
    // const category_type = (CatList.length >0) ? CatList.map((item)=>{
    //     return  { value: item._id, label: item.cat_name };
    // }) :[];

    const category_type =
        [
            { value: "system", label: "System" },
            { value: "results", label: "Results" },
        ]

    const module_type =
        [
            { value: "polls", label: "Polls" },
            { value: "sponsorship", label: "Sponsorship" },
        ]
    const notifi_type =
        [
            { value: "0", label: "In-App" },
            { value: "1", label: "Push" },
        ]

    const formsave = (e, page) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const Formvlaues = Object.fromEntries(data.entries());
        console.log(Formvlaues);
        axios.post(`/web_api/notification_list`, Formvlaues, options1)
            .then(res => {
                const data = res.data.body;
                const total = res.data.rows;
                const totalPage = (Math.ceil(total / limit));
                setData(data);
                setpageCount(totalPage)
                console.log(data);
            })
    }

    useEffect(() => {
        NotificationList();
    }, [])



    /////////////////delete complaint /////////////////
    const deleteCategory = (_id) => {

        axios.delete(`/web_api/notification_delete/${_id}`)
            .then(res => {
                if (res.status) {
                    let data = res.data;

                    if (data.status) {
                        toast.success(data.msg);
                        return NotificationList();
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
            })
    }


    ///////////////pagenestion///////////////
    const fetchComments = async (page) => {
        const senData = { page: page }
        // const cosole = Fromvalue;
        // console.log(Fromvalue);
        axios.post(`/web_api/notification_list`, senData, options1)
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
                    <form onSubmit={(e) => formsave(e)}>
                        <div className="row align-items-center">
                            <div className="col-lg-4 reletive mb-3">
                                <span className="react-select-title">Category Type</span>
                                <Select name='category_type' onChange={setValue} value={value}
                                    options={category_type}
                                    className="basic-multi-select"
                                    classNamePrefix="select" />

                            </div>
                            <div className="col-lg-4 reletive mb-3">
                                <span className="react-select-title">Notification Type</span>
                                <Select name='noti_type'
                                    options={notifi_type} onChange={setValue1} value={value1}
                                    className="basic-multi-select"
                                    classNamePrefix="select" />
                            </div>
                            <div className="col-lg-4 reletive mb-3">
                                <span className="react-select-title">Module Type</span>
                                <Select name='module_type'
                                    options={module_type} onChange={setValue2} value={value2}
                                    className="basic-multi-select"
                                    classNamePrefix="select" />
                            </div>


                            <div className="col-lg-4 mb-3">
                                <TextField id="sdate" name='from_date' className="filter-input" label="Start Date" fullWidth type="date"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </div>

                            <div className="col-lg-4 mb-3">
                                <TextField id="edate" name='to_date' className="filter-input" label="End Date" fullWidth type="date"
                                    InputLabelProps={{ shrink: true, }} />
                            </div>
                            <div className="col-lg-4 mb-3 d-flex" style={{ maxWidth: "25%" }}>
                                <Button type='submit' variant="contained" className="mr-3 btn-filter btnBg">Search</Button>
                                <Button type='reset' onClick={NotificationList} className="mr-3 btn-dark btn-filter">Reset</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>


            <div className="row">
                <div className="col-lg-12">
                    <div className="table-card MuiPaper-root MuiPaper-elevation2 MuiPaper-rounded">
                        <h6 className="MuiTypography-root MuiTypography-h6 padd1rem">Notification List</h6>
                        <table className="table ">
                            <thead>
                                <tr>
                                    <th scope="col">Title</th>
                                    <th scope="col">Message</th>
                                    <th scope="col">Category Type</th>
                                    <th scope="col">Notification Type</th>
                                    <th scope="col">Module Type</th>
                                    <th scope="col">Module ID</th>
                                    <th scope="col" className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data == '' ? <>
                                    <tr>
                                        <td className="text-center" colSpan='9'>
                                            <img src="/assets/images/nodatafound.png" alt='no image' width="350px" /> </td>
                                    </tr>
                                </> : null}
                                {data.map((item) => {
                                    return (
                                        <tr key={item._id}>
                                            <td>{item.title.slice(0, 30)}</td>
                                            <td>{item.message.slice(0, 30)}</td>
                                            <td>{item.category_type}</td>
                                            <td>{item.type_status == "1" ? <>Push</> : <>In-App</>}</td>
                                            <td>{item.module_type}</td>
                                            <td>{item.module_id}</td>
                                            <td className="text-end">
                                                <div className="d-flex justtify-content-end">
                                                    <IconButton onClick={(e) => { viewfun(item._id, item); }} aria-label="delete"> <span className="material-symbols-outlined">
                                                        visibility  </span>
                                                    </IconButton>
                                                    <IconButton onClick={(e) => { deleteCategory(item._id); }} aria-label="delete"> <span className="material-symbols-outlined">
                                                        delete </span>
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
            <Dialog className="" open={open} onClose={handleClose}>
                <DialogTitle><i className="fal fa-bell"></i> &nbsp;View Notification</DialogTitle>
                <DialogContent>
                    <div className="row">
                        <div className="col-lg-12 mb-4">
                            <TextField InputProps={{ readOnly: true, }}  name='title' label="Title" multiline rows={1} fullWidth defaultValue={notiItem.title} variant="filled" autoComplete="off" />
                        </div>
                        <div className="col-lg-12 mb-4">
                            <TextField InputProps={{ readOnly: true, }}  name='message' label="Message" multiline rows={2} defaultValue={notiItem.message} fullWidth variant="filled" autoComplete="off" />
                        </div>
                        <div className="col-lg-6 mb-4">
                            <TextField InputProps={{ readOnly: true, }}  name='title' label="Category Type"  fullWidth defaultValue={notiItem.category_type} variant="filled" autoComplete="off" />
                        </div>
                        <div className="col-lg-6 mb-4">
                        {notiItem.type_status == "1" ? 
                        <><TextField InputProps={{ readOnly: true, }}  name='title' label="Notification Type"  fullWidth defaultValue="Push" variant="filled" autoComplete="off" /></> : 
                        <><TextField InputProps={{ readOnly: true, }}  name='title' label="Notification Type"  fullWidth defaultValue="In-App" variant="filled" autoComplete="off" /></>}
                            
                        </div>

                        <div className="col-lg-6 mb-4">
                            <TextField InputProps={{ readOnly: true, }}  name='title' label="Module Type"  fullWidth defaultValue={notiItem.module_type} variant="filled" autoComplete="off" />
                        </div>
                        <div className="col-lg-6 mb-4">
                            <TextField InputProps={{ readOnly: true, }}  name='title' label="Module ID"  fullWidth defaultValue={notiItem.module_id} variant="filled" autoComplete="off" />
                        </div>
                        <div className="col-lg-6 mb-4">
                            <TextField InputProps={{ readOnly: true, }}  name='title' label="Sports"  fullWidth defaultValue={notiItem.sports} variant="filled" autoComplete="off" />
                        </div>
                        <div className="col-lg-6 mb-4">
                            <TextField InputProps={{ readOnly: true, }}  name='title' label="Leagues"  fullWidth defaultValue={notiItem.leagues} variant="filled" autoComplete="off" />
                        </div>
                        <div className="col-lg-6 mb-4">
                            <TextField InputProps={{ readOnly: true, }}  name='title' label="Team"  fullWidth defaultValue={notiItem.team} variant="filled" autoComplete="off" />
                        </div>
                        <div className="col-lg-6 mb-4">
                            <TextField InputProps={{ readOnly: true, }}  name='title' label="Players"  fullWidth defaultValue={notiItem.players} variant="filled" autoComplete="off" />
                        </div>
                        <div className="col-lg-6 mb-4">
                            <label>TARGETED COUNTRY</label>
                            <TextField InputProps={{ readOnly: true, }}  name='title' label="Country"  fullWidth defaultValue={notiItem.country} variant="filled" autoComplete="off" />
                        </div>
                       
                    </div>
                </DialogContent>
                <DialogActions className="mb-2">
                    {/* <Button className="mr-3" onClick={handleClose}>Cancel</Button> */}
                    <Button variant="contained" onClick={handleClose} className="mr-3 btn-pd btnBg">Close</Button>
                </DialogActions>
            </Dialog>
            <ToastContainer position="top-right" />
        </>

    )
}

export default TableLIstNotification