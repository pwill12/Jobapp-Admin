import "./datatable.scss";
import { useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest, userRequest } from "../../apirequests";

const DatatablePost = () => {
  const datas = useSelector((state) => state.recruiter.currentUser);
  let ids = datas._id;
  // console.log(dataid)

  const [jobs, setjobs] = useState([]);

  useEffect(() => {
    const getjobsinfo = async () => {
      try {
        const res = await publicRequest.get(
          `https://willdevjobs.herokuapp.com/api/candidateapplied?ids=${ids}`
        );
        for (let i = 0; i < res.data.length; i++) {
          setjobs(res.data[i].jobitems);
          console.log(res.data[i]);
        }
        // setjobs(res.data);
        // console.log(res.data.jobitems);
      } catch (err) {
        console.log(err);
      }
    };
    getjobsinfo();
  }, []);
  console.log(jobs.length);
  const userRows = [
    {
      id: 1,
      username: "Snow",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      status: "active",
      email: "1snow@gmail.com",
      age: 35,
    },
  ];
  const [data, setData] = useState(jobs);

  const handleDelete = (id) => {
    setjobs(jobs.filter((item) => item._id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">Contact Applicant</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Decline Application
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        getRowId={(jobs) => jobs._id}
        className="datagrid"
        rows={jobs}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default DatatablePost;
