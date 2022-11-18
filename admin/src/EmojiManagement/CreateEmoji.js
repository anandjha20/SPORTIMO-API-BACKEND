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


export default function CreateEmoji() {

      let token = localStorage.getItem("token");
      let header = ({ 'token': `${token}` });
      let options1 = ({ headers: header });


      const [data, setData] = useState([])
      const [emojiView, setEmoji] = useState([])
      const [open, setOpen] = useState(false);
      
      const navigate = useNavigate();
      const onOpenModal = (_id) => 
      {
          axios.post(`/web_api/emoji_get/`,{_id}, options1)
          .then(res => {
              const emojiView = res.data.body[0];
              setEmoji(emojiView);
              setOpen(true);
            console.log(emojiView); 
          })
      }


      
      const onCloseModal = () => setOpen(false);   

      const EmojiList = async () =>
      {
          await axios.post(`/web_api/emoji_get`, options1)
          .then(res => {
            const userData = res.data.body;
            console.log(userData)
            setData(userData);
          })
      }
  
    useEffect(() => {
      EmojiList()
    }, []);
  
      const columns =
          [
            { title: 'Emoji Title', field: 'title' },
           { title: 'Emoji', render : rowData => <><div className="imageSet">
           {data.Emoji !== '' ? <><img src={rowData.emoji}  /></> : <><img src="/assets/images/no-image.png"  /></> }
           </div> </> },
          
          ]


///////////////// delete  api call  /////////////////
const deleteEmoji = (_id) => {  

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
            axios.delete(`/web_api/emoji_delete/${_id}`)
            .then(res => {
                if (res.status) {
                    let data = res.data;
                    if (data.status) { 
                        Swal.fire(
                            'Deleted!',
                             "Emoji deleted successfully",
                            'success'
                          )
                         return EmojiList();
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
    dataToSend2.append('title', Formvlaues.title);
    

    axios.post(`/web_api/emoji_add`, dataToSend2, options1)
            .then(response => {
                if (response.status) {
                    let data = response.data;
                    console.log(data.msg)
                    if (data.status) {
                        toast.success(data.msg);
                        e.target.reset();
                        return EmojiList();
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
///////////////// Update Emoji /////////////////
const UpdateFormData = async (e) => {
    e.preventDefault();
    try {
        const data = new FormData(e.target);
        const Formvlaues = Object.fromEntries(data.entries());
        let dataToSend2 = new FormData();
        dataToSend2.append('image', Formvlaues.image);
        dataToSend2.append('title', Formvlaues.title);
        dataToSend2.append('id', Formvlaues.id);
        console.log("new values == ", dataToSend2);

        axios.put(`/web_api/emoji_update`, dataToSend2, options1)
            .then(res => {
                if (res.status) {

                    let data = res.data;
                    if (data.status) {
                        toast.success(data.msg);
                        setOpen(false);
                        return axios.post("/web_api/emoji_get")
                        .then(res => {
                            const userData = res.data.body;
                            setData(userData);
                        })
                    } else {
                        toast.error('something went wrong please try again');
                    }
                }
                else {
                    toast.error('something went wrong please try again..'); }
            })
            .catch(error => {
                console.log(this.state);
            })

    } catch (err) { console.error(err); toast.error('some errror'); return false; }
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
                                <h2 className="main-content-title tx-24 mg-b-5">Emoji</h2>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/home">Home</Link>
                                    </li>

                                    <li className="breadcrumb-item active" aria-current="page">&nbsp;&nbsp;Emoji</li>
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
                                                    <h6 className="MuiTypography-root MuiTypography-h6 text-white mb-4">Create Emoji</h6>
                                                    <div className="col-lg-12 mt-4 mb-3  p-0">
                                                        <label className="title-col">Emoji Title</label>
                                                        <input type="text" name='title' className="form-control file-input" />
                                                    </div>
                                                   <div className="col-lg-12 mt-4 mb-3  p-0">
                                                        <label className="title-col">Upload Emoji</label>
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
                                                    title="Emoji List"
                                                    columns={columns}
                                                    data={data}
                                                    actions={[
                                                        {
                                                            icon: 'edit',
                                                            iconProps: { style: { color: "#6259ca" } },
                                                            tooltip: 'Update Emoji',
                                                            onClick: (event, setData) => { onOpenModal(setData._id); }
                                                        },
                                                        
                                                        {
                                                            icon: 'delete',
                                                            iconProps: { style: { color: "#ff0000" } },
                                                            tooltip: 'Delete Category',
                                                            onClick: (event, setData) => { deleteEmoji(setData._id); }
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
                                        <Modal open={open} onClose={onCloseModal} center>
                                        <h2 className="mb-4 text-white">Update Emoji</h2>
                                        <div className="mx-500">
                                            <form className="mt-3 w-100" onSubmit={(e) => UpdateFormData(e)}>
                                            <div className="form-group mb-4"> 
                                            <label className="title-col">Update Title </label>
                                                            <input type="hidden" className="form-control" name='id' value={emojiView._id} />
                                                            <input type="text" className="form-control" name='title' 
                                                            defaultValue={emojiView.title} /> 
                                                    </div>
                                                    <div className="form-group mb-4"> 
                                                    <label className="title-col">Update Emoji </label>
                                                      <input id="categor" className="form-control mb-4" name="image"
                                                         type="file" 
                                                    />
                                                    </div>

                                                    
                                                <div className="mt-3">
                                                    <Button type='submit' className="mr-3 btn-pd btnBg">Update</Button>
                                                    </div>
                                            </form>
                                        </div>
                                    </Modal>


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

