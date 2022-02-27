# Users and Groups

References:

<https://www.digitalocean.com/community/tutorials/an-introduction-to-linux-permissions>
<https://www.digitalocean.com/community/tutorials/linux-permissions-basics-and-how-to-use-umask-on-a-vps#types-of-permissions>
<https://www.digitalocean.com/community/tutorials/how-to-add-and-delete-users-on-ubuntu-16-04>

In Linux, there are two types of users: system users and regular users.
Traditionally, system users are used to run non-interactive or background processes on a system.

An easy way to view all of the users on a system is to look at the contents of the `/etc/passwd file`.
Each line in this file contains information about a single user, starting with its user name

## Superuser/Root

In addition to the two user types, there is the superuser, or root user, that has the ability to override any file ownership and permission restrictions.
The root user has the rights to access anything on its own server and make system-wide changes, and must be kept secure.

## Groups

Groups are collections of zero or more users. A user belongs to a default group, and can also be a member of any of the other groups on a server.
An easy way to view all the groups and their members is to look in the `/etc/group` file on a server.
