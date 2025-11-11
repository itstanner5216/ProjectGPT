import re
import importlib.util
from pathlib import Path


MODULE_PATH = Path(__file__).resolve().parent.parent / "skills" / "prompt-factory" / "scripts" / "optimizer.py"
SPEC = importlib.util.spec_from_file_location("prompt_optimizer", MODULE_PATH)
assert SPEC is not None and SPEC.loader is not None
optimizer_module = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(optimizer_module)
PromptOptimizer = optimizer_module.PromptOptimizer


def count_examples(text: str) -> int:
    return len(re.findall(r'^##\s+Example', text, flags=re.MULTILINE | re.IGNORECASE))


def test_merge_sections_reduces_duplicate_headings():
    optimizer = PromptOptimizer()
    prompt = (
        "# Prompt Title\n\n"
        "## Goals\n"
        "- Deliver a polished experience.\n\n"
        "## Goals Overview\n"
        "- Ensure the assistant is aligned with user intent.\n\n"
        "## Goals\n"
        "- Deliver a polished experience.\n\n"
        "## Workflow\n"
        "1. Listen carefully.\n"
    )

    merged = optimizer._merge_sections(prompt)

    assert merged.count('## Goals') == 1
    assert '## Goals Overview' not in merged
    assert len(merged.split()) < len(prompt.split())
    assert any('Merged sections:' in msg for msg in optimizer.optimizations_applied)


def test_consolidate_examples_limits_total_examples():
    optimizer = PromptOptimizer()
    prompt = (
        "# Prompt Title\n\n"
        "## Example 1\n"
        "Example content one.\n\n"
        "## Example 2\n"
        "Example content two.\n\n"
        "## Example 3\n"
        "Example content three.\n\n"
        "## Example 4\n"
        "Example content four.\n\n"
        "## Guidance\n"
        "Follow the structure above.\n"
    )

    consolidated = optimizer._consolidate_examples(prompt)

    assert count_examples(consolidated) == 3
    assert len(consolidated.split()) < len(prompt.split())
    assert any('Consolidated examples:' in msg for msg in optimizer.optimizations_applied)
