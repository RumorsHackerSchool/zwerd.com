---
layout: post
title: SQL Injection
excerpt: "If you look on top 10 of OWASP about Application Security Risks you may find the greatest vulnerabilities on Applications! <br>
The cool thing is that injection is the number one and it may sound weird but there is some website that using SQL (Structured Query Language) and you can attack these website in such type of attack that they really should not work anymore but still does. <br>
Let's look on the SQL injection in details."
tags:
- Injection

---
SQL or Structured Query Language is a way to store and pullout data from database and it's fairly easy because it's like English actually, you can write things like `SELECT * FROM thistable` and every such command will bring up to you results from the database and this was the way to store things in websites and still does for many years.

If we talking about injection you may know that inject some code is not related only to SQL, you can actually to do so with various programing language of course it depend on how the programmer developed that site, but if he or she not care enough about the little things in that code, we may find some way to inject some unwanted code to the website.

In that  article I would like to present and demonstrate the following in order for you have a full picture of what is going on here, so the main goal here is:
- [What is the vulnerability.](#what-is-the-vulnerability)
- [Exploit that vulnerability.](#exploit-that-vulnerability)
- [How to migrate that vulnerability.](#how-to-migrate-that-vulnerability)


### What is the vulnerability

So in SQL the way it's works with website is as follow,  let's assume that we have some filed that ask us username and password, if we type in some value like `guy` and hit enter it will generate some command in SQL to the database like  `SELECT * FROM users WHERE USERNAME = "guy";`, please note the quotation marks, in this way the database will bring back `"guy"`, the problem is with those quotation marks, it little bit tricky because let's say that the user actually put in that filed quotation marks, something that look like that:
`SELECT * FROM users WHERE USERNAME = "guy""`

In that case it will failed because the command is not match up, and it will send some error, so it may be annoying, but if we think about that we can do some serious damage in that way because in SQL we have more command like `INSERT` to insert stuff or `UPDATE` to change stuff and `DELETE` to remove data from the database, so if we write on the username filed something more like:
 `guy"; DELETE * FROM table_name;`

The command will work and because it is a SQL it will delete everything that in the table_name.

The way to migrate this issue is called escaping and it's something like the programmer will setup in the code that every time we have quotation marks just put backslash before it, in that way the quotation marks in the filed will be handled as a character and not as quotation marks in the SQL so it may help to migrate the problem with command in SQL in the user input.

For that article I'm going to use DVWA which is great way to learn about vulnerability related to websites, the usual Linux Kali will be used to attack those websites and I hope you will enjoy it.


### Exploit that vulnerability.
**coming soon**



### How to migrate that vulnerability.
**coming soon**
