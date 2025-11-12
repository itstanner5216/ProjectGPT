# iOS Automation for ProjectGPT

This directory contains scripts for running ProjectGPT Prompt Factory from iOS devices using Scriptable app and Shortcuts.

## Overview

The iOS automation allows you to:
- Generate prompts directly from your iPhone or iPad
- Use Scriptable app for interactive prompt generation
- Integrate with iOS Shortcuts for workflow automation
- Get instant access to prompt factory features on-the-go

## Prerequisites

### Required Apps
1. **Scriptable** (Free) - Download from App Store
2. **Shortcuts** (Built-in iOS app)

### Setup

#### Option 1: Scriptable App Setup
1. Install Scriptable from the App Store
2. Open Scriptable app
3. Tap the "+" button to create a new script
4. Name it "ProjectGPT Prompt Factory"
5. Copy the contents of `PromptFactory.js` into the script
6. Save the script

#### Option 2: Shortcuts Setup
1. Open the Shortcuts app
2. Create a new shortcut
3. Add "Run Script" action
4. Select "Run Scriptable Script"
5. Choose the "ProjectGPT Prompt Factory" script
6. Add "Ask for Input" action before the script
   - Prompt: "What type of prompt do you want?"
   - Input Type: Text
7. Pass the input to the script as parameter
8. Add "Show Result" action after the script

## Usage

### Using Scriptable App

1. Open Scriptable app
2. Tap on "ProjectGPT Prompt Factory" script
3. The app will prompt you: "What type of prompt do you want to generate?"
4. Enter your request (e.g., "Senior Full-Stack Engineer" or "Product Manager")
5. Tap "Generate"
6. View the generated prompt
7. Optionally copy to clipboard

### Using Shortcuts

1. Open Shortcuts app
2. Run your "ProjectGPT" shortcut
3. Enter your prompt type when asked
4. The generated prompt will be displayed
5. You can share or copy the result

### Common Prompt Types

You can request prompts for:
- **Technical Roles**: Full-Stack Engineer, ML Engineer, DevOps Engineer, Mobile Engineer
- **Business Roles**: Product Manager, Marketing Strategist, Business Analyst
- **Creative Roles**: Content Strategist, UX Designer, Technical Writer
- **Custom**: Any role or task you specify

## Troubleshooting

### Issue: Script runs but doesn't prompt user (Scriptable)

**Solution**: The script now properly detects if it's running in Scriptable app and will show an Alert dialog for input.

**What was fixed**:
- Added proper environment detection (`typeof config !== 'undefined'`)
- Ensured Alert.presentAlert() is called when in Scriptable
- Added console logging for debugging

### Issue: Shortcuts prompts but fails silently

**Solution**: The script now properly handles Shortcuts integration and returns output.

**What was fixed**:
- Added `args.shortcutParameter` detection for Shortcuts
- Properly returns output using `Script.setShortcutOutput()`
- Added error handling that sends errors back to Shortcuts
- Added console logging to track execution

### Issue: No output or error messages

**Solution**: Check console logs in Scriptable:
1. Run the script in Scriptable
2. Tap the log icon (bottom right)
3. View console output for debugging information

### Issue: "Unknown runtime environment" error

**Cause**: Script couldn't detect if it's running in Scriptable or Shortcuts

**Solution**: 
- Make sure you're using the latest version of the script
- Verify Scriptable app is up to date
- Try creating a fresh script

## Limitations

### Current Implementation
This is a **demo/client-side implementation** that:
- Provides basic prompt templates
- Works offline
- Returns formatted prompt structures
- Demonstrates the workflow

### Full Implementation (Future)
For production use with the full Python backend:
- Set up a server running the Python scripts
- Create an API endpoint
- Modify the `generatePrompt()` function to call your API
- Handle authentication if needed

### Backend Integration Options

1. **Python Server** (Recommended)
   - Deploy Python scripts to a server
   - Create REST API endpoints
   - Call from Scriptable using HTTP requests

2. **Pythonista App** (iOS Only)
   - Install Pythonista app
   - Copy Python scripts to Pythonista
   - Call Python scripts from Scriptable

3. **Cloud Functions**
   - Deploy to AWS Lambda, Google Cloud Functions, or Azure Functions
   - Call serverless endpoints from Scriptable

## Examples

### Example 1: Quick Preset
```
User Input: "Senior Full-Stack Engineer"
Output: Complete prompt template for Full-Stack Engineer role
```

### Example 2: Custom Role
```
User Input: "Healthcare Data Analyst"
Output: Custom prompt guidelines for healthcare analytics
```

### Example 3: Shortcuts Workflow
```
1. Shortcuts asks: "What prompt?"
2. User types: "DevOps Engineer"
3. Script generates prompt
4. Shortcuts saves to Notes app
```

## Architecture

```
┌─────────────┐         ┌──────────────┐
│  Scriptable │         │   Shortcuts  │
│     App     │         │     App      │
└──────┬──────┘         └──────┬───────┘
       │                       │
       │   PromptFactory.js    │
       └───────┬───────────────┘
               │
               ├─ Detects Environment
               ├─ Prompts User (if needed)
               ├─ Generates Prompt
               └─ Returns/Displays Result
```

## Contributing

To improve iOS automation:
1. Test on different iOS versions
2. Add more preset mappings
3. Implement backend API integration
4. Add more error handling
5. Create additional shortcuts workflows

## Support

For issues:
1. Check the Troubleshooting section above
2. Review console logs in Scriptable
3. Verify you're using the latest script version
4. Open an issue in the GitHub repository

## License

Part of ProjectGPT. See main repository license.
