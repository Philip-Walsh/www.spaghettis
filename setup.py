from setuptools import setup, find_packages

setup(
    name="devkit",
    version="0.1.0",
    packages=find_packages(),
    include_package_data=True,
    install_requires=[
        "click>=8.0.0",
    ],
    entry_points={
        "console_scripts": [
            "devkit=devkit.cli:cli",
        ],
    },
    author="Your Name",
    author_email="your.email@example.com",
    description="Development toolkit for managing git operations and pre-push checks",
    long_description=open("README.md").read(),
    long_description_content_type="text/markdown",
    url="https://github.com/yourusername/devkit",
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires=">=3.7",
)
