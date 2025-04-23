import type { NextApiRequest , NextApiResponse } from "next";


type Data = {
    name : string
}


export default function Handler(requets : NextApiRequest , response : NextApiResponse <Data> ) {
    if(requets.method === 'POST'){
        response.status(200).json({name : "bachir EL son"})
    }
}