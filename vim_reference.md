# Vim Reference

**Cheatsheets:**
https://devhints.io/vim
https://vim.rtorr.com/

## Vim Modes

* `Esc` - Normal mode
* `i` - Insert mode
* `v`/`V` - `v` is for Visual mode and `V` is for visual line mode
* `:` - Command mode

## To cut/copy & paste

**(Cut/Copy/Paste from within vim)**

* Position the cursor at the beginning of the text you want to cut/copy.
* Press **'v' to begin character-based visual selection**, or V to select whole lines.
* Move the cursor to the end of the text to be cut/copied.
  (While selecting text, you can perform searches and other advanced movement.)
* Press **d (delete) to cut, or y (yank) to copy**.
* Move the cursor to the desired paste location. **Press p to paste after the cursor**, or P to paste before.

**(Cut/Copy/Paste from system clipboard)**

Ref: https://stackoverflow.com/questions/11489428/how-to-make-vim-paste-from-and-copy-to-systems-clipboard
**(system clipboard will not work if `:echo has('clipboard'`) returns 0)**
After copying content, Right mouse click worked for me
Other options maybe go to command mode using `:` then try `"+p`

---

## Undo/Redo

* Go to command mode using `:`.
* Type u to undo the last change.
(If you want to undo the four last changes, you would use 4u)
* Use Ctrl-r (press and hold Ctrl and press r) to redo the last change. 
(If you want to redo the 4 last changes, you would type 4Ctrl-R)
---

## Search/Find & Replace

Ref: https://linuxize.com/post/vim-find-replace/

Switch to normal mode using `Esc`

Syntax: `:[range]s/{pattern}/{string}/[flags] [count]`

* The command searches each line in `[range]` for a `{pattern}`, and replaces it with a `{string}`. 
`[count]` is a positive integer that multiplies the command.
* If no [range] and [count] are given, only the pattern found in the current line is replaced. The current line is the line where the cursor is placed.
* The `%` range stands for first to the last line of the file that is the entire file
* Omit `{string}` to replace with empty string that is delete
* To confirm each substitution use the `/c` flag

Examples:

* Replace first occurrence of ‘foo’ in the current line with ‘bar’ - `:s/foo/bar/`
* Replace all occurrences of the search pattern in the current line - `:s/foo/bar/g`
* Replace all occurrences of the search pattern in the whole file - `:%s/foo/bar/g`
* Confirm every substitution - `:s/foo/bar/gc`
* Use regex when searching; to replace all lines starting with 'foo' - `:%s/^foo.*/bar/gc`
* Substitute all occurrences of ‘foo’ to ‘bar’ in all lines starting from line 3 to line 10 - `:3,10s/foo/bar/g`
* The dot . character indicates the current line and $; substitute ‘foo’ in all lines starting from the current line to the last - `:.,$s/foo/bar/`
* Search and replace all occurance of the word 'foo' - `:s/\<foo\>/bar/`

---

## Identing block of code

* Go to visual line mode using `V` in normal mode
* Select the lines of code
* Then press > or <.
  (If you want to tab more than once, 2> or 3> to repeat it.)

---
