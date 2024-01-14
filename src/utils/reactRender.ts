import ReactDom from 'react-dom';
import {Response} from 'express';

export const render = (res:Response,element:JSX.Element) => {
    const html = `
        <!DOCTYPE html>
        <html>
            <head>
                <title>React SSR</title>
            </head>
            <body>
                <div id="root">${element}</div>
            </body>
        </html>
    `;
    res.send(html);
};

