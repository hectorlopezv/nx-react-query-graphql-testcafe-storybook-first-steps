import { ExecutorContext } from '@nrwl/devkit';
import { exec } from 'child_process';
import { promisify } from 'util';

export interface EchoExecutorOptions {
  message: string;
  browser: 'chrome' | 'firefox' | 'ie';
}

export default async function echoExecutor(
  options: EchoExecutorOptions,
  context: ExecutorContext
) {
  console.info(`Runninh "testingcafe"...`);
  console.info(`Options: ${JSON.stringify(options, null, 2)}`);
  console.log(
    'testcafetesting',
    context.workspace.projects.testcafetesting.sourceRoot
  );
  //const testPath =  testcafe chrome ${}

  console.info(context);
  const { stdout, stderr } = await promisify(exec)(
    `echo ${options.message}
    echo hector
    testcafe  ${options.browser} ./${context.workspace.projects.testcafetesting.sourceRoot}/index.js
   
    
    `
  );
  console.log(stdout);
  console.error(stderr);

  const success = !stderr;
  return { success };
}
