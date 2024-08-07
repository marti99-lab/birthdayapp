<?php
require 'vendor/autoload.php';

use Realm\Configuration;
use Realm\Realm;

$configuration = new Configuration();
$realm = new Realm($configuration);
$realm->connect();

$data = json_decode(file_get_contents('php://input'), true);
$user_id = $data['user_id'];
$friend_name = $data['friend_name'];
$friend_dob = $data['friend_dob'];
$category = $data['category'];

$realm->create('Friend', [
    'user_id' => $user_id,
    'friend_name' => $friend_name,
    'friend_dob' => $friend_dob,
    'category' => $category,
]);

echo json_encode(['success' => true]);
?>
