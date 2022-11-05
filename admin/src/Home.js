
import Header from './Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrderReceivedTable from './OrderReceivedTable';
import axios from "axios";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {

const[data, setData] = useState('');
const userlist = async () => {
        await axios.get(`/web_api/dashboard_count`)
            .then(res => {
                const data = res.data.body;
                const total = res.data.rows;
                setData(data);
                console.log(data);
            })
    }
    useEffect(() => {
        userlist()
    }, [])

  return (
    <div className="App">
		<ToastContainer/>
    
        <Header />
        <div className="main-content side-content pt-0">
				<div className="container-fluid">
					<div className="inner-body">

						<div className="page-header">
							<div>
								<h2 className="main-content-title tx-24 mg-b-5">Welcome To Dashboard</h2>
								<ol className="breadcrumb">
									<li className="breadcrumb-item"><a href="#">Sportimo</a></li>
									<li className="breadcrumb-item active" aria-current="page">&nbsp;&nbsp;Dashboard</li>
								</ol>
							</div>
							
						</div>
					
						<div className="row row-sm">
							<div className="col-sm-12 col-lg-12 col-xl-12">
								<div className="row row-sm">
									<div className="col-sm-12 col-md-6 col-lg-6 col-xl-3">
										<div className="card custom-card annimestion blueBg">
											<div className="card-body">
												<Link to="/user" className="card-item">
													<div className="card-item-icon card-icon">
													<i className="fad fa-users"></i>
													</div>
													<div className="card-item-title mb-2">
														<label className="main-content-label tx-13 font-weight-bold mb-1">Registered Players</label>
														<span className="d-block tx-12 mb-0 text-muted">Registered Players</span>
													</div>
													<div className="card-item-body">
														<div className="card-item-stat">
															<h4 className="font-weight-bold">{data.total_user}</h4>
															<small><b className="text-success"></b></small>
														</div>
													</div>
												</Link>
											</div>
										</div>
									</div>
									<div className="col-sm-12 col-md-6 col-lg-6 col-xl-3">
										<div className="card custom-card annimestion darkBlue">
											<div className="card-body">
												<Link to="/poll" className="card-item">
													<div className="card-item-icon card-icon">
													<i className="fad fa-trophy-alt"></i>
													</div>
													<div className="card-item-title mb-2">
														<label className="main-content-label tx-13 font-weight-bold mb-1">Total Polls</label>
														<span className="d-block tx-12 mb-0 text-muted">Total Polls</span>
													</div>
													<div className="card-item-body">
														<div className="card-item-stat">
															<h4 className="font-weight-bold">{data.total_polls}</h4>
															{/* <small><b className="text-success">5%</b> Increased</small> */}
														</div>
													</div>
												</Link>
											</div>
										</div>
									</div>
									<div className="col-sm-12 col-md-12 col-lg-12 col-xl-3">
										<div className="card custom-card annimestion lightRed">
											<div className="card-body">
												<Link to="/geq" className="card-item">
													<div className="card-item-icon card-icon">
													<i className="fad fa-question-circle"></i>
													</div>
													<div className="card-item-title  mb-2">
														<label className="main-content-label tx-13 font-weight-bold mb-1">Total GEQ</label>
														<span className="d-block tx-12 mb-0 text-muted">Total GEQ</span>
													</div>
													<div className="card-item-body">
														<div className="card-item-stat">
															<h4 className="font-weight-bold">{data.total_geq}</h4>
															{/* <small><b className="text-success">12%</b> increased</small> */}
														</div>
													</div>
												</Link>
											</div>
										</div>
									</div>
									<div className="col-sm-12 col-md-12 col-lg-12 col-xl-3">
										<div className="card custom-card annimestion orreng">
											<div className="card-body">
												<Link to="/complaint" className="card-item">
													<div className="card-item-icon card-icon">
													<i className="fad fa-comment-alt-edit"></i>
													</div>
													<div className="card-item-title  mb-2">
														<label className="main-content-label tx-13 font-weight-bold mb-1">Total Complaints</label>
														<span className="d-block tx-12 mb-0 text-muted">Total Complaints</span>
													</div>
													<div className="card-item-body">
														<div className="card-item-stat">
															<h4 className="font-weight-bold">{data.total_complaints}</h4>
															{/* <small><b className="text-success">12%</b> increased</small> */}
														</div>
													</div>
												</Link>
											</div>
										</div>
									</div>
								</div>
								
								
							</div>
							
						</div>


						<div className='row'>
							<div className='col-lg-12'>
								<OrderReceivedTable />
							</div>
						</div>


					</div>
				</div>
			</div>

  
    
    </div>
  );
}

export default Home;
