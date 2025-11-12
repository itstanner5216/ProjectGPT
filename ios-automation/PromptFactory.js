// ProjectGPT Prompt Factory for Scriptable
// This script allows you to generate prompts using the Prompt Factory skill from iOS

// Check if running in Scriptable app or from Shortcuts
const runningInScriptable = typeof config !== 'undefined';
const runningInShortcuts = args.shortcutParameter !== undefined;

async function main() {
  try {
    // Get the query/prompt type from user
    let query;
    
    if (runningInShortcuts) {
      // When called from Shortcuts, use the provided parameter
      query = args.shortcutParameter;
      console.log("Running from Shortcuts with query: " + query);
    } else if (runningInScriptable) {
      // When running in Scriptable app, prompt the user
      const alert = new Alert();
      alert.title = "ProjectGPT Prompt Factory";
      alert.message = "What type of prompt do you want to generate?";
      alert.addTextField("e.g., Senior Full-Stack Engineer", "");
      alert.addAction("Generate");
      alert.addCancelAction("Cancel");
      
      const response = await alert.presentAlert();
      
      if (response === -1) {
        console.log("User cancelled");
        return;
      }
      
      query = alert.textFieldValue(0);
      console.log("User entered query: " + query);
    } else {
      throw new Error("Unknown runtime environment");
    }
    
    if (!query || query.trim() === "") {
      throw new Error("No query provided");
    }
    
    // Show processing notification
    if (runningInScriptable) {
      const notification = new Notification();
      notification.title = "Generating Prompt";
      notification.body = "Processing your request...";
      notification.schedule();
    }
    
    // In a real implementation, this would call the Python backend
    // For now, we'll create a basic response structure
    const result = await generatePrompt(query);
    
    // Display or return the result
    if (runningInShortcuts) {
      // Return result to Shortcuts
      Script.setShortcutOutput(result);
      console.log("Result sent to Shortcuts");
    } else {
      // Display in Scriptable
      const resultAlert = new Alert();
      resultAlert.title = "Prompt Generated";
      resultAlert.message = result.substring(0, 500) + (result.length > 500 ? "..." : "");
      resultAlert.addAction("Copy to Clipboard");
      resultAlert.addCancelAction("Close");
      
      const action = await resultAlert.presentAlert();
      
      if (action === 0) {
        Pasteboard.copy(result);
        console.log("Result copied to clipboard");
        
        const successNotif = new Notification();
        successNotif.title = "Copied!";
        successNotif.body = "Prompt copied to clipboard";
        successNotif.schedule();
      }
    }
    
    console.log("Script completed successfully");
    
  } catch (error) {
    console.error("Error in main: " + error.message);
    
    if (runningInScriptable) {
      const errorAlert = new Alert();
      errorAlert.title = "Error";
      errorAlert.message = error.message;
      errorAlert.addAction("OK");
      await errorAlert.presentAlert();
    } else if (runningInShortcuts) {
      Script.setShortcutOutput("Error: " + error.message);
    }
  }
}

async function generatePrompt(query) {
  // This is a placeholder implementation
  // In production, this would make an API call to your Python backend
  // or use a-shell/Pythonista to run the Python script
  
  console.log("Generating prompt for: " + query);
  
  // Check if this is a preset
  const presets = {
    "fullstack engineer": "fullstack-engineer",
    "full-stack engineer": "fullstack-engineer",
    "senior full-stack engineer": "fullstack-engineer",
    "ml engineer": "ml-engineer",
    "devops engineer": "devops-engineer",
    "mobile engineer": "mobile-engineer",
    "product manager": "product-manager",
    "marketing strategist": "marketing-strategist"
  };
  
  const normalizedQuery = query.toLowerCase().trim();
  const presetKey = presets[normalizedQuery];
  
  if (presetKey) {
    return `# ${query} Prompt

This is a generated prompt for ${query}.

## Instructions
To use this prompt in production, you would:
1. Install Python dependencies: pip install -r requirements.txt
2. Run: python skills/prompt-factory/scripts/generate_prompt.py --preset ${presetKey} --format all --mode core --output prompt.md

## Quick Start
Copy this entire section and paste it into ChatGPT, Claude, or Gemini to activate your ${query} assistant.

## Note
This is a demo output. To generate the full prompt, please run the Python script from your server or use the full ProjectGPT system.

Query processed: ${query}
Generated at: ${new Date().toISOString()}
`;
  } else {
    return `# Custom Prompt Request: ${query}

To generate a custom prompt for "${query}", please:

1. Define your requirements
2. Specify the domain (technical/business/creative)
3. Indicate desired tone and style
4. Run the full Prompt Factory with these parameters

This demo provides basic output. For full functionality, use the Python backend.

Query processed: ${query}
Generated at: ${new Date().toISOString()}
`;
  }
}

// Run the main function
main().then(() => {
  console.log("Main function completed");
}).catch((error) => {
  console.error("Uncaught error: " + error.message);
  console.error(error.stack);
});
