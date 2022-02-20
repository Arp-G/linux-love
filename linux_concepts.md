# Linux Concepts

**Contents**

* [Filesystem](#Filesystem)
* [Users & Groups](#Users-and-Groups)
* [Ownership and Permissions](#Ownership-and-Permissions)

Todo:
Package management, networking, systemd, cron, etc


## Filesystem

References:
https://www.linux.com/training-tutorials/linux-filesystem-explained/
https://www.youtube.com/watch?v=42iQKuQodW4

![image](https://user-images.githubusercontent.com/39219943/154847570-865e63ab-8529-463b-b888-5d4cb7c95842.png)

Directories
From top to bottom, the directories you are seeing are as follows.

* `/bin` is the directory that contains binaries, that is, some of the applications and programs you can run.

* `/boot` directory contains files required for starting your system. 

* `/dev` is a virtual directory contains device files. Many of these are generated at boot time or even on the fly. 
       For example, if you plug in a new webcam or a USB pendrive into your machine, a new device entry will automagically pop up here.

* `/etc` directory contains system-wide configuration files. For example, the files that contain the name of your system, the users and their passwords, etc

* `/home` your users’ personal directories.

* `/lib` is where libraries live. Libraries are files containing code that your applications can use. They contain snippets of code that applications use to draw windows on your desktop, control peripherals, or send files to your hard disk.

* `/media` directory is where external storage will be automatically mounted when you plug it in and try to access it. 

* `/mnt` Manually mount storage devices or partitions.

* `/opt` directory is often where software you compile (that is, you build yourself from source code and do not install from your distribution repositories) sometimes lands. Applications will end up in the /opt/bin directory and libraries in the /opt/lib directory.
(Another place where applications and libraries end up in is "/usr/local", When software gets installed here, there will also be "/usr/local/bin" and "/usr/local/lib" directories.)

* `/proc` is a virtual directory. It contains information about your computer, such as information about your CPU and the kernel your Linux system is running. 

* `/root` is the home directory of the superuser.

* `/run` is used by system processesto store temporary data.

* `/sbin` is similar to /bin, but it contains applications that only the superuser will need.

* `/usr` contains a mish-mash of directories which in turn contain applications, libraries, documentation, wallpapers, icons and a long list of other stuff that need to be shared by applications and services.

* `/srv`  contains data for servers. If you are running a web server from your Linux box, your HTML files for your sites would go into /srv/http (or /srv/www). If you were running an FTP server, your files would go into /srv/ftp

* `/sys` is another virtual directory like /proc and /dev and also contains information from devices connected to your computer.
(For example, change the brightness of the screen of my laptop by modifying the value stored in the /sys/devices/pci0000:00/0000:00:02.0/drm/card1/card1-eDP-1/intel_backlight/brightness file.)

* `/tmp` contains temporary files, usually placed there by applications that you are running.

* `/var` contains logs in the /var/log subdirectories also contains spools for tasks.

---

## Users-and-Groups

References:

https://www.digitalocean.com/community/tutorials/an-introduction-to-linux-permissions
https://www.digitalocean.com/community/tutorials/linux-permissions-basics-and-how-to-use-umask-on-a-vps#types-of-permissions
https://www.digitalocean.com/community/tutorials/how-to-add-and-delete-users-on-ubuntu-16-04

In Linux, there are two types of users: system users and regular users. 
Traditionally, system users are used to run non-interactive or background processes on a system.

An easy way to view all of the users on a system is to look at the contents of the `/etc/passwd file`. 
Each line in this file contains information about a single user, starting with its user name

**Superuser/Root**

In addition to the two user types, there is the superuser, or root user, that has the ability to override any file ownership and permission restrictions. 
The root user has the rights to access anything on its own server and make system-wide changes, and must be kept secure.

**Groups**

Groups are collections of zero or more users. A user belongs to a default group, and can also be a member of any of the other groups on a server.
An easy way to view all the groups and their members is to look in the `/etc/group` file on a server.

---

## Ownership-and-Permissions

Every file is owned by a single user and a single group, and has its own access permissions.

**File Type**

There are two basic types of files: normal and special. 
The file type is indicated by the first character of the mode of a file–in.

* Normal/Regular Files - plain files that can contain data. Can be identified by files with a hyphen (-) in their file type fields. 

* Special files - Handled by the OS differently. Can be identified by files that have a non-hyphen character, such as a letter, in their file type fields, 
                  (For example, a symlink file, a directory file, etc.)




**Examples of Modes (and Permissions)**

`ls -l` lists file permissions.

![image](https://user-images.githubusercontent.com/39219943/154847071-f3fa9bc3-8708-4634-b615-7e6ebd4f9f12.png)

![image](https://user-images.githubusercontent.com/39219943/154847089-4d6f5614-ed45-4493-87fc-fafcf009ee6a.png)

- -rw-------: A file that is only accessible by its owner
- -rwxr-xr-x: A file that is executable by every user on the system. A “world-executable” file
- -rw-rw-rw-: A file that is open to modification by every user on the system. A “world-writable” file
- drwxr-xr-x: A directory that every user on the system can read and access
- drwxrwx---: A directory that is modifiable (including its contents) by its owner and group
- drwxr-x---: A directory that is accessible by its group

**Permissions Classes**

- User: The owner of a file belongs to this class
- Group: The members of the file’s group belong to this class
- Other: Any users that are not part of the user or group classes belong to this class.

**Permissions**

- r: Read permission
- w: Write permission
- x: Execute permission

A hyphen (-) in the place of one of these characters indicates that the respective permission is not available for the respective class. 
For example, if the group triad for a file is `r--`, the file is “read-only” to the group that is associated with the file.

For a directory, execute permission allows a user to access,  traverse and check metadata about files in the directory.

**Octal Notation**

The more concise, but slightly less intuitive way of representing permissions is with octal notation.
Using this method, each permissions category (owner, group owner, and other) is represented by a number between 0 and 7.

- 4 = read permissions
- 2 = write permissions
- 1 = execute permission

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

**Specifying Explicit User Privileges in /etc/sudoers**

As an alternative to putting your user in the sudo group, you can use the visudo command, which opens a configuration file called `/etc/sudoers` in the system’s default editor, and explicitly specify privileges on a per-user basis.

To give a new user sudo permission add this in the `/etc/sudoers` file
```
newuser ALL=(ALL:ALL) ALL
```

In the sudoers file groups are denoted by %group_name, to make a new group with sudo access..
```
%mygrp ALL=(ALL:ALL) ALL
```
