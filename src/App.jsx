import React, { Suspense, useState, createContext, useContext } from "react";
import ErrorBoundary from "react-error-boundary";
import createDataSource from "./utils/cacheApi";
import { customFetch } from "./utils/service";
import Header from "./components/Header";
import ActiveUsersList from "./components/ActiveUserList";
import FilterList from "./components/FilterList";
import "./styles.scss";

const DataContext = createContext(null);
export const useData = () => useContext(DataContext);

const makeDataSource = userId => {
  const dataSource = {
    userListData: createDataSource("userListData", async () => {
      return (
        await customFetch("https://jsonplaceholder.typicode.com/users", 0)
      ).slice(0, 6 + Math.floor(Math.random() * 5));
    }),
    commentsList: createDataSource("commentList", async () => {
      return (
        await customFetch("https://jsonplaceholder.typicode.com/comments", 0)
      ).slice(0, 100);
    })
  };

  const prefetch = () => {
    dataSource.userListData.prefetch();
    dataSource.commentsList.prefetch();
  };

  return {
    ...dataSource,
    prefetch
  };
};

export default function App(props) {
  const [friendId, setFriendId] = useState(1);
  const [dataSource, setDataSource] = useState(makeDataSource(friendId));
  const context = {
    dataSource,
    friendId
  };
  return (
    <React.StrictMode>
      <div className="app">
        <Header />
        <ErrorBoundary
          FallbackComponent={props => {
            console.log(props.error);
            return <div> Error loading data </div>;
          }}
        >
          <DataContext.Provider value={context}>
            <Suspense fallback={<div> loading .....</div>}>
              <div className="wrapper-home">
                <Suspense
                  fallback={
                    <div className="loading-users"> Loading users ...</div>
                  }
                >
                  <ActiveUsersList />
                  {/* <FilterList commentsList={dataSource.commentsList} /> */}
                </Suspense>
              </div>
            </Suspense>
          </DataContext.Provider>
        </ErrorBoundary>
      </div>
    </React.StrictMode>
  );
}
