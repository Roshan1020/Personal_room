import { Header } from '../../components/Header'
import axios from 'axios'
import { useWalletConnectClient } from '../../contexts/ClientContext.jsx'
import { useState } from 'react'
import meetings from '../../data/meetings.json'

const DATA_URL = 'https://emergence-gamma.vercel.app/api/transcriptions'

let transcriptId, status

const assembly = axios.create({
  baseURL: 'https://api.assemblyai.com/v2',
  headers: {
    authorization: '57c79d44298443588fe6f4e29249633c',
    'content-type': 'application/json',
  },
})

function getTranscriptResult() {
  assembly
    .get(`/transcript/${transcriptId}`)
    .then((res) => {
      console.log(res.data)
      status = res.data.status
    })
    .catch((err) => console.error(err));
    if(status !== 'completed' && status !== 'error') {
        setTimeout(getTranscriptResult, 5000);        
    }
}

function postTranscriptForProcessing() {
    assembly
    .post("/transcript", {
        // audio_url: "https://bit.ly/3yxKEIY",
        audio_url: "https://emergence-dapp.s3.us-east-2.amazonaws.com/Screen+Recording+2022-08-21+at+10.46.25.mov",
        // webhook_url: "",
        auto_highlights: true,
        iab_categories: true,
        sentiment_analysis: true,
        entity_detection: true

    })
    .then((res) => {
      console.log(res.data)
      transcriptId = res.data.id
      status = res.data.status
    })
    .catch((err) => console.error(err));
    if(status !== 'completed' && status !== 'error') {
        setTimeout(getTranscriptResult, 5000);        
    }
}

// postTranscriptForProcessing();

