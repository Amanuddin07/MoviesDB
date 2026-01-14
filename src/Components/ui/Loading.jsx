import React from "react";

export default function Loading() {
  return (
    <div className="loading text-center">
      <div className="container animate-pulse loading-container d-flex gap-4 align-items-center">
        <div className="loadingcard"></div>
        <div className="loadingcard"></div>
        <div className="loadingcard"></div>
        <div className="loadingcard"></div>
        <div className="loadingcard"></div>
      </div>
      <h2 className="animate-pulse loading-txt">Loading........</h2>

      <div className="container animate-pulse loading-container d-flex gap-4 align-items-center">
        <div className="loadingcard"></div>
        <div className="loadingcard"></div>
        <div className="loadingcard"></div>
        <div className="loadingcard"></div>
        <div className="loadingcard"></div>
      </div>
    </div>
  );
}
