echo "Enter a string"
read str

revstr=""

for ((i=${#str}; i >= 0; i--))
do
	revstr="${revstr}${str:i:1}"
done

echo "Reversed string: $revstr"

