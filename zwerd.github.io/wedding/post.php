<?php
//this take the form from HTML file and make variables as the resiving values
$fullName       =	  $_POST['full_name'];
$phonNumber  = 	  $_POST['phon_number'];
$numberOfPeople = $_POST['number_of_people'];
$numberOfMen = $_POST['number_of_men'];
$numberOfWomen = $_POST['number_of_women'];
$numberOfKids = $_POST['number_of_kids'];


echo $fullName,$phonNumber;
$myfile = fopen("testfile.txt", "w");
$txt = "$fullName\n";
fwrite($myfile, $txt);
$txt = "$phonNumber\n";
fwrite($myfile, $txt);
fclose($myfile)

if(isset($_POST['full_name']) && isset($_POST['phon_number']) && isset($_POST['number_of_people']) && isset($_POST['number_of_men']) && isset($_POST['number_of_women']) && isset($_POST['number_of_kids'])) {
    $data = $_POST['full_name'] . ',' . $_POST['phon_number'] . ',' . $_POST['number_of_people'] . ',' . $_POST['number_of_kids'] . "\n";
    $ret = file_put_contents('./test.txt', $data, FILE_APPEND | LOCK_EX);
    if($ret === false) {
        die('There was an error writing this file');
    }
    else {
        echo "$ret bytes written to file";
    }
}
else {
   die('no post data to process');
}


?>
