const process = require('process');
const path = require('path');
const exec = require('./exec')

test('dotnet build', async() => {
  process.env['INPUT_RUN'] = 'dotnet build';
  process.env['INPUT_TYPE'] = 'dotnet';
  process.env['INPUT_FILES'] = '["Adder.cs"]';
  process.env['GITHUB_WORKSPACE'] = path.join(__dirname, './test_project');
  const index = path.join(__dirname, 'index.js');
  let checkAdder = false;
  let checkSubtractor = false;
  const projectDir = process.env['GITHUB_WORKSPACE'];
  await exec('dotnet clean', {cwd: projectDir});
  const ret = await exec(`node ${index}`, {cwd: projectDir, env: process.env}, (line) => {
    checkAdder |= line.includes('Adder.cs');
    checkSubtractor |= line.includes('Subtractor.cs');
  });
  expect(ret).toBe(0);
  expect(checkSubtractor).toBeFalsy();
  expect(checkAdder).toBeTruthy();
});

test('multiline', async() => {
  process.env['INPUT_RUN'] = `
     ls -1
     dotnet --info
     ps -ef
  `;
  process.env['GITHUB_WORKSPACE'] = path.join(__dirname, './test_project');
  const index = path.join(__dirname, 'index.js');
  const projectDir = process.env['GITHUB_WORKSPACE'];
  const ret = await exec(`node ${index}`, {cwd: projectDir, env: process.env});
  expect(ret).toBe(0);
});
