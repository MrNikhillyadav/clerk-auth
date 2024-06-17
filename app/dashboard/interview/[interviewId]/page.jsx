"use client"

import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect,useState} from 'react'
import Webcam from 'react-webcam';

function Interview({ params }) {
    const [interviewData, setInterviewData] = useState(undefined);
    const [webCamEnabled, setWebCamEnabled] = useState(false);

    // to fetch the interview details when the 'params.interviewId' changes.
    useEffect(() => {
        console.log(params.interviewId);
        GetInterviewDetails();
    }, [params.interviewId]);

    useEffect(() => {
        if (interviewData) {
            console.log({ interviewData });
        }
    }, [interviewData]);

    const GetInterviewDetails = async () => {
        if (!interviewData) {
            const result = await db.select().from(MockInterview)
                .where(eq(MockInterview.mockId, params.interviewId));

            if (result[0]) {
                setInterviewData(result[0]);
            }
        }
    };

    return (
        <div className="my-10">
            <h1 className="font-bold text-primary text-2xl">Let's Get Started</h1>
            <div className="grid grid-cols-1 mt-8 gap-10 md:grid-cols-2">

                <div className="flex flex-col justify-start gap-4">
                    <div className="p-12 rounded-lg bg-slate-100">
                        <h2 className="text-lg">
                            <strong>Job Position/Job Role : </strong> {interviewData?.jobPosition}
                        </h2>
                        <h2 className="text-lg">
                            <strong>Job Description/Tech-stack : </strong> {interviewData?.jobDesc}
                        </h2>
                        <h2 className="text-lg">
                            <strong>Years of experience : </strong> {interviewData?.jobExperience}
                        </h2>
                    </div>

                    <div className="border bg-yellow-100 border-yellow-300 p-4 rounded-lg">
                        <h2 className="flex gap-2 items-center text-yellow-500">
                            <Lightbulb />
                            <strong>Information</strong>
                        </h2>
                        <h2 className="mt-3 text-yellow-500">{process.env.NEXT_PUBLIC_INFORMATION}</h2>
                    </div>
                </div>

                <div className="flex justify-center items-center flex-col gap-4">

                    {webCamEnabled ? (
                        <Webcam
                            onUserMedia={() => setWebCamEnabled(true)}
                            onUserMediaError={() => setWebCamEnabled(false)}
                            mirrored={true}
                            style={{
                                height: 400,
                                width: 400,
                            }}
                        />
                    ) : (
                        <>
                            <WebcamIcon className="h-72 w-full p-20 border bg-slate-100 rounded-lg" />
                            <Button variant="ghost" className="w-full border border-slate-100" onClick={() => setWebCamEnabled(true)}>
                                Enable Webcam and Microphone
                            </Button>
                        </>
                    )}

                    <div >
                        <Link href={'/dashboard/interview/' + params.interviewId + '/startInterview'}>
                            <Button className=" px-[16.5vw] text-center ">Start Interview</Button>
                        </Link>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default Interview;