import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

const getProcessingTime = (time: [number, number]): string => {
return `${time[0] * 1000 + Math.round(time[1] / 1000000)}ms`;
}

export default function logger(req: Request, res: Response, next: NextFunction) {
const id = uuidv4();
const now = new Date();
const timestamp = [now.getFullYear(),'-',now.getMonth() + 1,'-',now.getDate(),' ',now.getHours(),':',now.getMinutes(),':',now.getSeconds()].join('');

// get api endpoint
const { method, url } = req;

// log start of the execution process
const start = process.hrtime();
const startText = 'START:${getProcessingTimeInMS(start)}';
const idText = `[${id}]`;
const timeStampText = `[${timestamp}]`;

console.log(`${idText} ${timeStampText} ${method}:${url} ${startText}`);

res.once('finish', () => {
    // log end of the execution process
    const end = process.hrtime(start);
    const endText = 'END:${getProcessingTimeInMS(end)}';
    console.log(`${idText} ${timeStampText} ${method}:${url} ${res.statusCode} ${endText}`);
});

next();

};