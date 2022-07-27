import "./datatable.scss";
import { useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
// import { userColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest, userRequest } from "../../apirequests";
import AccountCircleOutlined from "@mui/icons-material/AccountCircleOutlined";

const DatatableUsers = () => {
  const datas = useSelector((state) => state.recruiter.currentUser);
  let ids = datas._id;
  // console.log(dataid)

  const [jobs, setjobs] = useState([]);
  const [jobss, setjobss] = useState([]);

  useEffect(() => {
    const getjobsinfo = async () => {
      try {
        const res = await publicRequest.get(
          `https://willdevjobs.herokuapp.com/api/jobdetails?ids=${ids}`
        );
        // console.log(...res.data.jobitems);
        setjobs(res.data.jobitems);

        for (let i = 0; i < res.data.length; i++) {
          setjobss([...res.data[i].jobitems]);
        }
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
      width: 100,
      // renderCell: (params) => (
      //   <ul className="flex">
      //     {params.value.map((item, index) => (
      //       <li key={index}>{item.user}</li>
      //     ))}
      //   </ul>
      // ),
      type: "string",
    },
    {
      field: "jobdetails",
      headerName: "Job",
      width: 200,
      // renderCell: (params) => {
      //   return (
      //     <div className="cellWithImg">
      //       {params.img === undefined ? (
      //         <>
      //           <AccountCircleOutlined
      //             sx={{
      //               fontSize: "37px",
      //               color: "lightgrey",
      //               marginRight: "5px",
      //             }}
      //           />
      //           {params.user}
      //         </>
      //       ) : (
      //         <>
      //           <img className="cellImg" src={params.user} alt="avatar" />
      //           {params.username}
      //         </>
      //       )}
      //     </div>
      //   );
      // },
      // renderCell: (params) => (
      //   <ul className="flex">
      //     {params.value.map((role, index) => (
      //       <li key={index}>{role.user}</li>
      //     ))}
      //   </ul>
      // ),
    },
    {
      field: "length",
      headerName: "Total number of Applicants",
      width: 200,
      renderCell: (params) => {
        return <div className="rowitem">{params.row.jobitems.length}</div>;
      },
      // valueFormatter: (params) => params.row?.jobitems.length,
    },

    {
      field: "jobitems",
      headerName: "Applicants",
      width: 230,
      // valueFormatter: (params) => params.value.jobitems,
      type: "string",
      renderCell: (params) => (
        <ul className="flex">
          {params.value.map((item, index) => (
            <li key={index}>{item.username}</li>
          ))}
        </ul>
      ),
    },
    {
      // field: "cover",
      headerName: "View",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View Profile</div>
            </Link>
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
            <Link to="/appliedusers/:id" style={{ textDecoration: "none" }}>
              <div className="viewButton">View Applicant</div>
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
        Add New User
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        getRowId={(jobss) => jobss._id}
        className="datagrid"
        rows={jobs.map((item)=> item)}
        columns={userColumns.concat(actionColumn2)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default DatatableUsers;
