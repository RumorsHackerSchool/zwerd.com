<?php

function Redirect($url, $permanent = false)
{
    if (headers_sent() === false)
    {
        header('Location: ' . $url, true, ($permanent === true) ? 301 : 302);
    }

    exit();
}

$selectOption = $_POST['carform'];
if($_POST['full_name']!="" && $_POST['phone_number']!="" && $_POST['number_of_men']!="" && $_POST['number_of_women']!="")
 {
if(isset($_POST['full_name']) && isset($_POST['phone_number'])
 && isset($_POST['number_of_men']) && isset($_POST['number_of_women'])
 && isset($_POST['comment']) && isset($_POST['approve'])) {
    $data = 'Full_Name-' . $_POST['full_name'] . ',' .
    'Phone_Number-' .  $_POST['phone_number'] . ',' .
    'Number_Of_Men-' . $_POST['number_of_men'] . ',' .
    'Number_Of_Women-' . $_POST['number_of_women'] . ',' .
    'Comment-' . $_POST['comment'] . ',' .
    'approve-' . $_POST['approve'] . "\n";
    $ret = file_put_contents('./approvment.csv', $data, FILE_APPEND | LOCK_EX);
    if($ret === false) {
        die('There was an error writing this file');
    }
    else {
        Redirect('./goodby.html', false);
    }
}
else {
   die('no post data to process');
}
}
else
{

Redirect('./error.html', false);

}
?>
