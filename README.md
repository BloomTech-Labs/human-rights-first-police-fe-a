# Human Rights First FE

## Description

Our team is developing an interactive map that identifies potential instances of police use-of-force across the United States of America for Human Rights First, an independent advocacy and action organization. Here is a little the non-profit from their [website](https://www.humanrightsfirst.org/about):

> Human Rights First is an independent advocacy and action organization that challenges America to live up to its ideals. We believe American leadership is essential in the global struggle for human rights, so we press the U.S. government and private companies to respect human rights and the rule of law. When they fail, we step in to demand reform, accountability and justice. Around the world, we work where we can best harness American influence to secure core freedoms.
> We know it is not enough to expose and protest injustice, so we create the political environment and policy solutions necessary to ensure consistent respect for human rights. Whether we are protecting refugees, combating torture, or defending persecuted minorities, we focus not on making a point, but on making a difference. For almost 40 years, we've built bipartisan coalitions and teamed up with frontline activists and lawyers to tackle global challenges that demand American leadership.
> Human Rights First is a non-profit, nonpartisan international human rights organization based in New York, Washington D.C., Houston, and Los Angeles.

## Contributors

### Labs 33
[Lindsay Deaton](https://github.com/lindsay-deaton)

[Will Mondal](https://github.com/willmond-al)

[Paul Kim](https://github.com/lbu0413)


### labs 32
[Samuel Lee](https://github.com/AgentSamSA)

[Michael Maton](https://github.com/michael-maton)

[Brett McAdams](https://github.com/BrettMcAdams)

[Christopher Barrett](https://gist.github.com/Christopher-Barrett)

### Labs 31

[Victoria Mount](https://github.com/victoriamount)

[Maria Olsen](https://github.com/mcolsen)

[Sam Tarullo](https://github.com/starullo)

[Will Wearing](https://github.com/willwearing)

### Previous Teams

#### Labs 30

[Jason Long](https://github.com/jlong5795) (Technical Project Lead)

[Mark Rivera](https://github.com/MarkRivera)

[Michael Rockingham](https://github.com/mrockingham)

[Jen Stewart](https://github.com/jstewart8053)

## Deployed Product

[Front End Deployed Site](https://a.humanrightsfirst.dev/)

## Related Repos

[Back End Repo](https://github.com/Lambda-School-Labs/human-rights-first-be-a)

[Data Science Repo](https://github.com/Lambda-School-Labs/human-rights-first-ds-c)

## Getting Started

### Environment variables:

- A sample `.env` file named `.env.sample` is provided:

```
REACT_APP_CLIENT_ID=""
REACT_APP_OKTA_ISSUER_URI=""
REACT_APP_BACKENDURL="http://localhost:8000"
REACT_APP_MAPBOX_TOKEN=""
```

### Notable Libraries Used

- React
- Redux, React-Redux, [Redux Toolkit](https://redux-toolkit.js.org/)
- [React-Map-GL](https://visgl.github.io/react-map-gl/), [Supercluster](https://github.com/mapbox/supercluster)
- ChartJS
- Axios
- AntDesign, Styled Components

### User Flows

- User can see clusters of incidents on a map that breaks apart as they scroll in so that they can see more specifically where each incident in the cluster occurred.
- User is able to click on a data point within the map and view more details including date, description, tags, and sources.
- User can view charts by state or by use of force tags to see where incidents are more prevalent and what type of force is most commonly used.
- User can view incident data and browse through them using pagination
- User can view trends in data with data visualizations in the form of graphs
- User can download the publicly available data in CSV or JSON format

### Project File Hierarchy

Where to find important files in this project:

`📂 src`

- `index.js` <- project entry

- `index.css`

- `App.js`

- `📂 components`

  - `📂 about`

  - `📂 AdminDashboard`

      - `📂 AntTable`

  - `📂 Footer`

  - `📂 graphs` <- this has multiple sets of assets for the graphs

  - `📂 Home`

    - `📂 Map`

  - `📂 incidents`

  - `📂 Login`

  - `📂 NavBar`

  - `📂 Stats` <- stats carousel for home page

  - `📂 timeline` <- timeline component for home page

  - `OktaWrapper.js` <- wraps Okta's `Security` component for use with React Router's `useHistory` hook

- `📂 hooks`

  - `useFetchIncidents.js`

  - `useMapSearch.js` <- date and geographic filtering helpers

- `📂 store`

  - `index.js` <- Redux store

  - `*Slice.js` <- Redux Toolkit slices

- `📂 utils`

  - `oktaConfig.js`

  - `test-utils.js` <- Jest/React Testing Library setup

- `📂 assets`

    - `📂 LambdaAssets` <- Lambda Logos

- `📂 styles`

### Architecture

- DS backend scrapes and shapes data
- Web BE gets data from DS backend through a cron job and updates Web Database
- Web FE can use endpoints to fetch an incident by or all incidents (currently we are only fetching all incidents at once)

### End Points

- `Incidents`

  - [`https://humanrightsfirst-a-api.herokuapp.com/incidents/getincidents`](https://humanrightsfirst-a-api.herokuapp.com/incidents/getincidents) --> returns an array of all incident objects
  - [`https://humanrightsfirst-a-api.herokuapp.com/incidents/gettimeline`](https://humanrightsfirst-a-api.herokuapp.com/incidents/gettimeline`) --> returns events for the timeline on the map component
  - [`https://humanrightsfirst-a-api.herokuapp.com/incident/:id`](https://humanrightsfirst-a-api.herokuapp.com/incidents/incident/:id`) --> returns single incident object if the incident_id passed in is valid
