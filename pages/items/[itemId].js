// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import { useRouter } from "next/router";
import Head from "next/head";
import Layout from "../../components/layout";
import utilStyles from "../../styles/utils.module.css";
import unified from "unified";
import matter from "gray-matter";
import markdown from "remark-parse";
import html from "remark-html";
import externalLinks from "remark-external-links";
import useSwr, { mutate } from "swr";
import Link from "next/link";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Item() {
  const router = useRouter();
  const { itemId, title } = router.query;
  const { data, error } = useSwr(itemId ? `/api/items/${itemId}` : null, fetcher);
  let detailHtml;
  if (error) {
    console.log(error);
  } else if (data) {
    const matterResult = matter(data.Detail);
    const processedContent = unified()
      .use(markdown)
      .use(externalLinks, { target: "_blank", rel: false })
      .use(html)
      .processSync(matterResult.content);
    detailHtml = processedContent.toString();
    mutate(`/api/items/${itemId}`, async (item) => {
      if (item.Done == "n") {
        const updatedItem = await fetch(`/api/items/${item.ItemId}`, {
          method: "PUT",
          body: JSON.stringify({ done: "y" }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        item.Done = "y";
      }
      return item;
    });
  }
  return (
    <Layout>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <Head>
          {data ? (
            <title>{data.Title}</title>
          ) : (
            <>
              {error ? (
                <title>Item not found 😢</title>
              ) : (
                <title>Loading {itemId} ...</title>
              )}
            </>
          )}
        </Head>
        <section>
          {data ? (
            <>
              <h1 className={utilStyles.headingXl}>{data.Title}</h1>
              <div dangerouslySetInnerHTML={{ __html: detailHtml }} />
            </>
          ) : (
            <>
              <h1 className={utilStyles.headingXl}>{title}</h1>
              <div>{error ? "Item not found 😢" : "Loading ... ⏳"}</div>
            </>
          )}
        </section>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <div className={utilStyles.backToHome}>
          <Link href="/" passHref>
            <a className="back-button">{BackButtonText(data)}</a>
          </Link>
        </div>
      </section>
    </Layout>
  );
}

function BackButtonText(data) {
  if (!data) {
    return "";
  }
  return "< Back to home";
}
