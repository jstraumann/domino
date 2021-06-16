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
