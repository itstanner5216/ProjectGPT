# 📦 Zip Upload Examples & Best Practices

This guide provides examples and best practices for uploading zip files to the ProjectGPT repository using the Smart Zip Extraction & Merge workflow.

## 🎯 Quick Start

### From iOS Device

1. **Organize your files** in the Files app
2. **Select folder** you want to upload
3. **Long press** → Select "Compress"
4. **Open GitHub Mobile/Safari** → Navigate to repository
5. **Go to uploads/** folder
6. **Tap "Add file"** → "Upload files"
7. **Select your .zip file** → Commit changes
8. **Wait ~1 minute** → Files automatically extracted!

### From Desktop/Web

1. **Create a zip file** of your content
2. **Navigate to repository** on GitHub.com
3. **Click "uploads" folder** (or create it)
4. **Drag & drop** or click "Add file" → "Upload files"
5. **Commit changes** → Workflow triggers automatically

## 📁 Example Zip Structures

### Example 1: Simple File Upload

**Good:** Flat structure with a few files

```
project-update.zip
├── README.md
├── config.json
└── script.py
```

**Result after extraction:**
```
repository/
├── README.md          (replaced if exists, added if new)
├── config.json        (replaced if exists, added if new)
└── script.py          (replaced if exists, added if new)
```

### Example 2: Nested Directory Structure

**Good:** Organized folders with proper hierarchy

```
new-feature.zip
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   └── Footer.js
│   └── utils/
│       ├── helpers.js
│       └── validators.js
└── docs/
    ├── api.md
    └── guide.md
```

**Result after extraction:**
```
repository/
├── src/
│   ├── components/
│   │   ├── Header.js       (merged into existing structure)
│   │   └── Footer.js       (merged into existing structure)
│   └── utils/
│       ├── helpers.js      (merged into existing structure)
│       └── validators.js   (merged into existing structure)
└── docs/
    ├── api.md              (merged into existing structure)
    └── guide.md            (merged into existing structure)
```

### Example 3: Skill Module Upload

**Good:** Complete module with all assets

```
new-skill.zip
└── skills/
    └── my-skill/
        ├── README.md
        ├── config.json
        ├── src/
        │   ├── index.js
        │   └── handlers.js
        └── tests/
            └── test.js
```

**Result after extraction:**
```
repository/
└── skills/
    ├── automation-graph/      (existing, unchanged)
    ├── deal-finder/           (existing, unchanged)
    └── my-skill/              (newly added)
        ├── README.md
        ├── config.json
        ├── src/
        │   ├── index.js
        │   └── handlers.js
        └── tests/
            └── test.js
```

### Example 4: Mixed Content Types

**Good:** Various file types work seamlessly

```
content-update.zip
├── images/
│   ├── logo.png
│   └── banner.jpg
├── data/
│   ├── users.json
│   └── config.yaml
├── scripts/
│   ├── deploy.sh
│   └── build.py
└── documents/
    ├── proposal.pdf
    └── report.docx
```

All file types (text, binary, images, documents) are extracted and merged correctly.

## ✅ Best Practices

### 1. Organize Before Compressing

**Do:**
```
✅ Create clear folder structure first
✅ Group related files together
✅ Use descriptive folder names
```

**Don't:**
```
❌ Mix unrelated files in root
❌ Use unclear naming (folder1, folder2)
❌ Include temporary files
```

### 2. Naming Conventions

**Good names:**
```
✅ feature-authentication.zip
✅ bugfix-api-routes.zip
✅ skill-pdf-parser.zip
✅ docs-update-2025-11.zip
```

**Avoid:**
```
❌ archive.zip (too generic)
❌ stuff.zip (not descriptive)
❌ my file (123).zip (spaces and special chars)
```

### 3. File Structure Planning

**Before creating zip, consider:**

1. **Where will files go?** → Plan extraction target
2. **Will they replace existing files?** → Ensure that's intended
3. **Are paths correct?** → Test with small zip first
4. **Any conflicts expected?** → Review what will be replaced

### 4. Size Optimization

**Compress efficiently:**
```
✅ Remove unnecessary files before zipping
✅ Exclude build artifacts (node_modules, dist, etc.)
✅ Skip system files (.DS_Store, Thumbs.db)
✅ Keep under 500MB limit
```

**Avoid:**
```
❌ Including large binaries unnecessarily
❌ Duplicate files
❌ Unoptimized images
❌ Temporary/cache files
```

## 🚫 Common Pitfalls

### Pitfall 1: Root Folder in Zip

**Problem:**
```
wrong-structure.zip
└── project-name/          ← Extra wrapper folder
    ├── src/
    └── docs/
```

**Result:** Files extracted to `repository/project-name/src/` instead of `repository/src/`

**Solution:**
```
correct-structure.zip
├── src/                   ← Direct structure
└── docs/
```

### Pitfall 2: System Files Included

**Problem:**
```
messy-archive.zip
├── __MACOSX/              ← macOS metadata
├── .DS_Store              ← macOS system file
├── ._hidden_file          ← macOS resource fork
└── actual-content/
```

**Solution:** These are automatically filtered out, but cleaner to exclude them:
- On macOS: Use `zip -r archive.zip folder/ -x "*.DS_Store" -x "__MACOSX"`
- Or clean after extraction (workflow does this automatically)

### Pitfall 3: Path Traversal Attempts

**Problem:**
```
malicious.zip
└── ../../etc/passwd       ← Trying to escape directory
```

**Result:** ❌ Rejected by security validation

**Solution:** Keep all paths relative, no `../` sequences

### Pitfall 4: Oversized Archives

**Problem:**
```
huge-archive.zip           (600MB)
└── large-dataset/
    └── [1000s of files]
```

**Result:** ❌ Rejected - exceeds 500MB limit

**Solution:**
- Split into multiple smaller archives
- Upload large files separately via Git LFS
- Compress data more efficiently
- Exclude unnecessary files

## 📱 iOS-Specific Tips

### Using Files App

1. **Compress in-place:**
   - Select folder → Long press → "Compress"
   - Creates `Archive.zip` by default
   - Rename before uploading for clarity

2. **Multiple files:**
   - Select multiple items → Compress
   - All selected items merged into single zip
   - Structure preserved relative to selection

3. **From other apps:**
   - Export to Files app first
   - Organize structure
   - Then compress and upload

### Using GitHub Mobile App

1. **Navigate to repository** in GitHub app
2. **Browse to uploads/ folder**
3. **Tap "+" or menu** → Cannot directly upload (limitation)
4. **Use Safari instead:** github.com → Repository → Upload

### Using Shortcuts App

Create automation shortcut:
```
1. Receive Files input
2. Create Archive
3. Open GitHub.com in Safari
4. [Manual upload from here]
```

## 🔍 Testing Your Zip

### Before uploading, verify:

```bash
# On Mac/Linux terminal:
unzip -l your-archive.zip

# Check output:
✅ Files have correct relative paths
✅ No ../ in paths
✅ No system files visible
✅ Structure matches intended layout
```

### Test extraction locally:

```bash
# Create test directory
mkdir test-extraction
cd test-extraction

# Extract zip
unzip ../your-archive.zip

# Verify structure
tree .

# Check file contents
cat path/to/important-file.txt
```

## 📊 Example Workflows

### Workflow 1: Update Documentation

**Scenario:** You've written documentation on your iPad

**Steps:**
1. Create folder: `docs-update/`
2. Add markdown files: `api.md`, `guide.md`
3. Compress folder → `docs-update.zip`
4. Upload to `uploads/`
5. Wait for extraction
6. Files appear in `repository/docs-update/`

### Workflow 2: Add New Skill

**Scenario:** Developed new skill module

**Steps:**
1. Structure: `skills/new-skill/` with all files
2. Test locally to ensure it works
3. Compress: `skills/new-skill/` → `new-skill.zip`
4. Upload to `uploads/`
5. Workflow extracts to `repository/skills/new-skill/`
6. Skill automatically available in repository

### Workflow 3: Update Existing Files

**Scenario:** Made improvements to existing code

**Steps:**
1. Modify files: `src/app.js`, `src/utils.js`
2. Compress only changed files maintaining structure:
   ```
   update.zip
   └── src/
       ├── app.js
       └── utils.js
   ```
3. Upload to `uploads/`
4. Workflow replaces existing files
5. Other files in `src/` remain unchanged

### Workflow 4: Batch Image Upload

**Scenario:** Adding images from phone to repository

**Steps:**
1. Select images in Photos app
2. Share → Save to Files → Create folder `assets/images/`
3. Compress `assets/` → `assets.zip`
4. Upload to `uploads/`
5. Images extracted to `repository/assets/images/`

## 🛡️ Security Considerations

### Safe Practices

✅ **Do:**
- Compress only your own content
- Verify contents before uploading
- Use trusted sources for files
- Keep sensitive data encrypted separately

❌ **Don't:**
- Include credentials or secrets
- Upload executable files from unknown sources
- Bypass path validation
- Include personal/private data

### Automatic Safety Features

The workflow includes:
- ✅ Path traversal prevention
- ✅ Size limit enforcement (500MB)
- ✅ Zip integrity validation
- ✅ System file filtering
- ✅ Malicious content detection

## 🎓 Learning Examples

### Example A: Simple Text Files

```bash
# Create structure
mkdir -p example-a
echo "Hello World" > example-a/hello.txt
echo "Documentation" > example-a/README.md

# Compress
cd example-a
zip -r ../example-a.zip .
cd ..

# Upload example-a.zip to uploads/
# Result: Files added to repository root
```

### Example B: Nested Directories

```bash
# Create structure
mkdir -p example-b/src/components
mkdir -p example-b/src/utils
echo "Component code" > example-b/src/components/App.js
echo "Helper functions" > example-b/src/utils/helpers.js

# Compress
zip -r example-b.zip example-b/

# Upload example-b.zip to uploads/
# Result: example-b/ folder created with full structure
```

### Example C: Updating Existing File

```bash
# Existing repository has: src/config.json

# Create update
mkdir -p update/src
echo '{"version": "2.0"}' > update/src/config.json

# Compress
zip -r update.zip update/src/

# Upload to uploads/
# Result: src/config.json is REPLACED with new version
```

## 📞 Troubleshooting

### Issue: Files not appearing

**Check:**
1. Did workflow run successfully? (Actions tab)
2. Were files identical to existing? (marked as "unchanged")
3. Is structure correct in zip? (check with `unzip -l`)
4. Review workflow logs for details

### Issue: Wrong location

**Check:**
1. Zip structure - ensure no extra wrapper folders
2. Paths in zip file - must be relative
3. Expected extraction target

### Issue: Workflow failed

**Check:**
1. Zip file size under 500MB?
2. Zip file valid/not corrupted?
3. No path traversal (`../`) in paths?
4. Review error message in workflow logs

## 🎉 Success Indicators

After upload, you should see:

✅ **In Actions tab:**
- Green checkmark ✓
- Job summary with statistics
- Detailed extraction log

✅ **In Repository:**
- New/updated files visible
- Commit message with summary
- Zip removed from uploads/

✅ **In Files:**
- Correct folder structure
- Files in expected locations
- Content matches uploaded files

---

## Additional Resources

- **Workflow Documentation:** `.github/workflows/README.md`
- **Repository Guide:** `README.md`
- **GitHub Actions:** [Actions Tab](../../actions)

**Need Help?** Open an issue with:
- Zip file name
- Expected vs actual behavior
- Workflow run link
- Error messages if any

Happy uploading! 🚀
