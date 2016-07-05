# login-tracker
Browser-Extension for BA Thesis 

## login tracker development notes

simply run the extension with profile previous created profile (see: https://support.mozilla.org/en-US/kb/profile-manager-create-and-remove-firefox-profiles):

    jpm run --profile login-tracker

## debuging
### live reload for development

- install Firefox-Addon "Extension Auto-Installer"
- jpm watchpost --post-url http://localhost:8888/
- add "permissions" to package.json to display console logs in live-reload (!remove when sending the plugin to signing)
```
        "permissions": {
          "unsafe-content-script": true
        }
```
