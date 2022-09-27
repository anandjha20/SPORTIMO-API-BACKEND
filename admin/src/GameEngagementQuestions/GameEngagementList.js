import React from "react";
import Header from "../Header";
import { Link } from "react-router-dom";
import Button  from "@mui/material/Button";
import TableGameEngagemt from "./TableGameEngagemt";

function GameEngagementList() {
    return (
        <>
          <Header />
            <div className="main-content side-content pt-0">
                <div className="container-fluid">
                    <div className="inner-body">

                        <div className="page-header">
                            <div>
                                <Link to="/cards"  style={{ color : "white" }} className="main-content-title tx-24 mg-b-5">Game Engagement Questions</Link>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/home">Home</Link>
                                    </li>
                                  
                                    <li className="breadcrumb-item active" aria-current="page">&nbsp;&nbsp;Game Engagement Questions</li>
                                </ol>
                            </div>
                            <div className="d-flex">
								<div className="justify-content-center">
							       <Link  to="/geq/create">
                                    <Button type='button' variant="contained" className="mr-3 btn-pd btnBg"><i className="fas fa-plus"></i>&nbsp;&nbsp; Add  Game Engagement Questions</Button>
                                    </Link>
                                </div>
							</div>
                           
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-lg-12 table-responsive border border-bottom-0">
                                
                             <TableGameEngagemt />          
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default GameEngagementList;