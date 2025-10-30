# Charlotte Toolkit - AI Security Analysis

> **Author**: Nathan Labadie (nathan.labadie@crowdstrike.com)
> **Version**: 1.2.0

## What is Charlotte Toolkit?

Charlotte Toolkit brings AI-powered security analysis directly into your CrowdStrike Falcon incidents. Instead of switching between tools or copying data, Charlotte provides expert-level security analysis right where you're working.

Think of Charlotte as your 24/7 security analyst - always available to help you understand threats, analyze suspicious indicators, and accelerate your security investigations.

## Key Features

- **AI-Powered Analysis**: Multi-model support (Claude Latest, Claude 3.7 Sonnet, GPT-4o)
- **Automatic Context Detection**: Extracts security indicators from your incidents automatically
- **Comprehensive Coverage**: File analysis, network intelligence, email security, threat intelligence
- **Professional Output**: Executive summaries, technical details, actionable recommendations
- **MITRE ATT&CK Integration**: Tactical context with standardized threat framework
- **Secure by Design**: All analysis happens within your CrowdStrike environment

## What Charlotte Can Analyze

### File & Malware Analysis
- File hashes (MD5, SHA1, SHA256)
- Malware family classification  
- Behavioral analysis
- Digital signatures

### Network & Infrastructure
- IP address reputation
- Domain analysis
- Infrastructure correlation
- Network behavior patterns

### Email Security
- Email domain reputation
- Attachment analysis
- Phishing detection
- Campaign attribution

### Threat Intelligence
- Campaign attribution
- Threat actor profiling
- Attack pattern analysis
- IOC correlation

## How to Use Charlotte Toolkit

### Step 1: Open an Incident
Navigate to any security incident in your CrowdStrike console. Charlotte Toolkit will appear in the incident details panel.

### Step 2: Context Detection
Charlotte automatically identifies security indicators in your incident:
- **Domains** - Website addresses, email domains, C2 infrastructure
- **IP Addresses** - Network connections, suspicious endpoints
- **File Hashes** - Malware samples, suspicious executables
- **MITRE ATT&CK** - Technique IDs and tactical information

### Step 3: Choose Analysis Type
- **Quick Analysis**: Let Charlotte analyze all detected indicators
- **Focused Analysis**: Select specific indicators to analyze
- **Custom Analysis**: Add your own context or questions

### Step 4: Select AI Model
- **Claude Latest** - Most advanced analysis (recommended)
- **Claude 3.7 Sonnet** - Balanced approach
- **GPT-4o** - Alternative perspective

### Step 5: Configure Settings
- **Temperature**: Control creativity level (0.0-1.0)
- **Advanced Options**: Stop sequences, JSON schema, extra context
- **JSON Debug Tab**: Enable for detailed debugging

### Step 6: Execute Analysis
1. Review selected indicators and settings
2. Acknowledge AI token usage
3. Click "Analyze with Charlotte"
4. Review comprehensive results (typically 10-30 seconds)

## Understanding Charlotte's Analysis

Charlotte provides comprehensive analysis in several sections:

- **Executive Summary**: Quick overview with threat level and confidence assessment
- **IOC Details**: Comprehensive indicator analysis organized by type
- **MITRE ATT&CK Techniques**: Technique mapping with tactical context
- **Technical Analysis**: In-depth technical details and findings
- **Priority Actions**: Actionable security recommendations
- **Analysis Methodology**: Complete analytical transparency

## Example Questions

- "What can you tell me about this file hash?"
- "Is this IP address associated with known threats?"
- "Analyze this email domain for threats"
- "Are these indicators part of a known campaign?"
- "What threat actors use these techniques?"

## Advanced Features

- **Multi-Model Support**: Choose from different AI models for varied analysis perspectives
- **Custom Prompts**: Ask specific questions tailored to your investigation
- **JSON Schema**: Get structured results in specific formats
- **Batch Analysis**: Analyze multiple indicators simultaneously
- **Copy Functionality**: Easy copying of results for reports

## Security & Privacy

- **Local Processing**: All analysis occurs within your CrowdStrike environment
- **No Data Retention**: Charlotte doesn't store your incident data
- **Permission Aware**: Respects your existing access controls
- **Audit Trail**: Complete transparency for compliance

## What's New in v1.2.0

### 🛠️ **Code Quality & Tooling**
- **Biome Integration**: Migrated to Biome 2.2.6 for modern linting and formatting
- **Zero Lint Errors**: All code now passes Biome and Knip validation with zero errors
- **Dependency Updates**: Updated all npm dependencies to latest stable versions
- **Improved Build System**: Enhanced build configuration and validation

### 🎨 **Architecture Improvements**
- **Custom CSS**: Removed Tailwind CSS dependencies in favor of maintainable custom CSS
- **Type Safety**: Fixed all TypeScript errors and improved type definitions
- **Code Cleanup**: Removed unused code, comments, and old tooling infrastructure
- **Better Documentation**: Added proper explanations for linting suppressions

### 🎨 **UI Improvements**
- **Typography Consistency**: Unified font sizes across all components (14px base, 12px monospace, 11px badges)
- **Shadow DOM Styling**: Proper Shoelace component styling using `::part()` selectors and CSS custom properties
- **Visual Hierarchy**: Improved dropdown indentation and spacing for better readability
- **CSS Architecture**: Removed inline styles in favor of reusable CSS classes and utility patterns
- **Component Polish**: Optimized container spacing and visual balance throughout the UI

### 🔧 **Developer Experience**
- **Consistent Formatting**: Standardized code style across entire codebase
- **Git Integration**: Added proper .gitignore for VCS integration
- **Quality Scripts**: Enhanced npm scripts for linting, formatting, and validation

## Requirements

- Access to CrowdStrike Falcon platform
- Incident investigation permissions
- AI token quota available

---

**Charlotte Toolkit v1.2.0** - AI-powered security analysis for CrowdStrike Falcon

*Built by Nathan Labadie (nathan.labadie@crowdstrike.com)*
