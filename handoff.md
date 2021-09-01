# Welcome labs_38 Frontend Devs!

##### This file is meant to help clear things up and provide a good starting direction for you because, I think I speak for all of labs_37 when I say,  we know how overwhelming this can be at first.  If you get too stress or have any questions and the answer is not in here, know that you can reach out to any member of the previous cohort on slack for help.  Good luck this month!  


### Quick Notes
- We are using ant design for some styling/components.  https://ant.design/docs/react/introduce
- Full walkthrough of the data flow for the form feature we implemented (including bugs to be fixed) https://youtu.be/dRBYRQ5QpoI
- There may be CSS located in the node_modules file because of certain libraries being used...  If you want to change one of these components' styling, you may have to find the CSS in the Node_modules that is associated with it then overwrite that CSS by coding it in the src code.  node_modules is in the .gitignore file so any changes you make there will be ignored when you push your code.  If you have more questions please please please reach out to one of us because this concept was a bit weird and annoying to implement at first.
- Testing coverage is not that great currently, that can always be improved upon
- Redux is set up but hardly being used, feel free to convert some components to be utilizing this
- If you UI/UX guys are feelin SPICY, then check this out https://d3js.org/. Could be a cool way to display the data rather than the current map we have.  Just make sure to let the stakeholder know before you actually implement it if you choose to do so


### Current issues
- src/components/form/TwitterForm.js needs to be using 'tweet_id' rather than 'incident_id' for the GET request on line 29 (communicate with Web BE about how to implement this)
- src/components/form/TwitterForm.js We are having an issue populating the "Date" field upon initial render
- src/components/form/TwitterForm.js display some sort of error/success  message upon form submission (right now all we are doing is routing the user back to the homepage upon success line 84)
- "Rank" sort function on https://a.humanrightsfirst.dev/incident-reports needs to be fixed
- Most all of the sort functions are not functional on the Admin Dashboard 

<details>
<summary>motivation</summary>

+ https://open.spotify.com/playlist/37i9dQZF1DXbXD9pMSZomS?si=5fdc301a09704727
+ https://open.spotify.com/album/340MjPcVdiQRnMigrPybZA?si=UWtRRR0xQZiYUIGSHjdtVw&dl_branch=1
+ https://i.redd.it/eqntkqfehnj01.jpg
+ https://www.thecoderpedia.com/wp-content/uploads/2020/06/Programming-Memes-Programmer-while-sleeping.jpg?x67166
+ https://iq.opengenus.org/content/images/2019/12/semicolon.jpg

</details>
