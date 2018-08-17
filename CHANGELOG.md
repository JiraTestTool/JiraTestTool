# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.2] - 2018-08-17
### Fixed
- improved handling of the pipe ("|") character during Import into A1 cell
### Changed
- standardized the naming of step name column (i.e. "Step #" or "VP #" or "Precondition #")
- a prompt is now displayed when columns are missing
- new official Google Sheets template link: https://jiratesttool.github.io/JiraTestTool/
- improved instructions on the Google Sheets template for better readability and clarity with pictures and GIFs


## [1.1.1] - 2018-07-03
### Removed
- removed a feature that allowed for a double back-slash to be interpreted as a new line break since that is how JIRA reads it. This feature did not maintain the table structure after pasting into JIRA.


## [1.1.0] - 2018-07-01
### Added
- added an option to setup the Input/Output/Keywords sheets from an empty spreadsheet.
- added a feature to allow for auto numbering of steps, preconditions, and VPs.
- added a feature to allow for a double back-slash to be interpreted as a new line break since that is how JIRA reads it. (Eric Cole)
- added this changelog.

### Changed
- improved error handling.
- improved runtime by reducing sheet updates.

### Fixed
- fixed the issue that generates an error when a quotation mark is in a cell. (Eric Cole)
- fixed the issue that generates an error when a number only is used in a cell. (Eric Cole)


## [1.0.0] - 2018-05-18
First version.

[Unreleased]: https://github.com/mfekadu/JiraTestTool/compare/v1.0.0...HEAD
[1.1.2]: https://github.com/mfekadu/JiraTestTool/compare/v1.1.0...v1.1.2
[1.1.1]: https://github.com/mfekadu/JiraTestTool/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/mfekadu/JiraTestTool/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/mfekadu/JiraTestTool/releases/tag/v1.0.0
