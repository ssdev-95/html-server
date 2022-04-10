import express, { Router, Request, Response } from "express"
import { engine } from "express-handlebars"
import path from "path"

const PORT = process.env.PORT ?? 9999
const viewsDir = path.join(process.cwd(), "src/views")
const server = express()

server.engine(
	'handlebars',
	engine({
		extname: '.hbs',
		defaultLayout: "main"
	})
)
server.set("view engine", "handlebars")
server.set("views", viewsDir)

const router = Router()

router.get(
	"/:file",
	(req:Request, res:Response) => {
		const { file } = req?.params
		//const html = require(path.join(process.cwd(), `_temp/${file}`))
		//res.render(html)
		res.render(file.replace(".html", ""))
	}
)

server.use(router)

server.listen(
	PORT,
	() => console.log(`Server is running at ${PORT}`)
)
