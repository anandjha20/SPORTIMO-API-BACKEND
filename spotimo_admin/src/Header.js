import React from "react";
import {Link } from "react-router-dom";
import { NavLink,useNavigate } from 'react-router-dom';
import { useState } from "react";
import {  toast } from 'react-toastify';


export default function Header() {

const navRef = React.useRef(null);

const onRemoveClick = (e) => {
    navRef.current.classList.remove("show");
  };

const onRemoveClick1 = (e) => {
    navRef.current.classList.remove("show");
  };

 {
	function cm(...args) {
		return args.filter((v) => v).join(" ");
	  }
	  
	const handleProfile = (event) => {
		event.currentTarget.classList.toggle('show');
		
	};
	const handleActive = (event) => {
		event.currentTarget.classList.toggle('active');
	};
	const handleProfile1 = (event) => {
		event.currentTarget.classList.toggle('show');
	  };

	 const [navItem, setnavItem] = useState("");

	 const navigate = useNavigate();
	 const logout = ()=>{

		//alert("my fun call == ");
		localStorage.clear();
	    navigate('/');
		toast.success("Logout Successfully");
	}

return (


 <>

	<div className="main-sidebar main-sidebar-sticky side-menu">
				<div className="sidemenu-logo">
					<Link className="main-logo" to="/home">
						{/* <img src="/assets/img/brand/logo-light.png" className="header-brand-img desktop-logo" alt="logo" />
						<img src="/assets/img/brand/icon-light.png" className="header-brand-img icon-logo" alt="logo" />
						<img src="/assets/img/brand/logo.png" className="header-brand-img desktop-logo theme-logo" alt="logo" />
						<img src="/assets/img/brand/icon.png" className="header-brand-img icon-logo theme-logo" alt="logo" /> */}
						<h2 className="mb-0 text-white text-uppercase">Sportimo</h2>
					</Link>
				</div>
				<div className="main-sidebar-body">
					<ul className="nav">
						<li className="nav-header"><span className="nav-label">Dashboard</span></li>
						<li className="nav-item">
							<NavLink  className="nav-link " to="/home"><span className="shape1"></span><span className="shape2"></span>
							<i className="fad fa-home-lg sidemenu-icon"></i>
							<span className="sidemenu-label">Dashboard</span></NavLink >
						</li>
						
						<li className="nav-item" >
						    <NavLink className="nav-link" to="/user"><span className="shape1"></span><span className="shape2"></span>
							<i className="fad fa-users-cog  sidemenu-icon menu-icon"></i>
							<span className="sidemenu-label">User Management</span>
							</NavLink>
							
							{/* <NavLink  to="/user-list" className="nav-link"><span className="shape1"></span><span className="shape2"></span>
							<i className="fad fa-users-cog  sidemenu-icon menu-icon"></i>
							<span className="sidemenu-label">User Management</span></NavLink> */}
						</li>

						 <li className="nav-item" >
							<NavLink  to="/poll" className="nav-link"><span className="shape1"></span><span className="shape2"></span>
							<i className="fad fa-chart-pie sidemenu-icon menu-icon"></i>
							<span className="sidemenu-label">Poll Management</span></NavLink>
						</li> 

						 <li className="nav-item" >
							<NavLink  to="/geq" className="nav-link"><span className="shape1"></span><span className="shape2"></span>
							<i className="fad fa-question-circle sidemenu-icon menu-icon"></i>
							<span className="sidemenu-label">GEQ</span></NavLink>
						</li> 

						 <li className="nav-item" >
							<NavLink  to="/sponsorship" className="nav-link"><span className="shape1"></span><span className="shape2"></span>
							<i className="fad fa-bullhorn sidemenu-icon menu-icon"></i>
							<span className="sidemenu-label">Sponsorship</span></NavLink>
						</li> 


						<li className="nav-item nav-link-local" onClick={handleProfile}>
							<a  className="nav-link with-sub cursor"><span className="shape1"></span><span className="shape2"></span><i className="fad fa-question-circle sidemenu-icon menu-icon"></i><span className="sidemenu-label">Faq</span><i className="angle fe fe-chevron-right"></i>
							</a>
							 <ul className="nav-sub">
								<li className="nav-sub-item">
									<NavLink  to="/add-category" className="nav-sub-link" >Category Management</NavLink>
								</li>
								<li className="nav-sub-item">
									<NavLink  to="/faq" className="nav-sub-link " >Faq Management</NavLink>
								</li>
							</ul>
						</li>
						<li className="nav-item nav-link-child" onClick={handleProfile}>
							<a onClick={handleActive} className="nav-link with-sub cursor"><span className="shape1"></span>
							<span className="shape2"></span>
							<i className="fad fa-comment-alt-edit sidemenu-icon menu-icon"></i>
							<span className="sidemenu-label">Complaint </span><i className="angle fe fe-chevron-right"></i></a>
							 <ul className="nav-sub">
								<li className="nav-sub-item">
									<NavLink  to="/complaint-category" className="nav-sub-link">Complaint Category</NavLink>
								</li>
								<li className="nav-sub-item">
									<NavLink  to="/complaint" className="nav-sub-link">Complaint Management</NavLink>
								</li>
								{/* <li className="nav-sub-item">
									<NavLink  to="/complaint-reply" className="nav-sub-link">Chat Management</NavLink>
								</li> */}
							</ul>
						</li>

						{/* <li className="nav-item" >
							<NavLink  to="/add-category" className="nav-link"><span className="shape1"></span><span className="shape2"></span>
							<i className="fas fa-th-large sidemenu-icon menu-icon"></i>
							<span className="sidemenu-label">Add Faq Category</span></NavLink>
						</li>  */}
						 {/* <li className="nav-item" >
							<NavLink  to="/faq" className="nav-link"><span className="shape1"></span><span className="shape2"></span>
							<i className="fad fa-question-circle sidemenu-icon menu-icon"></i>
							<span className="sidemenu-label">Faq Management</span></NavLink>
						</li>  */}
						 {/* <li className="nav-item" >
							<NavLink  to="/complaint" className="nav-link"><span className="shape1"></span><span className="shape2"></span>
							<i className="fad fa-comment-alt-edit sidemenu-icon menu-icon"></i>
							<span className="sidemenu-label">Complaint Management</span></NavLink>
						</li>  */}
						 <li className="nav-item" >
							<NavLink  to="/tips" className="nav-link"><span className="shape1"></span><span className="shape2"></span>
							<i className="fad fa-lightbulb-on sidemenu-icon menu-icon"></i>
							<span className="sidemenu-label">Tips & Tricks</span></NavLink>
						</li> 
						

					
					</ul>
				</div>
			</div>
			
			<div className="main-header side-header sticky">
				<div className="container-fluid">
					<div className="main-header-left">
						<a className="main-header-menu-icon" href="#" id="mainSidebarToggle"><span></span></a>
					</div>
					
					<div className="main-header-right">
						<div className="dropdown header-search">
							<a className="nav-link icon header-search">
								<i className="fe fe-search header-icons"></i>
							</a>
							<div className="dropdown-menu">
								<div className="main-form-search p-2">
									<div className="input-group">
										<div className="input-group-btn search-panel">
											<select className="form-control select2-no-search">
												<option label="All categories">
												</option>
												<option value="IT Projects">
													IT Projects
												</option>
												<option value="Business Case">
													Business Case
												</option>
												<option value="Microsoft Project">
													Microsoft Project
												</option>
												<option value="Risk Management">
													Risk Management
												</option>
												<option value="Team Building">
													Team Building
												</option>
											</select>
										</div>
										<input type="search" className="form-control" placeholder="Search for anything..." />
										<button className="btn search-btn"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></button>
									</div>
								</div>
							</div>
						</div>
						
						<div className="dropdown d-md-flex">
							<a className="nav-link icon full-screen-link" href="#">
								<i className="fe fe-maximize fullscreen-button fullscreen header-icons"></i>
								<i className="fe fe-minimize fullscreen-button exit-fullscreen header-icons"></i>
							</a>
						</div>
						<div className=" main-header-notification" onClick={handleProfile}>
							<a className="nav-link icon"  href="#">
								<i className="fe fe-bell header-icons"></i>
								<span className="badge badge-danger nav-link-badge">4</span>
							</a>
							<div className="dropdown-menu">
								<div className="header-navheading">
									<p className="main-notification-text">You have 1 unread notification<span className="badge badge-pill badge-primary ml-3">View all</span></p>
								</div>
								<div className="main-notification-list">
									<div className="media new">
										<div className="main-img-user online"><img alt="avatar" src="/assets/img/users/5.jpg" /></div>
										<div className="media-body">
											<p>Congratulate <strong>Olivia James</strong> for New template start</p><span>Oct 15 12:32pm</span>
										</div>
									</div>
									<div className="media">
										<div className="main-img-user">
                                            <img alt="avatar" src="/assets/img/users/2.jpg" /></div>
										<div className="media-body">
											<p><strong>Joshua Gray</strong> New Message Received</p><span>Oct 13 02:56am</span>
										</div>
									</div>
									<div className="media">
										<div className="main-img-user online">
                                            <img alt="avatar" src="/assets/img/users/3.jpg" /></div>
										<div className="media-body">
											<p><strong>Elizabeth Lewis</strong> added new schedule realease</p><span>Oct 12 10:40pm</span>
										</div>
									</div>
								</div>
								<div className="dropdown-footer">
									<a href="#">View All Notifications</a>
								</div>
							</div>
						</div>
						<div className="main-header-notification">
							<a className="nav-link icon" href="#">
								<i className="fe fe-message-square header-icons"></i>
								<span className="badge badge-success nav-link-badge">6</span>
							</a>
						</div>
						<div className="main-profile-menu"  onClick={handleProfile1}>
							<a className="d-flex" href="#">
								<span className="main-img-user" ><img alt="avatar" src="/assets/img/admin.png" /></span>
							</a>
							<div className="dropdown-menu">
								<div className="header-navheading">
									<h6 className="main-notification-title">Admin</h6>
									<p className="main-notification-text">admin@gmail.com</p>
								</div>
								<a className="dropdown-item border-top" href="#">
									<i className="fe fe-user"></i> My Profile
								</a>
							
								
								<a className="dropdown-item" href="#">
									<i className="fe fe-compass"></i> Activity
								</a>

									
								<Link className="dropdown-item" to="/changepassword">
								<i className="fal fa-lock"></i>
								Change Password </Link>

								<li className="dropdown-item"  onClick={(e)=>logout()}  >
									<i className="fe fe-power" ></i> Sign Out
								</li>
							</div>
						</div>
						
					
					</div>
				</div>
			</div>
			
			<div className="mobile-main-header">
				<div className="mb-1 navbar navbar-expand-lg  nav nav-item  navbar-nav-right responsive-navbar navbar-dark  ">
					<div className="collapse navbar-collapse" id="navbarSupportedContent-4">
						<div className="d-flex order-lg-2 ml-auto">
							<div className="dropdown header-search">
								<a className="nav-link icon header-search">
									<i className="fe fe-search header-icons"></i>
								</a>
								<div className="dropdown-menu">
									<div className="main-form-search p-2">
										<div className="input-group">
											<div className="input-group-btn search-panel">
												<select className="form-control select2-no-search">
													<option label="All categories">
													</option>
													<option value="IT Projects">
														IT Projects
													</option>
													<option value="Business Case">
														Business Case
													</option>
													<option value="Microsoft Project">
														Microsoft Project
													</option>
													<option value="Risk Management">
														Risk Management
													</option>
													<option value="Team Building">
														Team Building
													</option>
												</select>
											</div>
											<input type="search" className="form-control" placeholder="Search for anything..." />
											<button className="btn search-btn"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></button>
										</div>
									</div>
								</div>
							</div>
							<div className="dropdown main-header-notification flag-dropdown">
							<a className="nav-link icon country-Flag">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><circle cx="256" cy="256" r="256" fill="#f0f0f0"/><g fill="#0052b4"><path d="M52.92 100.142c-20.109 26.163-35.272 56.318-44.101 89.077h133.178L52.92 100.142zM503.181 189.219c-8.829-32.758-23.993-62.913-44.101-89.076l-89.075 89.076h133.176zM8.819 322.784c8.83 32.758 23.993 62.913 44.101 89.075l89.074-89.075H8.819zM411.858 52.921c-26.163-20.109-56.317-35.272-89.076-44.102v133.177l89.076-89.075zM100.142 459.079c26.163 20.109 56.318 35.272 89.076 44.102V370.005l-89.076 89.074zM189.217 8.819c-32.758 8.83-62.913 23.993-89.075 44.101l89.075 89.075V8.819zM322.783 503.181c32.758-8.83 62.913-23.993 89.075-44.101l-89.075-89.075v133.176zM370.005 322.784l89.075 89.076c20.108-26.162 35.272-56.318 44.101-89.076H370.005z"/></g><g fill="#d80027"><path d="M509.833 222.609H289.392V2.167A258.556 258.556 0 00256 0c-11.319 0-22.461.744-33.391 2.167v220.441H2.167A258.556 258.556 0 000 256c0 11.319.744 22.461 2.167 33.391h220.441v220.442a258.35 258.35 0 0066.783 0V289.392h220.442A258.533 258.533 0 00512 256c0-11.317-.744-22.461-2.167-33.391z"/><path d="M322.783 322.784L437.019 437.02a256.636 256.636 0 0015.048-16.435l-97.802-97.802h-31.482v.001zM189.217 322.784h-.002L74.98 437.019a256.636 256.636 0 0016.435 15.048l97.802-97.804v-31.479zM189.217 189.219v-.002L74.981 74.98a256.636 256.636 0 00-15.048 16.435l97.803 97.803h31.481zM322.783 189.219L437.02 74.981a256.328 256.328 0 00-16.435-15.047l-97.802 97.803v31.482z"/></g></svg>
							</a>
							<div className="dropdown-menu">
								<a href="#" className="dropdown-item d-flex ">
									<span className="avatar  mr-3 align-self-center bg-transparent">
                                        <img src="/assets/img/flags/french_flag.jpg" alt="img" /></span>
									<div className="d-flex">
										<span className="mt-2">French</span>
									</div>
								</a>
								<a href="#" className="dropdown-item d-flex">
									<span className="avatar  mr-3 align-self-center bg-transparent">
                                        <img src="/assets/img/flags/germany_flag.jpg" alt="img" /></span>
									<div className="d-flex">
										<span className="mt-2">Germany</span>
									</div>
								</a>
								<a href="#" className="dropdown-item d-flex">
									<span className="avatar mr-3 align-self-center bg-transparent">
                                        <img src="/assets/img/flags/italy_flag.jpg" alt="img" /></span>
									<div className="d-flex">
										<span className="mt-2">Italy</span>
									</div>
								</a>
								<a href="#" className="dropdown-item d-flex">
									<span className="avatar mr-3 align-self-center bg-transparent">
                                        <img src="/assets/img/flags/russia_flag.jpg" alt="img" /></span>
									<div className="d-flex">
										<span className="mt-2">Russia</span>
									</div>
								</a>
								<a href="#" className="dropdown-item d-flex">
									<span className="avatar  mr-3 align-self-center bg-transparent">
                                        <img src="/assets/img/flags/spain_flag.jpg" alt="img" /></span>
									<div className="d-flex">
										<span className="mt-2">spain</span>
									</div>
								</a>
							</div>
						</div>
						<div className="dropdown ">
							<a className="nav-link icon full-screen-link">
								<i className="fe fe-maximize fullscreen-button fullscreen header-icons"></i>
								<i className="fe fe-minimize fullscreen-button exit-fullscreen header-icons"></i>
							</a>
						</div>
						<div className="dropdown main-header-notification">
							<a className="nav-link icon" href="#">
								<i className="fe fe-bell header-icons"></i>
								<span className="badge badge-danger nav-link-badge">4</span>
							</a>
							<div className="dropdown-menu">
								<div className="header-navheading">
									<p className="main-notification-text">You have 1 unread notification<span className="badge badge-pill badge-primary ml-3">View all</span></p>
								</div>
								<div className="main-notification-list">
									<div className="media new">
										<div className="main-img-user online"><img alt="avatar" src="/assets/img/users/5.jpg" /></div>
										<div className="media-body">
											<p>Congratulate <strong>Olivia James</strong> for New template start</p><span>Oct 15 12:32pm</span>
										</div>
									</div>
									<div className="media">
										<div className="main-img-user"><img alt="avatar" src="/assets/img/users/2.jpg" /></div>
										<div className="media-body">
											<p><strong>Joshua Gray</strong> New Message Received</p><span>Oct 13 02:56am</span>
										</div>
									</div>
									<div className="media">
										<div className="main-img-user online"><img alt="avatar" src="/assets/img/users/3.jpg" /></div>
										<div className="media-body">
											<p><strong>Elizabeth Lewis</strong> added new schedule realease</p><span>Oct 12 10:40pm</span>
										</div>
									</div>
								</div>
								<div className="dropdown-footer">
									<a href="#">View All Notifications</a>
								</div>
							</div>
						</div>
						<div className="main-header-notification mt-2">
							<a className="nav-link icon" href="chat.html">
								<i className="fe fe-message-square header-icons"></i>
								<span className="badge badge-success nav-link-badge">6</span>
							</a>
						</div>
						<div className="dropdown main-profile-menu">
							<a className="d-flex" href="#">
								<span className="main-img-user" >
                                    {/* <img alt="avatar" src="/assets/images/users/1.jpg" /> */}
									</span>
							</a>
							<div className="dropdown-menu">
								<div className="header-navheading">
									<h6 className="main-notification-title">Admin</h6>
									<p className="main-notification-text">admin@gmail.com</p>
								</div>
								<a className="dropdown-item border-top" href="#">
									<i className="fe fe-user"></i> My Profile
								</a>
								<a className="dropdown-item" href="#">
									<i className="fe fe-edit"></i> Edit Profile
								</a>
								<a className="dropdown-item" href="#">
									<i className="fe fe-settings"></i> Account Settings
								</a>
								<a className="dropdown-item" href="#">
									<i className="fe fe-settings"></i> Support
								</a>
								<a className="dropdown-item" href="#">
									<i className="fe fe-compass"></i> Activity
								</a>
								<a className="dropdown-item" href="signin.html">
									<i className="fe fe-power"></i> Sign Out
								</a>
							</div>
						</div>
						
						</div>
					</div>
				</div>
			</div>
   </>
   );

					}
				}