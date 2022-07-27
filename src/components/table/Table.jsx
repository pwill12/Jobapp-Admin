import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { publicRequest } from "../../apirequests";
import { Button, Divider, ListItem, ListItemText } from "@mui/material";
import AccountCircleOutlined from "@mui/icons-material/AccountCircleOutlined";

const List = ({ id }) => {
  const rows = [
    {
      id: 1143155,
      Username: "Acer Nitro 5",
      img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "John Smith",
      date: "1 March",
      amount: 785,
      method: "Cash on Delivery",
      status: "Approved",
    },
    {
      id: 2235235,
      Username: "Playstation 5",
      img: "https://m.media-amazon.com/images/I/31JaiPXYI8L._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Michael Doe",
      date: "1 March",
      amount: 900,
      method: "Online Payment",
      status: "Pending",
    },
    {
      id: 2342353,
      Username: "Redragon S101",
      img: "https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "John Smith",
      date: "1 March",
      amount: 35,
      method: "Cash on Delivery",
      status: "Pending",
    },
    {
      id: 2357741,
      Username: "Razer Blade 15",
      img: "https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Jane Smith",
      date: "1 March",
      amount: 920,
      method: "Online",
      status: "Approved",
    },
    {
      id: 2342355,
      Username: "ASUS ROG Strix",
      img: "https://m.media-amazon.com/images/I/81hH5vK-MCL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Harold Carol",
      date: "1 March",
      amount: 2000,
      method: "Online",
      status: "Pending",
    },
    {
      id: 2342355,
      Username: "ASUS ROG Strix",
      img: "https://m.media-amazon.com/images/I/81hH5vK-MCL._AC_UY327_FMwebp_QL65_.jpg",
      customer: "Harold Carol",
      date: "1 March",
      amount: 2000,
      method: "Online",
      status: "Pending",
    },
  ];
  const [jobs, setjobs] = useState([]);

  useEffect(() => {
    const getjobsinfo = async () => {
      try {
        const res = await publicRequest.get(
          `https://willdevjobs.herokuapp.com/api/jobdetails?ids=${id}`
        );
        // console.log(...res.data.jobitems);
        setjobs(res.data[0].jobitems);
      } catch (err) {
        console.log(err);
      }
    };
    getjobsinfo();
  }, []);

  console.log(jobs);
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: "600" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Tracking ID</TableCell>
            <TableCell className="tableCell">Profile Img</TableCell>
            <TableCell className="tableCell">Email</TableCell>
            <TableCell className="tableCell">Username</TableCell>
            <TableCell className="tableCell">Website</TableCell>
            <TableCell className="tableCell">Contact User</TableCell>
            {/* <TableCell className="tableCell">Status</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {jobs.map((row) => (
            <TableRow key={row.user} style={{ display: "" }}>
              <TableCell className="tableCell">{row.user}</TableCell>
              <TableCell className="tableCell">
                {row?.img === undefined ? (
                  <AccountCircleOutlined style={{color: 'lightgrey', fontSize: '29px'}}/>
                ) : (
                  <img src={row.img} alt="" className="image" />
                )}
              </TableCell>
              <TableCell className="tableCell">{row.email}</TableCell>
              <TableCell className="tableCell">{row.username}</TableCell>
              <TableCell className="tableCell">
                <Link
                  to={"/user/" + row.user}
                  style={{ textDecoration: "none" }}
                >
                  <Button color="secondary" size="small">
                    contact
                  </Button>
                </Link>
              </TableCell>
              <TableCell className="tableCell">
                <Button color="error" size="small">
                  Decline
                </Button>
              </TableCell>
              {/* <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
