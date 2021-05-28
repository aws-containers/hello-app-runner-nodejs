// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import Layout from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import useSwr from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error } = useSwr("/api/items", fetcher);
  return (
    <Layout home>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <ul className={utilStyles.list}>
          {data ? (
            <>
              {data.map(({ ItemId, Title, Done }) => (
                <li className={utilStyles.listItem} key={ItemId}>
                  <Link
                    href={{
                      pathname: `/items/${ItemId}`,
                      query: { title: Title },
                    }}
                  >
                    <span>
                      {Done === "y" ? "✅ " : ""}
                      <a className={`done-${Done}`}>{Title}</a>
                    </span>
                  </Link>
                </li>
              ))}
            </>
          ) : (
            <>
              {error ? (
                <div>Failed to load 😢</div>
              ) : (
                <li className={utilStyles.listItem} key="list-item-dummy">
                  Loading... ⏳
                </li>
              )}
            </>
          )}
        </ul>
      </section>
    </Layout>
  );
}
