# GitHub Actions Workflows

This directory contains automated workflows for the ProjectGPT repository.

## 📦 Smart Zip Extraction & Merge Workflow

**File:** `extract-uploads.yml`

### Overview

An enterprise-grade automation workflow that enables seamless file uploads from iOS devices by automatically extracting and merging zip file contents into the repository structure.

### Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│  1. ZIP UPLOAD (iOS Files App → GitHub Mobile)                 │
│     User uploads .zip to uploads/ directory                     │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│  2. TRIGGER DETECTION                                           │
│     • Monitor: uploads/**/*.zip                                 │
│     • Branch: main                                              │
│     • Concurrency: Single instance (prevent conflicts)          │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│  3. VALIDATION & SECURITY                                       │
│     ✓ Zip integrity check                                       │
│     ✓ Size limit validation (500MB)                            │
│     ✓ Path traversal prevention                                │
│     ✓ Malicious content detection                              │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│  4. EXTRACTION                                                  │
│     • Extract to temporary directory                            │
│     • Preserve folder hierarchy                                 │
│     • Filter system files (__MACOSX, .DS_Store)                │
│     • Support unlimited nesting depth                           │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│  5. SMART MERGE                                                 │
│     • NEW files → Add to repository                             │
│     • EXISTING files → Replace with new version                 │
│     • UNCHANGED files → Skip (no-op)                            │
│     • Missing directories → Create automatically                │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│  6. COMMIT & PUSH                                               │
│     • Stage all changes atomically                              │
│     • Create descriptive commit message                         │
│     • Push to main branch                                       │
│     • Retry logic for transient failures                        │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│  7. CLEANUP & REPORTING                                         │
│     • Remove source zip files                                   │
│     • Generate job summary with statistics                      │
│     • Log all operations for audit trail                        │
└─────────────────────────────────────────────────────────────────┘
```

### Trigger Conditions

#### Automatic Trigger
```yaml
on:
  push:
    branches:
      - main
    paths:
      - 'uploads/**/*.zip'
```

The workflow automatically runs when:
- A `.zip` file is pushed to the `uploads/` directory
- The push is to the `main` branch
- Only one instance runs at a time (concurrency control)

#### Manual Trigger
```yaml
workflow_dispatch:
  inputs:
    keep_zip:
      description: 'Keep source zip after extraction'
      default: 'false'
    dry_run:
      description: 'Dry run mode (no commit/push)'
      default: 'false'
```

Manual triggers support:
- **Keep Zip**: Preserve source zip file after extraction
- **Dry Run**: Test extraction without committing changes

### Configuration Variables

All configurable parameters are defined as environment variables at the top of the workflow:

| Variable | Default | Description |
|----------|---------|-------------|
| `UPLOAD_DIR` | `uploads` | Directory to monitor for zip files |
| `EXTRACT_TARGET` | `.` | Target directory for extraction (repo root) |
| `MAX_ZIP_SIZE_MB` | `500` | Maximum allowed zip file size |
| `ALLOW_OVERWRITES` | `true` | Enable smart file replacement |
| `KEEP_ZIP` | `false` | Preserve source zip after extraction |

To customize these values, edit the `env:` section in the workflow file.

### Smart Merge Logic

The workflow implements intelligent file conflict resolution:

```
┌─────────────────────────────────────────────────────────────────┐
│  File Status Assessment                                         │
├─────────────────────────────────────────────────────────────────┤
│  IF file exists in repo:                                        │
│    IF content differs:                                          │
│      → REPLACE (Modified)                                       │
│    ELSE:                                                        │
│      → SKIP (Unchanged)                                         │
│  ELSE:                                                          │
│    → ADD (New file)                                             │
└─────────────────────────────────────────────────────────────────┘
```

**Key Behaviors:**
- **Existing files are REPLACED** when zip contains newer versions
- **New files are ADDED** without affecting existing content
- **Unchanged files are SKIPPED** to optimize performance
- **Directories are created** automatically as needed
- **No deletions** - files only in repo (not in zip) are preserved

### Security Features

#### Path Traversal Prevention
```bash
# Rejects zip files containing ../ patterns
if unzip -l "$zip_file" | grep -q '\.\./'; then
  echo "❌ ERROR: Path traversal detected"
  exit 1
fi
```

#### Size Validation
```bash
# Enforces 500MB limit (configurable)
if [ "$file_size" -gt "$MAX_SIZE_BYTES" ]; then
  echo "❌ ERROR: File exceeds maximum size"
  exit 1
fi
```

#### Integrity Check
```bash
# Validates zip format before extraction
if ! unzip -t "$zip_file" >/dev/null 2>&1; then
  echo "❌ ERROR: Zip file is corrupted"
  exit 1
fi
```

#### System File Filtering
```bash
# Excludes macOS system files
find . -type f ! -path "*/__MACOSX/*" ! -name ".DS_Store" ! -name "._*"
```

### Commit Message Format

Commits follow a standardized format for audit trails:

```
chore: Extract and merge contents from zip archive(s)

