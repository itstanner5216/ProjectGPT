# Knowledge Orchestrator - Skill Package

**Version:** 1.0  
**Type:** Hybrid Data Coordination Module  
**Compatibility:** Project GPT Universal Skill Integration Framework ≥1.0

---

## Overview

The Knowledge Orchestrator skill coordinates hybrid data queries and merges external research into core reasoning processes. It serves as an intelligent bridge between internal knowledge bases and external information sources.

## Key Features

- **Hybrid Query Management**: Coordinates searches across multiple data sources simultaneously
- **Smart Merging**: Combines internal and external data with conflict resolution
- **Confidence Scoring**: Weights results based on source reliability and cross-validation
- **Event-Driven**: Integrates with Automation Graph for seamless skill coordination
- **Performance Optimized**: Works with Optimization Profile for efficient resource usage

## Installation

### Automatic Registration

The skill auto-registers when ProjectGPT starts. Simply ensure the `knowledge-orchestrator` directory is in your `skills/` folder.

### Manual Verification

```bash
# Check skill directory exists
ls skills/knowledge-orchestrator/

# Restart ProjectGPT to load the skill
# The skill will appear in the initialization output
```

## Usage

The Knowledge Orchestrator activates automatically when:
- Other skills emit research queries
- Cross-validation is needed
- Hybrid data merging is required

### Manual Activation

You can explicitly invoke the skill:
```
"Use knowledge orchestrator to research [topic]"
"Activate hybrid data query for [question]"
"Merge internal and external data on [subject]"
```

## Integration

### Works Best With

- **Deep Research Extension**: Provides research coordination
- **Automation Graph**: Enables event-driven queries
- **Optimization Profile**: Optimizes query performance

### Event Routing

**Listens For:**
- `research_query`: Initiates hybrid lookup
- `verify_fact`: Cross-references information
- `expand_context`: Gathers supporting data

**Emits:**
- `results_ready`: Merged data available
- `conflict_detected`: Sources disagree
- `confidence_low`: Results uncertain

## Configuration

Default settings in `config.json`:
```json
{
  "skill_name": "knowledge-orchestrator",
  "version": "1.0",
  "execution_scope": "Subordinate",
  "auto_register": true
}
```

## File Structure

```
knowledge-orchestrator/
├── knowledge_orchestrator.md  # Main skill logic
├── config.json                # Registration metadata
├── README.md                  # This file
└── data/                      # Runtime logs & cache
```

## Status

✅ **Ready for Production**

The skill is fully functional and integrates seamlessly with the ProjectGPT ecosystem.

## Support

For issues or feature requests, check:
- Skill initialization logs in ProjectGPT console
- Runtime logs in `data/` directory
- ProjectGPT system documentation

---

**Author:** ProjectGPT Team  
**Last Updated:** November 11, 2025  
**License:** Proprietary (Project GPT Internal Use)
