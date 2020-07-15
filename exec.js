const {spawn} = require('child_process');
const readline = require('readline');

const exec = function(command, options, filter) {
  return new Promise((resolve, reject) => {
    const cmdarr = command.split(/\s+/);
    const p = spawn(cmdarr[0], cmdarr.splice(1), options);
    const outLine = readline.createInterface({input: p.stdout});
    const errLine = readline.createInterface({input: p.stderr});

    if (typeof filter === 'function') {
      outLine.on('line', (line) => filter(line, 'stdout'));
      errLine.on('line', (line) => filter(line, 'stderr'));
    }

    p.on('close', (code) => {
      resolve(code);
    });
  });
};

module.exports = exec;
