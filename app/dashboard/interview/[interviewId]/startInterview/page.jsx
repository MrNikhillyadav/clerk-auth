"use client"

import React, { useEffect, useState } from 'react'
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import QuestionsSection from '../startInterview/_components/QuestionsSection';

function startInterview({params}) {

  const [interviewData,setInterviewData] = useState();
  const [mockInterviewQuestion,setMockInterviewQuestion] = useState();
  const [activeQuestionIndex,setActiveQuestionIndex] = useState(0);

  useEffect(()=>{
    GetInterviewDetails();
  },[])

  const GetInterviewDetails = async () => {
    if (!interviewData) {
        const result = await db.select().from(MockInterview)
            .where(eq(MockInterview.mockId, params.interviewId));

        const jsonMockResp=JSON.parse(result[0].jsonMockResp)
        setMockInterviewQuestion(jsonMockResp);
        console.log(jsonMockResp);

        if (result[0]) {
            setInterviewData(result[0]);
        }
    }
};

  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2'>
      {/* questions */}
      <QuestionsSection  mockInterviewQuestion={mockInterviewQuestion} activeQuestionIndex={activeQuestionIndex} />

      
      </div>
    </div>

  )
}

export default startInterview