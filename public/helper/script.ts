'use client';
import axios from "axios";
import { toast } from "react-toastify";
let activeUser: any = {}
if (typeof window !== 'undefined') {
  activeUser = localStorage.getItem("user") || {};
}
export class Helper {
  public static logout = () => {
    if (Object.keys(activeUser).length !== 0) {
      axios
        .post(`/api`, { username: activeUser })
        .then((res: any) => {
          if (res?.status === 200) {
            toast.success(res.data);
            if (typeof window !== 'undefined') {
              localStorage.removeItem("user");
              location.reload();
            }
          }
        })
        .catch((err: any) => {
          toast.error(err?.message);
        });
    }
  }

  public static isLoginUser = () => {
    let hasV2Session = localStorage.getItem("V2Session");
    if (hasV2Session !== null) {
      if (new Date(hasV2Session) < new Date(new Date().getTime())) {
        location.replace("/auth/login");
        localStorage.removeItem("user");
        localStorage.removeItem("UsrSession");
      }
    }
  }

  public static userData = (type: any) => {
    if (Object.keys(activeUser).length !== 0) {
      const res = axios.get(`/api?username=${activeUser}&type=${type}`);
      return res;
    } else {
      return []
    }
  }
}