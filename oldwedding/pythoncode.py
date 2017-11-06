import cgi
form = cgi.FieldStorage()
searchterm =  form.getvalue('searchbox')

file = open('test.txt', 'w')
file.write(searchterm)
file.close()
