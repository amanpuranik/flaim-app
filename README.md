# Flaim App

## Dev Startup
>Make sure node@18 is installed

### Install dependencies:
```
$ npm install && npm install -g typescript
```

### Run App:
```
$ npm start
```
> Running the app displays a QR code in the terminal, download Expo Go from the AppStore then open your camera app and scan the QR code to launch the app on your phone


## Scope:

- App that holds two people (OR GROUP) accountable 

- Based off of the ideas of snapchat and BeReal - targeted communications - more personalized than social media

- Also using the idea of the “widget” that allows you to draw a picture for your partner and let them see it for a day.

- Both users have a UI that allows them to set a time/duration for check ins (should we let them decide daily what time they wanna set the check in?)

- Every day at a specific time, a check-in notification is set, and the user is alerted to send a picture WITHIN a specific duration (Like beREAL), and that pic is saved in some other UI for some remained of the day (also like bereal)

- The other user must approve this post, in order to grant “points” or some incentive

- Set up a UI for some ultimate goal, and some incentive by the end of it (can be a customization incentive or maybe some integration)?

- Use cases can be children + parents, teachers + students, couples, workout buddies, 

- Ex: daily check ins and posts for working out, groceries, something romantic, schoolwork, group assignments, project management etc.

- Also have to think about account creation. Im assuming users will have to make accounts for this to work 

- Apple watch has a similar feature where users are notified when certain goals are completed - doesnt have the picture sharing functionality tho

- One to many relationship = me and aman, or me and omar can have separate goals 

- Maybe when each goal is hit - then we can share it on instagram (like how bereal does it)

## Questions

- What if two people want to do something on a specific day at different times?

- Map out the incentive feature for both people using it

- Are we doing this for groups of people or just one on one

- What is sticky about this idea? How can we make this stickier?

- Focus on posting the picture somewhere where both partners can view it and recognize accomplishments - I like how BeReal lets you view past posts too so we can track that.

## Potential UI

- Account creation UI 

  - (basic landing screen that people will see if they dont have an account)

- Home screen

  - List of all active ‘accountabilty goals’

- Goal screen

  - Could be simple 

  - Maybe one half of the screen could be user A’s picture and the other half of the screen could be user B’s pictuer (or each half could just be empty if a user hasnt uploaded yet

## MAIN PLAN

1. Pages

   1. Log in

   2. Home page - 

      1. Mutual flow vs Teacher flow 

      2. Goals list + friends info + cards like beReal 

      3. Hourglass for partner who hasnt uploaded pic vs who has

      4. Like and dislike mechanic on card

      5. Points displayed on each card for each user

      6. Shared visualized timeline or progress bar at the bottom of each card based on approvals (red vs green)

      7. Points are x and y - top right of each card - AS A UNIT we want the users to work together so an approval means +1 and a disapproval means -1

      8. We need visualization for progress - some cool icon on each card to represent progress   

      9. Visualization symbol will be FIRE -> the better the streak - the better the fire

      10. 3 states - mutual flow + teacher flow + student flow 

          1. Teacher/student flow only have one picture

          2. Mutual flow has bereal type image UI

      11. Approval/disapproval flow will change the FIRE animation

      12. Click on each goal to see you and your Partners feed

      13. Corners have add friend buttons + search for friends + current friends

   3. Create goal page

      1. Another button on home page leads you to this

   4. View goal page

      1.

   5. Profile page

      1. My profile flow = past goals + current running goals

      2.

   6. Friend page

   7. Reward page


#### Work out for 30 days (aman - aaliyan)**

1. **Day 1 update** 

2. **Day 2 update** 

3. **Day 3 update** 

**Points** 

**Make a goal for urself, and all your friends can approve or not**

**Limit it to friends, add for you page, premium feature for post as many updates as you want, INITIALLY JUST ONCE A DAY**

End of the month theres a season reset -> compared with people in your friend list or city etc

For public posts - we dont add disapprove feature

User makes a goal - goal link (optional) - private/public - Let people approve or not - 

Approval + disproval from friend group - if they get to a specific approval rate - wins prize + season reset at the end of the month\\\`

## Trisha Notes

- Look into psychology of goal setting to think about features and flows

- For monetization we can think about small communities and groups that you want to create

- How are we handling leaderboards + points + point stacking +

- Who is our primary audience for the MVP?

- Map out what happens if users dont reach their goal?

- Look into communities and groups and stuff

- Want to map out THESE FLOWS: 1-1 view, 1 to many view, master/slave view, slave/master view

- User posts publicly - what will the post look like (no longer 2 pics), who gets to approve/disprove and why?

- Are we still having the master/slave or slave/master functionality where only one user is allowed to disprove/approve?

-
