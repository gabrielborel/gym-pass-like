# App

Like GymPass style app.

## FRs (Functional Requirements)

  - [ ] User should be able to signup;
  - [ ] User should be able to signin;
  - [ ] Should be able to get the profile of an authenticated user;
  - [ ] Should be able to get the check-ins amount of an authenticated user;
  - [ ] User should be able to get the history of check-ins;
  - [ ] User should be able to find for nearby gyms;
  - [ ] User should be able to find gyms by name;
  - [ ] User should be able to check-in in a gym;
  - [ ] Should be able to validate a user check-in;
  - [ ] Should be atle to register a new gym;

## BRs (Business Rules)

  - [ ] User should not be able to signup with an already used email;
  - [ ] User should not be able to realize 2 check-ins in a day;
  - [ ] User should not be able to check-in if he is not near to the gym (100 meters);
  - [ ] Check-in can only be validated until 20 minutes after creation;
  - [ ] Check-in can only be validated by an admin;
  - [ ] The gym should only be registered by an admin;

## Non-FRs (Non-Functional Requirements)

  - [ ] The user's password should be encrypted;
  - [ ] The application data should be stored in a PostgreSQL;
  - [ ] All the data list should be paginated (20 items per page);
  - [ ] The user should be identified by a JWT token;