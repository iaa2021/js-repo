import vm from 'vm';

function renderTemplate(template, data) {
  // Create template function - replace {{ let }} with values
  const templateScript = `
    function template(data) {
      let output = \`${template.replace(/\{\{\s*(\w+)\s*\}\}/g, '${data.$1}')}\`;
      return output;
    }
    template(data);
  `;
  
  // Create a context with the data
  const context = { data };
  vm.createContext(context);
  
  // Execute the template function
  return vm.runInContext(templateScript, context);
}

// Example usage
const template = `
<!DOCTYPE html>
<html>
<head>
  <title>{{ title }}</title>
</head>
<body>
  <h1>{{ title }}</h1>
  <p>Welcome, {{ name }}!</p>
  <p>Today is {{ date }}</p>
</body>
</html>
`;

const data = {
  title: 'My Template Page',
  name: 'User',
  date: new Date().toLocaleDateString()
};

const rendered = renderTemplate(template, data);
console.log(rendered);