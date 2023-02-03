import React, { FunctionComponent } from "react";

interface TagProps {
  text: string;
  color: "green" | "purple";
  dot: boolean;
}

const Tag: FunctionComponent<TagProps> = ({ color, dot, text }) => {
  if (color === "green") {
    return (
      <div
        className={`py-1 px-2 inline-flex items-center rounded-full font-medium bg-green-200`}
      >
        {dot ? (
          <span className={`bg-green-800 mr-1 h-1 w-1 rounded-full`}></span>
        ) : null}
        <div className={`text-[12px] text-green-800`}>
          {text[0].toUpperCase() + text.slice(1).toLowerCase()}
        </div>
      </div>
    );
  } else if (color === "purple") {
    return (
      <div
        className={`py-1 px-2 inline-flex items-center rounded-full font-medium bg-purple-200`}
      >
        {dot ? (
          <span className={`bg-purple-800 mr-1 h-1 w-1 rounded-full`}></span>
        ) : null}
        <div className={`text-[12px] text-purple-800`}>
          {text[0].toUpperCase() + text.slice(1).toLowerCase()}
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={`py-1 px-2 inline-flex items-center rounded-full font-medium bg-green-200`}
      >
        {dot ? (
          <span className={`bg-green-800 mr-1 h-1 w-1 rounded-full`}></span>
        ) : null}
        <div className={`text-[12px] text-green-800`}>
          {text[0].toUpperCase() + text.slice(1).toLowerCase()}
        </div>
      </div>
    );
  }
};

export default Tag;
