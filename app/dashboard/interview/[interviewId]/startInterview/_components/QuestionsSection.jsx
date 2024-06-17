import React from 'react';

function QuestionsSection({ mockInterviewQuestion, activeQuestionIndex }) {
  // if (!mockInterviewQuestion) {
  //   return <div>Loading...</div>;
  // }

  // if (!mockInterviewQuestion[activeQuestionIndex]) {
  //   return <div>Question not found.</div>;
  // }


  return  (
    <div className='p-5 border rounded-lg'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {mockInterviewQuestion.map((question, index) => (
          <h1
            key={index}
            className={`text-xs md:text-md font-semibold text-center p-2 border rounded-full cursor-pointer ${
              activeQuestionIndex === index && 'bg-primary text-white'
            }`}
          >
            Question #{index + 1}
          </h1>
        ))}
      </div>
     
      {/* <h2 className='text-black'>{mockInterviewQuestion[activeQuestionIndex].question}</h2> */}
    </div>
  );
}

export default QuestionsSection;