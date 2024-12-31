import axios from "axios";
import { toast } from "react-toastify";

let activeUser = localStorage.getItem("user") || {};
export class Helper {
  public static logout = () => {
    if (Object.keys(activeUser).length !== 0) {
      axios
        .post(`/api`, { username: activeUser })
        .then((res: any) => {
          if (res.status === 200) {
            toast.success(res.data);
            localStorage.removeItem("user");
            location.reload();
          }
        })
        .catch((err: any) => {
          toast.error(err?.message);
        });
    }
  }

  public static isLoginUser = () => {
    if (Object.keys(activeUser).length === 0) {
      location.replace("/auth/login");
    }
  }

  public static userData = async () => {
    if (Object.keys(activeUser).length !== 0) {
      const res = await axios.get(`/api?username=${activeUser}`);
      return res;
    }
  }
}