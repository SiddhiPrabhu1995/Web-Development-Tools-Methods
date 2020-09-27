import React from "react";

function Feedback(props) {

    if(props.isCorrect === null)
    {
      return <p className="empty"> </p>;
    }
    else if (props.isCorrect === true) {

      return <p className="correctAnswer">Answer is Correct</p>;

    } else if (props.isCorrect === false) {

      return <p className="incorrectAnswer">Answer Is Incorrect</p>;

    } 

    return <div />;
  }

export default Feedback;