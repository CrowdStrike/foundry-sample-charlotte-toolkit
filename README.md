![CrowdStrike Falcon](/images/cs-logo.png?raw=true)

# Charlotte Toolkit sample Foundry app

The Charlotte Toolkit sample Foundry app is a community-driven, open source project which serves as an example of an app which can be built using CrowdStrike's Foundry ecosystem. `foundry-sample-charlotte-toolkit` is an open source project, not a CrowdStrike product. As such, it carries no formal support, expressed or implied.

This app is one of several App Templates included in Foundry that you can use to jumpstart your development. It comes complete with a set of preconfigured capabilities aligned to its business purpose. Deploy this app from the Templates page with a single click in the Foundry UI, or create an app from this template using the CLI.

> [!IMPORTANT]  
> To view documentation and deploy this sample app, you need access to the Falcon console.

## Description

Charlotte Toolkit brings AI-powered security analysis directly into your CrowdStrike Falcon incidents. Instead of switching between tools or copying data, Charlotte provides expert-level security analysis right where you're working.

## Prerequisites

* The Foundry CLI (instructions below).
* Node 22+ (needed if modifying the app's UI). See https://nodejs.org for installation instructions.

### Install the Foundry CLI

You can install the Foundry CLI with Scoop on Windows or Homebrew on Linux/macOS.

**Windows**:

Install [Scoop](https://scoop.sh/). Then, add the Foundry CLI bucket and install the Foundry CLI.

```shell
scoop bucket add foundry https://github.com/crowdstrike/scoop-foundry-cli.git
scoop install foundry
```

Or, you can download the [latest Windows zip file](https://assets.foundry.crowdstrike.com/cli/latest/foundry_Windows_x86_64.zip), expand it, and add the install directory to your PATH environment variable.

**Linux and macOS**:

Install [Homebrew](https://docs.brew.sh/Installation). Then, add the Foundry CLI repository to the list of formulae that Homebrew uses and install the CLI:

```shell
brew tap crowdstrike/foundry-cli
brew install crowdstrike/foundry-cli/foundry
```

Run `foundry version` to verify it's installed correctly.

## Getting Started

Clone this sample to your local system, or [download as a zip file](https://github.com/CrowdStrike/foundry-sample-charlotte-toolkit/archive/refs/heads/main.zip) and import it into Foundry.

```shell
git clone https://github.com/CrowdStrike/foundry-sample-charlotte-toolkit
cd foundry-sample-charlotte-toolkit
```

Log in to Foundry:

```shell
foundry login
```

Select the following permissions:

- [ ] Create and run RTR scripts
- [x] Create, execute and test workflow templates
- [ ] Create, run and view API integrations
- [ ] Create, edit, delete, and list queries

Deploy the app:

```shell
foundry apps deploy
```

> [!TIP]
> If you get an error that the name already exists, change the name to something unique to your CID in `manifest.yml`.

Once the deployment has finished, you can release the app:

```shell
foundry apps release
```

Next, go to **Foundry** > **App catalog**, find your app, and install it. Go to **Next-Gen SIEM** > **Incidents**, then click on an incident and **See full incident**. Once you click on a node in the workbench, you'll be able to see the UI extension from this app.

## About this sample app

**Key Features:**
- **AI-Powered Analysis**: Multi-model support (Claude Latest, Claude 3.7 Sonnet, GPT-4o)
- **Automatic Context Detection**: Extracts security indicators from your incidents automatically
- **Comprehensive Coverage**: File analysis, network intelligence, email security, threat intelligence
- **Professional Output**: Executive summaries, technical details, actionable recommendations
- **MITRE ATT&CK Integration**: Tactical context with standardized threat framework
- **Secure by Design**: All analysis happens within your CrowdStrike environment

See this sample's [App docs README](app_docs/README.md) for more information.

## Foundry resources

- Foundry documentation: [US-1](https://falcon.crowdstrike.com/documentation/category/c3d64B8e/falcon-foundry) | [US-2](https://falcon.us-2.crowdstrike.com/documentation/category/c3d64B8e/falcon-foundry) | [EU](https://falcon.eu-1.crowdstrike.com/documentation/category/c3d64B8e/falcon-foundry)
- Foundry learning resources: [US-1](https://falcon.crowdstrike.com/foundry/learn) | [US-2](https://falcon.us-2.crowdstrike.com/foundry/learn) | [EU](https://falcon.eu-1.crowdstrike.com/foundry/learn)

---

<p align="center"><img src="/images/cs-logo-footer.png"><br/><img width="300px" src="/images/adversary-goblin-panda.png"></p>
<h3><p align="center">WE STOP BREACHES</p></h3>
