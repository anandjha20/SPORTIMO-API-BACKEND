import React from "react";
import Select from 'react-select';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";


 function PollFilterComponent()
{
const polltype = [
    { value: 'public', label: 'Public' },
    { value: 'private', label: 'Private' },
]
const pollfee = [
    { value: 'free', label: 'Free' },
    { value: 'paid', label: 'Private' },
]

  return (
        <>
            <div className="card custom-card">
                <div className="card-body">
                    <div className="row align-items-center">
                        <div className="col-lg-2 p-0">
                            <TextField id="search" className="filter-input" label="Search Match/league" fullWidth type="search"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                        <div className="col-lg-3 reletive p0m" style={{ maxWidth: "18.0%" }}>
                            <span className="react-select-title">Poll Type</span>
                            <Select name="sports"
                                options={polltype}
                                className="basic-multi-select"
                                classNamePrefix="select" />

                        </div>
                        <div className="col-lg-3 p0m reletive" style={{ maxWidth: "18.0%" }}>
                            <span className="react-select-title">Poll Fee</span>
                            <Select name="sports"
                                options={pollfee}
                                className="basic-multi-select"
                                classNamePrefix="select" />

                        </div>
                        <div className="col-lg-3 p0m" style={{ maxWidth: "18.0%" }}>
                            <TextField id="sdate" className="filter-input" label="Start Date" fullWidth type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />

                        </div>

                        <div className="col-lg-3 p0m" style={{ maxWidth: "18.0%" }}>
                            <TextField id="edate" className="filter-input" label="End Date" fullWidth type="date"
                                InputLabelProps={{ shrink: true, }} />

                        </div>
                        <div className="col-lg-1">
                            <Button type='button' variant="contained" className="mr-3 btn-filter btnBg">Search</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}

export default PollFilterComponent;