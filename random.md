Install nvim
Install nvim plugins by installing: https://github.com/junegunn/vim-plug

Then edit ~/.config/nvim/init.vim

To enable pasting from system clip board install:  sudo apt-get install vim-gtk3

did'nt work out after this


To cut-and-paste or copy-and-paste:

Position the cursor at the beginning of the text you want to cut/copy.
Press v to begin character-based visual selection, or V to select whole lines, or Ctrl-v or Ctrl-q to select a block.
Move the cursor to the end of the text to be cut/copied. While selecting text, you can perform searches and other advanced movement.
Press d (delete) to cut, or y (yank) to copy.
Move the cursor to the desired paste location.
Press p to paste after the cursor, or P to paste before.


press the Esc key to go back to the normal mode, which is also known as command mode.
Type u to undo the last change. In Vim, the u command also accepts quantifiers. For example, if you want to undo the four last changes, you would use 4u.

Use Ctrl-R (press and hold Ctrl and press r) to redo the last change. In Vim, you can also use quantifiers. For example, if you want to redo the 4 last changes, you would type 4Ctrl-R.

My favorite way is to select your block of code (with [V]isual line mode normally), then press > or <.

If you want to tab more than once, 2> or 3> to repeat it.
