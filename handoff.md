# Welcome labs_39 Frontend Devs!

##### This file is meant to help clear things up for the frontend repo and provide some direction as you start on the project. Be sure to also look at the Trello board user stories as well to know where you can start your work - that’s the best way to begin understanding the codebase. We know how overwhelming this can be at first. If you get stressed or have any questions and the answer is not in here, know that you can reach out to any member of the previous cohort on slack for help. Good luck this month! 

### Product Review
Feel free to watch our most recent product review meeting where we highlight some of the most recent work we’ve done and the next steps to take. https://www.youtube.com/watch?v=K92fUDY-xMQ&ab_channel=LambdaSchool 


### Quick Notes
####UI/UX:
We are using ant design for some styling/components.  https://ant.design/docs/react/introduce, Look at the code examples and the API documentation at the bottom of the pages for the component docs
There may be CSS located in the node_modules file because of certain libraries being used...  If you want to change one of these components' styling, you may have to find the CSS in the Node_modules that is associated with it, then overwrite that CSS by coding it in the src code.  node_modules is in the .gitignore file so any changes you make here will be ignored when you push your code.  If you have more questions please please please reach out to one of us because this concept was a bit weird and annoying to implement at first.
A lot of the css has repeats in the index.css, make sure to delete those extra and unused selectors as you go.
Just a reminder that importing a css or less files in a react component doesn’t make those styles specific to that component, className is your friend.

