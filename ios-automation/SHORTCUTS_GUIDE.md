# Shortcuts Integration Guide

## Quick Setup (5 minutes)

### Step 1: Install Scriptable
1. Open App Store on your iPhone/iPad
2. Search for "Scriptable"
3. Install the free app
4. Open Scriptable

### Step 2: Add the Script
1. In Scriptable, tap the "+" button (top right)
2. Tap the script name at the top
3. Rename it to: `ProjectGPT Prompt Factory`
4. Delete any placeholder code
5. Copy all the code from `PromptFactory.js` and paste it in
6. Tap "Done" (top left)

### Step 3: Test in Scriptable First
1. Tap on your "ProjectGPT Prompt Factory" script to run it
2. You should see an alert asking: "What type of prompt do you want to generate?"
3. Type something like: `Full-Stack Engineer`
4. Tap "Generate"
5. You should see the generated prompt
6. Tap "Copy to Clipboard" to copy it

### Step 4: Create iOS Shortcut
1. Open the **Shortcuts** app
2. Tap the "+" button to create a new shortcut
3. Tap "Add Action"
4. Search for "Ask for Input" and add it
   - Question: `What type of prompt do you want?`
   - Input Type: `Text`
   - Default Answer: (leave empty)
5. Tap "+" to add another action
6. Search for "Run Script" and select it
7. Change it to "Scriptable"
8. Select your "ProjectGPT Prompt Factory" script
9. Toggle "Show When Run" to OFF (so it doesn't open Scriptable)
10. Pass the input:
    - Tap on the "Show more" button
    - Tap "Parameters"
    - Set Parameter: Choose "Shortcut Input"
11. Tap "+" to add another action
12. Search for "Show Result" and add it
    - Input: Choose "Output" from previous step
13. Tap the settings icon (top right)
14. Name your shortcut: `Generate Prompt`
15. Tap "Done"

## Testing Your Shortcut

1. From Shortcuts app, tap your "Generate Prompt" shortcut
2. You'll be prompted: "What type of prompt do you want?"
3. Enter: `DevOps Engineer`
4. Tap "Done"
5. The shortcut should:
   - Take your input
   - Pass it to Scriptable (running in background)
   - Get the generated prompt back
   - Display it on screen

## Troubleshooting

### Problem: Shortcut doesn't ask for input

**Solution**: Make sure the "Ask for Input" action is the FIRST action in your shortcut.

### Problem: Shortcut prompts but shows no result

**Possible causes**:
1. Script parameter not passed correctly
2. Scriptable script has an error
3. Output not being returned

**Solutions**:
- Open Scriptable and run the script manually first
- Check console logs in Scriptable (tap log icon)
- Verify the script parameter is set to "Shortcut Input"
- Make sure "Show Result" action is using the correct input

### Problem: Error "Script not found"

**Solution**: 
- Make sure the script name in Shortcuts matches exactly: `ProjectGPT Prompt Factory`
- Case and spacing matter!
- Rename the script in Scriptable if needed

### Problem: Shortcut opens Scriptable app

**Solution**: In the "Run Script" action, turn OFF the toggle for "Show When Run"

## Advanced: Adding to Home Screen

1. In Shortcuts app, long-press your shortcut
2. Tap "Details"
3. Tap "Add to Home Screen"
4. Choose an icon and color
5. Tap "Add"

Now you can run it directly from your home screen!

## Advanced: Siri Integration

1. In Shortcuts app, open your shortcut
2. Tap the settings icon (top right)
3. Tap "Add to Siri"
4. Say a phrase like: "Generate a prompt"
5. Tap "Done"

Now you can say "Hey Siri, generate a prompt" and it will run!

## What the Shortcut Does

```
User → Shortcuts → Ask for Input
                ↓
        Pass text to Scriptable
                ↓
        Scriptable runs script
                ↓
        Script generates prompt
                ↓
        Return result to Shortcuts
                ↓
        Show result to user
```

## Common Use Cases

### Use Case 1: Quick Prompt Generation
- Run shortcut
- Say "Product Manager"
- Get prompt instantly
- Copy and paste into ChatGPT

### Use Case 2: Batch Generation
- Create multiple shortcuts with preset values
- "Generate Engineering Prompt"
- "Generate Business Prompt"
- "Generate Creative Prompt"

### Use Case 3: Automation
- Trigger from other shortcuts
- Save results to Notes
- Send via email/message
- Create reminders with prompts

## Tips for Power Users

### Tip 1: Skip the Input Dialog
Modify the shortcut to hardcode a preset:
1. Remove "Ask for Input" action
2. Add "Text" action with your preset name
3. Pass that text to the script

### Tip 2: Save Results Automatically
Add after the script runs:
- "Save File" → iCloud Drive
- "Add to Note" → the Notes app  
- "Send Message" → Messages

### Tip 3: Create a Prompt Library
1. Create multiple shortcuts for different presets
2. Put them in a folder on home screen
3. Quick access to all your prompts

### Tip 4: Share Results
Add after the script runs:
- "Share" action to share via any app
- "Copy to Clipboard" for quick pasting
- "Save to Files" for organization

## Example Shortcut Configurations

### Configuration 1: Interactive (Current)
```
1. Ask for Input
2. Run Scriptable Script (with input)
3. Show Result
```

### Configuration 2: Preset Shortcuts
```
1. Text: "DevOps Engineer"
2. Run Scriptable Script (with text)
3. Show Result
```

### Configuration 3: Save to Notes
```
1. Ask for Input
2. Run Scriptable Script
3. Add to Note (Notes app)
4. Show Notification "Saved!"
```

### Configuration 4: Email Result
```
1. Ask for Input
2. Run Scriptable Script
3. Send Email (with result as body)
```

## Updating the Script

When the script is updated:
1. Open Scriptable app
2. Tap on "ProjectGPT Prompt Factory"
3. Select all text (Cmd+A or triple-tap)
4. Delete
5. Paste new script code
6. Tap "Done"

Your shortcut will automatically use the new version!

## Need Help?

1. **Test in Scriptable first**: Always make sure the script runs in Scriptable before troubleshooting Shortcuts
2. **Check console logs**: In Scriptable, tap the log icon to see what's happening
3. **Verify parameters**: Make sure Shortcuts is passing the input correctly
4. **Start simple**: Create a minimal shortcut first, then add features

## Video Tutorial

To create a video tutorial showing these steps:
1. Screen record your iPhone while creating the shortcut
2. Show each step clearly
3. Test the shortcut multiple times
4. Show troubleshooting steps

## Next Steps

Once you have the basic shortcut working:
- ✅ Add it to home screen
- ✅ Enable Siri
- ✅ Create preset variations
- ✅ Integrate with other apps
- ✅ Share with team members
