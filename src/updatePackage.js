const fs = require('fs');

//更改package.json文件
exports.updatePackage = (dirpath, data) => {
  const filename = `${dirpath}/package.json`;
  if (fs.existsSync(filename)) {
    let packageJson = fs.readFileSync(filename).toString();
    packageJson = JSON.parse(packageJson);
    packageJson = { ...packageJson, options: data };
    packageJson = JSON.stringify(packageJson, null, '\t');
    fs.writeFileSync(filename, packageJson);
  }
};
