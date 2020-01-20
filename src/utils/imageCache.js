export default function cacheImage(source) {
  let imagePromise;

  imagePromise = new Promise(resolve => {
    console.log("source :", source);
    const image = new Image();
    image.src = source;
    image.onload = resolve;
    return image;
  });

  return handlePromise(imagePromise, source);
}
function handlePromise(promise, key) {
  let status = "pending";
  let result;
  console.log("promise", promise);

  let suspender = promise.then(
    res => {
      status = "success";
      result = res.target;
    },
    err => {
      status = "error";
      result = err;
    }
  );

  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else {
        return result;
      }
    }
  };
}
