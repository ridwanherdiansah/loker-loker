import React from "react";

export default function Index({ height, width, src }) {
  return (
    <>
      <img height={height} width={width} src={`${src}`} />
    </>
  );
}
