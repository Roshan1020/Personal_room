// eslint-disable-next-line camelcase
import axios from 'axios'
import { GetObjectCommand, S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import got from 'got';

const jwt = require('jsonwebtoken')
const uuid4 = require('uuid4')

const getManagementKey = () => {
    const app_access_key = '62f6449dc16640065697182c'
    const app_secret = 'ojJPdgjgjI4DMT4btFGjGazgighCn4rBhiNh9XvpKgpW8ZP4aa7XGEtOF35OTzounnQDqekMiyXAfBXh1BfgQg1zGZR6HvKd4OdrnqP1u4Q2VVew6UbmaER9I9G1cssLb5mhNjeap8420nWP5TghtdjyD4t4wQ3EO8Z5JUGdQno='
    const payload = {
        // eslint-disable-next-line camelcase
        access_key: app_access_key,
        type: 'management',
        version: 2,
        iat: Math.floor(Date.now() / 1000),
        nbf: Math.floor(Date.now() / 1000),
    }

    return Promise((resolve, reject) => {
        jwt.sign(
            payload,
            app_secret,
            {
                algorithm: 'HS256',
                expiresIn: '24h',
                jwtid: uuid4(),
            },
            function(_err, token) {
                resolve(token)
            },
        )
    })
}

// Assembly url
// let transcriptId, status

// const assembly = axios.create({
//     baseURL: 'https://api.assemblyai.com/v2',
//     headers: {
//         authorization: '57c79d44298443588fe6f4e29249633c',
//         'content-type': 'application/json',
//     },
// })
// 
// function getTranscriptResult() {
//     assembly
//         .get(`/transcript/${transcriptId}`)
//         .then((res) => {
//             console.log(res.data)
//             status = res.data.status
//         })
//         .catch((err) => console.error(err));
//     if (status !== 'completed' && status !== 'error') {
//         setTimeout(getTranscriptResult, 5000);
//     }
// }

// function postTranscriptForProcessing() {
//     assembly
//         .post("/transcript", {
//             // audio_url: "https://bit.ly/3yxKEIY",
//             audio_url: "https://emergence-dapp.s3.us-east-2.amazonaws.com/Screen+Recording+2022-08-21+at+10.46.25.mov",
//             // webhook_url: "",
//             auto_highlights: true,
//             iab_categories: true,
//             sentiment_analysis: true,
//             entity_detection: true
// 
//         })
//         .then((res) => {
//             console.log(res.data)
//             transcriptId = res.data.id
//             status = res.data.status
//         })
//         .catch((err) => console.error(err));
//     if (status !== 'completed' && status !== 'error') {
//         setTimeout(getTranscriptResult, 5000);
//     }
// }


export default async function handler(req, res) {
    const {
        body: { type, data },
        method,
    } = req

    const roomId = '6301c066b1e780e78c3bd6d4' // room4
    console.log({ roomId });

    console.log({ method, type })
    if (method === 'POST') {
        if (type === 'recording.success') {
            const videoUrl = data.URL
            console.log('recording.success')
            console.log({ videoUrl, data })
            return res.status(200).send('success')
        } else if (type === 'recording.failed') {
            console.log('recording.failed')
            console.log({ data })
            return res.status(200).send('success')
        } else if (type === 'session.open.success') {
            const authKey = await getManagementKey()
            const options = {
                method: 'POST',
                url: 'https://prod-in2.100ms.live/api/v2/beam',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + authKey,
                },
                data: {
                    operation: 'start',
                    room_id: roomId,
                    meeting_url:
                        'https://video-demo-next.app.100ms.live/preview/63004db6b1e780e78c3bc4ff/stage?skip_preview=true',
                    record: true,
                    resolution: { width: 1280, height: 720 },
                },
            }

            const resp = await axios.request(options)
            console.log({ data: resp.data })
            return res.status(200).send('meeting started')
        } else if (type === 'session.close.success') {
            const authKey = await getManagementKey()
            const options = {
                method: 'POST',
                url: 'https://prod-in2.100ms.live/api/v2/beam',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + authKey,
                },
                data: {
                    operation: 'stop',
                    room_id: roomId,
                },
                timeout: 1000 * 300
            }

            const resp = await axios.request(options)
            console.log({ data: resp.data })
            return res.status(200).send('meeting stoped')
        } else if (type === 'beam.recording.success') {
            // 10 seconds runtime limit

            // if we have timeout issues
            // queue({ location: data.location })

            const data = await got('https://emergence-dapp.s3.us-east-2.amazonaws.com/a.txt');


            const s3Client = new S3Client({ region: 'us-east-2' });
            await s3Client.send(new PutObjectCommand({
                Bucket: 'emergence-dapp',
                Body: data.body,
                Key: 'b.txt'
            }))

            // const string = transcriptApi({ location: data.location })
            // store it somewhere?
            // 
        }
    }

    res.status(200).send('nothing here')
}

