import React from "react";
import Header from "../../Header";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';




function ReplyComplaintChat() {

    const bottomRef = useRef();
    const scrollToBottom = () => {
        bottomRef.current.scrollIntoView({ behavior: "smooth", block: "center", inline: "center"});
      };

    const [data, setData] = useState([])
    const { _id } = useParams();

    const ChatMessage = async () =>
    {
        await axios.get(`/user_complaint_chat_list/${_id}`)
        .then(res => {
          const userData = res.data.body;
          const userDataId = res.data.body[0].complaint_id;
          setData(userData);
          console.log(userData); 
        })
    }

    useEffect(() => {
           ChatMessage();
           FaqList()
           //scrollToBottom()
        //setInterval(() =>  scrollToBottom([]),  1000, );
      }, []);


      const FaqList = async () =>
      {

        if(_id)
        {
            await axios.get(`http://192.168.1.95:3600/api/user_complaint_all/`)
            .then(res => {
              const userData = res.data.body;
              setData(userData);
              console.log(userData); 
            //   console.log(userCategory); 
            })
        }
        else
        {
            return
            (
                <h1>no  data</h1>
            );
        }
          
      } 


    useEffect(() => {
        document.body.className = "main-body leftmenu camp_list";
        return () => {
            document.body.className = "main-body leftmenu";
        }
    }, []);


///////////////// Chat APi call /////////////////
const saveFormData = async (e) => {
    e.preventDefault();
    try {

        let message = (e.target.elements.message !== 'undefined') ? e.target.elements.message.value : '';
        let complaint_id = (e.target.elements.complaint_id !== 'undefined') ? e.target.elements.complaint_id.value : '';
        let sender_type = (e.target.elements.sender_type !== 'undefined') ? e.target.elements.sender_type.value : '';

        let dataToSend2 = {
            "sender_type": sender_type,
            "complaint_id": complaint_id,
            "message": message,
        }

        console.log("new values == ", dataToSend2);

        let options1 = { headers: { headers: { 'Content-Type': 'multipart/form-data' }, "token": localStorage.getItem('token') } };

        axios.post(`/user_complaint_chat_add`, dataToSend2, options1)
            .then(res => {
                if (res.status) {

                  let data = res.data;
                    if (data.status) {
                        e.target.reset();        
                       toast.success(data.msg); 
                       return axios.get(`/user_complaint_chat_list/${_id}`)
                            .then(res => {
                                const userData = res.data.body;
                                setData(userData);
                            });                 
                    } else {
                       toast.error('something went wrong please try again');
                        e.target.reset();   
                    }
                }
                else {
                    toast.error('something went wrong please try again..');
                    e.target.reset();   
                }

            })
            .catch(error => {
                console.log(this.state);
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
                                <h2 className="main-content-title tx-24 mg-b-5">Complaint Reply</h2>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/home">Home</Link>
                                    </li>

                                    <li className="breadcrumb-item active" aria-current="page">&nbsp;&nbsp;Complaint Management</li>
                                </ol>
                            </div>
                            <div className="d-flex">
								<div className="justify-content-center">
							       <Link  to="/complaint">
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
                                         <img src="/assets/images/no-image.png" alt="img" />
                                         </div>
                                         <div>
                                         <h6 className="">Available to add money.</h6>
                                         <h6 className="dis">Lorem Ipsum is simply dummy text of the printing and typesetting industry. </h6>
                                         </div>
                                         </div>
                                        </div>
                                        <div className="msger-header-options">
                                           
                                        </div>
                                    </header>

                                    <main className="msger-chat" id="myDiv">
                                    {data.map((daTa) => {
                                         if(daTa.sender_type == 'user')
                                         {
                                            return (
                                                <>
                                                <div className="msg left-msg">
                                                <div  className="msg-img">
                                                <i className="fad fa-user-circle"></i>
                                                </div>
                                                <div className="msg-bubble">
                                                    <div className="msg-info">
                                                        <div className="msg-info-name">{daTa.sender_type}</div>
                                                        <div className="msg-info-time">12:45</div>
                                                    </div>
                                                    <div className="msg-text">
                                                       {daTa.message}
                                                    </div>
                                                </div>
                                            </div>                                    
                                        </>
                                               );
                                         }

                                         if(daTa.sender_type == 'admin')
                                         {
                                            return (
                                                <>
                                                <div className="msg right-msg">
                                                  <div className="msg-img">
                                                  <img src="/assets/img/admin.png" alt="img user" />
                                                  </div>
                                                   <div className="msg-bubble">
                                                    <div className="msg-info">
                                                        <div className="msg-info-name">{daTa.sender_type}</div>
                                                        <div className="msg-info-time">12:46</div>
                                                    </div>
                                                    <div className="msg-text">
                                                        {daTa.message}
                                                    </div>
                                                </div>
                                            </div>
                                            </>
                                                );
                                         }

                                         <h1>sunil</h1>

                                         })}


                                        
                                        

                                        <div ref={bottomRef} />

                                    </main>
                                    <form className="msger-inputarea" onSubmit={(e) => saveFormData(e)}>
                                        <input type="hidden" className="form-control" name='sender_type' value="admin" />
                                        <input type="hidden" className="form-control" name='complaint_id'  value={_id} />

                                        
                                        <input type="text" className="msger-input" name='message' placeholder="Enter your message..." autoComplete="off" />
                                        <Button type='submit' className="ml-3 btn-pd btnBg">Send</Button>
                                    </form>
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

export default ReplyComplaintChat;