#!/usr/bin/env python3

import click
import subprocess
import sys
from pathlib import Path
from typing import Optional, List


class GitManager:
    def __init__(self):
        self.current_branch = self._get_current_branch()
        self.root_dir = Path(__file__).parent.parent

    def _run_command(self, command: List[str], check: bool = True) -> bool:
        try:
            subprocess.run(command, check=check,
                           capture_output=True, text=True)
            return True
        except subprocess.CalledProcessError as e:
            click.echo(f"Error: {e.stderr}", err=True)
            return False

    def _get_current_branch(self) -> str:
        result = subprocess.run(
            ["git", "rev-parse", "--abbrev-ref", "HEAD"],
            capture_output=True,
            text=True
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
            click.echo(
                "❌ Direct pushes to main branch are not allowed.", err=True)
            click.echo(
                "Please create a pull request from your feature branch to main.")
            return False
        elif target_branch != "dev":
            click.echo(
                f"⚠️  Warning: Pushing to {target_branch} instead of dev branch.")
            click.echo("Consider pushing to dev branch instead.")
        return True


@click.group()
def cli():
    """Development toolkit for managing git operations and pre-push checks."""
    pass


@cli.command()
@click.argument('branch', required=False)
@click.option('--force', '-f', is_flag=True, help='Force push changes')
def push(branch: Optional[str], force: bool):
    """Push changes to remote repository with pre-push checks."""
    git = GitManager()
    target_branch = branch or git.current_branch

    if not git.check_branch_protection(target_branch):
        sys.exit(1)

    if not git.fetch_all():
        sys.exit(1)

    if not git.pull_rebase(target_branch):
        click.echo("❌ Rebase failed. Please resolve conflicts and try again.")
        click.echo("To resolve conflicts:")
        click.echo("1. Fix the conflicts in the files")
        click.echo("2. git add <fixed-files>")
        click.echo("3. git rebase --continue")
        sys.exit(1)

    if not git.run_lint():
        click.echo("❌ Linting failed. Please fix the issues before pushing.")
        sys.exit(1)

    if not git.run_tests():
        click.echo("❌ Tests failed. Please fix the failing tests before pushing.")
        sys.exit(1)

    if not git.push(target_branch, force):
        sys.exit(1)

    click.echo("✅ All checks passed! Changes pushed successfully.")


@cli.command()
@click.argument('branch')
def checkout(branch: str):
    """Checkout a branch and set up tracking if needed."""
    git = GitManager()

    click.echo(f"🔄 Checking out {branch}...")
    if not git._run_command(["git", "checkout", branch]):
        sys.exit(1)

    # Check if branch exists on remote
    result = subprocess.run(
        ["git", "ls-remote", "--heads", "origin", branch],
        capture_output=True,
        text=True
    )

    if not result.stdout.strip():
        click.echo(f"⚠️  Branch {branch} does not exist on remote.")
        click.echo("Setting up tracking...")
        if not git._run_command(["git", "push", "--set-upstream", "origin", branch]):
            sys.exit(1)


@cli.command()
@click.argument('branch')
def create(branch: str):
    """Create a new branch and set up tracking."""
    git = GitManager()

    click.echo(f"🌱 Creating new branch {branch}...")
    if not git._run_command(["git", "checkout", "-b", branch]):
        sys.exit(1)

    click.echo("Setting up tracking...")
    if not git._run_command(["git", "push", "--set-upstream", "origin", branch]):
        sys.exit(1)


if __name__ == '__main__':
    cli()
