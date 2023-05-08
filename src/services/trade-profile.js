import { toast } from "react-toastify";
import { NEW_PLATFORM_URL } from "../config/urls";

export const newProfileReq = async (axiosPrivate, profileInfo) => {
  const sending = toast.loading("Creating...");
  try {
    await axiosPrivate.post(NEW_PLATFORM_URL, profileInfo);
    toast.update(sending, {
      render: "Successfully Created Trade Profile",
      type: "success",
      isLoading: false,
      autoClose: true,
      closeButton: true,
    });
  } catch (e) {
    toast.update(sending, {
      render: "Error Creating Trade Profile",
      type: "error",
      isLoading: false,
      closeButton: true,
      autoClose: true,
    });
    throw new Error("Error creating new trade profile");
  }
};
