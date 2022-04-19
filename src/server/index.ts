import "dotenv/config"
import express, { Request, Response } from "express"
import path from "path"

import livereload from "livereload"
import connectLivereload from "connect-livereload"

const PORT = process.env.PORT ?? 9999
const DIR = path.join(process.cwd(), "_temp")

const app = express()

const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

app.use(connectLivereload())
app.use(express.static(DIR))

app.get(
	"/:file",
	(req:Request, res:Response) => {
		const { file: src } = req?.params
		console.log(req.url)
		const file = `${DIR}/${src}`
		res.render(file)
	}
)

app.listen(
	PORT,
	() => console.log(`Server is running at port ${PORT}`)
)

export { liveReloadServer }
