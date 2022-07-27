import { loginFailure, loginStart, loginSuccess } from "./Adminredux";
import { publicRequest, userRequest } from "../apirequests";
import { postFailure, postStart, postSuccess } from "./Recruitpost";
import { updateFailure, updateSuccess } from "./Update";
import { useState } from "react";

export const mylogin = async(dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/loginadmin", user);
        dispatch(loginSuccess(res.data));
        dispatch(updateSuccess(res.data));
        // console.log(res)
    } catch (err) {
        dispatch(loginFailure());
        dispatch(updateFailure());
    }
};

export const mypost = async(dispatch, post) => {
    dispatch(postStart());
    try {
        const res = await userRequest.post("/jobs", post);
        dispatch(postSuccess(res.data));
        // dispatch(updateSuccess(res.data));
        console.log(res)
    } catch (err) {
        dispatch(postFailure());
        console.log(err)
    }
};