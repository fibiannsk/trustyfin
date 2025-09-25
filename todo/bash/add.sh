#!/bin/bash

add() {
    x=$1
    y=$2

    sleep 2
    echo $((x+y))
    sleep 2

    echo "done"
}

add 40 50