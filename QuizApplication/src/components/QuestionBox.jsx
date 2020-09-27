import React, {useState} from "react";

const QuestionBox = ({ question, options, selected, isclicked }) => {
    const [answers, setAnswer] = useState(options);

    return (
        
        <div className="question-box">
            <div className="question">{question}</div>
            {answers.map((text, index) => (
                <button 
                key={index} className="answer-button" 
                onClick={() =>  {
                    setAnswer([text]);
                    selected(text);   
                    
                }}
                disabled={isclicked}
                >
                    {text}
                    </button>
            ))}

</div>


    );
};

export default QuestionBox;