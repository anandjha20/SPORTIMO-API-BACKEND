import React from "react";
import Header from "../Header";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';


function GroupChatManagement() {

    const bottomRef = useRef();
    const scrollToBottom = () => {
        bottomRef.current.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    };

    const [data, setData] = useState([])
    const [dataDetail, setDataDetail] = useState([])
    const { _id } = useParams();

    let formData = {};
    let token = localStorage.getItem("token");
    let header = ({ 'token': `${token}` });
    let options1 = ({ headers: header });

    const ChatDetails = async () => {
        const sanData = { page: "1", rows: "1" }
        const result = await axios.get(`/web_api/firebase_group_chat_data/idMq9Tp9Egn3ic1Fqd7Y`, sanData, options1);
        const dataDetail = result.data.body;
        setDataDetail(dataDetail);
        console.log(dataDetail);
    }

    // const ChatMessage = async () =>
    // {
    //     await axios.get(`/web_api/user_complaint_chat_list/${_id}`, options1)
    //     .then(res => {
    //       const userData = res.data.body;
    //       const userDataId = res.data.body[0].complaint_id;
    //       setData(userData);
    //       console.log(userData); 
    //     })
    // }

    useEffect(() => {
        //    ChatMessage();
        ChatDetails();
        //    FaqList()
        //scrollToBottom()
        //setInterval(() =>  scrollToBottom([]),  1000, );
    }, []);



    ///////////////// Chat APi call /////////////////
    // const saveFormData = async (e) => {
    //     e.preventDefault();
    //     try {

    //         let message = (e.target.elements.message !== 'undefined') ? e.target.elements.message.value : '';
    //         let complaint_id = (e.target.elements.complaint_id !== 'undefined') ? e.target.elements.complaint_id.value : '';
    //         let sender_type = (e.target.elements.sender_type !== 'undefined') ? e.target.elements.sender_type.value : '';

    //         let dataToSend2 = {
    //             "sender_type": sender_type,
    //             "complaint_id": complaint_id,
    //             "message": message,
    //         }

    //         console.log("new values == ", dataToSend2);

    //         // let options1 = { headers: { headers: { 'Content-Type': 'multipart/form-data' }, "token": localStorage.getItem('token') } };

    //         axios.post(`/web_api/user_complaint_chat_add`, dataToSend2, options1)
    //             .then(res => {
    //                 if (res.status) {

    //                   let data = res.data;
    //                     if (data.status) {
    //                         e.target.reset();        
    //                        toast.success(data.msg); 
    //                        return axios.get(`/web_api/user_complaint_chat_list/${_id}`)
    //                             .then(res => {
    //                                 const userData = res.data.body;
    //                                 setData(userData);
    //                             });                 
    //                     } else {
    //                        toast.error(data.msg);
    //                         e.target.reset();   
    //                     }
    //                 }
    //                 else {
    //                     toast.error('something went wrong please try again..');
    //                     e.target.reset();   
    //                 }

    //             })
    //             .catch(error => {
    //                 console.log(this.state);
    //             })

    //     } catch (err) { console.error(err); toast.error('some errror'); return false; }
    // }



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

                                             <h6 className="">Cricket Batting Game</h6>
                                            <h6 className="dis"></h6>

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
                                                                    <div className="msg-info-name"></div>
                                                                    <div className="msg-info-time">12:45</div>
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