export default function AdminPage({ meetingData }) {

    // const { connect, signer, accounts } = useWalletConnectClient();
    // console.log("checking signer", signer);

    const [show, setShow] = useState();

    return (
        <>
            <Header />
            <div className="w-full sm:px-6">
                <div className="px-4 md:px-10 py-4 md:py-7 bg-brand-med-dark rounded-tl-lg rounded-tr-lg">
                    <div className="sm:flex items-center justify-between">
                        <p className="text-3xl font-bold leading-normal tracking-tight text-gray-100">Sessions</p>
                    </div>
                </div>
                <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
                    <table className="w-full whitespace-nowrap">
                        <thead>
                            <tr className="h-16 w-full text-sm leading-none text-gray-800 font-semibold">
                                <th className="font-normal text-left pl-4">&nbsp;</th>
                                <th className="font-lg text-left pl-12">Purpose</th>
                                <th className="font-lg text-left pl-12">Rating</th>                                
                                <th className="font-lg text-left pl-20">Paid</th>
                                <th className="font-lg text-left pl-20">Date</th>
                                <th className="font-lg text-left pl-16">Attendees</th>
                            </tr>
                        </thead>
                        <tbody className="w-full">
                        {meetings.map( (item, index) => {
                            return (                   
                            <tr className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100">
                                <td className="pl-4 cursor-pointer">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10">
                                            <img className="w-full h-full rounded-full border-4" src={(item.purpose === 'Group meeting') ? "icon-group.png" : "icon-one-on-one.png"} />
                                        </div>
                                        <div className="pl-4">
                                            <p className="font-medium uppercase">{item.name}</p>
                                            <p className="text-xs leading-3 text-gray-600 pt-2">Session id# {item.id}</p>
                                        </div>
                                    </div>
                                </td>                                
                                <td className="pl-12">
                                    <p className="font-medium">{item.purpose}</p>
                                    <p className="text-xs leading-3 text-gray-600 mt-2">{item.secondaryPurpose}</p>
                                </td>
                                <td className="pl-12">
                                    <p className="text-sm font-medium leading-none text-gray-800">{item.rating}</p>
                                    <div className="w-24 h-3 bg-gray-100 rounded-full mt-2">
                                        <div className="w-20 h-3 bg-green-progress rounded-full" />
                                    </div>
                                </td>
                                <td className="pl-20">
                                    <p className="font-medium">{item.paid}</p>
                                    <p className="text-xs leading-3 text-gray-600 mt-2">{item.denomination}</p>
                                </td>
                                <td className="pl-20">
                                    <p className="font-medium">{item.date}</p>
                                    <p className="text-xs leading-3 text-gray-600 mt-2">{item.duration}</p>
                                </td>
                                <td className="pl-20">
                                    <p className="font-medium">{item.attendees}</p>
                                </td>
                                <td className="px-7 2xl:px-0">
                                    {
                                        show==index ? <button onClick={()=>setShow(null)} className="focus:outline-none pl-7">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
                                            <path d="M4.16667 10.8334C4.62691 10.8334 5 10.4603 5 10.0001C5 9.53984 4.62691 9.16675 4.16667 9.16675C3.70643 9.16675 3.33334 9.53984 3.33334 10.0001C3.33334 10.4603 3.70643 10.8334 4.16667 10.8334Z" stroke="#A1A1AA" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M10 10.8334C10.4602 10.8334 10.8333 10.4603 10.8333 10.0001C10.8333 9.53984 10.4602 9.16675 10 9.16675C9.53976 9.16675 9.16666 9.53984 9.16666 10.0001C9.16666 10.4603 9.53976 10.8334 10 10.8334Z" stroke="#A1A1AA" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M15.8333 10.8334C16.2936 10.8334 16.6667 10.4603 16.6667 10.0001C16.6667 9.53984 16.2936 9.16675 15.8333 9.16675C15.3731 9.16675 15 9.53984 15 10.0001C15 10.4603 15.3731 10.8334 15.8333 10.8334Z" stroke="#A1A1AA" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>:<button onClick={()=>setShow(index)} className="focus:outline-none pl-7">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
                                            <path d="M4.16667 10.8334C4.62691 10.8334 5 10.4603 5 10.0001C5 9.53984 4.62691 9.16675 4.16667 9.16675C3.70643 9.16675 3.33334 9.53984 3.33334 10.0001C3.33334 10.4603 3.70643 10.8334 4.16667 10.8334Z" stroke="#A1A1AA" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M10 10.8334C10.4602 10.8334 10.8333 10.4603 10.8333 10.0001C10.8333 9.53984 10.4602 9.16675 10 9.16675C9.53976 9.16675 9.16666 9.53984 9.16666 10.0001C9.16666 10.4603 9.53976 10.8334 10 10.8334Z" stroke="#A1A1AA" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M15.8333 10.8334C16.2936 10.8334 16.6667 10.4603 16.6667 10.0001C16.6667 9.53984 16.2936 9.16675 15.8333 9.16675C15.3731 9.16675 15 9.53984 15 10.0001C15 10.4603 15.3731 10.8334 15.8333 10.8334Z" stroke="#A1A1AA" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                    }
                                   {show==index &&  <div className="dropdown-content bg-white shadow w-24 absolute z-30 right-10 mr-6 ">
                                        <div className="text-xs w-full hover:bg-brand-light py-4 px-4 cursor-pointer">
                                            <a href={"session-analysis/" + item.id}>Analysis</a>
                                        </div>
                                        <div className="text-xs w-full hover:bg-brand-light py-4 px-4 cursor-pointer">
                                            <p onClick={postTranscriptForProcessing}>Feedback</p>
                                        </div>
                                    </div>}
                                </td>
                            </tr> )         
                            } ) }                           
                        </tbody>
                    </table>
                </div> 

            </div> 
        </>
    );
}

export async function getServerSideProps() {
    let meetingData = [{'key':'value'}];
    // console.log("fetching meeting data")
    // try {
    //     const response = await axios.get(DATA_URL);
    //     meetingData = response.data;
    // }
    // catch(err) {console.log("Error fetching data", err);}
    // console.log("Meeting data", meetingData);
    return { props: { meetingData } };
  }
