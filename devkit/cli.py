#!/usr/bin/env python3

import subprocess
import sys
from pathlib import Path
from typing import List, Optional, Tuple

import click


def run_command(
    command: List[str], capture_output: bool = True, check: bool = True
) -> Tuple[bool, Optional[str]]:
    """Run a shell command and return success status and output."""
    try:
        if capture_output:
            result = subprocess.run(
                command, check=check, capture_output=True, text=True
            )
            return True, result.stdout
        else:
            subprocess.run(command, check=check)
            return True, None
    except subprocess.CalledProcessError as e:
        if capture_output:
            click.echo(f"Error: {e.stderr}", err=True)
        return False, None


class GitManager:
    def __init__(self):
        self.current_branch = self._get_current_branch()
        self.root_dir = Path(__file__).parent.parent

    def _run_command(self, command: List[str], check: bool = True) -> bool:
        try:
            subprocess.run(command, check=check, capture_output=True, text=True)
            return True
        except subprocess.CalledProcessError as e:
            click.echo(f"Error: {e.stderr}", err=True)
            return False

    def _get_current_branch(self) -> str:
        result = subprocess.run(
            ["git", "rev-parse", "--abbrev-ref", "HEAD"],
            capture_output=True,
            text=True,
            check=False,
        )
        return result.stdout.strip()

    def fetch_all(self) -> bool:
        click.echo("🔄 Fetching all changes...")
        return self._run_command(["git", "fetch", "--all"])

    def pull_rebase(self, branch: Optional[str] = None) -> bool:
        branch = branch or self.current_branch
        click.echo(f"🔄 Pulling changes with rebase for {branch}...")
        return self._run_command(["git", "pull", "--rebase", "origin", branch])

    def push(self, branch: Optional[str] = None, force: bool = False) -> bool:
        branch = branch or self.current_branch
        click.echo(f"🚀 Pushing to {branch}...")
        cmd = ["git", "push"]
        if force:
            cmd.append("--force")
        cmd.extend(["origin", branch])
        return self._run_command(cmd)

    def run_tests(self) -> bool:
        click.echo("🧪 Running tests...")
        return self._run_command(["npm", "run", "test"])

    def run_lint(self) -> bool:
        click.echo("🔍 Running linting...")
        return self._run_command(["npm", "run", "lint"])

    def check_branch_protection(self, target_branch: str) -> bool:
        if target_branch == "main":
            click.echo("❌ Direct pushes to main branch are not allowed.", err=True)
            click.echo("Please create a pull request from your feature branch to main.")
            return False
        elif target_branch != "dev":
            click.echo(f"⚠️  Warning: Pushing to {target_branch} instead of dev branch.")
            click.echo("Consider pushing to dev branch instead.")
        return True


@click.group()
def cli():
    """DevKit CLI - Development workflow automation tool"""
    pass


@cli.command()
@click.argument("branch_type")
@click.argument("branch_name")
def create(branch_type, branch_name):
    """Create a new branch with proper naming convention"""
    valid_types = ["feature", "bugfix", "release", "hotfix"]
    if branch_type not in valid_types:
        click.echo(f"Error: Branch type must be one of {valid_types}")
        sys.exit(1)

    branch = f"{branch_type}/{branch_name}"
    success, _ = run_command(["git", "checkout", "-b", branch])
    if not success:
        sys.exit(1)
    click.echo(f"Created and switched to branch: {branch}")


@cli.command()
@click.argument("target_branch", default="dev")
def push(target_branch):
    """Push changes with pre-push checks"""
    # Check branch protection
    if target_branch == "main":
        click.echo("❌ Direct pushes to main branch are not allowed.", err=True)
        click.echo("Please create a pull request from your feature branch to main.")
        sys.exit(1)

    # Run formatting
    click.echo("Running code formatting...")
    success, _ = run_command(["npm", "run", "format:all"])
    if not success:
        click.echo("❌ Code formatting failed")
        sys.exit(1)

    # Run Python formatting
    click.echo("Running Python formatting...")
    commands = [["black", "."], ["isort", "."], ["ruff", "check", ".", "--fix"]]
    for cmd in commands:
        success, _ = run_command(cmd)
        if not success:
            click.echo(f"❌ Python formatting failed: {' '.join(cmd)}")
            sys.exit(1)

    # Verify build works
    click.echo("Verifying build...")
    success, _ = run_command(
        ["npm", "run", "build", "--", "--no-lint"], capture_output=False
    )
    if not success:
        click.echo("❌ Build verification failed")
        sys.exit(1)

    # Run tests
    click.echo("Running tests...")
    success, output = run_command(
        ["npm", "test", "--", "--passWithNoTests", "--coverage=false"],
        capture_output=False,
    )
    if not success:
        click.echo("❌ Tests failed")
        sys.exit(1)

    # Push changes
    click.echo(f"Pushing to {target_branch}...")
    success, _ = run_command(["git", "push", "origin", f"HEAD:{target_branch}"])
    if not success:
        click.echo("❌ Push failed")
        sys.exit(1)

    click.echo("✅ All checks passed and changes pushed successfully!")


@cli.command()
def format():
    """Format all code files"""
    click.echo("Formatting JavaScript/TypeScript files...")
    success, _ = run_command(["npm", "run", "format:all"])
    if not success:
        sys.exit(1)

    click.echo("Formatting Python files...")
    commands = [["black", "."], ["isort", "."], ["ruff", "check", ".", "--fix"]]
    for cmd in commands:
        success, _ = run_command(cmd)
        if not success:
            sys.exit(1)

    click.echo("✅ Formatting complete!")


@cli.command()
def setup():
    """Setup development environment"""
    click.echo("Installing npm dependencies...")
    success, _ = run_command(["npm", "install"])
    if not success:
        sys.exit(1)

    click.echo("Installing Python dependencies...")
    commands = [
        ["pip", "install", "-e", "."],
        ["pip", "install", "black", "isort", "ruff"],
    ]
    for cmd in commands:
        success, _ = run_command(cmd)
        if not success:
            sys.exit(1)

    click.echo("Setting up git hooks...")
    success, _ = run_command(["npx", "husky", "install"])
    if not success:
        sys.exit(1)

    click.echo("✅ Setup complete!")


@cli.command()
def status():
    """Check development environment status"""
    all_good = True

    click.echo("Checking npm dependencies...")
    success, _ = run_command(["npm", "list", "--depth=0"])
    if not success:
        all_good = False

    click.echo("\nChecking Python dependencies...")
    success, _ = run_command(["pip", "list"])
    if not success:
        all_good = False

    click.echo("\nChecking git hooks...")
    if Path(".husky").exists():
        click.echo("✅ Git hooks are installed")
    else:
        click.echo("❌ Git hooks are not installed")
        all_good = False

    if not all_good:
        sys.exit(1)


if __name__ == "__main__":
    cli()
