const process = require('process');
const core = require('@actions/core');
const exec = require('@actions/exec');

const PROBLEM_MATCHERS = {
  "dotnet": {
    "regexp": "^([^\\s].*)\\((\\d+)(?:,\\d+|,\\d+,\\d+)?\\):\\s+(error|warning)\\s+([a-zA-Z]+(?<!MSB)\\d+):\\s*(.*?)\\s+\\[(.*?)\\]$",
    "file": 1
  },
  "python": {
    "regexp": "^\\s*File\\s\\\"(.*)\\\",\\sline\\s(\\d+),\\sin\\s(.*)$",
    "file": 1
  },
  "node": {
    "regexp": "^(?:\\s+\\d+\\>)?([^\\s].*)\\((\\d+|\\d+,\\d+|\\d+,\\d+,\\d+,\\d+)\\)\\s*:\\s+(error|warning|info)\\s+(\\w{1,2}\\d+)\\s*:\\s*(.*)$",
    "file": 1
  }
};

// most @actions toolkit packages have async methods
async function run() {
  try {
    const shell = core.getInput('shell');
    const type = core.getInput('type');
    const files = core.getInput('files');

    // get changed files
    var changedFiles = [];
    if (files) {
      changedFiles = JSON.parse(files);
    }

    // get problem matcher
    var matcher = PROBLEM_MATCHERS[type];
    if (matcher === undefined) {
      throw new Error(`not supported problem matcher type: ${type}`);
    }

    // make a filter
    var re = new RegExp(matcher["regexp"]);
    const filter = (line) => {
      var match = re.exec(line);
      if (match) {
        if (changedFiles.length > 0) {
          if (changedFiles.includes(match[matcher["file"]])) {
            console.log(line);
          }
        }
      } else {
        console.log(line);
      }
    };

    // execute shell
    const cmdarr = shell.split(/\s+/);
    await exec.exec(cmdarr[0], cmdarr.slice(1), { silent: true, listeners: {
      stdline: filter,
      errline: filter
    }});

  } catch (error) {
    core.setFailed(error.message);
  }
}

run()