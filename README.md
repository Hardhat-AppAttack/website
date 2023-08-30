# AppAttack 

## Project Description

The project aims to design and develop a website for the AppAttack to showcase their services, abilities and credibility. The website will contain a portal that will host multiple resources from PT, SCR, RnD, Web Dev and other along with a discussion board for community engagement. For recruitment purposes, an on-boarding interface will be present for interested candidates to register and signin. An admin interface for admin users to access and manage content and users.

## Project Scope:

- Home Page
    - Display core values and mission for AppAttack
    - Links to the rest of the website
- Services Page
    - Breakdown of services and offers and a roadmap on how these services scale with time
- User Registeration and Authenticatoin
    - User registeration with email verification
    - Login using username and password
- Content Management System
    - A content management system for admins to create, edit and publish content
- Learning resources
    - Different resources hosted in a centralized place for easy access (no sign-in required)
- Discussion board
    - A place for community to post resources, share ideas and uplaod media files (sign-in required)
- Recruitment interface
    - Interface for prospective candidates to apply for AppAttack
- Other Pages
    - About us (contains testimonials), 
    - Contact us 

## Out of scope:
- Providing actual cyber-security services

## Constraints:
- Given the limited duration of the trimester (T2 2023), only limited features will be delivered from the above mentioned requirements. They include the following.
    - Home Page
    - Services Page
    - User Registeration and Authenticatoin
    - Learning resources
    - Recruitment interface
    - Other Pages

## Stakeholders
- **T2 2023 AppAttack Leadership:** 
    - Vansh Khanna
    - Josiah Paul Walker
- **T2 2023 Developement Team:** 
    - Team leads:
        - Karan Parekh
        - Nitya Porwal
    - Frontend:
        - Chris Pagonis
        - Sehandu Mathika Kurukularatne
        - Manan Mehta
    - Backend:
        - Charanpreet Singh
        - MD Kaviul Hossain
        - Qisheng Hu
- **End users:** 
    - Deakin students and staff
    - Potential clientele 
    - Organic site traffic

## User Stories
- **Student**
    - As a student, I would like to be recruited in AppAttack PT/SCR/RnD team
- **AppAttack leadership**
    - As a leader of AppAttack, I want to make sure that the website represents AppAttack values, goals and services properly
- **Staff (tutors, unit chair)**
    - As a staff member, I want to ensure that AppAttack follows all the required policies and procedures under the Australian law
- **Potential clients**
    - As a client, I want to check what AppAttack is about and what services they provide to their clients, read testimonies and contact them for collaboration.
- **AppAttack members**
    - As a part of AppAttack, I would want to upskill myself using the resource hub and contribute to the project

## Functional Requirements

1. **Function:** The system shall allow users to register 
    - **Requirement:** A sign up page with a registeration form
    - **Precondition:** User must have a working email address
    - **Postcondition:** User receives an email confirmation link
    - **Optional:** Users can opt to register as an admin. Must wait for approval
1. **Function:** The system shall allow users to login
    - **Requirement:** A login Page with a login form
    - **Precondition:** User must have completed the registeration process
    - **Postcondition:** User gain access to their progress tracker, discussion board and recruitment interface
1. **Function:** A recruitment interface to screen prospective candidates
    - **Requirement:** A replica of the recuitment process used by AppAttack 
    - **Precondition:** User must be logged in to proceed
    - **Postcondition:** User can submit their application
1. **Function:** A resources hub for the users to access education information
    - **Requirement:** A portal with links to resources for different topics divided by week (similar to Deakin sync)
    - **Precondition:** None. (No login required)
    - **Postcondition:** User can access resources for upskilling
    - **Optional:** Logged in users can tick/untick topics to track their progress
1. **Function:** A resources hub for the users to access education information
    - **Requirement:** A portal with links to resources for different topics divided by week (similar to Deakin sync)
    - **Precondition:** None. (No login required)
    - **Postcondition:** User can access resources for upskilling
1. **Function:** A Content Management System for admins to manage website content
    - **Requirement:** A CMS interface with ability to create, read, update and delete website content and user information
    - **Precondition:** User must be registered as an admin 
    - **Postcondition:** User gains admin access to the website content and user information 
1. **Function:** A Discussion Board for users to share their thoughts, opinions and findings
    - **Requirement:** An interface to create a post which may contain media/document files and to comment on other posts
    - **Precondition:** User must be logged in
    - **Postcondition:** User can again access to post and comment functionality

