# ProjectGPT Scriptable Integration

This document explains how to use the ProjectGPT.js script with both the Scriptable app and iOS Shortcuts.

## Installation

### Step 1: Install Scriptable App
1. Download and install [Scriptable](https://apps.apple.com/us/app/scriptable/id1405459188) from the App Store
2. Open Scriptable

### Step 2: Add ProjectGPT Script
1. In Scriptable, tap the "+" button to create a new script
2. Copy the entire contents of `ProjectGPT.js` from this repository
3. Paste into the new script
4. Tap the title at the top and rename it to "ProjectGPT"
5. Tap "Done" to save

## Usage

### Option 1: Running Directly in Scriptable App

1. Open the Scriptable app
2. Tap on the "ProjectGPT" script
3. The script will prompt you to enter your query
4. Type your query and tap "Submit"
5. View the response in the alert dialog

**Example:**
- Open Scriptable
- Tap "ProjectGPT"
- Enter: "Create a marketing strategy for a SaaS product"
- Tap "Submit"
- See the formatted response

### Option 2: Running from iOS Shortcuts

1. Open the **Shortcuts** app
2. Create a new shortcut (tap "+" button)
3. Add the "**Ask for Input**" action (optional, if you want to prompt for text)
   - Set the prompt to: "What would you like ProjectGPT to do?"
4. Add the "**Run Script**" action (search for "Scriptable" in actions)
   - Choose script: **ProjectGPT**
   - Under "Input": Select "Shortcut Input" or the output from "Ask for Input"
5. Add "**Show Result**" action to display the output
6. Tap "Done" and name your shortcut (e.g., "Run ProjectGPT")

**To use the shortcut:**
- Open Shortcuts app
- Tap your "Run ProjectGPT" shortcut
- Enter your query when prompted
- See the result

**To add to Siri:**
- In Shortcuts, tap the "⋯" button on your shortcut
- Tap the shortcut name at the top
- Add "Add to Siri"
- Record a phrase like "Ask ProjectGPT"

### Option 3: Running from Share Sheet

You can also run ProjectGPT from the iOS Share Sheet:

1. In the Shortcuts app, edit your ProjectGPT shortcut
2. Tap the "⋯" button
3. Enable "Show in Share Sheet"
4. Choose which types of content can trigger it (Text, URLs, etc.)

Now you can:
- Select text in Safari or any app
- Tap "Share"
- Choose your "Run ProjectGPT" shortcut
- The selected text will be passed as the query

## Troubleshooting

### Issue: Script runs but doesn't prompt in Scriptable app
**Solution:** Make sure you're running the latest version of the script. The script should show an alert asking for your query when run directly in Scriptable.

### Issue: Shortcuts fails silently
**Possible causes:**
1. No input parameter passed to the script
   - **Fix:** Make sure you're passing text to the "Run Script" action
2. Script timeout
   - **Fix:** Ensure the script completes quickly or increase timeout in Scriptable settings
3. Missing permissions
   - **Fix:** Check that Scriptable has necessary permissions in iOS Settings

**To debug:**
1. Run the script directly in Scriptable first to ensure it works
2. In Shortcuts, use "Show Result" action after "Run Script" to see any error messages
3. Check Scriptable's error logs

### Issue: Empty or undefined parameter from Shortcuts
**Solution:** In your Shortcut:
1. Make sure the "Run Script" action has an input
2. Use "Ask for Input" action before "Run Script"
3. Pass the input from "Ask for Input" to "Run Script"

## Script Behavior

### When Running in Scriptable App:
- Detects it's NOT running from Shortcuts
- Shows an alert dialog to prompt for input
- Processes the query
- Shows result in an alert dialog
- Properly completes execution

### When Running from Shortcuts:
- Detects it's running from Shortcuts (via `args.shortcutParameter`)
- Reads the query from the Shortcuts parameter
- Processes the query
- Returns result to Shortcuts via `Script.setShortcutOutput()`
- Properly completes execution

## Integration with ProjectGPT Backend

The current script is a demonstration version. To integrate with the full ProjectGPT prompt factory backend:

1. **Set up API Endpoint:**
   - Deploy the prompt factory Python scripts as a web service
   - Or use a serverless function (AWS Lambda, Google Cloud Functions, etc.)

2. **Update the `processQuery` function:**
   ```javascript
   async function processQuery(query) {
     const apiUrl = "YOUR_API_ENDPOINT";
     const request = new Request(apiUrl);
     request.method = "POST";
     request.headers = { "Content-Type": "application/json" };
     request.body = JSON.stringify({ query: query });
     
     const response = await request.loadJSON();
     return response.result;
   }
   ```

3. **Add Authentication (if needed):**
   ```javascript
   request.headers = {
     "Content-Type": "application/json",
     "Authorization": "Bearer YOUR_API_KEY"
   };
   ```

## Advanced Usage

### Passing Complex Parameters from Shortcuts

You can pass structured data from Shortcuts:

```javascript
// In your Shortcut, create a Dictionary with multiple parameters
// Then pass it to the Run Script action

// The script will receive it as an object
if (typeof args.shortcutParameter === 'object') {
  const params = args.shortcutParameter;
  query = params.query;
  const format = params.format || 'xml';
  const mode = params.mode || 'core';
}
```

### Using with Siri Shortcuts

Create a Siri Shortcut that:
1. Asks for voice input
2. Converts to text
3. Passes to ProjectGPT script
4. Speaks the response

## Examples

### Example 1: Simple Query
**In Scriptable:** Enter "Create a product roadmap template"
**Output:** Formatted ProjectGPT response

### Example 2: From Selected Text
1. Select text in Safari: "Develop a REST API for user authentication"
2. Share → Run ProjectGPT
3. See processed result

### Example 3: Voice with Siri
1. Say: "Hey Siri, Ask ProjectGPT"
2. Speak your query
3. Siri reads the response

## Support

For issues or questions:
- Check the repository issues
- Review Scriptable documentation: https://docs.scriptable.app
- iOS Shortcuts User Guide: https://support.apple.com/guide/shortcuts/

## Version History

- **v1.0** (Current): Initial release with Scriptable app and Shortcuts support
  - Proper input detection
  - Alert-based prompting in Scriptable
  - Parameter handling from Shortcuts
  - Error handling and validation
