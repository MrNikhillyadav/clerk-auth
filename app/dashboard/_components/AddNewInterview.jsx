"use client"
import {React,useState} from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from 'uuid';
import { useUser } from "@clerk/clerk-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

import { Textarea } from '@/components/ui/textarea';
import { chatSession } from '@/utils/GeminiAIModel';
import { LoaderCircle } from 'lucide-react';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import moment from 'moment/moment';
  

function addNewInterview() {
   const [openDialog, setOpenDialog]= useState(false);
   const [jobPosition,setJobPosition]= useState();
   const [jobDesc,setJobDesc]= useState();
   const [jobExperience,setJobExperience]= useState();
   const [loading,setLoading] = useState();
   const [jsonResponse,setJsonResponse] = useState();
   const {user}=useUser()

   const onSubmit=async(ev)=>{
        setLoading(true);
        ev.preventDefault()
        console.log(jobPosition,jobDesc,jobExperience)

        const Inputprompt="Job Position: "+jobPosition+",Job Description: "+jobDesc+",Years of Expericence: "+jobExperience+",Based on this information generate "+process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT+" good interview questions with their answers in JSON format, Question and answer should be in JSON field."

        const result = await chatSession.sendMessage(Inputprompt);
        const MockJsonResp =(result.response.text()).replace('```json','').replace('```',''); //relacing ```json ``` from the response and parse it.
        console.log(JSON.parse(MockJsonResp));
        setJsonResponse(MockJsonResp);

        
        if(MockJsonResp){
            const resp= await db.insert(MockInterview)
            .values({
                mockId :uuidv4(),
                jsonMockResp:MockJsonResp,
                jobPosition:jobPosition,
                jobDesc:jobDesc,
                jobExperience:jobExperience,
                createdBy: user?.primaryEmailAddress?.emailAddress,
                createdAt : moment().format('DD-MM-yyy')
    
            }).returning({mockId:MockInterview.mockId})
    
            console.log("Inserted ID:", resp)
            if(resp){
                setOpenDialog(false)
            }
        }
        else{
            console.log('ERROR');
        }

        setLoading(false);

   }

  return (
    <div>
        <div onClick={()=>setOpenDialog(true)}
        className='p-10 border bg-slate-100 rounded-lg hover:shadow-md hover:scale-105 cursor-pointer transition-all  '>
           <h2 className='text-lg text-center'>  + Add New </h2>
        </div>
        <Dialog open={openDialog} >
        
        <DialogContent className='max-w-2xl'>
            <DialogHeader>
            <DialogTitle className="text-2xl">Tell me more about you job interviewing</DialogTitle>
            <DialogDescription>

                <form onSubmit={onSubmit}>
                    <div>
                        <h2>Add details about your job position/role, Job descrption and years of expericence</h2>
                        <div className='mt-7 my-3'>
                            <label>Job Role/Job Position </label>
                            <Input required placeholder="Ex. Full Stack Developer"
                            onChange={(event)=>setJobPosition(event.target.value) } />
                        </div>
                        <div className='my-3'>
                            <label>Job Description/Tech-Stack (in short)</label>
                            <Textarea required placeholder="Ex. Reactjs, Nextjs, Node js etc."
                             onChange={(event)=>setJobDesc(event.target.value) } />
                        </div>
                        <div className='my-3'>
                            <label>Years of Experience </label>
                            <Input placeholder="5" type='number' max='20' required 
                            onChange={(event)=>setJobExperience(event.target.value) } />
                        </div>
                    </div>
                    <div className='flex gap-6 justify-end mt-3'>
                        <Button type="button" variant='ghost' onClick={()=> setOpenDialog(false)} >Cancel</Button>
                        <Button type="submit" disabled={loading}>
                            {loading? <> 
                            <LoaderCircle className='animate-spin'/> Generating from AI
                            </> :'Start Interview'}
                        </Button>
                    </div>
                </form>
            </DialogDescription>
            </DialogHeader>
        </DialogContent>
        </Dialog>

    </div>

  )
}

export default addNewInterview