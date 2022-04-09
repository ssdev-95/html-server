//TODO: Create router to use custom routes
//TODO: Listen to routes based on html files inseide _temp folder
//TODO: Start server
import express, { Router, Request, Response } from "express"
import path from "path"

const PORT = process.env.PORT ?? 9999
const server = express()

const router = Router()

router.get(
	"/:file",
	(req:Request, res:Response) => {
		const { file } = req?.params
		const html = require(path.join(process.cwd(), `_temp/${file}`))
		//return res.end(`Requested resource: \n ${file}`)
		return res.sendFile(html)
	}
)

server.use(router)

server.listen(
	PORT,
	() => console.log(`Server is running at ${PORT}`)
)
