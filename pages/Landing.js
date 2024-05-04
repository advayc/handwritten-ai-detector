import styles from "@/styles/Landing.module.css";
import React from 'react'

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const Landing = () => {
  return (
      <main className={`${styles["main-title-container"]} ${inter.className}`}>
     
     <div className={`${styles["left-card"]}`}>
     <h3 className={`${styles["main-subtitle"]}`}>Welcome to</h3> 
     <h1 className={`${styles["main-title"]}`}>
  No more configs.<br />
  No more fuss.<br />
  Just push your code.
</h1>
        <p className={`${styles["main-description"]}`}>
          Get started by editing <code>pages/index.js</code>
        </p>
      <div className={`${styles["button-containers"]}`}>
        <button className={`${styles["deploy-button"]}`}>Get Started</button>
        <button className={`${styles["doc-button"]}`}>Learn More</button>
      </div>
     </div>
      <div className={`${styles["right-card"]}`}>
        <h1>
          insert image here
        </h1>
      </div>
      </main>
    )
}

export default Landing;
