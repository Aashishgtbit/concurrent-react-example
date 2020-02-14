import React, { Suspense, useState, SuspenseList, useEffect } from "react";
import { loadUserData } from "../ActiveUserList";
import Header from "../../components/Header";
import createDataSource from "../../utils/cacheApi";
import { customFetch } from "../../utils/service";
import imageCache from "../../utils/imageCache";
import CommentsCard from "../CommentsCard";
import Loader from "../Loader";
import "./style.scss";
import MySuspenseImage from "../../utils/imageCache";

export const loadUserPosts = userId => {
  const dataSource = {
    posts: createDataSource(`posts:${userId}`, async () => {
      return await customFetch(
        `https://jsonplaceholder.typicode.com/comments?postId=${userId}`,
        600
      );
    })
  };

  return { ...dataSource };
};

export default function UserProfile(props) {
  const data = props.userData;
  console.log("props", props);
  const [postData, setPosts] = useState(loadUserPosts(props.userId));
  // const [imgData, loadImageData] = useState(
  //   imageCache(`https://i.pravatar.cc/256?img=${props.userId + 5}`)
  // );
  console.log("id :", props.userId + 5);
  useEffect(() => {
    // loadImageData(
    //   imageCache(`https://i.pravatar.cc/256?img=${props.userId + 5}`)
    // );
    setPosts(loadUserPosts(props.userId));
  }, [props.userId]);

  const handleButtonClick = e => {
    console.log("handleButton Click called");
  };
  return (
    <div className="wrapper-user-profile">
      <div className="profile">
        <SuspenseList revealOrder="forwards">
          <div className="profile-top-section">
            <Suspense
              fallback={
                <div className="user-image">
                  <Loader />
                </div>
              }
            >
              {/* <UserImage imageData={imgData} /> */}
              <div className="user-image">
                <MySuspenseImage
                  src={`https://i.pravatar.cc/256?img=${props.userId + 5}`}
                  alt="user-dp"
                />
              </div>
            </Suspense>

            <Suspense
              fallback={
                <div>
                  loading userDetails....
                  <Loader />
                </div>
              }
            >
              <UserDetails data={data} />
            </Suspense>
          </div>
          <div className="comments-section">
            <Suspense
              fallback={
                <div>
                  loading user posts ....
                  <Loader />
                </div>
              }
            >
              <CommentsCard data={postData} />
            </Suspense>
          </div>
        </SuspenseList>
      </div>
    </div>
  );
}

function UserDetails(props) {
  const user = props.data.user.read();

  console.log(user);

  return (
    <div className="user-details">
      <div>name :{user.name}</div>
      <div>email :{user.email}</div>
      <div>company :{user.company.name} </div>
    </div>
  );
}

// function UserImage({ imageData }) {
//   const data = imageData.read();
//   console.log("data : ", data);
//   return <img className="user-image" src={data.src} alt="user-dp" />;
// }
