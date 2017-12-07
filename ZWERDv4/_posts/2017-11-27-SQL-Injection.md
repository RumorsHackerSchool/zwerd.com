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

SQL Operators:<br>

| Operator        | Description        |
| ------------- |:---------|
| `=`	            | Equal to      |
| `<>`            | not equal to ( is the same as !=)       |
| `>`	         | Greater than|  
| `<`	         | Less than   |
| `#`          | Used for comment |
| `%`          | If we use `LIKE` it is used as wildcard character |
| `BETWEEN`   | will give us a rang  |
| `LIKE`      | matches a pattern  |
| `IS or IS NOT` | compare to null  |

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
- Error: we make some query to the database and we get some error from it, we can extract information about the server in that way.
- Union: in that case we use more then one SELECT SQL query in the same statements and get some single result.
- blind: in that type of SQL injection we can do more than ask the database true of false question and using whether valid page returned or not, or we can use the time it took for the page to load, we will see how that going on in that article.


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

In that case that query bring us any user that he have no middle name, so that is the main used for NULL, but there is more used for it, but before that there is more things you should know, there is a way to query some data about the database it self, there is some  [functions](https://www.w3schools.com/sql/sql_ref_mysql.asp) that used for check some value like in what database we work on, what is the user we used for mysql, what is the version of mysql database  we can actually use null to load some data for the database itself! to doing so just type the following:
{% highlight mysql %}
USE mysite;
SELECT NULL, database();
{% endhighlight %}

In that case the database will show us it's name after we chose the database, in that case the database name will be 'mysite'.

![sql-injection-024.png](/assets/images/sql-injection-024.png)
**Figure 24** Source code.

So, we can use sort of function query to extract more data about the database and it's importent you new them all:
{% highlight mysql %}
SELECT NULL, users();
SELECT NULL, version();
{% endhighlight %}

Now let's do the same with SELECT name that contain some query for password, the query I need to accomplish should look as follow:
```
SELECT first_name, last_name FROM users WHERE user_id = '1' union SELECT first_name, password FROM users WHERE user_id='1';
```

So the injection code look like that:
```
1' union SELECT first_name, password FROM users WHERE user_id='1
```
![sql-injection-020.png](/assets/images/sql-injection-020.png)
**Figure 20** Extract some password.

Well guys, do you saw that? the password is in the surname! it look like sort of hash so we need some tool that can find for us the real value of that hash. There is many hash creck out there, just for reminder, hash is some data that some cryptographic function was run on it and produces output of  160-bit value, please note that this is difference from encryption method, in hashing method you can't extract the original data value from the hashing value, so the way to find some hashing of some value is to take some value and hash it and compare the output to the hashing value you wanted to, and if there is a match you now know what is the original value.

In our case I guess the hash value is md5 type so we can check it in our linux machine, just type the command as follow:
{% highlight shell %}
echo -n password | md5sum
{% endhighlight %}

![sql-injection-021.png](/assets/images/sql-injection-021.png)
**Figure 21** Hash value.

Now if you compare the output to the hash value we already have from our database, this is the same value! if you want to use some online database of crack hashing you can used this links:
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


Now let's go to the higher level,




### How to migrate that vulnerability.
**coming soon**
