"use client";
import image from "../../../public/avatarimage.svg";
import close from "../../../public/close.svg";
import { ref, onValue } from "firebase/database";
import Image from "next/image";
import styles from "../Styling/index.module.css";
import { Button } from "@mui/material";
import { db } from "../Components/data";

import React, { useState, useEffect } from "react";
import AddCheckInBox from "./Add";

const tableCellStyle = {
  padding: "10px", //
  textAlign: "center",
  backgroundColor: "#fff",
  borderBottom: "1px solid #ccc",
};

const check = {
  padding: "10px", //
  textAlign: "center",
  backgroundColor: "#00FFFF",
  minWidth: "10px",
};

const tableCellhead = {
  padding: "10px",
  textAlign: "center",
  borderBottom: "1px solid #ccc", //
};

const useStyles = {
  backgroundColor: "black",
  color: "white",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "white",
    color: "black",
  },
};
const AllCheckins = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showBox, setShowBox] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const [checkIns, setCheckIns] = useState([]);
  const handleImageClick = () => {
    setShowDrawer(true);
  };

  const handleCloseDrawer = () => {
    setShowDrawer(false);
  };

  const handleAddCheckIns = () => {
    setShowBox(true);
  };

  const handleCloseBox = () => {
    setShowBox(false);
  };

  const handleAddCheckIn = (data) => {
    setShowBox(false);
    setImageUrl(data.imgUrl, data.title, data.owner);
  };
  useEffect(() => {
    const fetchData = () => {
      const checkinsRef = ref(db, "checkins");
      onValue(checkinsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const checkInsArray = Object.values(data);
          setCheckIns(checkInsArray);
        } else {
          setCheckIns([]);
        }
      });
    };

    fetchData();
  }, []);

  return (
    <div className={styles.allCheckins}>
      <div className={styles.header}>
        <div className={styles.globalHeaderfrontEnd}>
          <div className={styles.layoutblocksbase}>
            <div className={styles.label}>Logo</div>
          </div>
          <div className={styles.buttons}>
            <div className={styles.menulegacy}>
              <div className={styles.menuItem}>
                <div className={styles.title}>Feedback</div>
              </div>
              <div className={styles.menuItem}>
                <div className={styles.title}>Support</div>
              </div>
            </div>
            <div className={styles.user}>
              <Image
                className={styles.avatarimageIcon}
                width={50}
                height={50}
                alt="Projects"
                onClick={handleImageClick}
                src={image}
              />
            </div>
          </div>
        </div>
        <div className={styles.headerChild} />
        <div className={styles.logoPng} />
        <div className={styles.aaa}>AAA</div>
        <div className={styles.headerItem} />
      </div>
      <div className={styles.checkins}>CheckIns</div>
      <div className={styles.loremIpsusDolor}>
        Lorem ipsus dolor sit amen, something important to say here
      </div>
      <div className={styles.noProjects}>
        <div className={styles.greycontainer}>
          <div className={styles.greycontainerChild} />
          <div className={styles.greycontainerItem} />
        </div>

        <div className={styles.projectsTablerow}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={tableCellhead}>Title</th>
                <th style={tableCellhead}>Owner</th>
                <th style={tableCellhead}>Status</th>
                <th style={tableCellhead}>Created at</th>
              </tr>
            </thead>
            <tbody>
              {checkIns.map((checkIn) => (
                <tr key={checkIn.id}>
                  <td style={tableCellStyle}>{checkIn.title}</td>
                  <td style={tableCellStyle}>{checkIn.owner}</td>

                  <div style={check}>CHECKED IN</div>

                  <td style={tableCellStyle}>
                    {new Date(checkIn.timestamp).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.button}>
        <Button
          onClick={handleAddCheckIns}
          variant="contained"
          style={useStyles}
        >
          Add Chek In
        </Button>

        <div className={styles.title}></div>
        {showBox && (
          <div className={styles.addCheckInBoxContainer}>
            <div className={styles.overlay} onClick={handleCloseBox} />
            <div className={styles.addCheckInBox}>
              <AddCheckInBox
                onClose={handleCloseBox}
                onAdd={handleAddCheckIn}
                imageUrl={imageUrl}
              />
            </div>
          </div>
        )}
      </div>
      <div className={styles.seeCheckinDetail}>
        <img
          className={styles.image175Icon}
          alt=""
          src={close}
          onClick={handleImageClick}
        />

        {showDrawer && (
          <div
            className={`${styles.seeCheckinDetailChild} ${
              showDrawer && styles.showDrawer
            }`}
            onClick={handleCloseDrawer}
          >
            <div className={styles.drawer}>
              <div className={styles.header1}>
                <Image
                  className={styles.closeIcon}
                  alt=""
                  width={50}
                  height={50}
                  src={close}
                  onClick={handleCloseDrawer}
                />
                <div className={styles.texttitle}>
                  <div className={styles.text4}>Details</div>
                </div>
              </div>
              <h2>Check Name </h2>

              <div className={styles.body}>
                <Image
                  className={styles.drawerImage}
                  width={300}
                  height={200}
                  src={imageUrl}
                  alt="Image in Drawer"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCheckins;
