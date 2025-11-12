# ProjectGPT.js Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     ProjectGPT.js Execution                     │
└─────────────────────────────────────────────────────────────────┘
                                 │
                                 │
                    ┌────────────▼────────────┐
                    │  Check Context:         │
                    │  args.shortcutParameter │
                    └────────────┬────────────┘
                                 │
                    ┌────────────┴────────────┐
                    │                         │
         ┌──────────▼────────┐    ┌──────────▼────────┐
         │   Shortcuts Mode   │    │  Scriptable Mode  │
         │   (parameter set)  │    │ (parameter null)  │
         └──────────┬─────────┘    └──────────┬────────┘
                    │                          │
         ┌──────────▼─────────┐    ┌──────────▼────────┐
         │ Read from          │    │ Show Alert Dialog │
         │ args.shortcut      │    │ - Title           │
         │ Parameter          │    │ - Message         │
         └──────────┬─────────┘    │ - Text Field      │
                    │               │ - Submit/Cancel   │
                    │               └──────────┬────────┘
                    │                          │
                    │               ┌──────────▼────────┐
                    │               │ User Response:    │
                    │               │ - Enter query     │
                    │               │ - Or cancel       │
                    │               └──────────┬────────┘
                    │                          │
                    └────────────┬─────────────┘
                                 │
                      ┌──────────▼──────────┐
                      │  Validate Input:    │
                      │  - Not empty        │
                      │  - Not whitespace   │
                      │  - Convert to string│
                      └──────────┬──────────┘
                                 │
                    ┌────────────┴────────────┐
                    │                         │
         ┌──────────▼─────────┐    ┌─────────▼──────────┐
         │   Valid Input      │    │   Invalid Input    │
         └──────────┬─────────┘    └─────────┬──────────┘
                    │                         │
         ┌──────────▼─────────┐    ┌─────────▼──────────┐
         │ Process Query:     │    │ Return Error:      │
         │ - Log to console   │    │ Shortcuts: output  │
         │ - Call processQuery│    │ Scriptable: Alert  │
         │ - Format response  │    │ Call complete()    │
         └──────────┬─────────┘    └─────────┬──────────┘
                    │                         │
         ┌──────────▼─────────┐               │
         │ Try/Catch Block    │               │
         │ - Success path     │               │
         │ - Error path       │               │
         └──────────┬─────────┘               │
                    │                         │
         ┌──────────▼─────────┐               │
         │ Return Response:   │               │
         │ Shortcuts: output  │               │
         │ Scriptable: Alert  │               │
         │ Log success        │               │
         └──────────┬─────────┘               │
                    │                         │
                    └────────────┬────────────┘
                                 │
                      ┌──────────▼──────────┐
                      │  Script.complete()  │
                      │  ✅ End Execution   │
                      └─────────────────────┘
```

## Key Decision Points

### 1. Context Detection
```javascript
const isRunningInShortcuts = args.shortcutParameter !== undefined;
```
- **undefined** → Scriptable App Mode
- **defined** → Shortcuts Mode

### 2. Input Handling

**Scriptable Mode:**
```javascript
const alert = new Alert();
alert.addTextField("Your query", "");
const response = await alert.presentAlert();
query = alert.textFieldValue(0);
```

**Shortcuts Mode:**
```javascript
query = args.shortcutParameter;
if (typeof query !== 'string') {
  query = String(query);
}
```

### 3. Output Handling

**Scriptable Mode:**
```javascript
const resultAlert = new Alert();
resultAlert.message = response;
await resultAlert.presentAlert();
```

**Shortcuts Mode:**
```javascript
Script.setShortcutOutput(response);
```

### 4. Error Handling

Both modes receive appropriate error messages:
- **Shortcuts**: Error string returned via `Script.setShortcutOutput()`
- **Scriptable**: Error alert dialog displayed

All paths call `Script.complete()` to ensure proper termination.

## Execution Flow Summary

1. **Start** → Detect execution context
2. **Input** → Prompt user (Scriptable) or read parameter (Shortcuts)
3. **Validate** → Check for empty/invalid input
4. **Process** → Generate response (currently demo mode)
5. **Output** → Return via appropriate method
6. **Complete** → Properly terminate script

## Error Prevention

### Silent Failure Prevention (Shortcuts)
- Always call `Script.setShortcutOutput()` before `Script.complete()`
- Return error messages as strings, not throw exceptions
- Validate input before processing

### User Experience (Scriptable)
- Show clear prompts with instructions
- Handle cancellation gracefully
- Display formatted results
- Show error alerts for problems

## Future Integration

The `processQuery()` function can be enhanced to:
1. Call ProjectGPT backend API
2. Use OpenAI/Anthropic APIs
3. Process prompts with the prompt factory
4. Return AI-generated responses

Current implementation returns a demo response for testing purposes.
