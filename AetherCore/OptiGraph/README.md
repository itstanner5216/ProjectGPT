# 🧩 Optimization Profile — Project GPT Integration Readme

## Overview
**Optimization Profile** is a modular Project GPT extension that dynamically adjusts reasoning behavior, verbosity, and resource allocation based on task context.  
It acts as a “meta-tuner,” optimizing model output fidelity, token usage, and execution efficiency without altering core logic or tone inheritance.

Once uploaded into Project GPT, the skill auto-registers via the **Universal Skill Integration Framework (USIF)** and runs in **subordinate mode** under the Full-Output Intelligence Protocol (FOIP).

---

## Capabilities
- **Adaptive Output Scaling** – Balances precision vs. throughput depending on the detected task type.  
- **Dynamic Reasoning Depth** – Expands or compresses internal reasoning paths as workload intensity changes.  
- **Execution Profiler** – Benchmarks task response time and token footprint to suggest future optimization targets.  
- **Memory Tuning** – Manages in-session cache for large analysis chains and deactivates idle modules.  
- **Compatibility Inheritance** – Works seamlessly alongside Deep Research Extension, Prompt Factory, and Deal Finder modules.

---

## Integration Instructions
1. Upload `optimization-profile.zip` directly into your Project GPT workspace or chat.  
2. The USIF will:
   - Detect the `.zip` file,  
   - Read `config.json`,
   - Register `optimization_profile.md` as the primary controller.
3. Confirmation message:  
   ```
   [✓] Registered skill: optimization-profile
   Execution scope: Subordinate (tone inheritance enabled)
   ```
4. The skill remains active until session end or manual unload.

---

## Activation Examples
Use any natural activation phrase:
```
activate optimization profile
enable optimization tuning
run performance optimizer
launch optimization-profile
```

---

## Dependencies
- **Controller**: `optimization_profile.md` (core logic)
- **Config**: `config.json` (registration metadata)
- **Framework**: Requires Project GPT v1.0+ with FOIP & USIF enabled  

---

## Technical Summary

| Parameter | Value |
|------------|--------|
| **Skill Name** | optimization-profile |
| **Version** | 1.0 |
| **Execution Scope** | Subordinate |
| **Tone Inheritance** | True |
| **Auto-Registration** | Enabled |
| **Framework Compatibility** | Universal Skill Integration Framework ≥ 1.0 |
| **Memory Scope** | Session-temporary |
| **Cache Skill** | True |
| **Unload on Exit** | True |

---

## Behavior and Scope
When invoked, Optimization Profile observes the current skill registry and adjusts system-level performance parameters.  
It does **not** override content logic — it refines *how* each skill executes.

Example:  
If Prompt Factory is generating a 6 k-token specification, Optimization Profile may throttle intermediate verbosity and compress non-critical commentary before final output assembly.

---

## Verification Checklist
✅ Controller file present  
✅ JSON config validated  
✅ Auto-registration tested  
✅ Subordinate execution confirmed  
✅ FOIP inheritance functional  
✅ Compatible with Deep Research / Prompt Factory / Deal Finder  

---

## Changelog v1.0
- Initial release for Project GPT  
- Added dynamic reasoning-depth tuning  
- Added performance benchmark telemetry  
- Added compatibility hooks for Prompt Factory v1.0+  

---

## Author Notes
Built for Project GPT’s modular architecture by Tanner (Jacob Haywood).  
Designed to maintain analytical precision while improving runtime efficiency in large multi-skill operations.
