import express, { Request, Response } from "express"
import path from "path"

const PORT = process.env.PORT ?? 9999
const DIR = path.join(process.cwd(), "src/views")

const server = express()
server.use(express.static(dir))

server.get(
	"/:file",
	(req:Request, res:Response) => {
		const { file: src } = req?.params
		const file = `${DIR}/${src}`
		res.render(file)
	}
)

server.listen(
	PORT,
	() => console.log(`Server is running at ${PORT}`)
)

