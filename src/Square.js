import React from "react";

function Square(props) {
    return (
      <button className={props.isFill ? "square fill" : "square"} onClick={() => {props.onClick()}}>
        {props.value}
      </button>
    );
}

export default Square;