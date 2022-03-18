
# Ownership and Permissions

Every file is owned by a single user and a single group, and has its own access permissions.

## File Type

There are two basic types of files: normal and special.
The file type is indicated by the first character of the mode of a file–in.

* Normal/Regular Files - plain files that can contain data. Can be identified by files with a hyphen (-) in their file type fields.

* Special files - Handled by the OS differently. Can be identified by files that have a non-hyphen character, such as a letter, in their file type fields,
                  (For example, a symlink file, a directory file, etc.)

## Examples of Modes (and Permissions)

`ls -l` lists file permissions.

![image](https://user-images.githubusercontent.com/39219943/154847071-f3fa9bc3-8708-4634-b615-7e6ebd4f9f12.png)

![image](https://user-images.githubusercontent.com/39219943/154847089-4d6f5614-ed45-4493-87fc-fafcf009ee6a.png)

* -rw-------: A file that is only accessible by its owner
* -rwxr-xr-x: A file that is executable by every user on the system. A “world-executable” file
* -rw-rw-rw-: A file that is open to modification by every user on the system. A “world-writable” file
* drwxr-xr-x: A directory that every user on the system can read and access
* drwxrwx---: A directory that is modifiable (including its contents) by its owner and group
* drwxr-x---: A directory that is accessible by its group

## Permissions Classes

* User: The owner of a file belongs to this class
* Group: The members of the file’s group belong to this class
* Other: Any users that are not part of the user or group classes belong to this class.

## Permissions

* r: Read permission
* w: Write permission
* x: Execute permission

A hyphen (-) in the place of one of these characters indicates that the respective permission is not available for the respective class.
For example, if the group triad for a file is `r--`, the file is “read-only” to the group that is associated with the file.

For a directory, execute permission allows a user to access,  traverse and check metadata about files in the directory.

## Octal Notation

The more concise, but slightly less intuitive way of representing permissions is with octal notation.
Using this method, each permissions category (owner, group owner, and other) is represented by a number between 0 and 7.

* 4 = read permissions
* 2 = write permissions
* 1 = execute permission

We add up the numbers associated with the type of permissions we would like to grant for each category. This will be a number between 0 and 7 (0 representing no permissions and 7 representing full read, write, and execute permissions) for each category.

Eg:

```
-rw-rw-r-- 1 demouser demouser 0 Jul 10 17:23 testfile
```

If we convert that into octal notation, the owner and group owner would have a permission value of 6 (4 for read, plus 2 for write) and the other category would have 4 (for read). The full permissions would be represented by the triplet 664.

Now suppose we want to give full permission to user, only read permission to group and no permission to other users
we would do...

```
chmod 740 testfile
```

We can give access for a file to a perticular user and group by

```
chown arpan file
chgrp mygrp file
```

You can add a new user by

```
sudo adduser newuser
```

Check the groups in which thhe users belongs to by:

```
groups newuser
```

By default, a new user is only in their own group, which is created at the time of account creation, and shares a name with the user.

In order to add the user to a new group, we can use the usermod command:
Here we add a user to the sudo group by..

```
usermod -aG sudo newuser
```

The -aG option here tells usermod to add the user to the listed groups.

## Specifying Explicit User Privileges in /etc/sudoers

As an alternative to putting your user in the sudo group, you can use the visudo command, which opens a configuration file called `/etc/sudoers` in the system’s default editor, and explicitly specify privileges on a per-user basis.

To give a new user sudo permission add this in the `/etc/sudoers` file

```
newuser ALL=(ALL:ALL) ALL
```

In the sudoers file groups are denoted by %group_name, to make a new group with sudo access..

```
%mygrp ALL=(ALL:ALL) ALL
```
