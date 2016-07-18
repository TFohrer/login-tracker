# login-tracker
Browser-Extension for BA Thesis "Quantifizierung von Web-Authentifizierungs-Tasks"

## What it does
Track how often user logs in, how much time he spends, what technique are beeing used (PW-Managers, In-Browser-PW-Manager) and what is the password security score 
measured with the [zxcvbn-Plugin](https://github.com/dropbox/zxcvbn)   

## Development notes

Install all bower dependencies via
 
    $ bower install

Simply run the extension with previous created profile (see: https://support.mozilla.org/en-US/kb/profile-manager-create-and-remove-firefox-profiles):

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


## Frameworks

* [jQuery (1.12.4)](https://jquery.com/) for easier DOM traversal
* [simple-storage](https://developer.mozilla.org/en-US/Add-ons/SDK/High-Level_APIs/simple-storage) is used for saving user id to identify user across Firefox restarts.
* [zxcvbn](https://github.com/dropbox/zxcvbn) to estimate password strength

## Testing

    $ jpm test
