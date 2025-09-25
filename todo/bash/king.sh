multiply() {
    x=$1
    y=$2
    sleep 1
    echo "multiplying your numbers"
    sleep 2
    echo $((x*y))

    sleep 2
    echo "The multiplication operation has been completed successfully"
}


king() {

    echo "enter your first number" #input
    read numberOne #data storage in variable
    sleep 1

    echo "enter another number" #input
    read numberTwo #data storage in a variable

    multiply $numberOne $numberTwo #function call

    echo "thanks for helping me out, i will give a third of my kingdom" #message on success
}

king