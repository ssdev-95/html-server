import * as fs from "node:fs";
import * as path from "node:path";

class FileHandler {
	copyFolder(currentDir:string, destinationDir:string) {
		fs.readdir(currentDir, (err, files) => {
			if (err) {
				console.log(err);
				return;
			}

			files.forEach(file => copyFile(
				file, currentDir, destinationDir
			));
	  });
	}

	copyFile(
		filename:string,
		currentDir:string,
		destinationDir:string
	) {
		const src = `${currentDir}/${filename}`;
		const destination = `${destinationDir}/${filename}`;

		const destinationDirExists = fs
			.existsSync(destinationDir);
  
		if (destinationDirExists) {
			if (fs.lstatSync(src).isDirectory()) {
				copyFolder(src, destination);
			} else {
				fs.copyFile(src, destination, (err) => {
					if (err) {
						console.log(err);
						return;
					}
				});
			}
		} else {
			fs.mkdirSync(destinationDir);
			copyFile(filename, currentDir, destinationDir)
		}
	}

	destroyTempFolder() {
	  const temp = path.join(process.cwd(), "_temp");
		fs.rmSync(temp, { recursive:true, force:true });
	}
}

export { FileHandler }
