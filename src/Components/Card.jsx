import React from "react";

const Card = ({ cardId, imageUrl, printedAt }) => {
  return (
    <div className="max-w-md overflow-auto m-3 rounded-lg">
      <div className="flex items-center bg-gray-100 p-3 w-[350px]">
        <img src={imageUrl} alt="card_img" width={50} />
        <div className="text-lg mx-5 p-3">
          <p>프린트 날짜</p>
          <p>{printedAt}</p>
        </div>
        <label className="ml-auto pe-5">
          <input type="checkbox" className=" h-5 w-5" />
        </label>
      </div>
    </div>
  );
};

export default Card;
