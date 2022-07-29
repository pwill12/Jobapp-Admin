import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { useSelector } from "react-redux";
import List from "../list/List";
import Datatable from "../../components/datatable/Datatable";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useReducer, useState } from "react";
import Jobsdata from "../../components/jobs/Jobs";

const Home = () => {
  const updatesuccess = useSelector((state) => state.updatestoken.updates);
  let myf = updatesuccess.accessToken;
  // console.log(myf)

  return (
    <div>
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <div className="widgets">
            <Widget type="user" />
            <Widget type="order" />
            <Widget type="earning" />
            <Widget type="balance" />
          </div>
          <div className="listContainer">
          <div className="listTitle">Posted Jobs</div>
          <Jobsdata/>

            {/* <div className="listTitle">Applicant List</div>
            <Datatable /> */}
          </div>
          <div className="listContainer">
            <div className="listTitle">Applicant List</div>
            <Datatable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
