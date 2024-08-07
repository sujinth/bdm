// Function to extract and execute HTML and scripts
export const handleHTMLContent = (htmlString, containerId) => {
    // Create a container to hold the HTML string
    const container = document.createElement('div');
    container.innerHTML = htmlString;

    // Extract scripts and non-script nodes
    const scripts = Array.from(container.querySelectorAll('script'));// This will be an empty array if no script tags are present
    const nonScriptNodes = Array.from(container.childNodes).filter(node => node.tagName !== 'SCRIPT');
  
    const root = document.getElementById(containerId);
  
    if (root) {
      // Clear existing content in the root element
      root.innerHTML = '';
      // Append non-script nodes to the root element
      nonScriptNodes.forEach(node => {
        root.appendChild(node);
      });
      // Evaluate script content if there are any scripts
      if (scripts.length > 0) {
        scripts.forEach(script => {
          const scriptTag = document.createElement('script');
          if (script.src) {
            scriptTag.src = script.src;
          } else {
            scriptTag.textContent = script.textContent;
          }
          document.head.appendChild(scriptTag);
        });
      }
    } else {
      console.error(`Container with id "${containerId}" not found.`);
    }
  };