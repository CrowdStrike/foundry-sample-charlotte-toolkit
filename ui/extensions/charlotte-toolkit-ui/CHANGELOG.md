# Changelog

## [Unreleased] - 2025-10-27

### Added
- Created `.gitignore` file for proper VCS integration with Biome linter

### Changed
- Consolidated v1.2.0 changes - removed old tooling and test infrastructure
- Updated all npm dependencies to latest versions
- Migrated to Biome 2.2.6 for linting and formatting
- Removed Tailwind CSS dependencies in favor of custom CSS

### Fixed
- Resolved biome linting issues throughout codebase
- Fixed biome suppression placeholder in `copyUtils.ts` with proper explanation
- Fixed TypeScript errors by adding `@types/node` dependency
- Fixed broken CSS imports after Tailwind removal
- Replaced TruncatedText component with inline SlTooltip implementation

### Maintenance
- Applied Biome linter auto-fixes across all files
- Configured Biome rules to match project patterns
- Cleaned up unused biome-ignore comments
- Fixed Biome configuration and lint scope settings
- All linting checks now pass (Biome and Knip with zero errors)