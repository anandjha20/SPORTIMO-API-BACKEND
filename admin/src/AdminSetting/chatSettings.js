import React from "react";
import Header from "../Header";
import { Link } from "react-router-dom";
import Select from "react-select";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import MaterialTable from "material-table";
import Swal from "sweetalert2";
import { Modal } from "react-responsive-modal";

import { useState, useEffect } from "react";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminchatList() {
  useEffect(() => {
    document.body.className = "main-body leftmenu admin setting";
    return () => {
      document.body.className = "main-body leftmenu";
    };
  }, []);

  let token = localStorage.getItem("token");
  let header = { token: `${token}` };
  let options1 = { headers: header };

  const [sponsor_list, setSponsor_list] = React.useState([]);

  const get_data = async (sendData) => {
    try {
      let response = await axios.post(
        "/web_api/live_upcoming_match_all_data",
        options1
      );

      if (response.status) {
        let data = response.data;
        console.log(data);
        if (data.status) {
          setSponsor_list(data.body);
          // toast.success(data.msg);
        } else {
          toast.error("something went wrong please try again");
        }
      } else {
        toast.error("something went wrong please try again..");
      }
    } catch (err) {
      console.error(err);
      toast.error("some errror");
      return false;
    }
  };

  useEffect(() => {
    get_data({});
  }, []);

  const navigate = useNavigate();

  const [catView, setCat] = useState([]);
  const [days, setDay] = useState("");
  const [hours, setHour] = useState("");
  const [minutes, setMinute] = useState("");
  const [hdays, sethDay] = useState("");
  const [hhours, sethHour] = useState("");
  const [hminutes, sethMinute] = useState("");
  const [open, setOpen] = useState(false);
  const onOpenModal = (data) => {
    let time = data.chat_start_time;
    let days = (parseInt(time / 1440)).toString();
    days=days.length<2?"0"+days:days;
    let hours = (parseInt((time - days * 1440) / 60)).toString();
    hours=hours.length<2?"0"+hours:hours;
    let minute = (time - days * 1440 - 60 * hours).toString();
    minute=minute.length<2?"0"+minute:minute;
    setDay(days);
    setHour(hours);
    setMinute(minute);
    let htime = data.chat_end_time;
    let hdays = (parseInt(htime / 1440)).toString();
    hdays=hdays.length<2?"0"+hdays:hdays;
    let hhours = (parseInt((htime - hdays * 1440) / 60)).toString();
    hhours=hhours.length<2?"0"+hhours:hhours;
    let hminute = (htime - hdays * 1440 - 60 * hhours).toString();
    hminute=hminute.length<2?"0"+hminute:hminute;
    sethDay(hdays);
    sethHour(hhours);
    sethMinute(hminute);
    setCat(data);
    setOpen(true);
    console.log(catView);
  };
  const onCloseModal = () => setOpen(false);

  ///////////////// Update complaint category /////////////////
  const UpdateFormData = async (e) => {
    e.preventDefault();
    try {
      let chat_start_time =1440*parseInt(days)+60*parseInt(hours)+parseInt(minutes);
      let chat_end_time =1440*parseInt(hdays)+60*parseInt(hhours)+parseInt(hminutes);
      let id =
        e.target.elements.id !== "undefined" ? e.target.elements.id.value : "";

      let dataToSend2 = {
        chat_start_time: chat_start_time,
        chat_end_time: chat_end_time,
      };
      console.log("new values == ", dataToSend2);

      axios
        .put(`/web_api/match_chat_time_update/${id}`, dataToSend2, options1)
        .then((res) => {
          if (res.status) {
            let data = res.data;
            if (data.status) {
              toast.success(data.msg);
              setOpen(false);
              get_data({});
            } else {
              toast.error("something went wrong please try again");
            }
          } else {
            toast.error("something went wrong please try again..");
          }
        })
        .catch((error) => {
          console.log(this.state);
        });
    } catch (err) {
      console.error(err);
      toast.error("some errror");
      return false;
    }
  };
  const formate = (time) => {
    let days = (parseInt(time / 1440)).toString();
    days=days.length<2?"0"+days:days;
    let hours = (parseInt((time - days * 1440) / 60)).toString();
    hours=hours.length<2?"0"+hours:hours;
    let minute = (time - days * 1440 - 60 * hours).toString();
    minute=minute.length<2?"0"+minute:minute;
    return days + " : " + hours + " : " + minute;
  };
  const columns = [
    { title: "Match/league", field: "match" },
    {
      title: "Chat Start Time Before Match Starts (Days : Hours : Minutes)",
      render: (rowData) => {
        let d = formate(rowData.chat_start_time);
        return <>{d}</>;
      },
    },
    // { title: 'Fill Name', field: 'filename'},
    {
      title: "Chat End Time After Match Ends (Days : Hours : Minutes)",
      render: (rowData) => {
        let d = formate(rowData.chat_end_time);
        return <>{d}</>;
      },
    },
  ];

  const data =
    sponsor_list.length > 0
      ? sponsor_list.map((item) => {
          return {
            match: item.match_name,
            chat_start_time: item.chat_start_time,
            chat_end_time: item.chat_end_time,
            id: item._id,
          };
        })
      : [];
  const handleChangeMinute = (event) => {
    const minute = event.value;
    setMinute(minute);
  };
  const handleChangeHMinute = (event) => {
    const minute = event.value;
    sethMinute(minute);
  };
  const handleChangeHourse = (event) => {
    const hours = event.value;
    setHour(hours);
  };
  const handleChangeHhourse = (event) => {
    const hours = event.value;
    sethHour(hours);
  };
  const handleChangeDay = (event) => {
    const Days = event.value;
    setDay(Days);
  };
  const handleChangeHDay = (event) => {
    const Days = event.value;
    sethDay(Days);
  };


  const hminuteOptions = [
    { value: "01", label: "01" },
    { value: "02", label: "02" },
    { value: "03", label: "03" },
    { value: "04", label: "04" },
    { value: "05", label: "05" },
    { value: "06", label: "06" },
    { value: "07", label: "07" },
    { value: "08", label: "08" },
    { value: "09", label: "09" },
    { value: "10", label: "10" },
    { value: "12", label: "12" },
    { value: "13", label: "13" },
    { value: "14", label: "14" },
    { value: "15", label: "15" },
    { value: "16", label: "16" },
    { value: "17", label: "17" },
    { value: "18", label: "18" },
    { value: "19", label: "19" },
    { value: "20", label: "20" },
    { value: "21", label: "21" },
    { value: "22", label: "22" },
    { value: "23", label: "23" },
    { value: "24", label: "24" },
    { value: "25", label: "25" },
    { value: "26", label: "26" },
    { value: "27", label: "27" },
    { value: "28", label: "28" },
    { value: "29", label: "29" },
    { value: "30", label: "30" },
    { value: "31", label: "31" },
    { value: "32", label: "32" },
    { value: "33", label: "33" },
    { value: "34", label: "34" },
    { value: "35", label: "35" },
    { value: "36", label: "36" },
    { value: "37", label: "37" },
    { value: "38", label: "38" },
    { value: "39", label: "39" },
    { value: "10", label: "40" },
    { value: "41", label: "41" },
    { value: "42", label: "42" },
    { value: "43", label: "43" },
    { value: "44", label: "44" },
    { value: "45", label: "45" },
    { value: "46", label: "46" },
    { value: "47", label: "47" },
    { value: "48", label: "48" },
    { value: "49", label: "49" },
    { value: "50", label: "50" },
    { value: "51", label: "51" },
    { value: "52", label: "52" },
    { value: "53", label: "53" },
    { value: "54", label: "54" },
    { value: "55", label: "55" },
    { value: "56", label: "56" },
    { value: "57", label: "57" },
    { value: "58", label: "58" },
    { value: "59", label: "59" },
  ];

 
  const hhourOptions = [
    { value: "01", label: "01" },
    { value: "02", label: "02" },
    { value: "03", label: "03" },
    { value: "04", label: "04" },
    { value: "05", label: "05" },
    { value: "06", label: "06" },
    { value: "07", label: "07" },
    { value: "08", label: "08" },
    { value: "09", label: "09" },
    { value: "10", label: "10" },
    { value: "11", label: "11" },
    { value: "12", label: "12" },
    { value: "13", label: "13" },
    { value: "14", label: "14" },
    { value: "15", label: "15" },
    { value: "16", label: "16" },
    { value: "17", label: "17" },
    { value: "18", label: "18" },
    { value: "19", label: "19" },
    { value: "20", label: "20" },
    { value: "21", label: "21" },
    { value: "22", label: "22" },
    { value: "23", label: "23" },
    { value: "24", label: "24" },
  ];

  const hDaysOptions = [
    { value: "1", label: "01" },
    { value: "2", label: "02" },
    { value: "3", label: "03" },
    { value: "4", label: "04" },
    { value: "5", label: "05" },
    { value: "6", label: "06" },
    { value: "7", label: "07" },
    { value: "8", label: "08" },
    { value: "9", label: "09" },
    { value: "10", label: "10" },
    { value: "11", label: "11" },
    { value: "12", label: "12" },
    { value: "13", label: "13" },
    { value: "14", label: "14" },
    { value: "15", label: "15" },
    { value: "16", label: "16" },
    { value: "17", label: "17" },
    { value: "18", label: "18" },
    { value: "19", label: "19" },
    { value: "20", label: "20" },
    { value: "21", label: "21" },
    { value: "22", label: "22" },
    { value: "23", label: "23" },
    { value: "24", label: "24" },
    { value: "25", label: "25" },
    { value: "26", label: "26" },
    { value: "27", label: "27" },
    { value: "28", label: "28" },
    { value: "29", label: "29" },
    { value: "30", label: "30" },
  ];

  return (
    <>
      <Header />
      <div className="main-content side-content pt-0">
        <div className="container-fluid">
          <div className="inner-body">
            <div className="page-header">
              <div>
                <h2 className="main-content-title tx-24 mg-b-5">
                  Match Chat Time List
                </h2>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/home">Home</Link>
                  </li>

                  <li className="breadcrumb-item active" aria-current="page">
                    &nbsp;&nbsp;Chat Setting
                  </li>
                </ol>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-lg-12 table-responsive border border-bottom-0">
                <>
                  <div className="row">
                    <div className="col-lg-12">
                      <MaterialTable
                        title="Match List"
                        columns={columns}
                        data={data}
                        actions={[
                          {
                            icon: "edit",
                            iconProps: { style: { color: "#6259ca" } },
                            tooltip: "Edit Category",
                            onClick: (event, rawData) => {
                              onOpenModal(rawData);
                            },
                          },
                        ]}
                        options={{
                          search: true,
                          actionsColumnIndex: -1,
                          showFirstLastPageButtons: true,
                          pageSize: 5,
                          pageSizeOptions: [5, 20, 50],
                        }}
                      />
                    </div>
                  </div>
                </>
                <Modal open={open} onClose={onCloseModal} center>
                  <h2 className="mb-4 text-white">Update Chat Time</h2>
                  <div className="mx-500">
                    <form
                      className="mt-3 w-100"
                      onSubmit={(e) => UpdateFormData(e)}
                    >
                      <div className="form-group mb-4">
                        <label className="title-col">
                          Match Name <span className="text-blue"></span>
                        </label>
                        <input
                          type="hidden"
                          className="form-control"
                          name="id"
                          value={catView.id}
                        />
                        <input
                          disabled
                          type="text"
                          className="form-control"
                          name="match"
                          defaultValue={catView.match}
                        />
                      </div>

                      {/* <label className="title-col">
                        Chat Start Time Before Match Starts{" "}
                        <span className="text-blue">(in Minutes)</span>
                      </label>
                      <input
                        id="categor"
                        className="form-control mb-4"
                        name="chat_start_time"
                        type="text"
                        defaultValue={catView.chat_start_time}
                      /> */}
                      <div className="col-lg-12 mb-2">
                        <label className="title-col mb-3">
                          {" "}
                          Chat Start Time Before Match Starts{" "}
                          <span className="text-blue">(in Minutes)</span>
                        </label>
                        <div className="row">
                          <div className="col-lg-4 reletive ">
                            <span className="react-select-title">
                              Days 
                            </span>
                            <Select
                              labelId="hminute"
                              menuPortalTarget={document.body}
                              styles={{
                                menuPortal: (base) => ({
                                  ...base,
                                  zIndex: 9999,
                                }),
                              }}
                              id="hminute"
                              defaultValue={{
                                label: days,
                                value: days,
                              }}
                              onChange={handleChangeDay}
                              options={hDaysOptions}
                            />
                          </div>
                          <div className="col-lg-4 reletive ">
                            <span className="react-select-title">
                              hourse 
                            </span>
                            <Select
                              labelId="hminute"
                              menuPortalTarget={document.body}
                              styles={{
                                menuPortal: (base) => ({
                                  ...base,
                                  zIndex: 9999,
                                }),
                              }}
                              id="hminute"
                              defaultValue={{
                                label: hours,
                                value: hours,
                              }}
                              onChange={handleChangeHourse}
                              options={hhourOptions}
                            />
                          </div>
                          <div className="col-lg-4 reletive ">
                            <span className="react-select-title">
                              Minute 
                            </span>
                            <Select
                              labelId="hminute"
                              menuPortalTarget={document.body}
                              styles={{
                                menuPortal: (base) => ({
                                  ...base,
                                  zIndex: 9999,
                                }),
                              }}
                              id="hminute"
                              defaultValue={{
                                label: minutes,
                                value: minutes,
                              }}
                              onChange={handleChangeMinute}
                              options={hminuteOptions}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-12 mb-2">
                        <label className="title-col mb-3">
                          {" "}
                          Chat End Time After Match Ends{" "}
                          <span className="text-blue">(in Minutes)</span>
                        </label>
                        <div className="row">
                          <div className="col-lg-4 reletive ">
                            <span className="react-select-title">
                              Days 
                            </span>
                            <Select
                              labelId="hminute"
                              menuPortalTarget={document.body}
                              styles={{
                                menuPortal: (base) => ({
                                  ...base,
                                  zIndex: 9999,
                                }),
                              }}
                              id="hminute"
                              defaultValue={{
                                label: hdays,
                                value: hdays,
                              }}
                              onChange={handleChangeHDay}
                              options={hDaysOptions}
                            />
                          </div>
                          <div className="col-lg-4 reletive ">
                            <span className="react-select-title">
                              hourse 
                            </span>
                            <Select
                              labelId="hminute"
                              menuPortalTarget={document.body}
                              styles={{
                                menuPortal: (base) => ({
                                  ...base,
                                  zIndex: 9999,
                                }),
                              }}
                              id="hminute"
                              defaultValue={{
                                label: hhours,
                                value: hhours,
                              }}
                              onChange={handleChangeHhourse}
                              options={hhourOptions}
                            />
                          </div>
                          <div className="col-lg-4 reletive ">
                            <span className="react-select-title">
                              Minute 
                            </span>
                            <Select
                              labelId="hminute"
                              menuPortalTarget={document.body}
                              styles={{
                                menuPortal: (base) => ({
                                  ...base,
                                  zIndex: 9999,
                                }),
                              }}
                              id="hminute"
                              defaultValue={{
                                label: hminutes,
                                value: hminutes,
                              }}
                              onChange={handleChangeHMinute}
                              options={hminuteOptions}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-3">
                        <Button type="submit" className="mr-3 btn-pd btnBg">
                          Update
                        </Button>
                      </div>
                    </form>
                  </div>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminchatList;
