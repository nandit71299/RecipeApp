import React from "react";
import styles from "./MainNavigation.module.css";
import { NavLink } from "react-router-dom";

function MainNavigation() {
  return (
    <div className={styles.mainContainer}>
      <div>
        <h1 className={styles.logoText}>Logo</h1>
      </div>
      <div className={styles.menuItemsContainer}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? `${styles.linkActive} ${styles.menuItem}`
              : styles.menuItem
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/new"
          className={({ isActive }) =>
            isActive
              ? `${styles.linkActive} ${styles.menuItem}`
              : styles.menuItem
          }
        >
          Add New Recipe
        </NavLink>
      </div>
    </div>
  );
}

export default MainNavigation;