Summary:
- Added: X files
- Modified: Y files
- Unchanged: Z files
- Directories created: N

Source: filename.zip
Extracted at: 2025-11-14 09:56:00 UTC
Workflow: Smart Zip Extraction & Merge #123
```

### Job Summary Output

After each run, a rich markdown summary is posted to the Actions interface:

```markdown
# 📦 Zip Extraction Report

## ✅ Status: Success

Successfully extracted and merged zip contents.

## 📊 Summary

| Metric | Count |
|--------|-------|
| ➕ Files Added | 5 |
| 🔄 Files Modified | 3 |
| ⏭️ Files Unchanged | 2 |
| 📁 Directories Created | 1 |
| 📦 Zip Files Processed | 1 |

## 🔗 Commit Details

**Commit:** `abc123...`

## 📝 Detailed Log

[Full operation log with file-level details]
```

### Error Handling

The workflow includes comprehensive error handling:

1. **Validation Failures**
   - Corrupted zip files → Workflow fails with clear error
   - Oversized files → Rejected before extraction
   - Path traversal attempts → Blocked with security warning

2. **Extraction Failures**
   - Unzip errors → Temporary directory cleaned up
   - Permission issues → Reported in logs
   - Disk space issues → Detected and logged

3. **Push Failures**
   - Transient network errors → Automatic retry (3 attempts)
   - Merge conflicts → Manual resolution required
   - Permission issues → Reported with remediation steps

### Performance Characteristics

**Expected Performance:**
- **Small archives** (<100 files): ~30-60 seconds total
- **Medium archives** (100-500 files): ~1-2 minutes total
- **Large archives** (500-1000 files): ~2-5 minutes total

**Performance Breakdown:**
- Checkout: ~10 seconds
- Validation: ~5 seconds per zip
- Extraction: ~1 second per 100 files
- Commit/Push: ~5-10 seconds
- Cleanup: ~2 seconds

### Limitations

1. **Size Constraints**
   - Maximum zip size: 500MB (configurable)
   - GitHub file size limit: 100MB per file
   - Repository size recommendations apply

2. **Concurrency**
   - One extraction at a time (prevents conflicts)
   - Queued uploads process sequentially
   - Estimated wait time: ~2 minutes per upload

3. **File Types**
   - All file types supported
   - Binary files handled correctly
   - Large files may slow extraction

4. **Branch Restrictions**
   - Only works on `main` branch by default
   - Modify `branches:` filter for other branches

### Maintenance & Extension

#### Adding Custom Validation

To add custom file validation:

```yaml
- name: Custom Validation
  run: |
    # Example: Reject executable files
    if unzip -l "$zip_file" | grep -E '\.(exe|sh|bat)$'; then
      echo "❌ Executables not allowed"
      exit 1
    fi
```

#### Enabling Notifications

Future enhancement - add notification step:

```yaml
- name: Send Notification
  if: steps.commit.outputs.committed == 'true'
  run: |
    # Integration with Slack, Discord, email, etc.
    curl -X POST $WEBHOOK_URL \
      -d "message=Zip extracted successfully"
```

#### Multi-Environment Support

To support different branches:

```yaml
on:
  push:
    branches:
      - main
      - staging
      - development
    paths:
      - 'uploads/**/*.zip'
```

Then conditionally extract to different locations based on branch.

### Troubleshooting

#### Problem: Workflow doesn't trigger

**Solution:**
1. Verify zip file is in `uploads/` directory
2. Check branch is `main`
3. Ensure file has `.zip` extension
4. Review workflow permissions

#### Problem: Extraction fails

**Solution:**
1. Check zip file integrity locally
2. Verify file size is under 500MB
3. Review logs for path traversal warnings
4. Test with smaller/simpler zip first

#### Problem: Push fails

**Solution:**
1. Check for merge conflicts
2. Verify workflow has `contents: write` permission
3. Review repository protection rules
4. Check for concurrent workflow runs

#### Problem: Files not appearing after extraction

**Solution:**
1. Check if files were already identical (shown as "unchanged")
2. Verify folder structure in zip archive
3. Review extraction log in job summary
4. Check for system files being filtered out

### Testing

#### Test with Manual Trigger

1. Go to Actions tab in GitHub
2. Select "Smart Zip Extraction & Merge"
3. Click "Run workflow"
4. Enable "Dry run mode"
5. Review results without committing

#### Test with Small Archive

1. Create simple zip: `test.zip` containing:
   ```
   test.zip
   ├── test.txt
   └── folder/
       └── nested.txt
   ```
2. Upload to `uploads/` via GitHub web interface
3. Commit changes
4. Monitor Actions tab for workflow run

### Support

For issues or questions:
- Review workflow logs in Actions tab
- Check job summary for detailed statistics
- Verify zip file structure matches expected format
- Consult `.github/UPLOAD_EXAMPLE.md` for examples

---

**Workflow Version:** 1.0  
**Last Updated:** 2025-11-14  
**Maintainer:** ProjectGPT Team
