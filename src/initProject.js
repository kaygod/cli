const exec = require('child_process').exec;
const { startLoading, endLoading } = require('./loading');

/**
 * 安装依赖并启动项目
 */
exports.init = async (path) => {
  //startLoading();
  await installLib(path);
  console.log('项目依赖安装完毕...');
  await startProject(path);
  console.log('项目启动成功...');
  //endLoading();
};

const installLib = (path) => {
  return new Promise((resolve, reject) => {
    const workerProcess = exec(
      'npm i',
      {
        cwd: path,
      },
      (err) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(null);
        }
      }
    );

    workerProcess.stdout.on('data', function (data) {
      console.log(data);
    });

    workerProcess.stderr.on('data', function (data) {
      console.log(data);
    });
  });
};

const startProject = (path) => {
  return new Promise((resolve, reject) => {
    const workerProcess = exec(
      'npm run serve',
      {
        cwd: path,
      },
      (err) => {
        console.log('xxxxxxxxxxxxx');
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(null);
        }
      }
    );

    workerProcess.stdout.on('data', function (data) {
      console.log(data);
    });

    workerProcess.stderr.on('data', function (data) {
      console.log(data);
    });
  });
};

/**
 * 打开浏览器
 */
const openBroswer = (url) => {
  return new Promise((resolve, reject) => {
    exec(`start ${url}`, (err) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(null);
      }
    });
  });
};
