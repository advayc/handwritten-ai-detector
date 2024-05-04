import { useState } from "react";
import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Tesseract from "tesseract.js";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [imgUrl, setImgUrl] = useState("");
  const [convertedText, setConvertedText] = useState("");

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
  console.log(convertedText);

  return (
    <>
      <Head>
        <title>Convert Image To Text Using JS</title>
        <meta
          name="description"
          content="Convert image to editable text using JavaScript"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
          <script src='https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js'></script>
          <link rel="icon" href="/favicon.ico" />
        </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.app}>
          <header>
            <h1>Convert image to Editable Text</h1>
          </header>
          <section className={`${styles["upload-file"]} ${styles["flex-between"]}`}>
            <input
              type="text"
              placeholder="Enter URL of image"
              id="img-url"
              value={imgUrl}
              onChange={handleImgUrlChange}
            />
            <input
              type="file"
              className="upload"
              placeholder='upload image'
              id="upload-file-btn"
              onChange={handleFileChange}
            />
            <button onClick={handleConvertText}>Convert Text</button>
          </section>
          <section className={`${styles.result} ${styles["flex-between"]}`}>
            {imgUrl && <img src={imgUrl} alt="" id="img-result" />}
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
