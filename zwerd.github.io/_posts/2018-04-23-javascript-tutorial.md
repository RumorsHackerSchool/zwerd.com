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
<!--do not cheat!!! and don't look at the source code!!!!-->

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


<p class = "questions">3. What is boolean?</p>
<input type="radio" id="mc" name="q3" value="0">It is some positive value<br>
<input type="radio" id="mc" name="q3" value="1">It is some value base on True or False<br>
<input type="radio" id="mc" name="q3" value="0">t's a binary value that can be 0 or 1<br>
<input type="radio" id="mc" name="q3" value="0">none of the answers are correct<br>
<br>




<p class = "questions">4. Where is the correct place to insert a JavaScript?</p>
<input type="radio" id="mc" name="q4" value="0">The &lt;head&gt; section<br>
<input type="radio" id="mc" name="q4" value="0">The &lt;body&gt; section<br>
<input type="radio" id="mc" name="q4" value="1">Both the &lt;head&gt; section and the &lt;body&gt; section are correct<br>
<input type="radio" id="mc" name="q4" value="0">None<br>




<br><p class = "questions">5. What is the correct syntax for referring to an external script called "xxx.js"?</p>
<input type="radio" id="mc" name="q5" value="0">&lt;script name="xxx.js"&gt;<br>
<input type="radio" id="mc" name="q5" value="1">&lt;script src="xxx.js"&gt;<br>
<input type="radio" id="mc" name="q5" value="0">&lt;script href="xxx.js"&gt;<br>
<input type="radio" id="mc" name="q5" value="0">&lt;script link="xxx.js"&gt;<br>




<br><p class = "questions">6. The external JavaScript file must contain the &lt;script&gt; tag.</p>
<input type="radio" id="mc" name="q6" value="1">True<br>
<input type="radio" id="mc" name="q6" value="0">False<br>
<input type="radio" id="mc" name="q6" value="0">The tage can be what you whant<br>
<input type="radio" id="mc" name="q6" value="0">The tag must be with src element<br>




<br><p class = "questions">7. How do you write "Hello World" in an alert box?</p>
<input type="radio" id="mc" name="q7" value="0">msgBox("Hello World");<br>
<input type="radio" id="mc" name="q7" value="1">alert("Hello World");<br>
<input type="radio" id="mc" name="q7" value="0">msg("Hello World");<br>
<input type="radio" id="mc" name="q7" value="0">alertBox("Hello World");<br>




<br><p class = "questions">8. How do you call a function named "myFunction"?</p>
<input type="radio" id="mc" name="q8" value="1">myFunction()<br>
<input type="radio" id="mc" name="q8" value="0">myFunction<br>
<input type="radio" id="mc" name="q8" value="0">call function myFunction()<br>
<input type="radio" id="mc" name="q8" value="0">call myFunction()<br>
<br><p class = "questions">10.How to write an IF statement in JavaScript?</p>
<input type="radio" id="mc" name="q9" value="0">if i = 5 then<br>
<input type="radio" id="mc" name="q9" value="0">if i == 5 then<br>
<input type="radio" id="mc" name="q9" value="1">if (i == 5)<br>
<input type="radio" id="mc" name="q9" value="0">if i = 5<br>




<br><p class = "questions">10. How to write an IF statement for executing some code if "i" is NOT equal to 5?</p>
<input type="radio" id="mc" name="q10" value="0">if i =! 5 then<br>
<input type="radio" id="mc" name="q10" value="0">if i &lt;&gt; 5<br>
<input type="radio" id="mc" name="q10" value="1">if (i!=5)<br>
<input type="radio" id="mc" name="q10" value="0">if(i&lt;&gt;5)<br>
<br><p class = "questions">11. How does a WHILE loop start?</p>
<input type="radio" id="mc" name="q11" value="1">while (i &lt;= 10)<br>
<input type="radio" id="mc" name="q11" value="0">while (i &lt;= 10) than<br>
<input type="radio" id="mc" name="q11" value="0">while i = 1 to 10<br>
<input type="radio" id="mc" name="q11" value="0">while (i &lt;= 10; i++)<br>




