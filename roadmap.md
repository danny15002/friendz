# Friendz

[Heroku link][heroku] **NB:** This should be a link to your production site

[heroku]: http://www.herokuapp.com

## Minimum Viable Product

Friendz is a web application inspired by Facebook built using Ruby on
Rails and React.js. Friendz allows users to:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Create an account
- [ ] Log in / Log out
- [ ] Add friends
- [ ] Message with a friend
- [ ] Share pictures
- [ ] Share your location with friends

## Design Docs
* [View Wireframes][view]
* [DB schema][schema]

[view]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication (1 day)(total)

In Phase 1, I will begin by implementing user signup and authentication (using
BCrypt). This will log the user onto a home page where they can see their
navigation options. UI will consist of a simple log on/log off button and the
ability to sign up.

[Details][phase-one]

### Phase 2: Set up Public Messages (1 day)(2)

In Phase 2, I will set up the table for posting messages on people's profiles.
I will also set up the necessary react components for posting on people's
profiles. On login, a user will see his public messages first. They will appear
in chronological order.

[Details][phase-two]

### Phase 3: Set up home page view (1 day)(3)

Phase 3 will be creating the home page view. I will also set up the React Router
for navigation. I will set up the flux skeleton with actions, the dispatcher,
and the store.

[Details][phase-three]

### Phase 4: Add friends (1.5 days)(4.5)

Phase 4 will be adding/removing friends

[Details][phase-four]

### Phase 5: Create fully functional messaging (1.5 days)(6)

Phase 5 is getting the messaging to work. I will set up document listeners and
ajax requests for retrieving and saving messages to database. I will also style
the UI for messaging.

[Details][phase-five]

### Phase 6: Create event viewing and creation (2 days)(8)

Phase 6 will be creating events. I will set up event creating and viewing. I
I will create all the necessary React components along with the necessary
underlying flux structure.

[Details][phase-six]

### Phase 7: Pictures (2 days)(10)

Phase 7 is implementing picture interaction and UI.

[Details][phase-seven]

### Phase 8: Location (1 day)(11)

In phase 8 I will create interaction to share your location with your friends.

[Details][phase-eight]

### Phase 9: Clean Up (3 days)(13)

In phase 9 I will finish up any styling that still needs to be done. In case of
falling behind schedule, this time will be used to make up for lost time.

[Details][phase-nine]

### Bonus Features (TBD)
- [ ] Check for event collisions
- [ ] Remove friends
- [ ] Notifications
- [ ] Instant messaging

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
[phase-six]: ./docs/phases/phase6.md
[phase-seven]: ./docs/phases/phase7.md
[phase-eight]: ./docs/phases/phase8.md
[phase-nine]: ./docs/phases/phase9.md
