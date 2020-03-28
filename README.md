<br><br>
<p align="center">
<img src="src/assets/logo.png" width=185><br>
a cloud-native video call app with quality metrics https://vuedeo.now.sh
</p>
<br><br>


## Architecture

### <img title="Vue.js Logo" src="https://vuejs.org/images/logo.png" height=40 valign="middle"> + <img title="Zeit Logo" src="https://assets.zeit.co/image/upload/q_auto/front/assets/design/zeit-black-full-logo.svg" height=40 valign="middle"> + <img title="Daily.co" src="https://assets.website-files.com/59c9811db5fc1c0001445dbd/5b64ba2f8309508c4161c103_logo-daily-fullcolor-lightground.svg" height=40 valign="middle">
Created using [Vue](https://vuejs.org/) (and `vue-router`), built and deployed onto [Zeit](https://zeit.co/) CDN, with video chat provided by [Daily.co](https://daily.co).



## Local Development

Assuming you have `nodejs` and `npm` available, install the [Zeit Now CLI](https://zeit.co/download) to handle local development and any manual deployments to the CDN:

```shell
npm i -g now
```

The first time `now` is run from the project's directory, it will help you log in to your Zeit account. After that, the simple `now` command will build and deploy right from the terminal and give you a link to the new preview environment. Running `now --prod` will deploy to production.

Here's what it looks like getting set up:

<img src="https://user-images.githubusercontent.com/21961562/77701778-0a28c900-6f85-11ea-86d9-2dd9563ea4d9.png" alt="Screenshot of Neit Now installation" width="66%">

A standard `npm i` will install the dependencies for this project.

For local development, run `now dev`, which will start a server listening at http://localhost:3000 and away you go!

To access the Daily API in development, create a `.env` file that contains at least:

```
DAILY_API_KEY = <your Daily.co API key>
```

For test and production environments, these values are stored and retrieved by `now secrets`. This keeps the secrets and config values secure, as `.env` is never committed.

## Automatic Deployment

I've connected Zeit with Github, so when I push changes or create a PR, a preview URL is generated. When merging, users with appropriate access can also deploy to production through the Github integration.



## Productionization<sup>[1](#footnote1)</sup>

To put this project into production and to make it scale to thousands of concurrent users is actually not that hard. A "JAMStack" and/or "cloud native" approach lends itself to scaling by increasing the capacity of the connected services; the code would only need minor changes and a few features added.

- **Observability**. Prometheus or similar for monitoring and alerting on the Timescale DB instance would be a good start. Sentry or Rollbar are popular choices for logging what's going on for the front- and back-end. We want to have ways of digging into problems and notifications firing off when new errors are observed.
- **Authorization**. Ether internal or third-party authorization (probably via OAuth) would be a basic requirement before taking a service like this "live". From there, user management, organizations of users, and role-based permissions would make sense.
- **Testing**. A project like this would need automated tests on all supported browsers in addition to unit testing (such as Mocha) to smoke out errors early in the software development workflow. Browser-based integration testing of major features would not be a bad idea either. All tests can be kicked off automatically in the PR process, plugging into Zeit or Github via webhook.
- **Throw money at it**. As usage ramps up, you would monitor the traffic and perform capacity planning to be sure you're keeping an eye on spend and not bumping the usage ceilings for each connected service: Zeit, Timescale, and Daily.co. At a certain point, it may make sense to start self-hosting the services to reduce OpEx and to give greater control (i.e. maintenance windows, tuning configurations, failover plans, industry compliance, etc).



<br>

---



<a name="footnote1">1</a>: _definitely a real word_