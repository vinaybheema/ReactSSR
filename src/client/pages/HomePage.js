import React from "react";

const Home = () => {
  return (
    <div>
      <div>Welcome to Home Component</div>
      <button
        onClick={() => {
          console.log("Button is clicked on client page");
        }}
      >
        Click Me
      </button>
    </div>
  );
};

export default { component: Home };
