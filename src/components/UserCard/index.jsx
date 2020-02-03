import React, { useState, Suspense } from "react";

import imageCache from "../../utils/imageCache";
import Loader from "../Loader";

import "./style.scss";

export default function UserCard(props) {
  const [imageData, loadImageData] = useState(
    imageCache(`https://i.pravatar.cc/256?img=${props.userData.id + 5}`)
  );
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
          <Thumbnail
            imgData={imageData}
            onClick={() => {
              props.handleUserData(props.userData.id);
            }}
          />
        </Suspense>
      </div>
      <div className="user-data">
        <div>
          {props.userData.name}
          <span>{props.userData.userName}</span>
        </div>
        {/* <div>{props.userData.company.name}</div> */}
      </div>
      <div>
        {props.isPending ? (
          <div className="wrapper-loader">
            <Loader />{" "}
          </div>
        ) : null}
      </div>
    </div>
  );
}

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
