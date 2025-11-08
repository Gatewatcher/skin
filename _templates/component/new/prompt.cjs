// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples

const path = require('path');
const config = require('./config.cjs');
const { pascalCase } = require('@gatewatcher/bistoury/utils-lang');

module.exports = {
  prompt: async ({ prompter }) => {
    const rootDirectory = config.rootDirectory;

    const componentName = await promptComponentName(prompter);
    const componentPath = await promptComponentPath(prompter);
    const storyPrefix = await promptStoryPrefix(prompter, componentPath);

    return {
      componentName,
      rootDirectory,
      storyPrefix: storyPrefix ? `${storyPrefix}/` : '',
      componentPath: `${rootDirectory}/${path.normalize(componentPath)}/`,
    };
  },
};

async function promptComponentName(prompter) {
  const { componentName } = await prompter.prompt({
    type: 'input',
    name: 'componentName',
    message: 'Component name',
    required: true,
  });

  return pascalCase(componentName);
}

async function promptComponentPath(prompter) {
  const { componentPath } = await prompter.prompt({
    type: 'input',
    name: 'componentPath',
    message: 'Path',
    hint: `From ${config.rootDirectory}`,
  });
  return componentPath;
}

async function promptStoryPrefix(prompter, path) {
  const { storyPrefix } = await prompter.prompt({
    type: 'input',
    name: 'storyPrefix',
    message: 'Story category',
    default: path,
  });
  return storyPrefix;
}
