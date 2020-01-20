import React, { useContext } from "react";
import UserCard from "../UserCard";
import { useData } from "../../App";
import "./style.scss";

export default function ActiveUsersList(props) {
  const { dataSource, friendId } = useData();
  const friends = dataSource.userListData.read();
  console.log("friends :", friends);
  return (
    <div className="wrapper-user-list">
      {friends.map((friend, index) => {
        return (
          <div className="user-list-item">
            <UserCard
              userData={friend}
              thumbnailUrl={`https://i.pravatar.cc/256?img=${friend.id + 5}`}
            />
          </div>
        );
      })}
    </div>
  );
}
