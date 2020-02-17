const dataSourceCache = new Map();

export default function createDataSource(fetchId, fetch) {
  const getData = (key, input) => {
    if (!dataSourceCache.has(key)) {
      const dataSource = {
        promise: fetch(input),
        status: "pending",
        value: null
      };
      dataSource.promise.then(
        data => {
          dataSource.status = "resolved";
          dataSource.value = data;
        },
        error => {
          dataSource.status = "error";
          dataSource.value = error;
        }
      );
      dataSourceCache.set(key, dataSource);
    }
  };

  const dataSource = {
    read(input) {
      // console.log(input);
      const key = `${fetchId}:${input}`;
      getData(key, input);
      const result = dataSourceCache.get(key);
      // console.log("result :", result);

      switch (result.status) {
        case "pending": {
          const suspender = result.promise;
          throw suspender;
        }
        case "resolved": {
          const value = result.value;
          return value;
        }
        case "error": {
          const error = result.value;
          throw error;
        }

        default:
          // unexpected case ...
          return undefined;
      }
    },
    prefetch(input) {
      const key = `${fetchId}:${input}`;
      getData(key, input);
    }
  };
  return dataSource;
}
