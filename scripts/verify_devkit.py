#!/usr/bin/env python3

import os
import subprocess
import sys
import tempfile
from pathlib import Path

import click


def run_command(command, check=True):
    try:
        result = subprocess.run(command, check=check, capture_output=True, text=True)
        return True, result.stdout
    except subprocess.CalledProcessError as e:
        return False, e.stderr


def verify_installation():
    click.echo("Verifying installation...")

    # Check Python installation
    success, output = run_command(["pip", "list"])
    if not success:
        click.echo("❌ Python dependencies check failed")
        return False
    click.echo("✅ Python dependencies verified")

    # Check npm installation
    success, output = run_command(["npm", "list", "--depth=0"])
    if not success:
        click.echo("❌ npm dependencies check failed")
        return False
    click.echo("✅ npm dependencies verified")

    return True


def verify_git_hooks():
    click.echo("\nVerifying git hooks...")

    if not Path(".husky").exists():
        click.echo("❌ Husky directory not found")
        return False

    hooks = ["pre-commit", "pre-push"]
    for hook in hooks:
        hook_path = Path(f".husky/{hook}")
        if not hook_path.exists():
            click.echo(f"❌ {hook} hook not found")
            return False

    click.echo("✅ Git hooks verified")
    return True


def verify_formatting():
    click.echo("\nVerifying formatting...")

    # Create temporary directory
    with tempfile.TemporaryDirectory() as temp_dir:
        # Create test files
        test_files = {
            "test.js": "const test=()=>{console.log('test')}",
            "test.py": "def test():print('test')",
            "test.md": "# Test",
        }

        file_paths = {}
        for filename, content in test_files.items():
            file_path = Path(temp_dir) / filename
            with open(file_path, "w") as f:
                f.write(content)
            file_paths[filename] = file_path

        # Run formatting on temp directory
        os.chdir(temp_dir)
        success, _ = run_command(["devkit", "format"])
        os.chdir(Path.cwd().parent)

        if not success:
            click.echo("❌ Formatting failed")
            return False

        # Verify formatting results
        formatted_content = {
            "test.js": 'const test = () => {\n  console.log("test");\n};\n',
            "test.py": 'def test():\n    print("test")\n',
            "test.md": "# Test\n",
        }

        for filename, expected in formatted_content.items():
            with open(file_paths[filename]) as f:
                content = f.read()
                if content.strip() != expected.strip():
                    click.echo(f"❌ Formatting verification failed for {filename}")
                    click.echo(f"Expected:\n{expected}")
                    click.echo(f"Got:\n{content}")
                    return False

    click.echo("✅ Formatting verified")
    return True


def verify_commands():
    click.echo("\nVerifying commands...")

    # Create temporary directory for testing
    with tempfile.TemporaryDirectory() as temp_dir:
        os.chdir(temp_dir)

        commands = [
            ["devkit", "create", "feature", "test-branch"],
            ["devkit", "status"],
            ["devkit", "format"],
        ]

        for cmd in commands:
            success, output = run_command(cmd)
            if not success:
                click.echo(f"❌ Command failed: {' '.join(cmd)}")
                return False

        os.chdir(Path.cwd().parent)

    click.echo("✅ Commands verified")
    return True


@click.command()
def verify():
    """Verify DevKit installation and functionality"""
    click.echo("Starting DevKit verification...")

    checks = [
        ("Installation", verify_installation),
        ("Git Hooks", verify_git_hooks),
        ("Formatting", verify_formatting),
        ("Commands", verify_commands),
    ]

    all_passed = True
    for name, check in checks:
        if not check():
            all_passed = False
            click.echo(f"\n❌ {name} verification failed")
            break

    if all_passed:
        click.echo("\n✅ All verifications passed!")
    else:
        click.echo("\n❌ Verification failed. Please check the logs above.")
        sys.exit(1)


if __name__ == "__main__":
    verify()
