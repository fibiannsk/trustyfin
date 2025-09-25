#!/bin/bash

check_number() {
  echo "Enter a number:"
  read num

  if [ $num -ge 0 ]; then
    echo "$num is positive"
  else
    echo "$num is negative"
  fi
}

check_number


#!/bin/bash

check_even_odd() {
  echo "Enter a number:"
  read num

  if [ $((num % 2)) -eq 0 ]; then
    echo "$num is even"
  else
    echo "$num is odd"
  fi
}

check_even_odd


#!/bin/bash

greater_number() {
  echo "Enter first number:"
  read x
  echo "Enter second number:"
  read y

  if [ $x -gt $y ]; then
    echo "$x is greater"
  else
    echo "$y is greater"
  fi
}

greater_number


#!/bin/bash

check_grade() {
  echo "Enter score:"
  read score

  if [ $score -ge 50 ]; then
    echo "Pass"
  else
    echo "Fail"
  fi
}

check_grade


#!/bin/bash

min_of_three() {
  echo "Enter three numbers:"
  read a b c

  min=$a
  if [ $b -lt $min ]; then
    min=$b
  fi
  if [ $c -lt $min ]; then
    min=$c
  fi

  echo "Smallest is: $min"
}

min_of_three


#!/bin/bash

check_leap_year() {
  echo "Enter a year:"
  read year

  if (( (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0) )); then
    echo "$year is a leap year"
  else
    echo "$year is not a leap year"
  fi
}

check_leap_year


#!/bin/bash

absolute_value() {
  echo "Enter a number:"
  read num

  if [ $num -lt 0 ]; then
    num=$(( -1 * num ))
  fi

  echo "Absolute value is: $num"
}

absolute_value


#!/bin/bash

check_voting() {
  echo "Enter your age:"
  read age

  if [ $age -ge 18 ]; then
    echo "You are eligible to vote"
  else
    echo "You are not eligible to vote"
  fi
}

check_voting


#!/bin/bash

check_multiple() {
  echo "Enter a number:"
  read num

  if [ $((num % 5)) -eq 0 ]; then
    echo "$num is a multiple of 5"
  else
    echo "$num is not a multiple of 5"
  fi
}

check_multiple

#!/bin/bash

check_equal() {
  echo "Enter first number:"
  read a
  echo "Enter second number:"
  read b

  if [ $a -eq $b ]; then
    echo "Numbers are equal"
  else
    echo "Numbers are not equal"
  fi
}

check_equal
