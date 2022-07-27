import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useEffect, useState } from "react";
import { publicRequest } from "../../apirequests";
import AccountCircleOutlined from "@mui/icons-material/AccountCircleOutlined";

const User = () => {
  const location = useLocation();
  const array = location.pathname.split("/")[2];
  const [user, setusers] = useState({});

  useEffect(() => {
    const getusersinfo = async () => {
      try {
        const res = await publicRequest.get(
          `https://willdevjobs.herokuapp.com/api/profile/find/${array}`
        );
        // console.log(...res.data.jobitems);
        setusers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getusersinfo();
  }, []);

  console.log(user);
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              {user?.img === undefined || null ? (
                <AccountCircleOutlined style={{color: 'lightgray', fontSize: '120px'}}/>
              ) : (
                <img
                  src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                  alt=""
                  className="itemImg"
                />
              )}
              <div className="details">
                <h1 className="itemTitle">{user?.firstname}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{user?.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">+1 2345 67 89</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                    Elton St. 234 Garden Yd. NewYork
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">USA</span>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div> */}
        </div>
        {/* <div className="bottom">
        <h1 className="title">Total Applicants</h1>
          <List id={array}/>
        </div> */}
      </div>
    </div>
  );
};

export default User;
