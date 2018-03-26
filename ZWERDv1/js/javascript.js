function prompt_average() {
  var exams_num = prompt('Enter exams number for calculate:')
  var final_score = 0
  var xams_num = parseInt(exams_num)
  for (i = 0; i < exams_num; i++) {
    num = i + 1
    var exam_score = prompt('Enter score of exam ' + num + ':')
    exam_score = parseInt(exam_score)
    final_score += exam_score
  }
  var average = 0
  average = final_score / exams_num
  alert('Your average score is: ' + average)
}

var score
score = 0
var score_value
score_value = 0
var exams_num = 0
function inner_average() {
  document.getElementById('script').innerHTML +=
    '<br/>Please type the number of exam for calculate average:<input type="text" id="exams_num" placeholder="Exam number..." size="15"/><br/><input type="submit" value="Submit" onclick="exams()"/>'
}
function addition() {
  score += score_value
  document.write(score)
}

function exams() {
  exams_num = document.getElementById('exams_num').value
  console.log(exams_num)
  document.getElementById('script').innerHTML =
    '<br/><b>The number of the exams are ' + exams_num + '</b>'
  for (i = 0; i < exams_num; i++) {
    num = i + 1
    document.getElementById('script').innerHTML +=
      '<br/>Please type score of exam number ' +
      num +
      ':<input type="text" id="exam_' +
      i +
      '" placeholder="Exam score..." size="15"/>'
  }
  document.getElementById('script').innerHTML +=
    '<br/><input type="submit" value="Submit" onclick="submit_score()"/>'
}
function submit_score() {
  score_value = 0
  for (i = 0; i < exams_num; i++) {
    score_value += parseInt(document.getElementById('exam_' + i).value)
  }
  document.getElementById('script').innerHTML =
    '<br/>You average score is: ' + score_value / exams_num
}
