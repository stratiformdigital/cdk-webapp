<h1 align="center" style="border-bottom: none;"> cdk-webapp</h1>
<h3 align="center">A cloud-native, serverless form submission application deployed to AWS with SST and the AWS CDK.</h3>
<p align="center">
  <!--
  The following badges won't be functional unless the repository is public.
  <a href="https://github.com/stratiformdigital/cdk-webapp/releases/latest">
    <img alt="latest release" src="https://img.shields.io/github/release/stratiformdigital/cdk-webapp.svg">
  </a>
 <a href="https://github.com/stratiformdigital/cdk-webapp/actions/workflows/codeql-analysis.yml">
    <img alt="CodeQL" src="https://github.com/stratiformdigital/cdk-webapp/actions/workflows/codeql-analysis.yml/badge.svg?branch=main">
  </a>
  -->
  <a href="https://symmetrical-disco-67126a20.pages.github.io">
    <img alt="Docs" src="https://img.shields.io/badge/Docs-Pages-blue.svg">
  </a>
  <a href="https://stratiformworkspace.slack.com/archives/C03PPFBCLQ5">
    <img alt="Slack" src="https://img.shields.io/badge/Slack-accelerators-purple.svg">
  </a>
  <a href="https://dependabot.com/">
    <img alt="Dependabot" src="https://badgen.net/badge/Dependabot/enabled/green?icon=dependabot">
  </a>
  <a href="https://codeclimate.com/repos/62ba4d05ce718301a400cbad/maintainability">
    <img src="https://api.codeclimate.com/v1/badges/224d6a63e41ff1fca06f/maintainability" />
  </a>
  <a href="https://github.com/prettier/prettier">
    <img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square">
  </a>
  <a href="https://github.com/semantic-release/semantic-release">
    <img alt="semantic-release: angular" src="https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release">
  </a>
  <!-- <a href="https://codeclimate.com/github/stratiformdigital/cdk-webapp/test_coverage">
    <img alt="Test Coverage" src="https://api.codeclimate.com/v1/badges/1449ad929006f559756b/test_coverage">
  </a> -->

</p>

---

### Please visit the [cdk-webapp documentation site](https://symmetrical-disco-67126a20.pages.github.io) for complete documentation. This README is just an introduction.

---

## Overview

The cdk-webapp project is a template for a serverless, cloud native, form submission application. A react frontend is presented to the user by way of S3 and Cloudfront. Users submit form data and blob uploads (PDFs, etc.) to the application. Form data goes directly to an API Gateway backed by lambda, and blob data goes directly to an S3 bucket where it is virus scanned. A DynamoDB Stream, a Lambda, and SES are used to send confiration of user submission. All of this is protected by AWS Cognito.

The actual application is fairly 'hello world', but the repository support and configuration is full featured. This is by design, to allow for simpler project creation from the template. Full CI/CD support with GitHub Actions, automated security scanning, docs site in GitHub Pages, PR/Issue templates, infrastructure and application deployment workflows, etc. is all included.

![diagram](docs/assets/diagram.svg)

## Contributing

You can check out our current open issues [here](https://github.com/stratiformdigital/cdk-webapp/issues). Please feel free to open new issues for bugs or enhancements.

Pull requests from forks are being accepted.

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT) by [Stratiform Digital LLC](https://stratiform.digital)

See [LICENSE](LICENSE) for full details.

## Contributors

| [![Mike Dial][dial_avatar]][dial_homepage]<br/>[Mike Dial][dial_homepage] | [![Doug White][white_avatar]][white_homepage]<br/>[Doug White][white_homepage] | [![Berry Davenport][davenport_avatar]][davenport_homepage]<br/>[Berry Davenport][davenport_homepage] |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- |

[dial_homepage]: https://github.com/mdial89f
[dial_avatar]: https://avatars.githubusercontent.com/mdial89f?size=150
[white_homepage]: https://github.com/dwhitecl
[white_avatar]: https://avatars.githubusercontent.com/dwhitecl?size=150
[davenport_homepage]: https://github.com/berryd
[davenport_avatar]: https://avatars.githubusercontent.com/berryd?size=150
