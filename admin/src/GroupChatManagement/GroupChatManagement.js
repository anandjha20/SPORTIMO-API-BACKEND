import React from "react";
import Header from "../Header";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import moment from "moment";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';

function GroupChatManagement() {



    const [anchorEl, setAnchorEl] = React.useState();
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };





    const bottomRef = useRef();
    const scrollToBottom = () => {
        bottomRef.current.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    };

    const [data, setData] = useState([])
    const [dataDetail, setDataDetail] = useState([])
    const [items, setItems] = useState([])
    const { id } = useParams();
    let formData = {};
    let token = localStorage.getItem("token");
    let header = ({ 'token': `${token}` });
    let options1 = ({ headers: header });

    const ChatDetails = async () => {
        const sanData = { page: "1", rows: "1" }
        const result = await axios.get(`/web_api/FirebaseGroupChatData/${id}`, sanData, options1);
        const dataDetail = result.data.body[0].chatData;
        const items = result.data.body[0];

        const t = new Date( dataDetail[0].time._seconds );
        const formatted = moment(t).format("dd.mm.yyyy hh:MM:ss");
        console.log(formatted + " ======= sunil");
        
        const datasd = 1667996024
        setItems(items)
        setDataDetail(dataDetail);
        console.log(dataDetail);
    }

    useEffect(() => {
        //    ChatMessage();
        ChatDetails();
    }, []);

const handleblock = (uid) =>
 {
    const setDataForm = {
        user_id: uid,
        block_status: "1"
    }
    axios.post(`/web_api/adminUserChatBlockUnblock`, setDataForm)
        .then(res => {
            if (res.status) {
                let data = res.data;
                if (data.status) {
                    toast.success(data.msg);
                    setAnchorEl(null);
                    //  return CompList();
                } else {
                    toast.error(data.msg);
                }
            }
            else {
                toast.error(data.msg);
            }

        })
 }


    return (
        <>
            <Header />
            <div className="main-content side-content pt-0">
                <div className="container-fluid">
                    <div className="inner-body">

                        <div className="page-header">
                            <div>
                                <h2 className="main-content-title tx-24 mg-b-5">Group Chat</h2>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/home">Home</Link>
                                    </li>

                                    <li className="breadcrumb-item active" aria-current="page">&nbsp;&nbsp;Group  Management</li>
                                </ol>
                            </div>
                            <div className="d-flex">
                                <div className="justify-content-center">
                                    <Link to="/groups">
                                        <Button type='button' variant="contained" className="mr-3 btn-pd btnBg"> <i className="fal fa-chevron-double-left"></i> &nbsp;Back</Button>
                                    </Link>
                                </div>
                            </div>

                        </div>
                        <div className="row justify-content-center">
                            <div className="col-lg-10 table-responsive border border-bottom-0">
                                <section className="msger">
                                    <header className="msger-header">

                                        <div className="msger-header-title">
                                            <div className="d-flex chatImg">
                                                <div className="img_width_chat">
                                                <img src='/assets/images/no-image.png' />
                                             </div>
                                           <div>
                                             <h6 className="">{items.name}</h6>
                                            <h6 className="dis">Total Members : {items.size}</h6>
                                            </div>
                                         {/*{dataDetail.image !== '' ? <> <img src={dataDetail.image} alt="slider img" /></> : <><img src='/assets/images/no-image.png' /></> }   
                                         </div>
                                         <div>
                                         <h6 className="">{dataDetail.question}</h6>
                                         <h6 className="dis">Date :- {dataDetail.date}</h6>

                                        
                                         </div> */}
                                            </div>
                                        </div>
                                        <div className="msger-header-options">
                                        </div>
                                    </header>

                                    <main className="msger-chat" id="myDiv" style={{height : "510px", borderRadius : "0px 10px 0px"}}>
                                        {dataDetail.map((daTa) => {
                                                return (
                                                    <>
                                                        <span key=""></span>
                                                        <div className="msg left-msg">
                                                            <div className="msg-img">
                                                                <i className="fad fa-user-circle"></i>
                                                            </div>
                                                            <div className="msg-bubble">
                                                                <div className="msg-info">
                                                                    <div className="msg-info-name">{daTa.sendBy}</div>
                                                                    <div className="msg-info-time">
                                                                    {/* {daTa.time._seconds} */}
                                                                    <div>
                                                                    <Button className="blockbtn"
                                                                        id="fade-button"
                                                                        aria-controls={open ? 'fade-menu' : undefined}
                                                                        aria-haspopup="true"
                                                                        aria-expanded={open ? 'true' : undefined}
                                                                        onClick={handleClick}
                                                                        variant="outlined"
                                                                    >
                                                                        <i className="fal fa-ellipsis-v"></i>
                                                                    </Button>
                                                                    <Menu
                                                                        id="fade-menu"
                                                                        MenuListProps={{
                                                                        'aria-labelledby': 'fade-button',
                                                                        }}
                                                                        anchorEl={anchorEl}
                                                                        open={open}
                                                                        onClose={handleClose}
                                                                        TransitionComponent={Fade}
                                                                    >
                                                                        <MenuItem onClick={(e) => handleblock(daTa.uid)}>Block</MenuItem>
                                                                    </Menu>
                                                                    </div>
                                                                    </div>
                                                                </div>
                                                                <div className="msg-text">
                                                                {daTa.message}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                );

                                        })}


                                        <div ref={bottomRef} />

                                    </main>

                                    {/* <form className="msger-inputarea" onSubmit={(e) => saveFormData(e)}> */}
                                    {/* <form className="msger-inputarea">
                                        <input type="hidden" className="form-control" name='sender_type' value="admin" />
                                        <input type="hidden" className="form-control" name='complaint_id'  value={_id} />

                                        
                                        <input type="text" className="msger-input" name='message' placeholder="Enter your message..." autoComplete="off" />
                                        <Button type='submit' className="ml-3 btn-pd btnBg">Send</Button>
                                    </form> */}
                                </section>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer position="top-right" />
        </>

    );
}

export default GroupChatManagement;