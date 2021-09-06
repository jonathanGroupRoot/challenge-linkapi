import axios from "axios";

const api = axios.create({
    baseURL: `https://api.pipedrive.com/v1/deals?status=won&start=0&api_token=a8ee6bdb4bcc99d8c1985e5b8b940ca94fa32dcd&status=won`
  });
export default api;