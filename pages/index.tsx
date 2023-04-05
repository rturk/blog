import Link from "next/link";
import fs from 'fs/promises';
import path from 'path';
import { Suspense } from "react";
import { GetStaticProps } from "next";

import Layout from "../components/layouts/main";

import { getPostFrontmatter } from '../utils/getPostFrontmatter';

const Home = ({ posts }) => (
  <Suspense fallback={null}>
    <Layout description="Rafael Turk's blog">
      <ul>
        {posts.map((post, key) => (
          <li key={key}>
            <span>{post.date}</span>
            <Link href={post.url} legacyBehavior>
              <a href={post.url}>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>

      <style jsx>{`
        ul li {
          padding: 10px 15px;
        }

        ul li span {
          color: #5b5b5b;
          display: block;
          font-size: 13px;
        }

        ul li a {
          font-weight: bold;
          color: var(--link-color);
          text-decoration: none;
        }

        @media (any-hover: hover) {
          ul li a:hover {
            background: #eee;
          }

          ul li a:active {
            background: #ccc;
          }
        }

        @media (min-width: 500px) {
          ul {
            padding: 20px 0;
            max-width: 42rem;
            margin: auto;
          }

          ul li {
            padding-left: 0;
          }

          ul li a {
            padding: 10px 15px;
            transition: 150ms background-color ease-in;
          }

          ul li span {
            display: inline-block;
            width: 160px;
            padding-right: 10px;
            text-align: right;
            font-size: inherit;
          }
        }
      `}</style>
    </Layout>
  </Suspense>
);

export default Home;

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

export const getStaticProps: GetStaticProps = async () => {
  const POSTS_DIR = path.resolve(process.cwd(), 'pages', 'posts');

  const posts = await fs.readdir(POSTS_DIR);
  const postsData = await Promise.all(posts.map(async (post) => ({
    id: post.replace(/\.mdx$/, ''),
    content: await fs.readFile(path.join(POSTS_DIR, post), 'utf-8'),
  })));

  return {
    props: {
      posts: postsData.map(post => {
        const frontmatter = getPostFrontmatter(post.content);
        const _date = new Date(frontmatter.date);
        return {
          ...frontmatter,
          date: `${_date.getFullYear()}-${padTo2Digits(_date.getMonth()+1)}`,
          url: `/posts/${post.id}`,
        }
      }),
    },
  }
}
