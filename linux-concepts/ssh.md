
## SSH SETUP:

*Refs:* https://www.digitalocean.com/community/tutorials/ssh-essentials-working-with-ssh-servers-clients-and-keys

* SSH is a secure protocol used as the primary means of connecting to Linux servers remotely.

* SSH connection is implemented using a client-server model
  The remote machine must be running an SSH daemon that listens for connections on a specific network port(default 22),
  authenticates connection requests, and spawns the appropriate environment if the user provides the correct credentials.

* The user’s computer must have an SSH client which knows how to communicate using the SSH protocol.

* Authentication - SSH uses a matching set of cryptographic keys for authentication.
  The user must have an SSH key pair on their local computer. 
  On the remote server, the public key must be copied to a file within the user’s home directory at `~/.ssh/authorized_keys`.
  This file contains a list of public keys, one-per-line, that are authorized to log into this account.

  When connecting to a host it will inform the server of this intent and will tell the server which public key to use. The server then checks its authorized_keys file for the public key, generates a random string/random challenge, and encrypts it using the public key. 
  This encrypted message can only be decrypted with the associated private key. The server will send this encrypted message to the client to test whether they actually have the associated private key.

  The client will decrypt the randopm challenge using its private key and combine the random string that is revealed with a previously negotiated session ID. It then generates an MD5 hash of this value and transmits it back to the server. THe server can now verify the response to authenticate the user.

  ![ssh-key-based-authentication](https://user-images.githubusercontent.com/39219943/158052877-0a2079f2-00fb-4436-a37b-342f88b3ec23.png)

### Setting up SSH

* Generate a key pair on your local system using `ssh-keygen`

    This will generate an RSA SSH key pair. The files are:

    * `~/.ssh/id_rsa`: The private key. DO NOT SHARE THIS FILE!
    * `~/.ssh/id_rsa.pub`: The associated public key. This can be shared freely without consequence.

* Make sure your private key file permissions are set correctly by

    ```
    chmod 400 ~/.shh/private_key_file_rsa
    ```

* Put your public key `~/.ssh/id_rsa.pub` on the remote machines authorized keys file `~/.ssh/authorized_keys`

    This is needed since in order to allow ssh into the remote server(without specifying a key) we must add our local server public key to authorized hosts in remote server.

    ```
    # Copy you your public key to clipboard
    xclip -sel c -i < ~/.ssh/id_rsa.pub 
    # OR 
    cat ~/.ssh/id_rsa.pub

    # Add your key in remote servers authorized keys
    echo <public_key> >> ~/.ssh/authorized_keys
    ```

* SSH into a server `ssh -p port_num username@remote_host`

* Optional: Add config for easy access

    In your ssh config file in `~/.shh/config`

    ```
    Host myshortname realname.example.com
        HostName realname.example.com
        IdentityFile ~/.ssh/id_rsa # private key for realname
        User remoteusername
    ```

    Then ssh easily by...

    ```
    ssh myshortname
    ```

## SSH key forwarding

*Refs:* https://www.cloudsavvyit.com/25/what-is-ssh-agent-forwarding-and-how-do-you-use-it/

If you wish to be able to connect without a password to one server from within another server, you will need to forward your SSH key information. This will allow you to authenticate to another server through the server you are connected to, using the credentials on your local computer.

This is achieved using the `-A` option for example `ssh -A username@remote_host`.

Now you can SSH in to any other host that your SSH key is authorized to access. You will connect as if your private SSH key were located on this server.

### Examples and use cases for SSH key forwarding

**Connecting to a remote instance via a bastion host**

Suppose you have a bastion host that has ssh access to your main development instance which is not accessible by ssh outside its vpc.
You add your personal PCs public ssh key to your development servers authorized keys file. Now you first connect to your bastion host from your personal PC when doing so you forward your ssh keys using the -A flag. Now when you try to connect to your development server from your bastion host you will be using the forwarded ssh keys that the bastion host received.

**Pulling code from github on remote server**

It works like this: you ask your remote server to pull some code from Github, and Github says “who are you?” to the server. Usually the server would consult its own id_rsa files to answer, but instead it will forward the question to your local machine. Your local machine answers the question and sends the response (which does not include your private key) to the server, which forwards it back to Github. Github doesn’t care that your local machine answered the question, it just sees that it’s been answered, and lets you connect.

Allow Forwarding in Your Client’s Config

Open up your ~/.ssh/config file on your local machine, or make a new one if it’s empty.
We’ll set a new rule to make sure agent forwarding is enabled for this server’s domain:

```
Host example
  ForwardAgent yes
```
