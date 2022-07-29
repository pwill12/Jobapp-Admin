import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import WorkIcon from '@mui/icons-material/Work';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { publicRequest } from "../../apirequests";
import VisibilityIcon from '@mui/icons-material/Visibility';

const Widget = ({ type }) => {
  const datas = useSelector((state) => state.recruiter.currentUser);
  let ids = datas._id;

  const [jobs, setjobs] = useState([]);
  useEffect(() => {
    const getjobsinfo = async () => {
      try {
        const res = await publicRequest.get(
          `https://willdevjobs.herokuapp.com/api/jobsemployee?jobs=${ids}`
        );
        setjobs(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getjobsinfo();
  }, []);
  let data;

  //temporary
  const amount = 100;
  const diff = 20;

  switch (type) {
    case "user":
      data = {
        title: "TOTAL APPLICANTS",
        isMoney: false,
        link: "See all users",
        amount: 10,
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "POSTED JOBS",
        isMoney: false,
        amount: jobs.length,
        link: "View all jobs",
        icon: (
          <WorkIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "lightblue",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "APPLICATION VIEWS",
        // isMoney: true,
        amount: 0,
        link: "View net earnings",
        icon: (
          <VisibilityIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        amount: 0,
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {data.amount}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
