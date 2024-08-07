<?php
require 'vendor/autoload.php';

use Realm\Configuration;
use Realm\Realm;

$configuration = new Configuration();
$realm = new Realm($configuration);
$realm->connect();

$data = json_decode(file_get_contents('php://input'), true);
$user_id = $data['user_id'];
$reminder_time = $data['reminder_time'];
$reminder_day_before = $data['reminder_day_before'];

$realm->update('Settings', ['user_id' => $user_id], [
    'reminder_time' => $reminder_time,
    'reminder_day_before' => $reminder_day_before,
]);

echo json_encode(['success' => true]);
?>
