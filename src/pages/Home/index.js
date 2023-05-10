import { useEffect, useMemo, useState } from "react";
import useAuth from "../../hooks/use-auth";

import SideNav from "../../components/SideNav";
import Modal from "../../components/Modal";
import NewBot from "./components/NewBot";
import BotTable from "./components/BotTable";

import profile__avatar from "../../assets/Icons/avatar.svg";
import search__icon from "../../assets/Icons/search.svg";
import filter__icon from "../../assets/Icons/filter.svg";

import styles from "./Dashboard.module.css";
import { BOT_URL } from "../../config/urls";
import useAxiosPrivate from "../../hooks/use-axios-private";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const { auth } = useAuth();
  const [bots, setBots] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const token = useMemo(() => auth.accessToken, [auth]);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    setIsFetching(true);

    const fetchBots = async () => {
      try {
        const botReq = await axiosPrivate.get(BOT_URL);
        if (botReq.status !== 200) {
          setIsFetching(false);
          return;
        }
        const data = await botReq.data;
        setBots(data);
        setIsFetching(false);
      } catch (error) {
        console.log("Error loading bot", error);
        setIsFetching(false);
      }
    };

    fetchBots();
  }, [token, axiosPrivate]);

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
                {auth.user.username.toUpperCase()}
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
            <BotTable bots={bots} setBots={setBots} isFetching={isFetching} />
          </section>
        </main>
      </div>
      <Modal title="NEW BOT" show={showModal} close={() => setShowModal(false)}>
        <NewBot close={() => setShowModal(false)} />
      </Modal>
    </>
  );
};

export default Dashboard;
