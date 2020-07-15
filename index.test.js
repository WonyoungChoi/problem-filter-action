const process = require('process');
const path = require('path');
const exec = require('@actions/exec');

test('test runs', async() => {
  process.env['INPUT_SHELL'] = 'dotnet build';
  process.env['INPUT_TYPE'] = 'dotnet';
  process.env['INPUT_FILES'] = '["Adder.cs"]';
  const index = path.join(__dirname, 'index.js');

  var checkAdder = false;
  var checkSubtractor = false;

  const projectDir = path.join(__dirname, './test_project');

  await exec.exec('dotnet', ['clean'], {cwd: projectDir, silent: true});
  await exec.exec('node', [index], {cwd: projectDir, silent: true, env: process.env, listeners: {
    stdline: (line) => {
      checkAdder |= line.includes('Adder.cs');
      checkSubtractor |= line.includes('Subtractor.cs');
    }
  }});
  expect(checkAdder).toBeTruthy();
  expect(checkSubtractor).toBeFalsy();
});

