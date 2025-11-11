import subprocess
import sys
from pathlib import Path


def test_fullstack_preset_contains_domain_and_tech_stack(tmp_path):
    script_path = Path(__file__).resolve().parent.parent / "scripts" / "generate_prompt.py"
    output_file = tmp_path / "prompt.md"

    result = subprocess.run(
        [
            sys.executable,
            str(script_path),
            "--preset",
            "fullstack-engineer",
            "--format",
            "xml",
            "--mode",
            "core",
            "--output",
            str(output_file),
        ],
        capture_output=True,
        text=True,
        check=True,
    )

    assert output_file.exists(), f"CLI did not create expected output file. Stdout: {result.stdout}\nStderr: {result.stderr}"

    output_text = output_file.read_text(encoding="utf-8")

    assert "Web Application Development" in output_text
    assert "React, Node.js, PostgreSQL, AWS" in output_text
