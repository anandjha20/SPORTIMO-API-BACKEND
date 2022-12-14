import React from "react";
import TextField from '@mui/material/TextField';
import MaterialTable from 'material-table';
import Header from "../Header";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from "react";
import Swal from 'sweetalert2'


export default function CreateAvatar() {

      let token = localStorage.getItem("token");
      let header = ({ 'token': `${token}` });
      let options1 = ({ headers: header });


      const [data, setData] = useState([])
      const [catView, setCat] = useState([])
      const [open, setOpen] = useState(false);
      
      const onOpenModal = (_id, setData) => 
      {
        setOpen(true);
        console.log(setData)
      }
      const onCloseModal = () => setOpen(false);   

      const AvatarList = async () =>
      {
          await axios.get(`/web_api/avatar_get`, options1)
          .then(res => {
            const userData = res.data.body;
            setData(userData);
          })
      }
  
    useEffect(() => {
      AvatarList()
    }, []);
  
      const navigate = useNavigate();
      const columns =
          [
            { title: 'Avatar', render : rowData => <><div className="imageSet">
            {rowData.avatar !== '' ? <><img src={rowData.avatar}  /></> : <><img src="/assets/images/no-image.png"  /></> }
            </div> </> },
           
          ]


///////////////// delete  api call  /////////////////
const deleteFaq = (_id) => {  

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
            axios.delete(`/web_api/avatar_delete/${_id}`)
            .then(res => {
                if (res.status) {
                    let data = res.data;
                    if (data.status) { 
                        Swal.fire(
                            'Deleted!',
                             "Avatar deleted successfully",
                            'success'
                          )
                         return AvatarList();
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


/////////////////// Add  Sports Preference API call ///////////////////////////////////////////////// 
const saveFormData = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const Formvlaues = Object.fromEntries(data.entries());
    let dataToSend2 = new FormData();
    dataToSend2.append('image', Formvlaues.image);

    axios.post(`/web_api/avatar_add`, dataToSend2, options1)
            .then(response => {
                if (response.status) {
                    let data = response.data;
                    console.log(data.msg)
                    if (data.status) {
                        toast.success(data.msg);
                        e.target.reset();
                        return AvatarList();
                    } else {
                        toast.error(data.msg);
                    }
                }
                else {
                    toast.error(data.msg);
                }
            })
            .catch(error => {
                console.log(this.state);
            })
}



    return (
        <>
           <div className="faqshow">
            <Header />
            </div>
            <div className="main-content side-content pt-0">
                <div className="container-fluid">
                    <div className="inner-body">

                        <div className="page-header">
                            <div>
                                <h2 className="main-content-title tx-24 mg-b-5">Avatar</h2>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/home">Home</Link>
                                    </li>

                                    <li className="breadcrumb-item active" aria-current="page">&nbsp;&nbsp;Avatar</li>
                                </ol>
                            </div>


                        </div>
                        <div className="row justify-content-center">
                            <div className="col-lg-12 table-responsive border border-bottom-0">

                                <div className="card custom-card">
                                    <div className="card-body">
                                        <div className="row d-flex">
                                            <div className="col-lg-5">
                                                <form className="mt-3" onSubmit={(e) => saveFormData(e)}>
                                                    <h6 className="MuiTypography-root MuiTypography-h6 text-white mb-4">Create Avatar</h6>
                                                    
                                                   <div className="col-lg-12 mt-4 mb-3  p-0">
                                                        <label className="title-col">Upload Avatar</label>
                                                        <input type="file" name='image' className="form-control file-input" />
                                                    </div>
                                                    <div className="mt-3">
                                                        <Button type='submit'  className="mr-3 btn-pd btnBg">Add</Button>
                                                        <Button type='reset' variant="contained" className="btn btn-dark btn-pd">Reset</Button>
                                                    </div>
                                                </form>
                                            </div>
                                            {/* <div className="col-lg-1"></div> */}
                                            <div className="col-lg-7">
                                            <div className="row">
                                            <div className="col-lg-12">

                                                <MaterialTable
                                                    title="Avatar List"
                                                    columns={columns}
                                                    data={data}
                                                    actions={[
                                                       
                                                        {
                                                            icon: 'delete',
                                                            iconProps: { style: { color: "#ff0000" } },
                                                            tooltip: 'Delete Category',
                                                            onClick: (event, setData) => { deleteFaq(setData._id); }
                                                        },
                                                    ]}
                                                    options={{
                                                        search: true,
                                                        actionsColumnIndex: -1,
                                                        showFirstLastPageButtons: true,
                                                        pageSize: 5,
                                                        pageSizeOptions: [5, 20, 50]
                                                    }}

                                                />
                                            </div>
                                        </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer position="top-right" />
        </>
    );
}

