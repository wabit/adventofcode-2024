const fs = require('fs')
const input = fs.readFileSync('../input.file', 'utf8').split('\n')
// const input = fs.readFileSync('../test.file', 'utf8').split('\n')

let a = []
let b = []
let distances = []
let similarityScore = []

async function splitList() {
  input.forEach(element => {
    const split = element.split("   ")
    a.push(parseInt(split[0]))
    b.push(parseInt(split[1]))
  });
  return [a.sort((a, b) => a - b), b.sort((a, b) => a - b)]
}

function difference(a, b) {
  if (a > b) {
    return a - b
  } else {
    return b - a
  }
}

async function findDifference () {
  const [a, b] = await splitList()
  a.forEach((id, index) => {
    const distance = difference(id, b[index])
    distances.push(distance)
  });
}

async function similarity() {
  a.forEach(distanceA => {
    let dupes = 0
    b.forEach(distanceB => {
      if (distanceA === distanceB) {
        dupes++
      }
    })
    // console.log(distanceA * dupes)
    similarityScore.push(distanceA * dupes)
  })
}

async function answer1() {
  await findDifference()
  let answer = 0
  distances.forEach(x => {
    answer += x
  })
  console.log("Answer 1: " + answer)
}

async function answer2() {
  await findDifference()
  await similarity()
  let answer = 0
  similarityScore.forEach(x => {
    answer += x
  })
  console.log("Answer 2: " + answer)
}

// answer1()
answer2()