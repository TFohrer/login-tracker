# login tracker development notes

simply run the extension with profile:

    jpm run --profile login-tracker

live reload
    - install Firefox-Addon "Extension Auto-Installer"
    - jpm watchpost --post-url http://localhost:8888/
    - add "permissions": {
              "unsafe-content-script": true
            },
        to display console logs in live-reload