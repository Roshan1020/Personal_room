import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Header } from "../../components/Header";
import transcriptData from '../../data/transcripts.json';
// import { TagCloud } from 'react-tagcloud'

export default function SessionAnalysisPage() {

    const router = useRouter();
    const { sessionId } = router.query;
    const transcript = (transcriptData[0]) ? transcriptData[0] : [];
    // const cloudOptions = {
    //     luminosity: 'light',
    //     hue: 'blue',
    //  }
    // let data = [];
    // for (const obj of transcript.words) {
    //     data.push({'value': obj.text, 'count': 1})
    // }
    // console.log(data);

    return (
        <>
            <Header />
            <h2 className="text-gray-100 text-3xl tracking-tight mb-8 ml-8 font-bold">Session #{sessionId}</h2>
            {/* <div>
                <TagCloud
                minSize={12}
                maxSize={24}
                tags={data}
                colorOptions={cloudOptions}
                style={{ width: 800, textAlign: 'center' }}
                className="mb-8"
                />
            </div> */}
            <div className="flex container max-w-full ml-4">
            {/* h-screen */}
                <div className="m-4 my-0 w-96 max-w-lg items-center justify-center overflow-hidden rounded-xl bg-brand-light shadow-xl">
                    <div className="h-24 bg-white"></div>
                    <div className="-mt-10 ml-6 flex">
                        <img className="h-16 rounded-full border-8 border-gray-300" src="../icon-transcribe.png" />
                        <p className="text-lg mt-2 ml-3 text-brand-dark font-bold">Transcript</p>
                    </div>
                    <div className="mb-5 px-3 text-center text-sky-500"></div>
                    <blockquote>
                    <p className="mx-6 mb-7 text-s">{transcript.text}</p>
                    </blockquote>
                </div>

                <div className="m-4 my-0 w-96 max-w-lg items-center justify-center overflow-hidden rounded-xl bg-brand-light shadow-xl">
                    <div className="h-24 bg-white"></div>
                    <div className="-mt-10 ml-6 flex">
                        <img className="h-16 rounded-full border-8 border-gray-300" src="../icon-sentiment.png" />
                        <p className="text-lg mt-2 ml-3 text-brand-dark font-bold">Sentiment</p>
                    </div>
                    <div className="mb-5 px-3 text-center text-sky-500"></div>
                    <blockquote>
                    <div className="mx-6 mb-7 text-s">
                    {transcript.sentiment_analysis_results.map( (item, index) => {
                        return (
                        <p className="border-b-2 border-gray-400 my-4 pb-4">
                        <span className={((item.sentiment === "POSITIVE") ? "text-brand-green" : "text-gray-200") + " bg-brand-med-dark text-xs px-4 py-2 mt-2 mb-4 inline-block uppercase tracking-wide font-semibold rounded-full"}>
                         {item.sentiment}
                        </span><br />                      
                        {item.text}
                        </p>
                        );
                    } ) }    
                    </div>
                    </blockquote>
                </div>

                <div className="m-4 my-0 w-96 max-w-lg items-center justify-center overflow-hidden rounded-xl bg-brand-light shadow-xl">
                    <div className="h-24 bg-white"></div>
                    <div className="-mt-10 ml-6 flex">
                        <img className="h-16 rounded-full border-8 border-gray-300" src="../icon-topics.png" />
                        <p className="text-lg mt-2 ml-3 text-brand-dark font-bold">Topics</p>
                    </div>
                    <div className="mb-5 px-3 text-center text-sky-500"></div>
                    <blockquote>
                    <div className="mx-6 mb-7 text-s">
                    {Object.keys(transcript.iab_categories_result.summary).map( (item, index) => {
                        return <p className="border-b-2 border-gray-400 my-4 pb-4">{item.replaceAll('>', ' > ')}</p>;
                    } ) }   
                    </div>
                    </blockquote>
                </div>

            </div>
        </>
    );
}
