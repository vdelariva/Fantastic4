# Team Sport Manager

## Group Project Description: ##

**Audience:**
High school sport team - players & parents/guardians

**Problem:**
Team members and parents/guardians need timely information regarding team schedule.  Also need information regarding upcoming tournaments, instructional videos and sharing team photos.

**Purpose:**
Provide Team information & Resources

**Functionality:**
* Manage team roster - Add, remove team members
* View Team Schedule - List of previous and upcoming matches, scores for matches played, match location
* Resources - Upcoming tournaments, instructional videos, team photos

## Implementation ##

* Admin page to enter team players and match schedule
* Team schedule - date/opponent/time/location/score
* Team Roster - name/grade/handle
* Resources: 

1. Upcoming Tournaments
1. Instructional videos for different tennis strokes - user selected (forehand/backhand/serve/volley)
1. Share team photos via Instagram account

## Tools ##

**APIs**
* Action API to provide upcoming USTA tournaments
* Youtube API to provide instructional videos
* Instagram API to provide a venue to share team photos

**Frameworks**
* Bootstrap

**Libraries**
* Moment.js
* Anime.js

**Database**
* Firebase

## Future Enhancements ##

* Public and Private Webpages
..* Public webpage to display team schedule and other general team information
..* Private webpages for players/parents/guardians that shows the roster and contact information and a website for the team administrator to enter manage team roster and schedule. This would require login authentication for both private websites.
* Message board for team members to post information such as carpool availability, info regarding out of town tournaments, match highlights/recaps
* Email and text message capability to notify members of important information, such as match day location changes due to inclement weather

## Developer Notes ##

* User has the ability to add/update/delete players and matches to the roster and schedule tables by selecting the edit icon next to each entry.
* Some input validation on Date, Grade and Time fields
* Used moment.js to convert ISO date to local date for display purposes. Also used to set active.com API start date query to identify upcoming tournaments.
* Used single modal to edit a player or match entry. When edit icon is clicked, the code determines which table is being updated and populates the modal based on a tag on the edit icon.
* Tennis ball in jumbotron will circumnavigate the logo upon the document being loaded and when clicked.
* A new photo will load when a photo is added to personal instragram account (currently tied to single account - future feature to allow registered users to post a new photo and have a photo gallery with older postings)
* When a tournament is selected, it will take the user to the official tournament website.
* Further investigate active.com API. Team struggled to load tournaments closer to city specified in the query search.For some reason, it thinks Omaha, NE is close to Mpls, MN...
