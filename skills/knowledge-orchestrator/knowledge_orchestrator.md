---
name: knowledge-orchestrator
description: Coordinates hybrid data queries and merges external research into core reasoning processes.
version: 1.0
type: skill
entry_point: knowledge_orchestrator.md
---

# Knowledge Orchestrator Skill

## Overview
The Knowledge Orchestrator coordinates hybrid data queries and merges external research into core reasoning processes. This skill acts as a bridge between internal knowledge bases and external research sources, providing unified access to information across multiple domains.

## Capabilities

### Hybrid Query Coordination
- Manages simultaneous queries across multiple data sources
- Prioritizes sources based on query type and confidence levels
- Orchestrates sequential and parallel research workflows

### Data Merging & Synthesis
- Combines results from internal knowledge with external research
- Resolves conflicts between different information sources
- Maintains source attribution and confidence scoring

### Integration Points
- Works with Deep Research Extension for comprehensive analysis
- Coordinates with Automation Graph for event-driven queries
- Leverages Optimization Profile for efficient resource allocation

## Execution Model

**Scope**: Subordinate (inherits tone from parent protocol)  
**Memory**: Session-temporary (state cleared on exit)  
**Auto-registration**: Enabled via USIF

## Workflow

1. **Query Reception**: Receives information requests from other skills or user
2. **Source Planning**: Determines optimal mix of internal/external sources
3. **Parallel Execution**: Coordinates multiple research streams
4. **Conflict Resolution**: Merges results with confidence weighting
5. **Delivery**: Returns unified response with source metadata

## Configuration

### Default Settings
- Max concurrent queries: 5
- Source timeout: 30 seconds
- Confidence threshold: 0.7
- Cache duration: Session-only

### Priority Sources
1. Internal knowledge base (highest priority)
2. Verified external APIs
3. Web search results
4. Cached previous queries

## Event Handlers

### Incoming Events
- `research_query`: Trigger hybrid data lookup
- `verify_fact`: Cross-reference claim across sources
- `expand_context`: Gather additional supporting information

### Outgoing Events
- `results_ready`: Merged data available
- `conflict_detected`: Source disagreement requiring resolution
- `confidence_low`: Results below threshold, needs clarification

## Integration Example

```
User Query → Deep Research Extension
              ↓
         (event: need_verification)
              ↓
      Knowledge Orchestrator
              ↓
    [Internal DB + Web Search + APIs]
              ↓
         Merged Results
              ↓
    Deep Research Extension (continues)
```

## Status

**Version**: 1.0  
**Status**: Active  
**Dependencies**: None (standalone operation)  
**Recommended Companions**: Deep Research Extension, Automation Graph

## Verification

On successful registration, you should see:
```
📦 Initialized knowledge-orchestrator
```

## Technical Notes

- Uses async operations for parallel queries
- Implements exponential backoff for failed requests
- Maintains query cache for session efficiency
- Automatically unloads on system exit
