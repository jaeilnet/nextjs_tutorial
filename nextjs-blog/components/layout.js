import Head from "next/head";
import React, { useEffect, useState } from "react";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

const name = "Jaeilnet";
export const siteTitle = "Next.js Sample Website";

const Layout = ({ children, home }) => {
  const [text, setText] = useState("");
  const router = useRouter();

  console.log(router, "rtouer");

  const fetchHandler = async () => {
    const response = await fetch("http://localhost:3000/api/hello");

    if (response.ok) {
      const data = await response.json();
      setText(data.text);
    } else {
      throw Error("api 불러오기 실패");
    }
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Learn How to Next.js" />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <Image
              priority
              src="/images/profile.jpeg"
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt={name}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <Image
                  priority
                  src="/images/profile.jpeg"
                  className={utilStyles.borderCircle}
                  height={108}
                  width={108}
                  alt={name}
                />
              </a>
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <a className={utilStyles.backToHome}>{name}</a>
              </Link>
            </h2>
          </>
        )}
      </header>
      {text}
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a> Back To Home</a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Layout;
