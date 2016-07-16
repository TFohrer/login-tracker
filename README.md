# login-tracker
Browser-Extension for BA Thesis "Quantifizierung von Web-Authentifizierungs-Tasks"

## What it does
Track how often user logs in, how much time he spends and what technique are beeing used (PW-Managers, In-Browser-PW-Manager)

## Development notes

Install all bower dependencies via
 
    $ bower install

simply run the extension with profile previous created profile (see: https://support.mozilla.org/en-US/kb/profile-manager-create-and-remove-firefox-profiles):

    $ jpm run --profile login-tracker

## Debugging
### live reload for development

- install Firefox-Addon "Extension Auto-Installer"
- add "permissions" to package.json to display console logs in live-reload (!remove when sending the plugin to signing)
```
        "permissions": {
          "unsafe-content-script": true
        }
```
- run Firefox 
- run 
    jpm watchpost --post-url http://localhost:8888



## Testing

    $ jpm test
