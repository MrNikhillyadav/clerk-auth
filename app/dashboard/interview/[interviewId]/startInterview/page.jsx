"use client"
import React, { useEffect, useState } from 'react';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import QuestionsSection from './_components/QuestionsSection';
import RecordAnswerSection from './_components/RecordAnswerSection';

function startInterview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    GetInterviewDetails();
  }, []);

  // defining function to get interview details
  const GetInterviewDetails = async () => {
    if (!interviewData) {
      const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.interviewId));

          if (result[0]) {
            const jsonMockResp = JSON.parse(result[0].jsonMockResp);
            setMockInterviewQuestion(jsonMockResp);
            setInterviewData(result[0]);
            
            // console.log("jsonMockResp:", jsonMockResp);
          } 
          else {
            console.error("No result found for the given mockId");
          }
    }
  };

  return (
    <div>
      <div className='h-full w-full grid grid-cols-1 md:grid-cols-2 gap-10'>
        {/* questions */}
          <QuestionsSection mockInterviewQuestion={mockInterviewQuestion} activeQuestionIndex={activeQuestionIndex} />

      {/* Audio recording */}
      <RecordAnswerSection/>
      </div>
    </div>
  );
}

export default startInterview;