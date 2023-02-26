import React from 'react';
import "./PostCard.scss"
import {IPost} from "../../models/Interfaces";
import DeleteIcon from '@mui/icons-material/Delete';
import {IconButton} from "@mui/material";
import {useDeletePostMutation} from "../../store/news/news.api";

interface IPostCard {
  news: IPost[],
  setNews: (count: IPost[]) => void,
  post: IPost,
  postsTotalCount: number,
  setPostsTotalCount: (count: number) => void,
}

const PostCard: React.FC<IPostCard> = ({news, setNews, post, postsTotalCount, setPostsTotalCount}) => {
  const [deletePost] = useDeletePostMutation();

  const handleDeletePost = async (id: string) => {
    try {
      let result = await deletePost(id)
      if (Object.keys(result).length) {
        const newsShorted = news?.filter((elem: IPost) => elem.id !== post.id)
        setNews(newsShorted)
        setPostsTotalCount(+postsTotalCount - 1)
      }
    } catch (err) {
      alert(String(err));
    }
  };

  return (
    <div className="postCard">
      <div className="postCard__info">
        <h3 className="postCard__title">{post.title[0].toUpperCase()}{post.title.slice(1)}</h3>
        <hr className="postCard__line"/>
        <div className="postCard__body">{post.body[0].toUpperCase()}{post.body.slice(1)}.</div>
        <IconButton
          className="postCard__button"
          aria-label="delete"
          title='Delete post'
          onClick={() => handleDeletePost(String(post.id))}
        >
          <DeleteIcon/>
        </IconButton>
      </div>
    </div>
  );
};

export default PostCard;