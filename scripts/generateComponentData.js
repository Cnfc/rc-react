let fs = require('fs');
let path = require('path');
let chalk = require('chalk');
let parse = require('react-docgen').parse;
let chokidar = require('chokidar');

let paths = {
  examples: path.join(__dirname, '../src', 'docs', 'examples'),
  components: path.join(__dirname, '../src', 'components'),
  output: path.join(__dirname, '../config', 'componentData.js')
}

const enableWatchMode = process.argv.slice(2) == '--watch';
if (enableWatchMode) {
  chokidar.watch([paths.examples, paths.components]).on('change', function (event, path) {
    generate(paths)
  });

} else {
  generate(paths);
}

function generate(paths) {
  var errors = [];
  var componenetData = getDirectories(paths.components).map(function (componentName) {
    try {
      return getComponentData(paths, componentName)
    } catch (error) {
      errors.push('An error' + componentName + error)
    }
  });
  writeFile(paths.output, 'module.exports = ' + JSON.stringify(errors.length ? errors : componenetData));
}


function getComponentData(paths, componentName) {
  var content = readFile(path.join(paths.components, componentName, componentName + '.js'));
  var info = parse(content);
  return {
    name: componentName,
    description: info.description,
    props: info.props,
    code: content,
    examples: getExampleData(paths.examples, componentName)
  }
}

function getExampleData(examplesPath, componentName) {
  var examples = getExampleFiles(examplesPath, componentName);
  return examples.map(function (file) {
    var filePath = path.join(examplesPath, componentName, file)
    var content = readFile(filePath)
    var info = parse(content);
    // some
    // 
    return {
      name: file.slice(0, -3),
      description: info.description,
      code: content
    };
  });
}

function getExampleFiles(examplesPath, componentName) {
  var exampleFiles = [];
  try {
    exampleFiles = getFiles(path.join(examplesPath, componentName));
  } catch (err) {
    console.log(chalk.red(`No examples fond from ${componentName}.`));
  }
  return exampleFiles;
}

function getDirectories(filepath) {
  return fs.readdirSync(filepath).filter(function (file) {
    return fs.statSync(path.join(filepath, file)).isDirectory();
  });
}

function getFiles(filepath) {
  return fs.readdirSync(filepath).filter(function (file) {
    return fs.statSync(path.join(filepath, file)).isFile();
  });
}

function writeFile(filepath, content) {
  fs.writeFile(filepath, content, function (err) {
    err ? console.log(chalk.err(err)) : console.log(chalk.green('Component data saves'));
  });
}

function readFile(filePath) {
  return fs.readFileSync(filePath, 'utf-8')
}

