import React, { useState, Suspense } from "react";

import imageCache from "../../utils/imageCache";
import Loader from "../Loader";

import "./style.scss";

export default function UserCard(props) {
  const [imageData, loadImageData] = useState(
    imageCache(`https://i.pravatar.cc/256?img=${props.userData.id + 5}`)
  );
  return (
    <div
      className={`wrapper-user-cards ${
        props.isSelected ? "wrapper-user-cards--active" : ""
      } `}
    >
      <div>
        <Suspense
          fallback={
            <div
              className={`user-thumbnail${
                props.isSelected ? "user-thumbnail--active" : ""
              } `}
            >
              <Loader />
            </div>
          }
        >
          <Thumbnail
            imgData={imageData}
            isSelected={props.isSelected}
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

function Thumbnail({ imgData, onClick, isSelected }) {
  const data = imgData.read();

  return (
    <img
      className={`user-thumbnail ${
        isSelected ? "user-thumbnail--active" : ""
      } `}
      src={data.src}
      alt="user-dp"
      onClick={onClick}
    />
  );
}
