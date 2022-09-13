import "./datatable.scss";
import { useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
// import { userColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest, userRequest } from "../../apirequests";
import AccountCircleOutlined from "@mui/icons-material/AccountCircleOutlined";

const Datatable = () => {
  const datas = useSelector((state) => state.recruiter.currentUser);
  const { successapi, fetchingapi, failureapi } = useSelector(
    (state) => state.loadingdata
  );

  let ids = datas._id;
  console.log(successapi);

  const [jobs, setjobs] = useState([]);
  useEffect(() => {
    const getjobsinfo = async () => {
      try {
        const res = await publicRequest.get(
          `https://willdevjobs.herokuapp.com/api/candidateapplied?ids=${ids}`
        );
        setjobs(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getjobsinfo();
  }, []);
  console.log(jobs);

  const userColumns = [
    {
      field: "_id",
      headerName: "ID",
      width: 220,
      type: "string",
    },
    {
      field: "jobdetails",
      headerName: "Job",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.user} alt="avatar" />
            {params.username}
          </div>
        );
      },
    },
    {
      field: "length",
      headerName: "Total number of Applicants",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="rowitem">{params.row.jobitems.length} users</div>
        );
      },
      // valueFormatter: (params) => params.row?.jobitems.length,
    },

    {
      // field: "cover",
      headerName: "Achieve Job",
      width: 200,
      renderCell: (params) => {
        // console.log({ params })
        return (
          <div className="cellAction">
            {/* <Link to={"/users/"} style={{ textDecoration: "none" }}> */}
            <div className="deleteButton">Achieve</div>
            {/* </Link> */}
          </div>
        );
      },
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
  const actionColumn2 = [
    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={"/users/" + params.row.jobId}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View Applicants</div>
            </Link>
            {/* <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Decline Application
            </div> */}
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Applied Users
        {/* <Link to="/users/new" className="link">
          Add New
        </Link> */}
      </div>
      <DataGrid
        getRowId={(jobss) => jobss._id}
        className="datagrid"
        rows={jobs.map((item) => item)}
        columns={userColumns.concat(actionColumn2)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
