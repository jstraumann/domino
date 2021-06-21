# Domino web application

This repo contains the code required for [domino.juergstraumann.ch](https://domino.juergstraumann.ch/).

## Development

* Install Ruby, preferrably v3.0.1. You can do so using [RVM](https://rvm.io/), the Ruby Version Manager.
* Install PostgreSQL, and create a DB named `domino_development`
* Open a terminal and cd into the application folder
* Install all libraries: `bundle install`
* Run the database migrations: `bundle exec rake db:migrate`
* Start the server: `bundle exec rackup`

If you change the Ruby files, you need to stop and restart the server.

## Deploying

Git push the code to the Dokku server.

## Screen setup

Domino is made to be run on a 50" touch screen (or an equally sized monitor
with IR touch frame). It can be interfaced by a Raspberry Pi by using the
following setup:

* Flash Raspberry OS to an SD card
* Insert the SD card into the Raspberry and boot it
* Run the following commands on the raspberry:
* Install unclutter to hide the mouse cursor: `sudo apt-get install unclutter`
* Restart the window manager: `sudo service lightdm restart`
* Disable the screensaver: Edit `/etc/xdg/lxsession/LXDE-pi/autostart` to look like this:

```bash
@lxpanel --profile LXDE
@pcmanfm --desktop --profile LXDE
@xset s off
@xset -dpms
@xset s noblank

@/home/pi/run.sh
```

* Create ~/run.sh: `touch run.sh && chmod +x run.sh`
* Add the following to run.sh:
```bash
#!/bin/sh
/usr/bin/chromium-browser --app=https://domino.juergstraumann.ch
  --kiosk
  --noerrdialogs
  --disable-session-crashed-bubble
  --disable-infobars
  --check-for-update-interval=604800
  --disable-pinch
```

* Reboot the Raspberry
* Click on the Menu -> `Preferences` -> `Raspberry Pi Configuration` ->
  `Performance` -> `Overlay file system` -> `Configure...` and enable `overlayFS`
  and the `read-only root` options.
