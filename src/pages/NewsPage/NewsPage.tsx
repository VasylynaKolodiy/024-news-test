import React, {useEffect, useState} from 'react';
import {useGetPostsQuery} from '../../store/news/news.api';
import "./NewsPage.scss"
import {IPost} from "../../models/Interfaces";
import PostCard from "../../components/PostCard/PostCard";
import {Button} from "@mui/material";
import {LIMIT} from "../../constants";
import {Masonry} from "@mui/lab";

const NewsPage = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const {
    isLoading, data: newsData = {
      data: undefined,
      totalCount: false
    }
  } = useGetPostsQuery(String(pageNumber), {refetchOnMountOrArgChange: true});
  const [postsTotalCount, setPostsTotalCount] = useState(0)
  const [news, setNews] = useState(newsData?.data || [])

  useEffect(() => {
    if (newsData?.data && newsData?.data[0].title !== news[0]?.title) {
      setNews([...news, ...newsData?.data])
    }
  }, [newsData?.data])

  useEffect(() => {
    if (newsData?.totalCount) setPostsTotalCount(Number(newsData?.totalCount))
  }, [newsData?.totalCount])

  const handleLoadMorePosts = () => {
    setPageNumber(+pageNumber + 1)
  }

  return (
    <main className="newsPage">

      {isLoading
        ? <h2>Loading</h2>
        : (<>
          <div className="newsPage__postsList">
            <Masonry columns={4} spacing={5} sx={{width: "auto"}}>
              {news.map((post: IPost) =>
                <div key={post.id}>
                  <PostCard
                    news={news}
                    setNews={setNews}
                    post={post}
                    postsTotalCount={postsTotalCount}
                    setPostsTotalCount={setPostsTotalCount}
                    key={post.id}
                  />
                </div>
              )}
            </Masonry>
          </div>

          {(+pageNumber * LIMIT) < postsTotalCount && (
            <Button
              className='newsPage__loadButton'
              variant="outlined"
              onClick={() => handleLoadMorePosts()}
            >
              Load more...
            </Button>
          )}
        </>)
      }
    </main>
  );
};

export default NewsPage;