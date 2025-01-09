import React from "react";
import styles from "./CircularLoader.module.css";

const CircularLoader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default CircularLoader;
