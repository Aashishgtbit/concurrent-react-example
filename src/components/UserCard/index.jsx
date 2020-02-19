import React, { Suspense } from "react";

import Loader from "../Loader";

import "./style.scss";
import MySuspenseImage from "../../utils/imageCache";

export default function UserCard(props) {
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
              className={`user-thumbnail ${
                props.isSelected ? "user-thumbnail--active" : ""
              } `}
            >
              <Loader />
            </div>
          }
        >
          <div
            className={`user-thumbnail ${
              props.isSelected ? "user-thumbnail--active" : ""
            } `}
          >
            <MySuspenseImage
              src={`https://i.pravatar.cc/256?img=${props.userData.id + 5}`}
              alt="user-dp"
              onClick={() => {
                props.handleUserData(props.userData.id);
              }}
            />
          </div>
        </Suspense>
      </div>
      <div className="user-data">
        <div>
          {props.userData.name}
          <span>{props.userData.userName}</span>
        </div>
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
