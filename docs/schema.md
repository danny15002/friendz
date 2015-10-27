# Schema Information

## messages
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
body        | text      | not null
sender_id   | integer   | not null, foreign key (references users), indexed
receiver_id | integer   | not null, foreign key (references users), indexed

## events
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
creator_id  | integer   | not null, foreign key (references users), indexed
title       | string    | not null
description | string    |
date        | date      | not null

## pictures
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
poster_id   | integer   | not null, foreign key (references users), indexed
title       | string    |
description | string    |

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
