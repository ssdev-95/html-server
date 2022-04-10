//TODO: move.copy files function here
//TODO: And make then in such way that copy files recursively
import fs from "node:fs"

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
  dir,
	destination:string
) { 
  const src = `${dir}/${filename}`
	const dest = `${destination}/${filename}`

	if(fs.lstatSync(src).isDirectory()) {
		if(!fs.existsSync(dest)){
			fs.mkdirSync(dest)
			copyFolder(src, dest)
		} else {
		  copyFolder(src, dest)
		}
  } else {
		fs.copyFile(src, dest, err => {
			if (err) {
				console.log(err)
			}
		})
	}
}
