import { useState, useEffect } from 'react';
import { Spin } from 'antd';
import { TwitterTweetEmbed } from 'react-twitter-embed';

const regex = { tweet: /(?<=twitter.com\/(.*)\/status\/)\d*/i };

// This is copy-pasted from src/timeline/TimelineItems.js
// May make sense to separate into its own file depending on how often we end up needing this functionality
const urlDomain = url => {
  let re = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n?]+)/gim;
  let newUrl = url.split(re)[1].replace('.com', '');
  return newUrl;
};

export default function EmbedSource(props) {
  const { tweetId, tweetUrl } = props;

  const [source, setSource] = useState('pending');
  const [childProp, setChildProp] = useState('');

  useEffect(() => {
    let isMatch = false;

    // for (const r in regex) {
    //   const match = url.match(regex[r]);

    //   if (match) {
    //     setSource(r);
    //     setChildProp(match[0]);
    //     isMatch = true;
    //     break;
    //   }
    // }
    if (tweetId) {
      setSource('tweet');
      setChildProp(tweetId);
      isMatch = true;
    }

    if (!isMatch) {
      setSource(null);
    }
  }, [tweetUrl]);

  return source === 'pending' ? (
    <Spin />
  ) : source === 'tweet' ? (
    <TwitterTweetEmbed tweetId={childProp} />
  ) : (
    <a
      href={tweetUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="link-button"
    >
      {urlDomain(tweetUrl)}
    </a>
  );
}
