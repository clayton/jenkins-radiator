## Jenkins CI Radiator

A small backbone.js application that monitors your Jenkins CI build server and displays failing, passing, building and disabled jobs. Audio is played when jobs move from a passing state to a failing state or from a failing state to a passing state.

### Jenkins Configuration

Since version 1.502 of Jenkins the jsonp access to the API which Jenkins CI Radiator uses
is only available if the `hudson.model.Api.INSECURE` System Property is set to `true`

You can set this by specifying it as a command line argument when you start Jenkins:

    java -jar -Dhudson.model.Api.INSECURE=true jenkins.war

If this System Property is not set then Jenkins CI Radiator will hang on 'Loading...' page.

This issue is being tracked in the Jenkins JIRA [here](https://issues.jenkins-ci.org/browse/JENKINS-16936)
### Installation

1. Download a [zip of the project](https://github.com/clayton/jenkins-radiator/downloads)
2. Extract that zip
3. Configure the radiator (see below)
4. Open `index.html` in Safari or Chrome

### Configuration

1. Edit `config.js` and update the `ci_json_url` to point to your Jenkins instance
2. Open `index.html` in Chrome or Safari

### Optional Configuration

* Edit `config.js` to:
  * Set the `refresh_interval` to something other than 1 minute
  * Set `all_green_html` to be the text, icon or image to appear when all builds are green<br/>
    e.g. `all_green_html: 'All Good!'` or `all_green_html: <img src="green.png/>`<br/>
    Default is the heart shown in the screenshot below.

* Add job names that should not be counted towards a failing status to the `filtered` array

### Screenshots

__Failing Builds__
![Failing Builds in Jenkins Radiator](https://dl.dropbox.com/u/14820/jenkins-radiator-failing.png)

__Passing Builds__
![Passing Builds in Jenkins Radiator](https://dl.dropbox.com/u/14820/jenkins-radiator-passing.png)