#### .env file:
Be sure to add the mapquest key to the .env file! (refer to Trello board > documentation and admin credentials or get your own key https://developer.mapquest.com/ )

####Testing:
Testing is one of those things we all assume someone else can work on and the testing coverage is not that great currently, that can always be improved upon.

#### Data Flow:
* Full walkthrough of the data flow for the form feature Labs 37 implemented (including bugs to be fixed) https://youtu.be/dRBYRQ5QpoI - main take-away is that the project is using the DS database! Frontend is hitting backend endpoints, backend is mostly checking authentication, authorization and req.body validity then hitting the DS database - more information is provided in the backend repo handoff
* Redux is set up but hardly being used, feel free to convert some components to be utilizing this
* You might want to check these out [https://react-redux.js.org/api/hooks#useselector](https://react-redux.js.org/api/hooks#useselector) to get from state and [https://redux-toolkit.js.org/api/createslice](https://redux-toolkit.js.org/api/createslice) to set up state and actions
* Slices contain both the action and reducer for a object or component, so for instance, here’s what the incident slice looks like:
import { createSlice } from '@reduxjs/toolkit';
```
 const slice = createSlice({
   name: 'incident',
   initialState: { data: {}, ids: [], timeline: [], tagIndex: {} },
   reducers: {
     onInitialFetch: (state, action) => {
       state.data = action.payload.incidents;
       state.ids = action.payload.ids;
       state.timeline = action.payload.timeline;
       state.tagIndex = action.payload.tagIndex;
     },
   },
 });

 export default slice;
```

  * From our understanding, initialState is both the action and the reducer, which gets imported into functions like useFetchIncidents to then make the axios requests to the web backend APIs and or the DS APIs (depending on the component):
```
import { apiActions, incidentActions } from '../store';
 const { setInitialFetchStatus } = apiActions;
 const { onInitialFetch } = incidentActions;

 export default function useFetchIncidents() {
   const dispatch = useDispatch();

   const fetch = useCallback(async () => {
     try {
       dispatch(
         setInitialFetchStatus({
           getincidents: { status: 'pending' },
           gettimeline: { status: 'pending' },
         })
       );

       const { data: incidentsRes } = await axios.get(
         `${process.env.REACT_APP_BACKENDURL}/incidents/getincidents`
       );
       const { data: timelineRes } = await axios.get(
         `${process.env.REACT_APP_BACKENDURL}/incidents/gettimeline`
       );

       const incidents = {};
       const tagIndex = {};

       incidentsRes.forEach(item => {
         incidents[item.incident_id] = {
           ...item,
           geoJSON: {
             type: 'Feature',
             incidentId: item.incident_id,
             geometry: { type: 'Point', coordinates: [item.long, item.lat] },
           },
         };

         item.tags.forEach(tag => {
           if (tagIndex.hasOwnProperty(tag)) {
             tagIndex[tag].add(item.incident_id);
           } else {
             tagIndex[tag] = new Set([item.incident_id]);
           }
         });
       });
       const timeline = timelineRes.map(item => item.incident_id);

       dispatch(
         onInitialFetch({
           incidents,
           ids: Object.keys(incidents),
           timeline,
           tagIndex,
         })
       );
```



#### Features - bugs/features to add/refactoring - Also refer to Trello!:
* Home Page
  * Map
    * Map clusters - is working (maps all approved incidents)
    * What needs work:
      * The lifecycle of the map/clusters
        * There are multiple re-renderings happening right now and after the admin approves a new incident you have to refresh the page for the map to add that incident to the correct cluster.
    * Map Filters (top left-hand corner) - location filter and calendar date range filter are both now working
      * What needs work:
        * The filter for recent reports (7, 30, 90 days) is not fully functional/has bugs - also, maybe change it to (7, 30, 60, 90 days)
        * Add a fourth dropdown filter (per stakeholder request) that filters by force rank (Rank 2, Rank 3, Rank 4, Rank 5 - maybe include a key for those rankings when using this filter or a one-line description for each ranking in the dropdown options)
  * Incidents
    * This file is almost 500 lines long! It should be obvious, as you scroll through it and become more familiar with the app in general, how sections of it should be made into subcomponents
    * As you do this, be aware of the DANGERS OF PROP-DRILLING
    * Keep functionality in the same file as the (sub)component that uses it, and try to pass down (at most) one data object and one callback to each subcomponent
    * Separation of concerns - Wikipedia
    * Single-responsibility principle - Wikipedia
    * Proper application design is just as important as understanding how code works
* Admin Dashboard
  * Currently, when the admin user approves an incident (city and state need to be required fields - form validation may need to be implemented) the frontend is accessing the mapQuest API to gather latitude and longitude so that this incident can be mapped on the home page (this function is called getLatAndLong and exists in the DashboardHelperFunctions.js file). This is now functional and map is including newly approved incidents upon refresh. After meeting with backend, Paul (release manager), and Ryan Hamblin we have determined that it makes more sense for the frontend to just send the incident to the backend endpoint where middleware should handle checking that a city and state exists and if so, hitting the mapQuest API and assigning that incident a latitude and longitude before sending it to the database.

#### Responsive Design
Labs 38 UX/UI put in a lot of work to start the responsive design for the app (check out the graphs tab), but much of the app still needs responsive design implemented

### Redux
* There is an awesome redux revamp in the works
* By the time the next cohort comes in, it may very well have been approved
* Bear in mind that Redux, the Redux Store, etc, is for GLOBAL or SHARED state.
  * State for confirm/cancel or isModalVisible does not belong in the redux store. useState()!
  * Rule of thumb: if more than two components (nested or otherwise) need access to the same state: put it in redux [I just made that up - I think it’s a good rule but I can be very opinionated when it comes to application design]
  * Redux Toolkit is a VERY OPINIONATED library. If you are confused about the paradigms/patterns it promotes (or confused about the upcoming redux revamp), either DON’T TOUCH IT, or become familiar with the following:
Redux Fundamentals, Part 8: Modern Redux with Redux Toolkit | Redux
createAsyncThunk | Redux Toolkit (redux-toolkit.js.org) (applies to upcoming revamp, not current implementation)
  * Should you be confused about the upcoming redux changes, don’t worry: you can still use easyMode!
    * I just cut out a dozen or so lines in the dashboard because changing incidents’ status is as easy as:
easyMode.changeIncidentsStatus(selectedIds, listType, newStatus)
.then(() => setSelectedIds([]));
    * Changing the details of an incident is as simple as:
easyMode.editIncident(finalVals)
.then(cleanup);
    * This may be too early to be writing about this, who knows.


### Other issues
- The filter for recent reports for the home page map is not fully functional/has bugs
- Testing coverage check (The little red x at the end of every pull request) doesn’t work because some tests are failing. If you can get all of the tests working you should be able to use the test coverage checker on github.
- You’ll see a bunch of `window.location.reload()` calls to update the state, maybe do this by updating the state in redux instead
- src/components/form/TwitterForm.js needs to be using 'tweet_id' rather than 'incident_id' for the GET request on line 29 (communicate with Web BE about how to implement this)
- src/components/form/TwitterForm.js We are having an issue populating the "Date" field upon initial render
- src/components/form/TwitterForm.js display some sort of error/success  message upon form submission (right now all we are doing is routing the user back to the homepage upon success line 84)
- The filter form on the incidents reports page has to call a bunch of individual functions for each field, this would be better if you could do something closer to the classic `(evt) => setFilter({...filter, [evt.target.name]: evt.target.value})`
