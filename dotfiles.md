# Dotfiles

## For zsh

* .zshrc                              -> ZSH config
* .p10k.zsh                           -> Powerlevel10k zsh theme configuration
* .p10k_win.zsh                       -> Powerlevel10k zsh theme configuration for WSL

## For bash

* .bash_profile                       -> Loads the default .profile
* .profile                            -> Sets some bash config(This file is not read by bash(1), if ~/.bash_profile exists)
* .dot_bashrc                         -> bash shell configurations
* .git-prompt.sh                      -> Bash script that allows you to see repository status in your prompt

---

## Installation

We are using [chezmoi](https://www.chezmoi.io/) to manage dotfiles

### Quick setup

Refs:
* https://www.chezmoi.io/quick-start/
* https://jerrynsh.com/how-to-manage-dotfiles-with-chezmoi/

Chezmoi maintains a copy of your dot files in `~/.local/share/chezmoi/dotfiles`, so in order to add, edit, delete your dot files
do so in `~/.local/share/chezmoi/dotfiles` OR use command like `chezmoi edit ~/.zshrc` then...

```
# Add some new dotfile
chezmoi add ~/.newdotfile

# cd into `~/.local/share/chezmoi/dotfiles`
chezmoi cd

# Push to git
git add .
git commit -m "<New dotfile commit message>"
git push -u origin main

# To view the diff between ~/.local/share/chezmoi/dot_zshrc & ~/.zshrc
chezmoi diff

# Apply any changes
chezmoi -v apply

# Apply dotfiles on new machine
chezmoi init --apply https://github.com/Arp-G/linux-love

# Pull and apply the latest changes from your dotfiles repository
chezmoi update -v
```

## ZSH Plugins to install

After setting up your dot files, install zsh plugins by...

* powerlevel10k             -> git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k

* zsh-autosuggestions       -> git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

* zsh-completions           -> git clone https://github.com/zsh-users/zsh-completions ${ZSH_CUSTOM:-${ZSH:-~/.oh-my-zsh}/custom}/plugins/zsh-completions

* zsh-you-should-use        -> git clone https://github.com/MichaelAquilina/zsh-you-should-use.git $ZSH_CUSTOM/plugins/you-should-use

* zsh-syntax-highlighting   -> git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

After adding the plugins run `source ~/.zshrc`
