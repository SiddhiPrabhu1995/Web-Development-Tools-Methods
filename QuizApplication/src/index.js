import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import "./assets/style.css";
import quizService from "./quizService";
import QuestionBox from "./components/QuestionBox";
import Result from "./components/Result";
import Feedback from "./components/FeedBack";

    
function Quiz (props) {
    const [quiz, setQuizState] = useState({
        questionBank: [],
        score: 0,
        responses: 0,
        isGameOver: false,
        isCorrectAnswer: null,
        isclicked: false
    });

    const getQuestions = () => {
        
        quizService().then(question => {
            setQuizState({...quiz,
                questionBank: question,
                isCorrectAnswer: null,
                isclicked: false
              
                });
        });
    };

    const getQuestionsNew = () => {
        
        quizService().then(question => {
            setQuizState({...quiz,
                questionBank: question,
                isCorrectAnswer: null,
                score: 0,
                responses: 0,
                isGameOver: false,
                isclicked: false
              
                });
        });
    };


    
    const computeAnswer = (answer, correctAnswer)  => {

        setQuizState({...quiz,
            responses: quiz.responses <5 ? quiz.responses+1 :5,
            score: (answer===correctAnswer)?quiz.score+1:quiz.score,
            isCorrectAnswer: (answer!==correctAnswer)?false:true,
            isclicked: true
        })
    }


    const playAgain = () => {
        
        setQuizState({...quiz,
            questionBank: [],
            score: 0,
            responses: 0,
            isGameOver: false,
            isCorrectAnswer: null,
            isclicked: false
            });
            getQuestionsNew({});

        };

        
    
        useEffect(() => {
            getQuestions({});
            
        }, [])

    
        return (
           
            <div className= "container">

                <div className= "title">Quiz</div>

                {quiz.responses<5?( 
                <div className= "display-score">Score:{quiz.score}</div>): null}

                {quiz.responses<5?( 
                <div className= "turn-counter">Turn Counter:{quiz.responses}</div>): null}

                {quiz.questionBank.length>0 && 
                quiz.responses<5 && 
                quiz.questionBank.map(
                    ({question, answers, correct, questionId, isCorrectAnswer}) => (
                        <QuestionBox question={question} 
                                     options={answers}
                                     key={questionId}
                                     selected= {answer => computeAnswer(answer, correct)}
                                     isCorrectAnswer= {isCorrectAnswer}
                                     isclicked= {quiz.isclicked}
                                      
                        />             
                            )        
                )
                }

                {quiz.responses<5?( 
                <Feedback isCorrect={quiz.isCorrectAnswer}/>): null}

                              
                {quiz.responses<5? (            
                <button className="next"  
                onClick={() =>  {
                    setQuizState({...quiz,
                        isCorrectAnswer: null
                    });
                    getQuestions();                       
                }}
                disabled={!quiz.isclicked}
                >
                    Next
                </button>) : null}

                    
                {quiz.responses === 5 ? (
                <Result score={quiz.score} playAgain={playAgain} />
                ) : null}     
             
          </div>  
        );

    
}

ReactDOM.render(<Quiz />, document.getElementById("root"));