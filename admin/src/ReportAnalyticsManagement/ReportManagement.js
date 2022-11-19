import React from "react";
import Header from "../Header";
import ReportListTable from "./ReportTableComponent";
import {Link} from 'react-router-dom';
// import UserFilterComponent from "./Components/UserFilterComponent";

export default function ReportManagement() {

    return (
        <>
      <Header />

     <div className="main-content side-content pt-0">
				<div className="container-fluid">
					<div className="inner-body">
                   
						<div className="page-header">
							<div>
								<h2 className="main-content-title tx-24 mg-b-5">User Reports</h2>
								<ol className="breadcrumb">
									<li className="breadcrumb-item"><Link to="/home">Home</Link></li>
									<li className="breadcrumb-item active" aria-current="page">&nbsp;&nbsp;User Reports</li>
								</ol>
							</div>
						
					</div>
                  
                </div>


                <ReportListTable />
                <br />
             </div>
          </div>

         

        </>
    );

}

