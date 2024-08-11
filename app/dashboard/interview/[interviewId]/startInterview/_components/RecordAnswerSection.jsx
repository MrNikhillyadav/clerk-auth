"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react'

function RecordAnswerSection() {
    const {
            error,
            interimResult,
            isRecording,
            results,
            startSpeechToText,
            stopSpeechToText,
        } = useSpeechToText({
            continuous: true,
            useLegacyResults: false
        });
  return (
    <div className='flex flex-col justify-center items-center border '>
            <div className='flex flex-col justify-center items-center border-2 border-yellow-300 bg-black rounded-lg p-5 my-20 drop-shadow-lg '>
                <Image src={'/webcam.png'} alt='webcam-image' width={200} height={200} className='absolute  p-2 ' />
                <Webcam 
                mirrored={true}
                style={{
                    height: 300,
                    width:'100%',
                    zIndex: 10, 
                }} />
            </div>
            <div>

                <Button variant='outline'>
                    start recording
                </Button>
                <h1>Recording: {isRecording.toString()}</h1>
                <button onClick={isRecording ? stopSpeechToText : startSpeechToText}>
                    {isRecording ? 'Stop Recording' : 'Start Recording'}
                </button>
                <ul>
                    {results.map((result) => (
                    <li key={result.timestamp}>{result.transcript}</li>
                    ))}
                    {interimResult && <li>{interimResult}</li>}
                </ul>


                {/* <Button variant='outline'
                onClick={isRecording?stopSpeechToText:startSpeechToText } >
                    {isRecording?
                    <h2>
                        <Mic/>
                        'Recording....'
                    </h2>
                    :
                    'Record Answer'
                        }
                </Button> */}

              
              
            </div>
    </div>
  )
}

export default RecordAnswerSection