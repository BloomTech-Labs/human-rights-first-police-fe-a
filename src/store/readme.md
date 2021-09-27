# Redux Guide

A few important things to you should know:

- This project has had over 100 different developers contributing across at least 9 cohorts.
- Parts of the code are... - Abandoned - Broken - Confusing - Buggy - Undocumented
- We are using Redux Toolkit for this project. This library has some patterns which may seem confusing until you are familiar with them. - createSlice - the Redux store is broken up into 'slices.' These slices contain the initial state, the reducers, and action creators as well. https://redux-toolkit.js.org/api/createSlice - createAsyncThunk - async actions (such as fetching or posting data to a server) are referred to as 'thunks' in Reudx. In Redux Toolkit, each 'thunk' will have 'pending', 'fulfilled', and 'rejected' actions generated for it. https://redux-toolkit.js.org/api/createAsyncThunk
- Here's the most important thing: You don't need to know any of this to use the redux store.

## Slices

Currently the project contains the following slices:

- allIncidentsSlice - This is used for fetching, modifying, creating, and deleting incidents.
- apiSlice - Looks like this is some kind of wrapper around api calls to provide loading/error status. It also doesn't seem to be configured correctly, and attempts to access state from other slice.
- incidentsSlice - Currently fetches and stores approved incidents (for the home page, incidents page, map, etc). The useFetchIncidents hook makes use of this.
- mapSlice - Handles map stuff
- userSlice - despite being referenced and called in a couple places (like App.js) doesn't actually seem to do anything or provide any benefit.

## Recommendations

allIncidentSlice is awesome and you should probably use that for anything going forward. I will be attempting to switch as many components over to using this throughout the project.

"But Redux is like super confusing and hard?"

Use easyMode. This wraps up the dispatcher, action creators, and authorized axios into one api object.
