import { useNavigate } from "react-router-dom";
import SideNav from "../../components/SideNav";

import styles from "./Dashboard.module.css";

import profile__avatar from "../../assets/Icons/avatar.svg";
import search__icon from "../../assets/Icons/search.svg";

import filter__icon from "../../assets/Icons/filter.svg";
import { useEffect, useMemo, useState } from "react";
import Modal from "../../components/Modal";
import NewBot from "./components/NewBot";
import axios from "../../config/axios";
import BotTable from "./components/BotTable";

const BOT_URL = "bot/";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = useMemo(() => user?.access_token, [user]);
  const [showModal, setShowModal] = useState(false);
  const [bots, setBots] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  if (!user) {
    navigate("/login");
  }

  useEffect(() => {
    setIsFetching(true);
    let isMounted = true;
    const controller = new AbortController();

    const fetchBots = async () => {
      const botReq = await axios.get(BOT_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        signal: controller.signal,
      });
      if (botReq.status !== 200) {
        setIsFetching(false);
        return;
      }
      const data = await botReq.data;
      setBots(data);
      setIsFetching(false);
    };

    fetchBots();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [token]);

  return (
    <>
      <div className={styles.wrapper}>
        <SideNav />
        <main className={styles.main}>
          <section className={styles.header}>
            <div className={styles.profile__intro}>
              <img
                className={styles.profile__avatar}
                src={profile__avatar}
                alt="profile avatar"
              />
              <p className={styles.username}>
                {user.user.username.toUpperCase()}
              </p>
            </div>
            <h1>Welcome to TheMaxibot Forex</h1>
          </section>
          <section className={styles.main__content}>
            <div className={styles.main__content__heading}>
              <h2>Running Bots</h2>
              <div className={styles.left__content}>
                <div className={styles.search__field}>
                  <img
                    className={styles.search__icon}
                    src={search__icon}
                    alt="search icon"
                  />
                  <input
                    className={styles.search__input}
                    type="text"
                    placeholder="Search list"
                  />
                </div>
                <img src={filter__icon} alt="filter icon" />
                <button
                  onClick={() => setShowModal(true)}
                  className={styles.new__bot}
                >
                  Add new
                </button>
              </div>
            </div>
            <BotTable isFetching={isFetching} bots={bots} />
          </section>
        </main>
      </div>
      <Modal title="NEW BOT" show={showModal} close={() => setShowModal(false)}>
        <NewBot />
      </Modal>
    </>
  );
};

export default Dashboard;
