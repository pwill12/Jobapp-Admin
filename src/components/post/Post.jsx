import * as React from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { useEffect, useState } from "react";
import ImageIcon from "@mui/icons-material/Image";
import { useDispatch, useSelector } from "react-redux";
import ArticleIcon from "@mui/icons-material/Article";
import PersonOutlined from "@mui/icons-material/PersonOutlined";
import {
  Alert,
  AlertTitle,
  Backdrop,
  Button,
  CircularProgress,
} from "@mui/material";
// import { mypost } from "../../redux/AdminApiCalls";
import { userRequest } from "../../apirequests";
import {
  deletepost,
  postFailure,
  postStart,
  postSuccess,
} from "../../redux/Recruitpost";
import { loginSuccess } from "../../redux/Adminredux";

export default function Mypost() {
  const [img, setimg] = React.useState("");
  const [title, settitle] = React.useState("");
  const [content, setcontent] = React.useState("");
  const [qualificationss, setqualifications] = React.useState("");
  const [responsibilitiess, setresponsibilities] = React.useState("");
  const [salary, setsalary] = React.useState([]);
  const [location, setlocation] = React.useState([]);
  const [tag, settags] = React.useState([]);
  const [time, settime] = React.useState("");
  const [vacancy, setvacancy] = React.useState("");

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const Location = ["Remote Worldwide", "Usa", "Nigeria", "France", "Russia"];

  const Tags = [
    "React",
    "Angular",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
  ];

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const MultipleSelectChip = () => {
    const theme = useTheme();
    const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      setlocation(
        // On autofill we get a stringified value.
        typeof value === "string" ? value.split(",") : value
      );
    };

    return (
      <div>
        <FormControl sx={{ mr: 3, width: 200 }}>
          <InputLabel id="demo-multiple-name-label">Location</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={location}
            onChange={handleChange}
            //   input={<OutlinedInput label="Name" />}
            // MenuProps={MenuProps}
            input={<OutlinedInput id="select-multiple-chip" label="Name" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {Location.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, location, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  };

  const MultipleSelectChip2 = () => {
    // const [personName, setPersonName] = React.useState([]);
    const theme = useTheme();
    const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      settags(
        // On autofill we get a stringified value.
        typeof value === "string" ? value.split(",") : value
      );
    };

    return (
      <div>
        <FormControl sx={{ m: 0, width: 200 }}>
          <InputLabel id="demo-multiple-chip-label">Tag</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            multiple
            id="demo-multiple-chip"
            value={tag}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {Tags.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, tag, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  };

  const BasicSelect = () => {
    const handleChange = (event) => {
      setsalary(event.target.value);
    };

    return (
      <Box sx={{ minWidth: 200, mr: 3 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Annual Salary</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="salary"
            value={salary}
            label="Salary"
            onChange={handleChange}
          >
            <MenuItem value="$15000-$20000">$15000-$20000</MenuItem>
            <MenuItem value="$25000-$20000">$25000-$20000</MenuItem>
            <MenuItem value="$35000-$20000">$35000-$20000</MenuItem>
          </Select>
        </FormControl>
      </Box>
    );
  };

  const BasicSelect2 = () => {
    const handleChange = (event) => {
      settime(event.target.value);
    };

    return (
      <Box sx={{ minWidth: 200, mr: 3 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Time</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={time}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={"fulltime"}>fulltime</MenuItem>
            <MenuItem value={"part-time"}>part-time</MenuItem>
          </Select>
        </FormControl>
      </Box>
    );
  };

  const BasicSelect3 = () => {
    const handleChange = (event) => {
      setvacancy(event.target.value);
    };

    return (
      <Box sx={{ minWidth: 200, mr: 3 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Vacancy</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={vacancy}
            label="Vacancy"
            onChange={handleChange}
          >
            <MenuItem value={1}>One</MenuItem>
            <MenuItem value={2}>Two</MenuItem>
            <MenuItem value={3}>Three</MenuItem>
            <MenuItem value={4}>Four</MenuItem>
            <MenuItem value={5}>Five</MenuItem>
          </Select>
        </FormControl>
      </Box>
    );
  };

  const myhandlechange = (event) => {
    const { name, value } = event.target;

    setqualifications((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const myhandlechange2 = (event) => {
    const { name, value } = event.target;

    setresponsibilities((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const dispatch = useDispatch();
  const user5 = useSelector((state) => state.recruiter.currentUser);
  const employerId = user5._id;

  const handleClick = () => {
    let data1 = [
      qualificationss.one,
      qualificationss.two,
      qualificationss.three,
      qualificationss.four,
      qualificationss.five,
    ];

    let data2 = [
      responsibilitiess.one,
      responsibilitiess.two,
      responsibilitiess.three,
      responsibilitiess.four,
      responsibilitiess.five,
    ];

    let qualifications = data1.filter(function (element) {
      return element !== undefined;
    });

    let responsibilities = data2.filter(function (element) {
      return element !== undefined;
    });

    mypost(dispatch, {
      title,
      employerId,
      content,
      qualifications,
      responsibilities,
      img,
      tag,
      salary,
      time,
      vacancy,
      location,
    });
  };

  const updatesuccess = useSelector((state) => state.updatestoken.updates);
  let myf = updatesuccess.accessToken;

  const TOKEN = myf;
  console.log(TOKEN);

  const BASE_URL = "https://willdevjobs.herokuapp.com/api/";

  const postuserRequest = axios.create({
    baseURL: BASE_URL,
    headers: { token: `Bearer ${TOKEN}` },
  });
  const mypost = async (dispatch, post) => {
    dispatch(postStart());
    try {
      const res = await postuserRequest.post("/jobs", post);
      dispatch(postSuccess(res.data));
      // dispatch(updateSuccess(res.data));
      console.log(res);
    } catch (err) {
      dispatch(postFailure());
      console.log(err);
    }
  };

  const fetching = useSelector((state) => state.recruiterpost.isFetching);
  const success = useSelector((state) => state.recruiterpost.post);
  const error = useSelector((state) => state.recruiterpost.error);

  console.log(success);

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
    // dispatch(deletepost())
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div
      style={{
        background: "rgb(249, 249, 253)",
        height: "",
        padding: "20px",
      }}
    >
      <Box
        sx={{ "& > :not(style)": { m: 3 } }}
        style={{ width: "100%", background: "white", padding: "0px" }}
      >
        <FormControl variant="standard" style={{ width: "40%" }}>
          <InputLabel htmlFor="input-with-icon-adornment">
            Image Post Icon Url
          </InputLabel>
          <Input
            id="input-with-icon-adornment"
            placeholder="should be maxsize of 70px"
            onChange={(e) => setimg(e.target.value)}
            startAdornment={
              <InputAdornment
                position="start"
                style={{ margin: "30px 0px 30px" }}
              >
                <ImageIcon />
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl variant="standard" style={{ width: "40%" }}>
          <InputLabel htmlFor="input-with-icon-adornment">Job Title</InputLabel>
          <Input
            id="input-with-icon-adornment"
            onChange={(e) => settitle(e.target.value)}
            startAdornment={
              <InputAdornment
                position="start"
                style={{ margin: "30px 0px 30px" }}
              >
                <ArticleIcon />
              </InputAdornment>
            }
          />
        </FormControl>

        <div>
          <TextField
            id="filled-textarea"
            label="Job Description"
            onChange={(e) => setcontent(e.target.value)}
            placeholder="let candidate know more about your company and this position"
            multiline
            rows={10}
            variant="filled"
            style={{ width: "70%" }}
          />
        </div>
        <FormControl
          variant="standard"
          style={{ width: "90%", overflow: "hidden" }}
          onChange={myhandlechange}
        >
          <InputLabel
            htmlFor="input-with-icon-adornment"
            sx={9}
            style={{ color: "lightskyblue", fontSize: "20px" }}
          >
            Candidate Qualifications
          </InputLabel>
          <div
            style={{
              display: "flex",
              margin: "20px 0px",
              overflow: "hidden",
              flexWrap: "wrap",
            }}
          >
            <Input
              id="input-with-icon-adornment"
              name="one"
              // value={contact.fName}
              // value={contact}
              onChange={myhandlechange}
              style={{ marginRight: "40px", width: "45%" }}
              startAdornment={
                <InputAdornment
                  position="start"
                  style={{ margin: "30px 0px 30px" }}
                >
                  <PersonOutlined />
                </InputAdornment>
              }
            />
            <Input
              id="input-with-icon-adornment"
              onChange={myhandlechange}
              name="two"
              // value={contact.lName}
              // value={contact}
              style={{ marginRight: "40px", width: "45%" }}
              startAdornment={
                <InputAdornment
                  position="start"
                  style={{ margin: "30px 0px 30px" }}
                >
                  <PersonOutlined />
                </InputAdornment>
              }
            />
            <Input
              id="input-with-icon-adornment"
              name="three"
              onChange={myhandlechange}
              style={{ marginRight: "40px", width: "40%" }}
              startAdornment={
                <InputAdornment
                  position="start"
                  style={{ margin: "30px 0px 30px" }}
                >
                  <PersonOutlined />
                </InputAdornment>
              }
            />

            <Input
              id="input-with-icon-adornment"
              name="four"
              onChange={myhandlechange}
              style={{ marginRight: "40px", width: "40%" }}
              startAdornment={
                <InputAdornment
                  position="start"
                  style={{ margin: "30px 0px 30px" }}
                >
                  <PersonOutlined />
                </InputAdornment>
              }
            />
            <Input
              id="input-with-icon-adornment"
              name="five"
              onChange={myhandlechange}
              style={{ marginRight: "40px", width: "40%" }}
              startAdornment={
                <InputAdornment
                  position="start"
                  style={{ margin: "30px 0px 30px" }}
                >
                  <PersonOutlined />
                </InputAdornment>
              }
            />
          </div>
        </FormControl>

        <FormControl
          variant="standard"
          style={{ width: "90%", overflow: "hidden" }}
        >
          <InputLabel
            htmlFor="input-with-icon-adornment"
            style={{ color: "Red", fontSize: "20px" }}
            sx={9}
          >
            Candidate responsibilities
          </InputLabel>
          <div
            style={{
              display: "flex",
              margin: "20px 0px",
              overflow: "hidden",
              flexWrap: "wrap",
            }}
          >
            <Input
              id="input-with-icon-adornment"
              name="one"
              onChange={myhandlechange2}
              style={{ marginRight: "40px", width: "45%" }}
              startAdornment={
                <InputAdornment
                  position="start"
                  style={{ margin: "30px 0px 30px" }}
                >
                  <PersonOutlined />
                </InputAdornment>
              }
            />
            <Input
              id="input-with-icon-adornment"
              name="two"
              onChange={myhandlechange2}
              style={{ marginRight: "40px", width: "45%" }}
              startAdornment={
                <InputAdornment
                  position="start"
                  style={{ margin: "30px 0px 30px" }}
                >
                  <PersonOutlined />
                </InputAdornment>
              }
            />
            <Input
              id="input-with-icon-adornment"
              name="three"
              onChange={myhandlechange2}
              style={{ marginRight: "40px", width: "40%" }}
              startAdornment={
                <InputAdornment
                  position="start"
                  style={{ margin: "30px 0px 30px" }}
                >
                  <PersonOutlined color="success" />
                </InputAdornment>
              }
            />

            <Input
              id="input-with-icon-adornment"
              name="four"
              onChange={myhandlechange2}
              style={{ marginRight: "40px", width: "40%" }}
              startAdornment={
                <InputAdornment
                  position="start"
                  style={{ margin: "30px 0px 30px" }}
                >
                  <PersonOutlined />
                </InputAdornment>
              }
            />
            <Input
              id="input-with-icon-adornment"
              name="five"
              onChange={myhandlechange2}
              style={{ marginRight: "40px", width: "40%" }}
              startAdornment={
                <InputAdornment
                  position="start"
                  style={{ margin: "30px 0px 30px" }}
                >
                  <PersonOutlined />
                </InputAdornment>
              }
            />
          </div>
        </FormControl>
        <div style={{ display: "flex" }}>
          <BasicSelect />
          <BasicSelect2 />
          <BasicSelect3 />
          <MultipleSelectChip />
          <MultipleSelectChip2 />
        </div>

        <div style={{ display: "", alignItems: "center" }}>
          <Button
            style={{ marginBottom: "20px", border: "" }}
            onClick={() => {
              handleClick();
              handleToggle();
            }}
          >
            {fetching ? (
              <CircularProgress size={20} color="success" />
            ) : (
              "post now"
            )}
          </Button>
          <div style={{ marginLeft: "" }}>
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={open}
              onClick={() => {
                dispatch(deletepost());
                handleClose();
              }}
            >
              {fetching && (
                <CircularProgress
                  color="inherit"
                  style={{ marginRight: "20px" }}
                />
              )}
              {success !== null && (
                <Alert severity="success">
                  <AlertTitle>Success</AlertTitle>
                  Successfully Uploaded Post — <strong>check it out!</strong>
                </Alert>
              )}
              {error !== false && (
                <Alert severity="error">
                  <AlertTitle>Unsuccessfull</AlertTitle>
                  Pls Check your Inputs — <strong>check it out!</strong>
                </Alert>
              )}
            </Backdrop>
          </div>
        </div>
      </Box>
    </div>
  );
}
