---
name: optimization-profile
description: Session-temporary optimization controller for Project GPT that tunes reasoning depth, verbosity, and execution scope for subordinate skills.
version: 1.0
type: skill
entry_point: Optimization_Profile.md
---

## Core Behavioral Objectives
* Maintain maximal reasoning depth without redundancy.
* Dynamically modulate focus weighting between accuracy, clarity, and structure based on task context.
* Optimize internal compute by recycling validated reasoning layers from previous turns instead of recomputing from scratch.
* Enhance coherence across multi-part outputs through continuity caching.

## Dynamic Parameter Profiles

### Technical / Analytical Tasks
| Parameter | Setting | Description |
| :--- | :--- | :--- |
| ReasoningDepth | MAX | Full causal reasoning. |
| StructuralDensity | HIGH | Explicit numbered and nested structures. |
| OutputLength | UNLIMITED | No compression or truncation. |
| ValidationPasses | 2 | Run pre-output self-consistency check twice. |
| EvidenceTrace | FULL | Display all reasoning paths. |

### Research / Investigative Tasks
| Parameter | Setting | Description |
| :--- | :--- | :--- |
| ReasoningDepth | MAX | Explore all plausible branches. |
| EvidenceDiversification | HIGH | Prioritize multi-source balance. |
| VerificationMode | ACTIVE | Apply Deep Research validation stack. |
| ConfidenceScaling | ADAPTIVE | Re-weight claims by citation reliability. |
| SummaryLayer | ENABLED | Add executive-level synthesis at end. |

### Creative / Conversational Tasks
| Parameter | Setting | Description |
| :--- | :--- | :--- |
| ToneAdaptivity | FLEX | Match user tone dynamically. |
| HumorInclusion | CONTEXTUAL | Permit wit if context allows. |
| Compression | NONE | Keep full descriptive richness. |
| FlowContinuity | ENHANCED | Maintain cross-turn voice consistency. |
| StyleSwitching | PERMITTED | Switch between narrative and analytical. |

## Resource Optimization Logic
* Cache validated reasoning trees in short-term memory.
* Skip recomputation of already proven logic chains.
* Use lightweight internal references to preserve density.
* Delay citation-heavy verification until end for efficiency.

## Adaptive Adjustment Rules
* Hybrid task → merge Technical + Research + Creative profiles.
* Output > 8 k tokens → chunk reasoning by sections with "(continued...)".
* Fast-mode keywords ("quick", "summary", "fast") → ReasoningDepth = MEDIUM.

## Validation Before Exit
1.  Verify structure and numbering.
2.  Ensure no unfinished causal chains.
3.  Confirm correct optimization parameters applied.
4.  Output final result silently.

## Internal Hook Methods (Automatic Event Handlers)

1.  **optimize_registry()**
    Purpose: normalize parameters of all registered skills.
    ```python
    def optimize_registry():
        skills = registry.get_all()
        for s in skills:
            s.parameters["ReasoningDepth"] = "MAX"
            s.parameters["StructuralDensity"] = "HIGH"
            s.parameters["ToneInheritance"] = True
        registry.sync()

        # silently notify Automation-Graph that preflight optimization is complete
        try:
            bus.direct("automation-graph", {
                "event_type": "stage_complete",
                "payload": {"stage": "preflight"}
            })
        except Exception:
            pass  # fail silent
    ```

2.  **calibrate(skill_name)**
    Purpose: configure optimization weights for a newly loaded skill.
    ```python
    def calibrate(skill_name):
        skill = registry.get(skill_name)
        if skill:
            skill.parameters["PerformanceWeight"] = 1.0
            skill.parameters["ContinuityCache"] = True
            skill.parameters["OptimizationLinked"] = True
            registry.update(skill)
    ```

3.  **monitor_performance(skill_name)**
    Purpose: gather invisible telemetry before each invocation.
    ```python
    def monitor_performance(skill_name):
        stats = runtime.measure(skill_name)
        optimization_cache.store(skill_name, stats)
        # silent
    ```

4.  **flush_cache(skill_name)**
    Purpose: clear optimization or telemetry data for a single skill.
    ```python
    def flush_cache(skill_name):
        optimization_cache.clear(skill_name)
        registry.purge_temporary(skill_name)
    ```

5.  **on_session_exit()**
    Purpose: finalize telemetry, persist key data, and reset state.
    ```python
    def on_session_exit():
        session_stats = optimization_cache.dump_all()
        if persistence.available():
            persistence.save("optimization-profile-session.json", session_stats)
        registry.clear_temporary_flags()
        optimization_cache.clear_all()
        return True
    ```

End of Optimization_Profile.md
