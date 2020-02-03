import React, {
  useContext,
  useCallback,
  useTransition,
  useState,
  useMemo,
  Suspense,
  useEffect
} from "react";
import { withRouter } from "react-router-dom";
import UserCard from "../UserCard";
import { useData } from "../../App";
import "./style.scss";
import createDataSource from "../../utils/cacheApi";
import { customFetch } from "../../utils/service";
import UserProfile, { loadUserPosts } from "../UserProfile";
import { resolve } from "url";
import { reject } from "q";
import Loader from "../Loader";

export const loadUserData = userId => {
  console.log("loading userData... ", userId);
  const dataSource = {
    user: createDataSource(`user:${userId}`, async () => {
      return await customFetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`,
        2000
      );
    })
  };

  return { ...dataSource };
};

export const SUSPENSE_CONFIG = { timeoutMs: 3000 };

export default withRouter(function ActiveUsersList(props) {
  const { dataSource, friendId } = useData();
  const friends = dataSource.userListData.read();
  const [data, setData] = useState(loadUserData(1));
  const [startTransition, isPending] = useTransition(SUSPENSE_CONFIG);

  const [activeUserId, setActiveUserId] = useState(1);

  const setUserData = useCallback(
    id => {
      console.log("setUserData id :", id);
      setActiveUserId(id);
      startTransition(() => {
        console.log("startTransition  called ");
        setData(loadUserData(id));
      });
    },
    [startTransition]
  );

  console.log("isPending", isPending);

  console.log("isPending --> re-render:", data);

  console.log("activeUserId :", activeUserId);
  return (
    <div className="wrapper-user-list">
      <div className="friend-list">
        {friends.map((friend, index) => {
          return (
            <div className="user-list-item">
              <UserCard
                isSelected={friend.id === activeUserId ? true : false}
                userData={friend}
                thumbnailUrl={`https://i.pravatar.cc/256?img=${friend.id + 5}`}
                handleUserData={setUserData}
                isPending={isPending && friend.id === activeUserId}
              />
            </div>
          );
        })}
      </div>
      {data && (
        <Suspense fallback={Loader}>
          <div className="user-profile-section">
            <UserProfile userData={data} userId={activeUserId} />
          </div>
        </Suspense>
      )}
    </div>
  );
});
