"use client"

import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { WebcamIcon } from 'lucide-react';
import React, { useEffect,useState} from 'react'
import Webcam from 'react-webcam';

function Interview({params}) {
    const [interviewData, setInterviewData] = useState()
    const [webCamEnabled, setWebCamEnabled] = useState(false)

    useEffect(()=>{
        console.log(params.interviewId)
        GetInterviewDetails();
    },[])

    const GetInterviewDetails =async () =>{
        const result = await db.select().from(MockInterview)
        .where(eq(MockInterview.mockId,params.interviewId))

        // console.log(result)
        setInterviewData(result[0]);
    }
    

  return (
    <div className='my-10 flex justify-center  items-center flex-col  '>
            <h1 className="font-bold text-2xl">Let's Get Started</h1>
            <div className="flex justify-center items-center flex-col gap-4 ">

                {webCamEnabled ?
                    <Webcam         
                    onUserMedia={()=> setWebCamEnabled(true)}
                    onUserMediaError={() => setWebCamEnabled(false)}
                    mirrored={true}
                    style={{
                        height: 400,
                        width:400,
                    }}/>
                :
                <>
                    <WebcamIcon className="h-72 w-full p-20 border bg-slate-100  rounded-lg" />
                    <Button onClick={()=>setWebCamEnabled(true)}> Enable Webcam and Microphone </Button>
                </>
                }
            </div>

            


            
    </div>
  )
}

export default Interview