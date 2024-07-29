import React, { useEffect, useState } from 'react';
import { useParams , useNavigate } from 'react-router-dom';
import './code.css';

export const Code = () => {
  const { questionId } = useParams();
  const [question, setQuestion] = useState(null);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('c');  // State for the selected language
  const [result, setResult] = useState('');

  const navigate = useNavigate();

  const tokenCode = localStorage.getItem('token');

  const handleChange = (event) => {
    setCode(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      const start = event.target.selectionStart;
      const end = event.target.selectionEnd;

      // Insert the tab character
      setCode(prevCode => prevCode.substring(0, start) + '\t' + prevCode.substring(end));

      // Move the cursor to the right position
      setTimeout(() => {
        event.target.selectionStart = event.target.selectionEnd = start + 1;
      }, 0);
    }
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleRunCode = async (event) => {
    const bundle = {
      language: `${language}`,
      code: `${code}`,
      questionId: `${questionId}`,
      userId: 'someshpandey'
    };

    console.log(code);
    console.log(bundle);

    var formBody = [];
        for (var property in bundle) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(bundle[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        try{
          console.log("sending request");
          
          const response = await fetch('http://localhost:5000/api/exec/execute', {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${tokenCode}`,
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody,
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setResult(data.output);
          
      } else {
          const errorData = await response.json();
          setMessage(errorData.msg || 'Execution failed');
      }

        }
        catch(error){
          console.log(`EXECUTION FAILED: ${error}`);
        }
  };

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/question/code/${questionId}`,{
          method:"GET",
          headers: {
            'Authorization': `Bearer ${tokenCode}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setQuestion(data);
        } else {
          console.error('Failed to fetch question');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchQuestion();
  }, [questionId]);

  if (!question) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="container-code">
        <div className="header-code">
          <h1>Online Coding Contest</h1>
          <button onClick={() => {navigate("/question")}} >Question List</button>
        </div>

        <div className="main-code">
          <div className="sidebar-code">
            <h2>{question.title}</h2>
            <p>
              <strong>Problem Statement:</strong> <br />
              {question.statement}
              <br /><br />
              <strong>Example:</strong> <br /><br />
              <strong>Input Format:</strong> <br/> {question.inputformat} <br /><br/>
              <strong>Output Format:</strong> <br /> {question.outputformat} <br /><br />
              <strong>Test Case:<br /></strong> {question.testcase}
              <br /><br />
              <strong>Constraints:<br /></strong> {question.constraints}
            </p>
          </div>

          <div className="content-code">
            <h2>Code Here!!</h2>
            <div className="language-select">
              <label htmlFor="language">Choose Language: </label>
              <select id="language" value={language} onChange={handleLanguageChange}>
                <option value="c">C</option>
                <option value="cpp">C++</option>
                <option value="py">Python</option>
                <option value="java">Java</option>
              </select>
            </div>
            <textarea
              name="code"
              className="textarea-code"
              placeholder="Write your code here.."
              value={code}
              onChange={handleChange}
              onKeyDown={handleKeyDown}  // Bind the keydown event
            ></textarea>
            <div className="buttons-code">
              <button className="button-code button-run-code" onClick={handleRunCode}>Run</button>
              <button className="button-code button-submit-code">Submit</button>
            </div>
            <textarea
            name='result'
            className='textarea-result'
            placeholder='Result'
            value={result}
            rows="8"
            >
            </textarea>
          </div>
        </div>
      </div>
    </>
  );
}