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

function TableLIstNotification() {


  
    const [data, setData] = useState([]);
    const [CatList, setDataCat] = useState([]);
    const [pageCount, setpageCount] = useState('');

    const [userCategory, setuserCategory] = useState([])

 

    let token = localStorage.getItem("token");
    let header = ({ 'token': `${token}` });
    let options1 = ({ headers: header });

    const limit = 10;
    const NotificationList = async () =>
    {
        let formData = {};    
        let token = localStorage.getItem("token");
        let header = ({ 'token': `${token}` });
        let options1 = ({ headers: header });
        await axios.post(`/web_api/notification_list`, formData, options1)
        .then(res => {
          const userData = res.data.body;
          setData(userData);
          const category = userData.category;
          const image = res.data.body.image;
          console.log(userData); 
        //   console.log(userCategory); 
        })
    }


    const category_type = (CatList.length >0) ? CatList.map((item)=>{
        return  { value: item._id, label: item.cat_name };
    }) :[];

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
                const category = data.category;
                const image = res.data.body.image;
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

            {/* <div className="card custom-card">
                <div className="card-body">
                    <form onSubmit={(e) => formsave(e)}>
                        <div className="row align-items-center">
                            <div className="col-lg-3 reletive mb-3">
                                <span className="react-select-title">Category Type</span>
                                <Select  name='cat_id'
                                options={category_type}
                                className="basic-multi-select"
                                classNamePrefix="select" />

                            </div>
                            <div className="col-lg-3 mb-3" style={{ maxWidth : "23%"}}>
                                <TextField name='mobile' className="filter-input" label="Mobile Number" fullWidth type="number"
                                   InputLabelProps={{
                                    shrink: true,
                                }}
                                />
                            </div>
                            <div className="col-lg-2 mb-3">
                                <TextField id="sdate" name='s_date' className="filter-input" label="Start Date" fullWidth type="date"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </div>

                            <div className="col-lg-2 mb-3">
                                <TextField id="edate" name='e_date' className="filter-input" label="End Date" fullWidth type="date"
                                    InputLabelProps={{ shrink: true, }} />
                            </div>
                            <div className="col-lg-3 mb-3 d-flex p-0" style={{ maxWidth : "18%"}}>
                                <Button type='submit' variant="contained" className="mr-3 btn-filter btnBg">Search</Button>
                                <Button type='reset' onClick={NotificationList} className="mr-3 btn-dark btn-filter">Reset</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div> */}


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
                                            <td>{item.type_status == "1" ? <>Push</> : <>In-App</> }</td>
                                            <td>{item.module_type}</td>
                                            <td>{item.module_id}</td>
                                            <td className="text-end">
                                                <div className="d-flex justtify-content-end">
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
            <ToastContainer position="top-right" />
        </>

    )
}

export default TableLIstNotification