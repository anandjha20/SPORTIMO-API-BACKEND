import React from "react";
import Header from "../Header";
import UserListTable from "./UserTableComponent";
import {Link} from 'react-router-dom';
import UserFilterComponent from "./Components/UserFilterComponent";

class UserManagement extends React.Component {

    // constructor(props) {
    //     super(props);
    
    //     this.state = {
    //         items: [],
    //         DataisLoaded: false
    //     };
    // }

    
    // componentDidMount() {
    //     fetch("http://192.168.1.95:3500/web_api/user_list")
    //         .then((resp) => resp.json()).then((result) => {
    //             console.log(result);
    //         })
    // }
    
    render() {


    return (
        <>
        
      <Header />
       
     <div className="main-content side-content pt-0">
				<div className="container-fluid">
					<div className="inner-body">
                   
						<div className="page-header">
							<div>
								<h2 className="main-content-title tx-24 mg-b-5">User Management</h2>
								<ol className="breadcrumb">
									<li className="breadcrumb-item"><Link to="/home">Home</Link></li>
									<li className="breadcrumb-item active" aria-current="page">&nbsp;&nbsp;User Management</li>
								</ol>
							</div>
						
					</div>
                    <div className="row">
                        <div className="col-lg-12 table-responsive border border-bottom-0">
                       
                       
                        <UserFilterComponent />
                        </div>
                       
                    </div>
                </div>


                <UserListTable />
                <br />
             </div>
          </div>

         

        </>
    );
}

}


export default UserManagement;
