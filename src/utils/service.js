export function promiseTimeout(time) {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve(time);
    }, time);
  });
}

const extraTime = 0;
export const customFetch = async (url, timeout = extraTime) => {
  const response = await fetch(url);
  const jsonData = await response.json();
  await promiseTimeout(timeout + Math.random() * 1000);
  return jsonData;
};
