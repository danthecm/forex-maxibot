import { toast } from "react-toastify";
import { BOT_URL } from "../config/urls";

export const newBotReq = async (axiosPrivate, botInfo) => {
  const sending = toast.loading("Creating...");
  try {
    await axiosPrivate.post(BOT_URL, botInfo);
    toast.update(sending, {
      render: "Successfully Created Bot",
      type: "success",
      isLoading: false,
      autoClose: true,
      closeButton: true,
    });
    window.location.reload();
  } catch (e) {
    toast.update(sending, {
      render: "Error Creating Bot",
      type: "error",
      isLoading: false,
      closeButton: true,
      autoClose: true,
    });
  }
};

export const updateBotReq = async (axiosPrivate, bot_id, botInfo, setBots) => {
  const updating = toast.loading("Updating...");
  try {
    await axiosPrivate.patch(`${BOT_URL}/${bot_id}/`, botInfo);
    setBots((prev) => {
      const newBot = prev.filter((value) => value.id !== bot_id);
      newBot.push({ ...newBot, ...botInfo });
      return newBot;
    });
    toast.update(updating, {
      render: "Successfully Updated Bot",
      type: "success",
      isLoading: false,
      autoClose: true,
      closeButton: true,
    });
  } catch (e) {
    toast.update(updating, {
      render: "Error Updating Bot",
      type: "error",
      isLoading: false,
      closeButton: true,
      autoClose: true,
    });
  }
};
