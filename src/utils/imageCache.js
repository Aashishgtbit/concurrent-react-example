export default function cacheImage(source) {
  const imagePromise = new Promise(resolve => {
    console.log("source :", source);
    const image = new Image();
    image.src = source;
    image.onload = resolve;
    return image;
  });
  console.log("imagePromise :", imagePromise);
  return handlePromise(imagePromise);
}
function handlePromise(promise) {
  let status = "pending";
  let result;
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
