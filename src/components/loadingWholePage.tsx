import React from "react";

function LoadingWholePage({ title }: { title?: string }) {
  return (
    <div className="bg-secondColor px-2 py-8 text-center text-firstColor">
      <h1 className="text-2xl">{title ? title : ""}</h1>
      <p className="text-xl">Loading...</p>
    </div>
  );
}

export default LoadingWholePage;
