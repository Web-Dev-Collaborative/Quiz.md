import React, { useEffect } from "react";
import Posts from "../Posts";
import { useDispatch, useSelector } from "react-redux";
import StationarySide from "./StationarySide";
import "./LandingPage.css";
import * as postActions from "../../Store/posts";
import { getUsers } from "../../Store/user";

const LandingPage = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => Object.values(state.posts));

  useEffect(() => {
    dispatch(postActions.getPosts());
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <>
      <div className='landing__container'>
        <div className='posts__feed'>
          {posts.length !== 0 && <Posts posts={posts} />}
        </div>
        <div>
          <StationarySide />
        </div>
      </div>
    </>
  );
};

export default LandingPage;
