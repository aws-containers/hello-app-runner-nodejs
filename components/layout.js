// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import Head from "next/head";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import Logo from "./logo";

export const siteTitle = "Hello App Runner and Copilot!";
export const topPageMessage = "Let's Get Started!";

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🚀</text></svg>"
        ></link>
        <meta name="description" content="Hello, App Runner and Copilot! 👋" />
        <title>{siteTitle}</title>
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <Logo size={{w:600,h:314}} />
            <h1 className={utilStyles.heading2Xl}>{topPageMessage}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <Logo size={{w:450,h:235}} />
              </a>
            </Link>
          </>
        )}
      </header>
      <main>{children}</main>
    </div>
  );
}
