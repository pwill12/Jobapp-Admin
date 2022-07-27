import axios from "axios";
import { useState } from "react";
const BASE_URL = "https://willdevjobs.herokuapp.com/api/";


const user = JSON.parse(localStorage.getItem("persist:root"))?.updatestoken;
const currentUser = user && JSON.parse(user).updates;
const TOKEN = currentUser?.accessToken

console.log(user)


    export const publicRequest = axios.create({
        baseURL: BASE_URL,
    });

export const userRequest = axios.create({

    baseURL: BASE_URL,
    headers: { token: `Bearer ${TOKEN}` },
});