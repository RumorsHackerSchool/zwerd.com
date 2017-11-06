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

if(isset($_POST['full_name']) && isset($_POST['phone_number'])
 && isset($_POST['number_of_people']) && isset($_POST['comment']) && isset($_POST['approve'])) {
    $data = 'Full_Name-' . $_POST['full_name'] . ',' .
    'Phone_Number-' .  $_POST['phone_number'] . ',' .
    'Number_Of_People-' . $_POST['number_of_people'] . ',' .
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
?>
