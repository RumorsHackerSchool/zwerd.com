---
layout: post
title: JavaScript - the future of programming.
excerpt: "It's been awhile, after I done with my SQLi project I start to learn XSS, I found it fascinating! but I felt like I need more strong base knowledge about JavaScript to do my magic stuff. after a week or two I decided to make my on tutorials video about JS and this time in Hebrew, from that project I was learn a lot!"
tags:
- JavaScript

---


It's been awhile, after I done with my SQLi project I start to learn XSS, I found it fascinating! but I felt like I need more strong base knowledge about JavaScript to do my magic stuff. after a week or two I decided to make my on tutorials video about JS and this time in Hebrew, from that project I was learn a lot!

Originally I wrote that tutorial for Michael which is a friend but unfortunately he give up on JS studies for some unknown reason.

So here I am finding myself work on some tutorial that is basically designed for me lol!

I have 3 goals in the next few weeks, first of all I want to do the JS exam that w3schools offers, with this exam I can examine my knowledge in JavaScript and I will feel comfortable with that.

The second goal is to pass succesfully the GWAPT exam which examine your knowledge in web application penetration testing, for XSS attack and XSRF, the best you can do for your self is to concentrate on JavaScript knowledge because it's (web attacks - especially XSS & XSRF) have a great deal with JavaScript.

The third goal is to pass the OSCP exam which examine your knowledge in the world of penetration testing.

On my JavaScript tutorial I am teach every filed and chapter through w3schools, and in more few days I will be ready to take the exam.

The tutorial contain also some challenges that I found on the web and we solved it together, after that we will start to develop our won game! and do some more cool stuff.

I love JS, It is fun and challenge my mind how to do big stuff in short mount of time.

To help myself to preper the exam, I build some test with many question about JavaScript and hope it's will help every one who watch this tutorial and want to take the exam too.


### JavaScript - the first video about the tutorial:

<iframe width="560" height="315" src="https://www.youtube.com/embed/2bJtEFba6zI" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

So like I said that tutorial is build in such a way to help me to pass the exam, but to be sure enough that I will succeed to pass the exam I made some self test to check my (or your) knowledge.

On this quiz you will find question that I found on the web and more question that I made, if you have some issue with some question please feel free to contact me.

### JavaScript - quiz:

<form id="quiz" name="quiz">
<link rel="stylesheet" href="/scripts/quiz.css" />
  <p class="questions">1. Inside which HTML element do we put the JavaScript?</p>
  <input type="radio" id="mc" name="q1" value="1" />&lt;script&gt;<br />
  <input type="radio" id="mc" name="q1" value="0" />&lt;js&gt;<br />
  <input type="radio" id="mc" name="q1" value="0" />&lt;javascript&gt;<br />
  <input type="radio" id="mc" name="q1" value="0" />&lt;code&gt;<br />
  <br />

  <p class="questions">2. What is the correct JavaScript syntax to change the content of the HTML element below?
  <br />
  &lt;p id="demo"&gt;This is a demonstration.&lt;/p&gt;
  </p>
  <input type="radio" id="mc" name="q2" value="0" /> document.getElement("p").innerHTML = "Hello World!";<br />
  <input type="radio" id="mc" name="q2" value="0" />#demo.innerHTML = "Hello World!";<br />
  <input type="radio" id="mc" name="q2" value="0" />document.getElementByName("p").innerHTML = "Hello World!";<br />
  <input type="radio" id="mc" name="q2" value="1" />document.getElementById("demo").innerHTML = "Hello World!";<br /><br />


<p class = "questions">3.What is boolean?</p>
<input type="radio" id="mc" name="q3" value="0">It is some positive value<br>
<input type="radio" id="mc" name="q3" value="1">It is some value base on True or False<br>
<input type="radio" id="mc" name="q3" value="0">t's a binary value that can be 0 or 1<br>
<input type="radio" id="mc" name="q3" value="0">none of the answers are correct<br>
<br>




<p class = "questions">4.Where is the correct place to insert a JavaScript?</p>
<input type="radio" id="mc" name="q4" value="0">The &lt;head&gt; section<br>
<input type="radio" id="mc" name="q4" value="0">The &lt;body&gt; section<br>
<input type="radio" id="mc" name="q4" value="1">Both the &lt;head&gt; section and the &lt;body&gt; section are correct<br>
<input type="radio" id="mc" name="q4" value="0">None<br>




<script>function check(){var answer = document.getElementById("answer");
var correct = 0
var q1= document.quiz.q1.value;
if(q1== '1'){correct++};
var q2= document.quiz.q2.value;
if(q2== '1'){correct++};
var q3= document.quiz.q3.value;
if(q3== '1'){correct++};
var q4= document.quiz.q4.value;
if(q4== '1'){correct++};
answer.innerHTML='Your scor is: '+correct*100/4};
</script><br>






<input id = "button" type = "button" value = "End The Exam!" style="font-size:20px" onclick = "check();">
<p id="answer"></p>
</form>
