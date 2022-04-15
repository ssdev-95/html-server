import fs from "node:fs"
import path from "node:path"

export function copyFolder(folder:string, dest:string) {
	fs.readdir(folder, (err, files) => {
		if (err) {
			console.log(err)
			return;
		}


		files.forEach(file => copyFile(
			file, folder, dest
		))
	})
}

export function copyFile(
	filename:string,
  dir: string,
	destination:string
) { 
  const src = `${dir}/${filename}`
	const dest = `${destination}/${filename}`

	const destExists = fs.existsSync(destination)

	if (destExists) {
		if(fs.lstatSync(src).isDirectory()) {
			copyFolder(src, dest)
		} else {
			fs.copyFile(src, dest, err => {
				if (err) {
					console.log(err)
				}
			})
		}
	} else {
		fs.mkdirSync(destination)
		copyFile(filename, dir, destination)
	}
}

export function destroyTempFolder() {
	const temp = path.join(process.cwd(), "_temp")
	fs.rmSync(temp, { recursive: true, force: true })
}
