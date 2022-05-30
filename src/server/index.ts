import "dotenv/config";
import express, { Request, Response } from "express";
import path from "path";

import livereload from "livereload";
import connectLivereload from "connect-livereload";
import { customServer } from "../extensionr";

const PORT = process.env.PORT ?? 9999;
const DIR = path.join(process.cwd(), "_temp");

const app = express();

customServer.watcher?.on('change', (props) => {
  const workspace = props.split('/').slice(props.split('/').length - 1).join('/');
  customServer.setup(workspace);
  liveReloadServer.refresh("/");
});

const liveReloadServer = livereload.createServer();

app.use(connectLivereload());
app.use(express.static(DIR));

app.get(
	"/:file",
	(req:Request, res:Response) => {
		const { file: src } = req?.params;
		console.log(req.url);
		const file = `${DIR}/${src}`;
		res.render(file);
	}
);

const server = app.listen(
	PORT,
	() => console.log(`Server is running at port ${PORT}`)
);

export { liveReloadServer, server };
