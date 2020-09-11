const dl = require('download-git-repo');

const address = (branch = null) => {
  if (branch === null) {
    return `kaygod/vue3-demo`;
  } else {
    //使用了分支名称
    return `github:kaygod/vue3-demo#${branch}`;
  }
};

/**
 * 这里将远程要拉取的项目和本地存放的名称写死了,实际开发中要配置
 * @param {*} branch
 */
exports.download = (branch = null) => {
  return new Promise((resolve) => {
    const path = './vue3-demo';
    dl(address(branch), path, { clone: true }, (err) => {
      console.log(err);
      resolve(path);
    });
  });
};
