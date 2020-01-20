import React, {
  useEffect,
  useMemo,
  Suspense,
  useState,
  SuspenseList
} from "react";
import { loadUserData } from "../UserCard";
import Header from "../../components/Header";
import createDataSource from "../../utils/cacheApi";
import { customFetch } from "../../utils/service";
import imageCache from "../../utils/imageCache";
import CommentsCard from "../CommentsCard";
import Loader from "../Loader";
import "./style.scss";

const loadUserPosts = userId => {
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
  console.log("userId", props.match.params.userId);
  const [data, setData] = useState(loadUserData(props.match.params.userId));
  const [postData, setPosts] = useState(
    loadUserPosts(props.match.params.userId)
  );
  const [imgData, loadImageData] = useState(
    imageCache(
      `https://i.pravatar.cc/256?img=${parseInt(props.match.params.userId) + 5}`
    )
  );
  console.log("imgData :", imgData);
  return (
    <div className="wrapper-user-profile">
      <Header />
      <div className="profile">
        <SuspenseList>
          <div className="profile-top-section">
            <Suspense
              fallback={
                <div className="user-image">
                  <Loader />
                </div>
              }
            >
              <UserImage imageData={imgData} />
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
        </SuspenseList>
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
      <div>company Name :{user.company.name} </div>
    </div>
  );
}

function UserImage({ imageData }) {
  const data = imageData.read();
  console.log("data: ", data);
  return <img className="user-image" src={data.src} alt="user-dp" />;
}
