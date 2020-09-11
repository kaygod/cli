const program = require('commander');
const packageJson = require('../package.json');
const inquirer = require('inquirer');
const { startLoading, endLoading } = require('./loading');
const { download } = require('./download');
const { updatePackage } = require('./updatePackage');
const { init } = require('./initProject');

/**
 * 在package.json中假如bin的配置项,再使用npm link就能全局调用脚本
 */
program
  .command('create <name>')
  .description('请输入项目名称')
  .action(async (name) => {
    const result = await inquirer.prompt([
      {
        type: 'input',
        name: 'author',
        message: '请输入您的名称',
      },
      {
        type: 'input',
        name: 'email',
        message: '请输入您的邮箱',
      },
      {
        type: 'list',
        message: '您想下载哪一款模板文件',
        name: 'lang',
        choices: ['模板一', '模板二', '模板三'],
      },
    ]);

    startLoading(); //启动加载中

    const dirPath = await download(); //获取到项目下载后的文件路径

    endLoading(); //结束下载

    /**
     * 更新下载后项目的package.json
     */
    updatePackage(dirPath, result);

    console.log(dirPath);

    init(dirPath);
  });

program.version(packageJson.version);

program.parse(process.argv);
