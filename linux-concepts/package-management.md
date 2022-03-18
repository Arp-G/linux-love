# Package management in linux

## Packages, repositories and source lists

Refs:

* <https://blog.learncodeonline.in/repository-and-package-management-on-linux>
* <https://ubuntu.com/server/docs/package-management>

Before we install packages we have to add there repositories.
On debian based operating systems like ubuntu this can be done in `/etc/apt/sources.list` file or can be configured in separate files under the `/etc/apt/sources.list.d/` directory.
The name of the files must end with .list extension.

Each line in the sources is in the following format:
`<deb|deb-src> <url> <release-name> <sections and components>`

* deb -> These repositories contain binaries or precompiled packages.
* deb-src -> These repositories contain the source code of the packages. Useful for developers.

Eg: `deb http://archive.ubuntu.com/ubuntu/ bionic main restricted`
![image](https://user-images.githubusercontent.com/39219943/155834446-6335bd7b-a1c9-4534-9afc-fc9ae32f221f.png)

To add a new repository...

* First fetch and the public key used by that repository.
    This can be done using `apt-key add`.
    Example: `wget -q -O - https://pkg.jenkins.io/debian/jenkins.io.key | sudo apt-key add -`

* Then add the repostiory config to source list, we can either create a new source list under the `/etc/apt/sources.list.d/` directory or add to the `/etc/apt/sources.list` file.
  Example: `echo deb http://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list`

  We can also add repositorties to `source.list` using `add-apt-repository`
  Example `add-apt-repository 'deb http://pkg.jenkins.io/debian-stable binary/'` command
  
  You can also remove respositories by either editing the source list files manually or using the command `add-apt-repository --remove 'deb http://pkg.jenkins.io/debian-stable binary/'`

* Update the repositories which will reload the database for local package on all the repositories using `apt-get update`.

* Install the package now: `apt-get install jenkins`

## Different Package management tools

There are different package management tools in ubuntu.

* APT(Advanced Packaging Tool) - Command-line tool which can be used to install, upgrade packages, update package list index, etc.
* dpkg - is a package manager for Debian-based systems. It can install, remove, and build packages, *it cannot automatically download and install packages or their dependencies.Apt and Aptitude are newer, and layer additional features on top of dpkg.*

**==Overview==**

![image](https://user-images.githubusercontent.com/39219943/155834847-283da7ca-30c7-4612-86c5-8bbf24e5c956.png)

**==Common usage==**

![image](https://user-images.githubusercontent.com/39219943/155834850-336c5826-30a3-45bf-a9b3-af3201c7c021.png)

**Public Keys and package verification**

Refs:

* <https://difyel.com/linux/usr/bin/apt-key/>
* <https://wiki.debian.org/SecureApt#How_apt_uses_Release.gpg>

*What are gpg keys and why do we need them before installing packages through apt?*

* *Secure apt*: Debian uses strong cryptography to validate downloaded packages. This is commonly called "secure apt" (or "apt-secure").

* A Debian archive(.deb file) contains a Release file, this file contains checksums of other packages in the archive. Every Packages file further has more checksums, one for each package listed in it.

    *Example Release file content*

    ```
    MD5Sum:
     6b05b392f792ba5a436d590c129de21f            3453 Packages
     1356479a23edda7a69f24eb8d6f4a14b            1131 Packages.gz
     2a5167881adc9ad1a8864f281b1eb959            1715 Sources
     88de3533bf6e054d1799f8e49b6aed8b             658 Sources.gz
    ```

    *Inside a Packages file, we'll find more checksums, one for each package listed in it*

    ```
    Package: uqm
    Priority: optional
    ...
    Filename: unstable/uqm_0.4.0-1_i386.deb
    Size: 580558
    MD5sum: 864ec6157c1eea88acfef44d0f34d219
    ```

    These two checksums together allow apt to verify that it has downloaded a correct copy of the Packages file.

* In order to verify the integrity of the Release file itself secure apt adds a gpg signature for the Release file. This is put in a file named `Release.gpg` that's shipped alongside the Release file.  A release file is signed by the distribution author private key.

    Secure apt always downloads `Release.gpg` files when it's downloading Release files. If Release.gpg cannot be download or has bad signature, gpg will complain during an apt-get update

    ```
    W: GPG error: http://ftp.us.debian.org testing Release: The following signatures
     couldn't be verified because the public key is not available: NO_PUBKEY 010908312D230C5F
    ```

* For apt to check the signature in the Release.gpg file it must know the public key of the person who signed the file.

* `apt-key` is used to add , delete , list , and export public keys used by apt to verify the signature of a release file.

* `apt-get add public_key_file` can be used to add a public key in either formats . If the file is stored remotely wget, for example , can first be used to download it.

* The public key for a distribution can either be in ASCII armored format(.asc file), or it can be in binary packet format(.gpg file).

* The public keys used to verify a distribution release file can be located either in the `/etc/apt/trusted.gpg.d/` directory on in the `/etc/apt/trusted.gpg` file. (`apt-key list` will list installed keys in `trusted.gpg.d` directory and `trusted.gpg` file.)

* apt will only accept the release files which are signed, and which have their public key installed.

* **gpg** is the tool used in secure apt to sign files and check their signatures.

* **Verification of release file** - APT will use the public key gotten from the author of the distribution to read the hashed value in the signature(Release.gpg). This hashed value in the signature, is the hash of the original release file. APT will also calculate the hash of the acutal downloaded Release file and compare it to the hash value read from the signature. If they are equal then the downloaded release file has been successfully verified , else the verification has failed and the release file is disregarded.

* *For example:*
When debian is installed, the package `debian-archive-keyring` is also installed. This package contains public keys which can be used to verify the release files of distributions authored by the debian project.
The security of the whole system depends on there being a Release.gpg file, which signs a Release file, and of apt checking that signature using gpg. To check the signature, it has to know the public key of the person who signed the file. These keys are kept in apt's own keyring (/etc/apt/trusted.gpg), and managing the keys is where secure apt comes in.
