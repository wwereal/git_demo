const { exec } = require('child_process');

// 获取上一次commit的message
exec('git log -1 --pretty=%B', (error, stdout, stderr) => {
  if (error) {
    console.error(`执行git命令时出错: ${error}`);
    return;
  }

  const originalMessage = stdout.trim();
  const modifiedMessage = 'Your modified message'; // 修改成你想要的新message

  // 提交修改后的message
  exec(
    `git commit --amend -m "${modifiedMessage}"`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`提交修改后的message时出错: ${error}`);
        return;
      }
      // 推送修改后的 commit 到远程分支
      exec('git push --force', (error, stdout, stderr) => {
        if (error) {
          console.error(`推送修改后的commit时出错: ${error}`);
          return;
        }
        console.log('修改成功并推送到远程分支');
      });
    }
  );
});
