import React from "react";
import Select from 'react-select';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";



function UserFilterComponent()
{
    const countryOptions = [
        { value: 'India', label: 'india' },
        { value: '	Afghanistan', label: '	Afghanistan' },
        { value: '	slbania', label: '	Albania'  },
    ]

    const customStyles = {
        container: (base, state) => ({
            ...base,
            zIndex: "999"
          })
    }

  return (
        <>
            <div className="card custom-card">
                <div className="card-body">
                    <div className="row align-items-center">
                        <div className="col-lg-4 ">
                            <TextField id="search" className="filter-input" label="Search User" autoComplete="off" fullWidth type="search"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                        <div className="col-lg-4">
                            <TextField id="email" className="filter-input" label="Email Address" autoComplete="off" fullWidth type="email"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                       
                        <div className="col-lg-4 ">
                            <TextField id="mobile" className="filter-input" label="Mobile Number"  autoComplete="off" fullWidth type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>

                        <div className="col-lg-4 reletive mt-4">
                            <span className="react-select-title">Select Country</span>
                            <Select   name = 'view_type'
                                options={countryOptions}
                                isSearchable
                                placeholder="Search.."
                                isSelected="slbania"
                                menuPortalTarget={document.body}
                                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                className="basic-multi-select"
                                classNamePrefix="select" />

                        </div>
                       
                        <div className="col-lg-3  mt-4">
                            <TextField id="sdate" className="filter-input" label="Start Date" autoComplete="off" fullWidth type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />

                        </div>

                        <div className="col-lg-3 mt-4">
                            <TextField id="edate" className="filter-input" label="End Date" autoComplete="off" fullWidth type="date"
                                InputLabelProps={{ shrink: true, }} />

                        </div>
                        <div className="col-lg-1 mt-4">
                            <Button type='button' variant="contained" className="mr-3 btn-filter btnBg">Search</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}

export default UserFilterComponent;