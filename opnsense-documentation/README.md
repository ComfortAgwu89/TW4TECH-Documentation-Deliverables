# OPNsense Documentation

[![License](https://img.shields.io/badge/License-2--Clause%20BSD-blue.svg)](./LICENSE)


[![Documentation](https://img.shields.io/badge/Documentation-OPNsense-blue.svg)](https://docs.opnsense.org/)

Documentation for OPNsense, an open-source, FreeBSD-based firewall and routing platform.

## Overview

This repository contains the source files and supporting resources used to build and maintain the OPNsense documentation.

The documentation provides information to help users understand, configure, operate, and contribute to the OPNsense project.

Read the full documentation on the **[OPNsense Documentation Website](https://docs.opnsense.org/)**.

## Status

The documentation is actively maintained and updated as the OPNsense project evolves.

## Prerequisites

Before building or contributing to the documentation, ensure that your development environment has the required tools and dependencies.

### Required Tools 

- Git
- Python
- Python pip
- GNU Make (gmake)
- Required system packages listed by the project.
- Python dependencies listed in the requirements.txt

Verify the versions and dependencies required by the current repository before starting development.

## Installation

### Native Installation

1. Clone the repository:
 ``` 
 git clone 
 https://github.com/opnsense/docs.git
 ```

2. Navigate into the repository: 
```
cd docs
```

3. Install the required system dependencies according to the project's current set-up.

4. Install the Python dependencies 
``` 
pip install -r 
requirements.txt --upgrade
```

5. Verify that the documentation build tools are available.

> **Note**: Use the dependency versions and installation commands defined by the current repository configuration.

## Docker Installation

Docker installation is not documented as an official installation method in the current documentation workflow.

Do not use an unofficial Docker workflow unless the project provides and maintains one.

If official Docker support is introduced, this section should document:

- Required Docker version.
- Docker image.
- Run command.
- Required environment variables.
- Port configuration.
- Volume configuration.

## Quick Start

After installing the required dependencies, build the documentation locally.

### Local Development 

To work on the documentation locally:

1. Clone the repsoitory.
2. Install the required dependencies.
3. Make your documentataion changes.
4. Build the documentation locally.
5. Review the generated output before submitting the changes.

### Live Preview

Install sphinx-autobuild if it is required by the current development workflow:
```
pip install
sphinx-autobuild
```

Start the local development server:
```
sphinx-autobuild source build/html
```
The documentation can then be viewed locally at:
```
http://localhost:8000
```
## Usage

### Build 

Build the HTML documentation using the project's Makefile:
```
gmake html
```
If the repository provides a different build command, use the command defined by the current Makefile.

### Clean the Build 

To remove generated documentation files:
```
gmake clean
```

### Deployment 

Deployment should follow the project's established documentation deployment workflow.

Before deploying:

1. Build the documentation locally.

2. Review the generated output.

3. Check for broken links and formatting issues.

4. Verify that code examples and commands are accurate.

5. Follow the project's approved deployment process.

> **Note**: Add the project's exact deployment command or workflow here after verifying it from the repository's existing deployment configuration.

## Configuration

The documentation build is configured through the repsoitory's build files, Sphinx configuration, Python dependencies, and supporting scripts.

| **Parameter/Resource** | **Description** | **Required** | **Default** |
|----|----|----|----|
| requirements.txt | Defines Pyton dependencies required by the documentation project | Yes | Repository-defined |
| Makefile | Provides documentation build and maintenance commands | Yes | Repository-defined |
| source/ | Contains documentation of source files | Yes | source/ |
| build/html | Local output directory used by the documentated live-preview workflow | No | build/html |
| Sphinx configuration | Defines documentation build behaviour and project settings | Yes | Repository-defined |

## Project Structure

The repository contains the source documentation, configuration, build files and supporting resources.

```
docs/

docs/
├── source/
├── lib/
├── .github/
├── requirements.txt
├── Makefile
├── README.md
├── CONTRIBUTING.md
└── LICENSE
```
The exact repository structure may change as the project evolves.

## Contributing

Contributions to the OPNsense documentation are welcome.

### Contribution Workflow

1. Fork the repository.

2. Clone your fork locally.

3. Create a new branch for your changes.

4. Make your documentation changes.

5. Build the documentation locally.

6. Review the generated documentation.

7. Commit your changes with a clear commit message.

8. Push your branch.

9. Open a pull request.

Before contributing, review [CONTRIBUTING.md](./CONTRIBUTING.md) for the project's current contribution requirements.

### Documentation Guidelines

When contributing:

- Use clear and consistent language.

- Use descriptive headings.

- Keep instructions step-by-step.

- Verify commands before documenting them.

- Keep examples accurate.

- Update related documentation when necessary.

- Avoid documenting unverified behavior.

- Follow the project's existing documentation conventions.

## Troubleshooting

### Dependency or Installation Problems

If the documentation does not build:

1. Confirm that the required system dependencies are installed.

2. Confirm that Python and pip are available.

3. Reinstall the repository dependencies:

```
pip install -r requirements.txt --upgrade
```

4. Clean the existing build:

```
gmake clean
```

5. Build the documentation again:
```
gmake html
```

## Live Preview Problems

If the live preview does not start, verify that sphinx-autobuild is installed:
```
pip install sphinx-autobuild
```
Then start the preview again:
```
sphinx-autobuild source build/html
```
### License

This documentation project is licensed under the **2-Clause BSD License**.

Additional Resources

[OPNsense Documentation](https://docs.opnsense.org)

[OPNsense Project](https://opnsense.org)

[OPNsense Documentation Repository](https://github.com/opnsense/docs)

[Contribution Guidelines](https://github.com/opnsense/docs/blob/master/CONTRIBUTING.md)







