import React from "react";
import Header from "../Header";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import MaterialTable from 'material-table';
import { useState, useEffect } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import "react-responsive-modal/styles.css";

function ViewCardCategory() {


    const [data, setData] = useState([])
    
    const UserChatBlocked = async () => {
        await axios.get(`/web_api/get_prediction_card_Cat_list`)
            .then(res => {
                 const userData = res.data.body;
                 setData(userData)
            })
    }
    useEffect(() => {
        UserChatBlocked()
    }, []);



    const columns =
        [
            { title: 'Category (English)', field: 'name' },
            { title: 'Category (Arabic)', field: 'name_ara' },
        ]


    return (
        <>
            <Header />
            <ToastContainer />
            <div className="main-content side-content pt-0">
                <div className="container-fluid">
                    <div className="inner-body">

                        <div className="page-header">
                            <div>
                                <h2 className="main-content-title tx-24 mg-b-5">View Card Category</h2>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/home">Home</Link>
                                    </li>

                                    <li className="breadcrumb-item active" aria-current="page">&nbsp;&nbsp;View Card Category</li>
                                </ol>
                            </div>
                            <div className="d-flex">
                                <div className="justify-content-center">
                                    {/* <Link  to="/geq/create">
                                    <Button type='button' variant="contained" className="mr-3 btn-pd btnBg"><i className="fas fa-plus"></i>&nbsp;&nbsp; Add  Groups Chat Management</Button>
                                    </Link> */}
                                </div>
                            </div>

                        </div>
                     
                                    <div className="row justify-content-center">
                            <div className="col-lg-12 table-responsive border border-bottom-0">
                                {/* <h5 className="text-white ml-3">View Card Category</h5> */}
                                {/* <table className="table w-100">
                                    <thead>
                                        <tr>
                                            <th scope="col" style={{ background: "#3d454c", borderRadius : "10px 0px 0px 0px"}}>User Name</th>
                                            <th scope="col" className="text-end" style={{ background: "#3d454c",  borderRadius: "0px 10px 0px 0px"}}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {statusTrue == false ? <>
                                               <tr>
                                                      <td className="text-center w-100">
                                                     <img src="/assets/images/nodatafound.png" alt='no image' width="250px" /> </td>
                                              </tr>
                                            </> : null }
                                        {statusTrue == true ? <>
                                        {data.map((item, index) => {
                                            if (item.name !== '') {
                                                return (
                                                    <tr key={index}>
                                                        <td>{item.name}</td>
                                                        <td className="text-end"><Button onClick={() => { UnblockedUser(item._id); }} type='submit' className="mr-3 mt-2 mb-2 btn-pd btnBg">Unblock</Button></td>
                                                    </tr>
                                                );
                                            }
                                        })}
                                        </>
                                        : null }
                                        
                                   
                                       
                                       
                                    </tbody>
                                </table> */}


                                <MaterialTable
                                    title="View Card Category"
                                    columns={columns}
                                    data={data}
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
        </>

    );
}

export default ViewCardCategory;