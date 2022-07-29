// eslint-disable-next-line
import "./datatable.scss";
import { useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { format } from "timeago.js";
// import { userColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../../apirequests";
import { useDispatch } from "react-redux";
import AccountCircleOutlined from "@mui/icons-material/AccountCircleOutlined";
import {
  failureloading,
  loadingfetchings,
  successfullyloaded,
} from "../../redux/Loading";
import Animations from "../Backloading/Skeletonloading";

const Jobsdata = () => {
  const datas = useSelector((state) => state.recruiter.currentUser);
  const { successapi, fetchingapi, failureapi } = useSelector(
    (state) => state.loadingdata
  );
  let ids = datas._id;
  const dispatch = useDispatch();

  const [jobs, setjobs] = useState([]);
  useEffect(() => {
    const getjobsinfo = async () => {
      dispatch(loadingfetchings());
      try {
        const res = await publicRequest.get(
          `https://willdevjobs.herokuapp.com/api/jobsemployee?jobs=${ids}`
        );
        setjobs(res.data);
        dispatch(successfullyloaded());
      } catch (err) {
        console.log(err);
        dispatch(failureloading());
      }
    };
    getjobsinfo();
  }, []);
  // console.log(jobs);

  const userColumns = [
    {
      field: "_id",
      headerName: "ID",
      width: 220,
      type: "string",
    },
    {
      field: "img",
      headerName: "Jobs Posted",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            {params.img === null ? (
              <>
                <AccountCircleOutlined
                  sx={{
                    fontSize: "37px",
                    color: "lightgrey",
                    marginRight: "5px",
                  }}
                />
              </>
            ) : (
              <>
                <img className="cellImg" src={params.row.img} alt="avatar" />
                {/* {params.username} */}
              </>
            )}
          </div>
        );
      },
    },
    {
      field: "title",
      headerName: "Job Title",
      width: 200,
      type: "string",
    },

    {
      field: "tag",
      headerName: "Tag",
      width: 150,
      type: "string",
    },
    {
      // field: "cover",
      headerName: "Achieve Job",
      width: 120,
      renderCell: (params) => {
        // console.log({ params })
        return (
          <div className="cellAction">
            {/* <Link to={"/users/"} style={{ textDecoration: "none" }}> */}
            <div className="deleteButton">Delete</div>
            {/* </Link> */}
          </div>
        );
      },
    },
    {
      field: "job",
      headerName: "Time Posted",
      width: 130,
      type: "string",
      renderCell: (params) => {
        return <div>{format(params.row?.createdAt)}</div>;
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
      width: 120,
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
        Job Details
        {/* <Link to="/users/new" className="link">
          Add New
        </Link> */}
      </div>
      {fetchingapi ? (
        <Animations />
      ) : (
        <DataGrid
          getRowId={(jobss) => jobss._id}
          className="datagrid"
          rows={jobs.map((item) => item)}
          columns={userColumns.concat(actionColumn2)}
          pageSize={6}
          rowsPerPageOptions={[9]}
          checkboxSelection
        />
      )}
      {/* <DataGrid
        getRowId={(jobss) => jobss._id}
        className="datagrid"
        rows={jobs.map((item)=> item)}
        columns={userColumns.concat(actionColumn2)}
        pageSize={6}
        rowsPerPageOptions={[9]}
        checkboxSelection
      /> */}
    </div>
  );
};

export default Jobsdata;
