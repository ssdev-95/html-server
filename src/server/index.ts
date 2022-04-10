import express, { Request, Response } from "express"
import path from "path"

const PORT = process.env.PORT ?? 9999
const DIR = path.join(process.cwd(), "src/views")

const app = express()
app.use(express.static(DIR))

app.get(
	"/:file",
	(req:Request, res:Response) => {
		const { file: src } = req?.params
		const file = `${DIR}/${src}`
		res.render(file)
	}
)

export const server = app.listen(PORT)

