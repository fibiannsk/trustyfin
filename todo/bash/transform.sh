#!/bin/bash

multiply() {
    x=$1
    y=$2

    echo $((x*y))
    sleep 2

    echo "done"
}

retro() {
    echo "enter a number"
    read numberOne
    sleep 2
    echo "enter another number"
    read numberTwo

    multiply $numberOne $numberTwo
}

retro