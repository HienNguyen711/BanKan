//this is example code snippet from the book

let student = {name:'John Caster', grades:['A','C','B']}

//this is how helper helps you
let newStudent = update(student, {grades:{$push: ['A']}})

/*
Available commands
$push
$unshift
$splice
$set
$merge
$apply
*/
