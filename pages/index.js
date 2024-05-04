import { useState, useRef } from "react";
import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Tesseract from "tesseract.js";
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; 

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  useEffect(() => {
    AOS.init();
  }, []);


  const [imgUrl, setImgUrl] = useState("");
  const [convertedText, setConvertedText] = useState("");
  const imgRef = useRef(null);

  const handleImgUrlChange = (e) => {
    setImgUrl(e.target.value);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImgUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const recognizeText = async (file) => {
    try {
      const { data: { text } } = await Tesseract.recognize(file, 'eng');
      setConvertedText(text);
    } catch (error) {
      console.error(error);
    }
  };

  const handleConvertText = () => {
    if (imgUrl !== "") {
      recognizeText(imgUrl);
    }
  };

  const handleRotateImage = () => {
    if (imgRef.current) {
      const rotatedImage = rotateImage(imgRef.current, 90);
      setImgUrl(rotatedImage);
    }
  };

  const rotateImage = (img, angle) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const { width, height } = img
    canvas.width = height;
    canvas.height = width;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((angle * Math.PI) / 180);
    ctx.drawImage(img, -width / 2, -height / 2);

    return canvas.toDataURL("image/jpeg");
  };

  return (
    <>
      <Head>
        <title>ai detector</title>
        <meta
          name="description"
          content="Convert image to editable text using JavaScript"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src='https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js'></script>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main data-aos="zoom-out"
  data-aos-easing="ease-out-cubic"
  data-aos-duration="1000"
  data-aos-delay="0" className={`${styles.main} ${inter.className}`}>
        <div className={styles.app}>
          <header>
            <h1   className={`${styles["title-header"]}`}>Convert image to Editable Text</h1>
          </header>
          <section className={`${styles["upload-file"]} ${styles["flex-between"]}`}>
            <input
              type="text"
              className={styles.button}
              placeholder="Enter URL of image"
              id="img-url"
              value={imgUrl}
              onChange={handleImgUrlChange}
            />
            <input
              type="file"
              className={styles.button}
            />  
            <button onClick={handleConvertText} className= {styles.button}>Convert Text</button>
            <button onClick={handleRotateImage} className= {styles.button} >Rotate</button>
          </section>
          <section className={`${styles.result} ${styles["flex-between"]}`}>
            {imgUrl && <img src={imgUrl} alt="" id="img-result" ref={imgRef} />}
            <div className={styles["converted-text-container"]}>
              <textarea
                id="converted-text"
                placeholder="Converted text of image"
                value={convertedText || ""}
                readOnly
              ></textarea>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}