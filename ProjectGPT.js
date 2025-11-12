// ProjectGPT - Scriptable Integration Script
// This script can be run both from the Scriptable app and iOS Shortcuts
// 
// Usage:
// 1. In Scriptable app: Run directly, will prompt for input
// 2. In Shortcuts: Use "Run Script" action and pass query as parameter

// Check if running from Shortcuts or Scriptable app
const isRunningInShortcuts = args.shortcutParameter !== undefined;

let query;

if (isRunningInShortcuts) {
  // Running from Shortcuts - get parameter from Shortcuts
  query = args.shortcutParameter;
  
  if (typeof query !== 'string') {
    // Handle cases where parameter might be an object or other type
    query = String(query);
  }
  
  if (!query || query.trim() === '') {
    // If empty parameter from Shortcuts, show error
    Script.setShortcutOutput("Error: No query provided from Shortcuts");
    Script.complete();
    throw new Error("Empty query parameter from Shortcuts");
  }
} else {
  // Running in Scriptable app - prompt user for input
  const alert = new Alert();
  alert.title = "ProjectGPT Query";
  alert.message = "Enter your query for ProjectGPT:";
  alert.addTextField("Your query", "");
  alert.addAction("Submit");
  alert.addCancelAction("Cancel");
  
  const alertResponse = await alert.presentAlert();
  
  if (alertResponse === -1) {
    // User cancelled
    console.log("User cancelled the query");
    Script.complete();
    return;
  }
  
  query = alert.textFieldValue(0);
  
  if (!query || query.trim() === '') {
    // Show error if no query entered
    const errorAlert = new Alert();
    errorAlert.title = "Error";
    errorAlert.message = "Please enter a query";
    errorAlert.addAction("OK");
    await errorAlert.presentAlert();
    Script.complete();
    return;
  }
}

// Process the query
try {
  console.log(`Processing query: ${query}`);
  
  // Here you would integrate with the ProjectGPT backend
  // For now, we'll create a formatted response
  const response = await processQuery(query);
  
  if (isRunningInShortcuts) {
    // Return result to Shortcuts
    Script.setShortcutOutput(response);
  } else {
    // Display result in Scriptable app
    const resultAlert = new Alert();
    resultAlert.title = "ProjectGPT Response";
    resultAlert.message = response;
    resultAlert.addAction("OK");
    await resultAlert.presentAlert();
  }
  
  console.log("Query processed successfully");
  Script.complete();
  
} catch (error) {
  console.error("Error processing query:", error);
  
  const errorMessage = `Error: ${error.message}`;
  
  if (isRunningInShortcuts) {
    Script.setShortcutOutput(errorMessage);
  } else {
    const errorAlert = new Alert();
    errorAlert.title = "Error";
    errorAlert.message = errorMessage;
    errorAlert.addAction("OK");
    await errorAlert.presentAlert();
  }
  
  Script.complete();
}

// Function to process the query
async function processQuery(query) {
  // This is a placeholder implementation
  // In a real implementation, you would:
  // 1. Call the ProjectGPT API/backend
  // 2. Process the prompt using the prompt factory
  // 3. Return the generated response
  
  // For demonstration, we'll return a formatted response
  const timestamp = new Date().toLocaleString();
  
  return `ProjectGPT Response
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Query: ${query}
Time: ${timestamp}

Processing your query...

To integrate with the full ProjectGPT backend:
1. Set up API endpoint for the prompt factory
2. Configure authentication
3. Update this script with the API URL

Status: Demo Mode
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;
}
