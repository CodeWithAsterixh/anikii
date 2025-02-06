import * as next from "next"


const dev = process.env.NODE_ENV !== 'production';
const app = next.default({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  
});
