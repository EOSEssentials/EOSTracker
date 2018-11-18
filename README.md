This project is a fork of the [EOS Tracker](https://github.com/EOSEssentials/EOSTracker) project 

EOS Tracker is a Frontend based on Angular4 that connects to [EOS Tracker API](https://github.com/EOSEssentials/EOSTracker-API).

Server
------------

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Build
------------

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.


Add Custom Tokens
------------

Add more custom tokens to assets/tokenlist.json


Deploy
------------

Deploy to Google Cloud App Engine
```
gcloud config set project open-rights-exchange
gcloud -q app deploy app.yaml
```

Note: The dispatch.yml file in the ore-verifier repo was used to route traffic to https://explorer.openrights.exchange
