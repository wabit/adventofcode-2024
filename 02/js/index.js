const fs = require('fs')
// const input = fs.readFileSync('../input.file', 'utf8').split('\n')
const input = fs.readFileSync('../test.file', 'utf8').split('\n')

let safe = 0
let unsafe = 0

// for each line check they increase/decrease


function splitLevels (line) {
  const split = line.split(" ").map(Number)
  return split
}

function isSafe(a, b, c, max) {
  if (a === b) {
    return [false, "same"]
  }
  if (a > b) {
    if (a - b > max) {
      
      return [false, "decreasing"]
    } else {
      return [true, "decreasing"]
    }
  } else {
    if (b - a > max) {
      return [false, "increasing"]
    } else {
      return [true, "increasing"]
    }
  }
}

// [ '7', '6', '4', '2', '1' ]
async function checkLevels (levels, max) {
  let check = 0
  let direction = null
  if (levels[0] > levels[1]) {
    direction = "decreasing"
  } else {
    direction = "increasing"
  }
  // console.log(direction)
  levels.forEach((level, index) => {
    if (index === levels.length - 1) {
      return
    }
    let safetyResult = isSafe(levels[index], levels[index + 1], levels[index + 2], max)
    if (!safetyResult[0] || safetyResult[1] !== direction) {
      if (safetyResult[1] !== direction) {
        console.log("unsafe becasue of " + safetyResult[1], levels[index], levels[index + 1])
        check++
        return
      } else if (!safetyResult[0]) {
        console.log("unsafe becasue of max " + levels[index], levels[index + 1])
        check++
        return
      }
    }
  })
  if (check <= 1 ) {
    console.log("safe")
    safe++
    return
  } else {
    unsafe++
    return
  }
}

async function answer1 () {
  let answer = ""
  for (const line of input) {
    const levels = await splitLevels(line)
    console.log("-----")
    console.log(levels)
    await checkLevels(levels, 3)
    answer = safe
  }
  console.log("Answer 1: " + answer)
}

answer1()