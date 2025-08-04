# Charlotte Toolkit - AI Security Analysis

> **Author**: Nathan Labadie (nathan.labadie@crowdstrike.com)  
> **Version**: 1.1.0 (Gold Release)

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

## What's New in Gold 1.1.0

### 🎯 **Enhanced User Experience**
- **Complete Context Icons**: Fixed missing icons in context dropdown - all entity types now display appropriate visual indicators
- **MITRE URL Copy**: MITRE technique IDs now have clickable copy buttons for easy URL sharing
- **Systematic Problem Solving**: Implemented sequential thinking methodology for comprehensive issue resolution

### 🛠️ **Technical Improvements**
- **Icon System Completeness**: Added missing TLD domain icons using systematic analysis
- **UI Component Consistency**: Standardized copy functionality across IOC and MITRE displays
- **Build Quality**: Enhanced code quality with comprehensive linting and validation

### 🔍 **Development Methodology**
- **Sequential Thinking Integration**: Used systematic analysis to identify and resolve UI inconsistencies
- **Context-Efficient Development**: Applied smart loading patterns for optimal performance
- **Professional Standards**: Maintained CrowdStrike design token compliance throughout

## Requirements

- Access to CrowdStrike Falcon platform
- Incident investigation permissions
- AI token quota available

---

**Charlotte Toolkit v1.1.0 (Gold Release)** - AI-powered security analysis for CrowdStrike Falcon

*Built by Nathan Labadie (nathan.labadie@crowdstrike.com)*
