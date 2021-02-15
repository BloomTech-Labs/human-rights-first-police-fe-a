# Human Rights First FE

## Description

Our team is developing an interactive map that identifies potential instances of police use-of-force across the United States of America for Human Rights First, an independent advocacy and action organization. Here is a little the non-profit from their [website](https://www.humanrightsfirst.org/about):

> Human Rights First is an independent advocacy and action organization that challenges America to live up to its ideals. We believe American leadership is essential in the global struggle for human rights, so we press the U.S. government and private companies to respect human rights and the rule of law. When they fail, we step in to demand reform, accountability and justice. Around the world, we work where we can best harness American influence to secure core freedoms.
> We know it is not enough to expose and protest injustice, so we create the political environment and policy solutions necessary to ensure consistent respect for human rights. Whether we are protecting refugees, combating torture, or defending persecuted minorities, we focus not on making a point, but on making a difference. For almost 40 years, we've built bipartisan coalitions and teamed up with frontline activists and lawyers to tackle global challenges that demand American leadership.
> Human Rights First is a non-profit, nonpartisan international human rights organization based in New York, Washington D.C., Houston, and Los Angeles.

<br>

## Contributors

|                                           [Jason Long](https://github.com/jlong5795)                                           |                                        [Mark Rivera](https://github.com/MarkRivera)                                         |                                        [Michael Rockingham](https://github.com/mrockingham)                                         |                                          [Jen Stewart](https://github.com/jstewart8053)                                          |
| :----------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------: |
|      [<img src="https://ca.slack-edge.com/ESZCHB482-W012JQ21VFD-01cf6b4b0f96-512" width = "200" />](https://github.com/)       |     [<img src="https://ca.slack-edge.com/ESZCHB482-W0123RRAYGP-24a11c5a21c0-512" width = "200" />](https://github.com/)     |         [<img src="https://ca.slack-edge.com/ESZCHB482-W012BRSM0CE-4185df18f7ee-512" width = "200" />](https://github.com/)         |       [<img src="https://ca.slack-edge.com/ESZCHB482-W016369SB7T-5bc27b0171fc-512" width = "200" />](https://github.com/)        | [<img src="https://ca.slack-edge.com/ESZCHB482-W012JQ3D2AX-e0654ed5ac8d-512" width = "200" />](https://github.com/) |
|                     [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/jlong5795)                     |                   [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/MarkRivera)                   |                      [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/mrockingham)                       |                    [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/jstewart8053)                     |
|                                                     Technical Project Lead                                                     |                                                        Web Developer                                                        |                                                            Web Developer                                                            |                                                          Web Developer                                                           |
| [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/jasonlong1231/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/Mrivera1991) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/michaelkrockingham/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/jen-stewart-feb/) |

<br>
<br>

## Deployed Product

[Front End Deployed Site](https://a-30.humanrightsfirst.dev/)

[Back End Deployed Site](https://humanrightsfirst-a-api.herokuapp.com/)

[Data Science Deployed Site](http://human-rights-first-labs28-c.eba-sfzun5yy.us-east-1.elasticbeanstalk.com/)

## Linked Repos

[Front End Repo](https://github.com/Lambda-School-Labs/human-rights-first-fe-a)

[Back End Repo](https://github.com/Lambda-School-Labs/human-rights-first-be-a)

[Data Science Repo](https://github.com/Lambda-School-Labs/human-rights-first-ds-c)

## Getting Started

[Inherited Work](https://github.com/Lambda-School-Labs/human-rights-first-fe-c/pull/17)

- How to get started working with this repo

  - See TPL about `.env` file configuration

    ```
    REACT_APP_BACKENDURL = "WEB_API_DEPLOYMENT_URL"
    REACT_APP_MAPBOX_TOKEN = "MAPBOX_GL_TOKEN"
    ```

- Where each portion is deployed
  - FE: Deployed on AWS Amplify
  - BE: Deployed in Heroku
  - DS: Deployed on AWS Elastic Beanstalk

## Tech Stack Used

- List the tech stack used
  - ReactJS
  - MapBoxGL, React-Map-GL, Supercluster, Use-Supercluster (map)
  - Chart JS
  - Axios (fetches server data)
  - AntDesign
  - Redux

## User Flows

- User can see clusters of incidents on a map that breaks apart as they scroll in so that they can see more specifically where each incident in the cluster occurred.
- User is able to click on a data point within the map and view more details including date, description, tags, and sources.
- User can view charts by state or by use of force tags to see where incidents are more prevelant and what type of force is most commonly used.
- User can view incident data and browse through them using pagination
- User can view trends in data with data visualizations in the form of graphs
- User can download the publicly available data in CSV or JSON format

## Architecture (Same for all repos)

- DS backend scrapes and shapes data
- Web BE gets data from DS backend through a cron job and updates Web Database
- Web FE can use endpoints to fetch an incident by or all incidents (currently we are only fetching all incidents at once)

- Describe the file hierarchy and where to find things

- FE specific file hierarchy

- src >> index.js >> `App()`

  - `NavBar` on all pages
  - Switch / Routes for all page view components
  - Important Page Views:

    - `path='/'` --> `<MapView/>`
    - `path='/graph'` --> `<GraphContainerView/>`
    - `path='/incidents'` --> `<IncidentsContainerView />`
    - `path='/about'` --> `<AboutPageView />`

* `ChartsNavBar` displayed on Map, Bar, and Pie Charts to switch between chart views

* src >> components >>

  - 📂 `Map` 📂

    - `MapView.js` --> renders both the container for the Map and an incidents viewer side-by-side on the page

      - `Pagination.js` gives users the option of what chart to view

      - `MapContainer.js`

        - MapContainer renders the MapboxGL Map as well as the ClusterMarkers that represent underlying data points
        - `ClusterMarkers.js`

          - cluster markers can add `incidentsOfInterest` to state
          - size of cluster is calculated using weird formula -- this could be improved so that as the data set gets larger we don't have to continually update this function
            - `${10 + (pointCount / points.length) * 600}px`
            - the clusters are offset to the left and vertically to center the circle properly
            - the value we want to pass to the offsets is _negative_ (1/2 of the width or height) pixels
              - `offsetLeft={-(10 + (pointCount / points.length) * 600) / 2}` <--> same as offsetTop

      - `IncidentsViewer.js`
        - IF there are no `incidentsOfInterest`, we display a message explaining to the users they can click on a cluster to view the incident data
        - If there are `incidentsOfInterest`, we map through all the relevant incident data and display underlying incident info for the user to explore to the right of the map

  - 📂 `bar_chart` 📂

    - `BarGraph.js` --> renders the container for displaying a bar chart that totals incidents by state

      - `Pagination.js` gives users the option of what chart to view

        - fetches incident data using custom `useIncidents()` hook and renders the actual bar graph

        - `BarChart.js`
          - ChartJS component that uses the data we passed in ... expects an array of objects

  - 📂 `pie_chart` 📂

    - `PieGraph.js` --> renders the container for displaying a pie chart that totals incidents by type-of-force tags provided by our DS backend

      - `Pagination.js` gives users the option of what chart to view
      - `PieGraph.js`

        - renders `<PieGraph>` in a very similar way as the bar char
        - `PieGraph.js`
          - ChartJS component that uses the data we passed in ... expects an array of objects

## Updates To Repo in Labs 29

- Optimized Map and unified code databases
- Added 3 ChartJS components to display data in different visually appealing ways
- Charts fed data by parent component

## End Points

- `Incidents`

  - [`https://humanrightsfirst-a-api.herokuapp.com/incidents/getincidents`](https://humanrightsfirst-a-api.herokuapp.com/incidents/getincidents) --> returns an array of all incident objects
  - [`https://humanrightsfirst-a-api.herokuapp.com/incidents/gettimeline`](https://humanrightsfirst-a-api.herokuapp.com/incidents/gettimeline`) --> returns events for the timeline on the map component
  - [`https://humanrightsfirst-a-api.herokuapp.com/incident/:id`](https://humanrightsfirst-a-api.herokuapp.com/incidents/incident/:id`) --> returns single incident object if the incident_id passed in is valid

## Issues / Bugs

## Support (BE, FE, or DS specific)

Who to contact for further support. Jason Long, Mark Rivera or Michael Rockingham
