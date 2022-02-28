#!/bin/bash
# Script used to populate a $TARGET directory with random text files ranging from $FROM to $TO in $STEP (bytes) steps.

usage() {
  echo "$0 <filesize lower limit> <filesize upper limit> <filesize steps> (all in kilo bytes) <target directory>"
}

FROM=$(($1*1000))
TO=$(($2*1000))
STEP=$(($3*1000))
TARGET=$4

echo $STEP
if [ -z $TARGET ]; then
  usage
  exit 1
fi

gen() {
  FILE=$1
   SIZE=$2
   < /dev/urandom tr -dc "[:space:][:print:]" | head -c$SIZE > $FILE
   echo "Generated file $FILE"
}

gen "$TARGET/0" $FROM

i=1
while [ $i -le $(($(($TO - $FROM))/$STEP)) ]
do 
   gen $TARGET/$i $(($STEP*$i))
   ((i++))
done

gen $TARGET/$i $TO

exit 0