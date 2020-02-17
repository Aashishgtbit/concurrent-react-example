import React from "react";
import createDataSource from "./cacheApi";
import "../styles.scss";

export function cacheImage(source) {
  const resource = createDataSource(source, () => {
    return new Promise(resolve => {
      const image = new Image();
      image.onload = () => {
        resolve(source);
      };
      image.onerror = error => {
        console.error(error);
        resolve(error);
      };
      image.src = source;
    });
  });
  return resource;
}

export const loadImage = source => {
  cacheImage(source).read();
};
export default function MySuspenseImage(props) {
  const { src } = props;
  if (src != null) {
    loadImage(src);
  }
  return (
    <img
      className="suspense-image"
      src={props.src}
      alt={props.alt}
      onClick={props.onClick ? props.onClick : undefined}
    />
  );
}

/** @ExperimentalCode  */

// const imagePromise = new Promise(resolve => {
//   console.log("source :", source);
//   const image = new Image();

//   image.onload = () => {
//     resolve(source);
//   };
//   image.onerror=(error)=> {
//     console.error(error);
//     resolve(error);
//   }
//   image.src = source;
// });

// return handlePromise(imagePromise);

// function handlePromise(promise) {
//   let status = "pending";
//   let result;
//   // console.log("promise", promise);

//   let suspender = promise.then(
//     res => {
//       status = "success";
//       result = res.target;
//     },
//     err => {
//       status = "error";
//       result = err;
//     }
//   );

//   return {
//     read() {
//       if (status === "pending") {
//         throw suspender;
//       } else if (status === "error") {
//         throw result;
//       } else {
//         return result;
//       }
//     }
//   };
// }
