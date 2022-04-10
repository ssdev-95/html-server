import express, { Request, Response } from "express"
import { engine } from "express-handlebars"
import path from "path"

const PORT = process.env.PORT ?? 9999
const viewsDir = path.join(process.cwd(), "src/views")
const server = express()

server.engine(".hbs", engine({
	extname: '.hbs',
	defaultLayout: false
}))

server.set("view engine", ".hbs")
server.set("views", viewsDir)
server.use(express.static(viewsDir))

server.get(
	"/:file",
	(req:Request, res:Response) => {
		const { file } = req?.params
		res.render(file.replace(".html", ""))
	}
)

server.listen(
	PORT,
	() => console.log(`Server is running at ${PORT}`)
)