<br><p class = "questions">12. How does a FOR loop start?</p>
<input type="radio" id="mc" name="q12" value="1">for (i = 0; i &lt;= 5; i++)<br>
<input type="radio" id="mc" name="q12" value="0">for (i = 0; i &lt;= 5)<br>
<input type="radio" id="mc" name="q12" value="0">for (i &lt;= 5; i++)<br>
<input type="radio" id="mc" name="q12" value="0">for i = 1 to 5<br>
<br><p class = "questions">13. How can you add a comment in a JavaScript?</p>
<input type="radio" id="mc" name="q13" value="0">&lt;!--This is a comment--&gt;<br>
<input type="radio" id="mc" name="q13" value="1">//This is a comment<br>
<input type="radio" id="mc" name="q13" value="0">'This is a comment<br>
<input type="radio" id="mc" name="q13" value="0">#This is a comment<br>




<br><p class = "questions">14. How to insert a comment that has more than one line?</p>
<input type="radio" id="mc" name="q14" value="0">&lt;!--this comment has &lt;br&gt; more then one line--&gt;<br>
<input type="radio" id="mc" name="q14" value="0">//This comment has &lt;br&gt; more then one line//<br>
<input type="radio" id="mc" name="q14" value="0">//This comment has &lt;br&gt; more than one line*/<br>
<input type="radio" id="mc" name="q14" value="1">/*This comment has &lt;br&gt; more than one line*/<br>




<br><p class = "questions">15. What is the correct way to write a JavaScript array?</p>
<input type="radio" id="mc" name="q15" value="0">var colors = "red", "green", "blue"<br>
<input type="radio" id="mc" name="q15" value="0">var colors = (1:"red", 2:"green", 3:"blue")<br>
<input type="radio" id="mc" name="q15" value="0">var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")<br>
<input type="radio" id="mc" name="q15" value="1">var colors = ["red", "green", "blue"]<br>
<br><p class = "questions">16. How do you round the number 7.25, to the nearest integer?</p>
<input type="radio" id="mc" name="q16" value="1">Math.round(7.25)<br>
<input type="radio" id="mc" name="q16" value="0">round(7.25)<br>
<input type="radio" id="mc" name="q16" value="0">Math.rnd(7.25)<br>
<input type="radio" id="mc" name="q16" value="0">rnd(7.25)<br>




<br><p class = "questions">17. How do you find the number with the highest value of x and y?</p>
<input type="radio" id="mc" name="q17" value="0">ceil(x, y)<br>
<input type="radio" id="mc" name="q17" value="0">top(x, y)<br>
<input type="radio" id="mc" name="q17" value="1">Math.max(x, y)<br>
<input type="radio" id="mc" name="q17" value="0">Math.ceil(x, y)<br>
<br><p class = "questions">18. What is the correct JavaScript syntax for opening a new window called "w2" ?</p>
<input type="radio" id="mc" name="q18" value="1">w2 = window.open("http://www.w3schools.com");<br>
<input type="radio" id="mc" name="q18" value="0">w2 = window.new("http://www.w3schools.com");<br>
<input type="radio" id="mc" name="q18" value="0">w2 = window.winNew("https://zwerd.com");<br>
<input type="radio" id="mc" name="q18" value="0">w2 = window.new.window("www.zwerd.com");<br>




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
var q5= document.quiz.q5.value;
if(q5== '1'){correct++};
var q6= document.quiz.q6.value;
if(q6== '1'){correct++};
var q7= document.quiz.q7.value;
if(q7== '1'){correct++};
var q8= document.quiz.q8.value;
if(q8== '1'){correct++};
var q9= document.quiz.q9.value;
if(q9== '1'){correct++};
var q10= document.quiz.q10.value;
if(q10== '1'){correct++};
var q11= document.quiz.q11.value;
if(q11== '1'){correct++};
var q12= document.quiz.q12.value;
if(q12== '1'){correct++};
var q13= document.quiz.q13.value;
if(q13== '1'){correct++};
var q14= document.quiz.q14.value;
if(q14== '1'){correct++};
var q15= document.quiz.q15.value;
if(q15== '1'){correct++};
var q16= document.quiz.q16.value;
if(q16== '1'){correct++};
var q17= document.quiz.q17.value;
if(q17== '1'){correct++};
var q18= document.quiz.q18.value;
if(q18== '1'){correct++};
answer.innerHTML='Your scor is: '+correct*100/18;
}
</script>



<br>
<input id = "button" type = "button" value = "End The Exam!" style="font-size:20px" onclick = "check();">
<p id="answer"></p>
</form>
