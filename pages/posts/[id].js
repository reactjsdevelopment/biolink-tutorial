import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'

// This approach is part of Next.js's Static Site Generation (SSG), which ensures pages are pre-rendered at build time for improved performance and SEO.
export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          {/* <Date dateString={postData.date} /> */}
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}
// generating the paths for all the individual posts at build time.
export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    // fallback: false: This setting means that if a user tries to access a post path that isn't pre-generated, they will get a 404 error. If you wanted to support paths that are generated on-demand (e.g., when a user requests a page that wasn't generated at build time), you could set fallback to true or 'blocking'.
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}
