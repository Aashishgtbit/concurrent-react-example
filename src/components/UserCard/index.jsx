import React, { useState, useTransition, useEffect, Suspense } from "react";
import { withRouter } from "react-router-dom";
import createDataSource from "../../utils/cacheApi";
import { customFetch } from "../../utils/service";
import imageCache from "../../utils/imageCache";
import Loader from "../Loader";

import "./style.scss";

export const loadUserData = userId => {
  console.log("loading userData... ", userId);
  const dataSource = {
    user: createDataSource(`user:${userId}`, async () => {
      return await customFetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`,
        600
      );
    })
  };
  return { ...dataSource };
};

export const SUSPENSE_CONFIG = { timeoutMs: 3000 };

export default withRouter(function UserCard(props) {
  const [data, setData] = useState(undefined);
  const [startTransition, isPending] = useTransition(SUSPENSE_CONFIG);
  const [imageData, loadImageData] = useState(
    imageCache(`https://i.pravatar.cc/256?img=${props.userData.id + 5}`)
  );
  const setUserData = () => {
    console.log("id :", props.userData.id);
    const userId = props.userData.id;
    startTransition(() => {
      setData(loadUserData(userId));
    });
  };

  if (data) {
    console.log("user :", data.user.read());
    props.history.push(`/${props.userData.id}`);
  }

  return (
    <div className="wrapper-user-cards">
      <div>
        <Suspense
          fallback={
            <div className="user-thumbnail">
              <Loader />
            </div>
          }
        >
          <Thumbnail imgData={imageData} onClick={setUserData} />
        </Suspense>
      </div>
      <div className="user-data">
        <div>
          {props.userData.name}
          <span>{props.userData.userName}</span>
        </div>
        <div>{props.userData.company.name}</div>
      </div>
      {isPending ? (
        <div className="wrapper-loader">
          <Loader />{" "}
        </div>
      ) : null}
    </div>
  );
});

function Thumbnail({ imgData, onClick }) {
  const data = imgData.read();

  return (
    <img
      className="user-thumbnail"
      src={data.src}
      alt="user-dp"
      onClick={onClick}
    />
  );
}
