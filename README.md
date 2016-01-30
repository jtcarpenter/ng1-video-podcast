# CNN Video Podcast

## App structure

The application is broken up into modules, which control different parts of th UI.    

The 'components' module includes shared components used by other modules.    

This app is very simple so the modules are very small, but this structure can serve more complex apps.    

```
app/
    app.css                 --> All CSS
    app.js                  --> Bootstrap file
    modules/                --> App specific modules
        components/
            **.js
            **.view.html
        header/
            **.js
            **.view.html
        nav/
            **.js
            **.view.html
        player/
            **.js
            **.view.html
    index.html              --> The index HTML file
```

## Run the node server

The app uses a very simple proxy server written in NodeJS. Node and NPM must be installed.    

The app can be started as followed. All dependencies are defined in package.json and should be installed.    

```
$ cd videopodcast
$ npm start
```

Once running the app should be available at [http://localhost:3000](http://localhost:3000)    

### Vagrant

There is a very simple Vagrant script included.    

The VM will be created with a private network IP of 192.168.33.22     

```
$ vagrant up
$ vagrant ssh
$ cd /var/www/videopodcast
$ npm start
```

Once running the app should be available at [http://192.168.33.22:3000](http://192.168.33.22:3000)    

To create the VM with a different IP, instead run:    

```
$ IP="192.168.**.**" vagrant up
```

## Tests

There are unit tests written in Jasmine under ```tests/```    

The tests can be run using [Karma](https://karma-runner.github.io) test runner.    

```
$ sudo npm install -g karma-cli
$ npm test
```
