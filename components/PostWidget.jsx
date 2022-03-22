import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Link from 'next/link';

import { getSimilarPosts, getRecentPosts } from '../services';

const PostWidget = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((result) => {
        setRelatedPosts(result);
      });
    } else {
      getRecentPosts().then((result) => {
        setRelatedPosts(result);
      });
    }
  }, [slug]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 mb-4">
      <h3 className="text-xl mb-4 font-semibold border-b pb-4">
        {slug ? '関連の投稿' : '最近の投稿'}
      </h3>
      {relatedPosts.map((post) => (
        <div key={post.title} className="flex items-center w-full mb-4">
          <div className="flex-grow ml-4">
            <p className="text-gray-500 text-sm">
              {moment(post.createdAt).format('MMM DD, YYYY')}
            </p>
            <Link href={`/post/${post.slug}`} key={post.title}>
              <span className="text-sm cursor-pointer block pb-3 mb-2 hover:text-yellow-500">{post.title}</span>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidget;
