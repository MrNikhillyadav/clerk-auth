import { Lightbulb } from 'lucide-react';
import React from 'react';

function QuestionsSection({mockInterviewQuestion, activeQuestionIndex}) {

  return mockInterviewQuestion&&(
    <div className='p-5 border rounded-lg my-10 shadow-md'>

      {/* to show active question number */}
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {mockInterviewQuestion&&mockInterviewQuestion.map((question, index) => (
                  <h1
                      key={index}
                      className={`text-xs md:text-md font-semibold text-center p-3 border rounded-full cursor-pointer 
                      ${activeQuestionIndex===index && 'bg-primary text-white'}`}>
                      Question #{index + 1}
                  </h1>
                ))}
          </div>

            {/* showing the question on screen */}
            <h2 className=' p-2  text-sm md:text-lg my-5 border-slate-800 rounded-md'>
              {mockInterviewQuestion[activeQuestionIndex]?.Question} 
              {/* {console.log(mockInterviewQuestion)} */}
              {/* {console.log(mockInterviewQuestion[activeQuestionIndex]?.Question)}  */}
            </h2>

            <div className='border rounded-lg p-5 bg-green-100 bg-opacity-40 mt-20 '>
                <h2 className='flex gap-2 items-center text-primary' >
                  <Lightbulb/>
                  <strong>Note:</strong>
                </h2>
                <h2 className='m-2 text-sm text-primary'>
                  {process.env.NEXT_PUBLIC_INFORMATION}
                </h2>
            </div>

            

    </div>
  );
}

export default QuestionsSection;