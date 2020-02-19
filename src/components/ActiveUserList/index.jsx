import React, {
  useCallback,
  useTransition,
  useState,
  Suspense,
  useEffect
} from "react";

import UserCard from "../UserCard";
import { useData } from "../../App";
import "./style.scss";
import createDataSource from "../../utils/cacheApi";
import { customFetch } from "../../utils/service";
import UserProfile from "../UserProfile";

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

export default function ActiveUsersList(props) {
  const { dataSource } = useData();
  const friends = dataSource.userListData.read();
  const [data, setData] = useState(loadUserData(1));
  const [startTransition, isPending] = useTransition(SUSPENSE_CONFIG);

  useEffect(() => console.log("FINISHED RENDERING", Date.now()), []);

  const [activeUserId, setActiveUserId] = useState(1);

  const setUserData = useCallback(
    id => {
      console.log("setUserData id :", id);
      setActiveUserId(id);
      startTransition(() => {
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
              <Suspense
                fallback={
                  <div>
                    Loading friend <Loader />{" "}
                  </div>
                }
              >
                <UserCard
                  isSelected={friend.id === activeUserId ? true : false}
                  userData={friend}
                  thumbnailUrl={`https://i.pravatar.cc/256?img=${friend.id +
                    5}`}
                  handleUserData={setUserData}
                  isPending={isPending && friend.id === activeUserId}
                />
              </Suspense>
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
}
