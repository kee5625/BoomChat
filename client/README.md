# Documenting The Process


After designing in Figma:

1. Created parent folders:
    - assets (stores all images) + assets.js (VERY IMPORTANT, centralizes icons + sample array of user daya)
    - components (stores all components) => chat container, Right sidebar, left sidebar
    - pages (minimal code, only component implementation) => Home page, Login page, and Profile Page

2. Designed Sidebar component:
    - set global parameters to selectedUser and setSelectedUser
    - hides the component if a user is already selected for mobile
    - add navigation to profile and page (through logout)
    - add search bar for users
    - Create User List sub-component
        -> Loop through dummy user daya
        -> Each user item is clickable (highlights selected user, and opens empty chat container if selected)

3. Designed Chat Container Component:
    - Same global variables as parameters
    - Display different containers based on selectedUser being true/false
    - If no user selected, empty container with logo + title
    - If user is selected, Show chat page + right sidebar
    - The above logic to change chat container and hide right sidebar is done 
    using the "grid cols" grid layout

4. Designed Right sidebar component