import { toast } from "react-toastify";
import axios from "../config/axios";
import {
  LOGIN_URL,
  LOGOUT_URL,
  REGISTER_URL,
  VERIFY_URL,
} from "../config/urls";

export const loginReq = async (userInfo, from, setIsFetching, setAuth, navigate) => {
  const loading = toast.loading("Authenticating");
  try {
    const sendData = await axios.post(LOGIN_URL, userInfo, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    toast.update(loading, {
      render: "Successfully Authenticated",
      type: "success",
      isLoading: false,
      autoClose: true,
      closeButton: true,
    });
    const user = sendData.data;
    setAuth({ user: user.user, accessToken: user.access_token });
    localStorage.setItem("user", JSON.stringify(user));
    setIsFetching(false);
    setTimeout(() => {
      if (user.user.trade_profile.length < 0) {
        navigate("/new-platform", { replace: true });
        return;
      }
      navigate(from, { replace: true });
    }, 1000);
  } catch (error) {
    const response = error?.response;
    if (!response) {
      toast.update(loading, {
        render: "No Server Response",
        type: "error",
        isLoading: false,
        autoClose: true,
        closeButton: true,
      });
      setIsFetching(false);
      return;
    }
    const data = response?.data;
    console.log("There was an error", error);
    switch (response?.status) {
      case 500:
        toast.update(loading, {
          render: "service unavailable, try later",
          type: "error",
          isLoading: false,
          autoClose: true,
          closeButton: true,
        });
        break;
      case 401:
        toast.update(loading, {
          render: data.detail,
          type: "error",
          isLoading: false,
          autoClose: true,
          closeButton: true,
        });
        break;
      case 406:
        toast.update(loading, {
          render: data.detail,
          type: "error",
          isLoading: false,
          autoClose: true,
          closeButton: true,
        });
        navigate(`../verify?username=${userInfo.username}`);
        break;
      default:
        toast.update(loading, {
          render: "something went wrong, try later",
          type: "error",
          isLoading: false,
          autoClose: true,
          closeButton: true,
        });
        break;
    }
    setIsFetching(false);
  }
};

export const registerReq = async (data, setIsFetching, navigate) => {
  const loading = toast.loading("Registering....");
  try {
    await axios.post(REGISTER_URL, data);
    toast.update(loading, {
      render: "Verify your Email to continue",
      type: "success",
      isLoading: false,
      autoClose: true,
      closeButton: true,
    });
    setIsFetching(false);
    navigate(`../verify?username=${data.username}`);
  } catch (error) {
    if (!error?.response) {
      toast.update(loading, {
        render: "No Server Response",
        type: "error",
        isLoading: false,
        autoClose: true,
        closeButton: true,
      });
      return;
    }
    const response = error.response;
    switch (response?.status) {
      case 500:
        toast.update(loading, {
          render: "service unavailable, try later",
          type: "error",
          isLoading: false,
          autoClose: true,
          closeButton: true,
        });
        break;
      case 400:
        const data = response.data;
        for (const key in data) {
          if (Object.hasOwnProperty.call(data, key)) {
            const element = data[key];
            toast.update(loading, {
              render: element[0],
              type: "error",
              isLoading: false,
              autoClose: true,
              closeButton: true,
            });
          }
        }
        break;
      default:
        toast.update(loading, {
          render: "something went wrong, try later",
          type: "error",
          isLoading: false,
          autoClose: true,
          closeButton: true,
        });
        break;
    }
    setIsFetching(false);
  }
};

export const logoutReq = async () => {
  const loggingOut = toast.loading("Logging out...");
  try {
    const logoutReq = await axios.get(LOGOUT_URL, {
      withCredentials: true,
    });

    if (logoutReq.status !== 200) {
      throw new Error(logoutReq.status);
    }
    const data = await logoutReq.data;
    console.log("Logout request retuned", data);
    localStorage.removeItem("user");
    toast.update(loggingOut, {
      render: "Successfully logged out",
      type: "success",
      isLoading: false,
      closeButton: true,
    });
    window.location.reload(false);
  } catch (err) {
    console.log("Error logging out", err);
  }
};

export const verifyCodeReq = async (
  code,
  username,
  setIsFetching,
  navigate
) => {
  setIsFetching(true);
  const loading = toast.loading("Verifying....");
  console.log("verifyCode", code);
  try {
    const sendVerificiation = await axios.get(`${VERIFY_URL}${username}`, {
      params: { code },
    });
    console.log(sendVerificiation.data);
    toast.update(loading, {
      render: "Verified Successfully",
      type: "success",
      isLoading: false,
      autoClose: 2000,
      closeButton: true,
    });
    setIsFetching(false);
    setTimeout(() => navigate("/"), 2000);
  } catch (error) {
    console.log(error);
    setIsFetching(false);
    toast.update(loading, {
      render: "Error verifying please try again",
      type: "error",
      isLoading: false,
      autoClose: true,
      closeButton: true,
    });
  }
};
